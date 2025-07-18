import { useFormik, FieldArray, FormikProvider } from 'formik';
import * as Yup from 'yup';

import { Card, CardContent } from '@/components/ui/card';
import { CircleCheck, ChevronsUpDown, LoaderCircle, Plus, Trash, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { _post } from '@/utils/crudService';
import { useNavigate, useParams } from 'react-router-dom';
import { Fragment, useEffect, useMemo, useState } from 'react';
import countryData from '../../common/data/country_flags.json';
import { fetchEventTimelineDetails } from '@/services/events';
import type { TimelineItemProps, Event } from '@/common/schema';
import { FormType } from '@/common/constants';
import LoadingOverlay from '../ui-components/LoadingOverlay';

type CountryEntry = {
    code: string;
    name: string;
    imageUrl: string;
};

const countries: CountryEntry[] = Object.entries(countryData).map(([code, data]: any) => ({
    code,
    name: data.name,
    imageUrl: data.image,
}));

const TimelineForm = () => {

    const { event_id = "" } = useParams();
    const navigate = useNavigate();

    const [formSubmitLoading, setFormSubmitLoading] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [eventsData, setEventsData] = useState<Event>();
    const [timelineData, setTimelineData] = useState<TimelineItemProps[]>([]);
    const [formType, setFormType] = useState<any>(FormType.POST);
    const [dataLoading, setDataLoading] = useState<boolean>(false);
	const [progress, setProgress] = useState<number>(0);
    useEffect(() => {
        if (event_id.length > 0) {
            setFormType(FormType.PUT)
            fetchFormData(event_id)
        }
    }, [event_id])

    const fetchFormData = async (event_id: string) => {
        setDataLoading(true);
		setProgress(0);

		let simulatedProgress = 0;
		const interval = setInterval(() => {
			simulatedProgress += Math.random() * 10; // increase randomly to simulate network loading
			setProgress(Math.min(simulatedProgress, 95)); // cap at 95% until API finishes
		}, 200);

		try {
			const data: any = await fetchEventTimelineDetails(event_id);
            setEventsData(data.eventDetails);
            setTimelineData(data.timeLinesDetails);
			setProgress(100); // complete once API call returns
		} catch (err) {
			console.error("Error fetching data", err);
		} finally {
			clearInterval(interval);
			setTimeout(() => {
				setDataLoading(false);
				setProgress(0);
			}, 500);
		}
    }

    const filteredCountries = useMemo(() => {
        if (!searchTerm) return countries;

        const lower = searchTerm.toLowerCase();

        return countries
            .filter((country) => country.name.toLowerCase().includes(lower))
            .sort((a, b) => {
                const aName = a.name.toLowerCase();
                const bName = b.name.toLowerCase();

                const aStarts = aName.startsWith(lower);
                const bStarts = bName.startsWith(lower);

                if (aStarts && !bStarts) return -1;
                if (!aStarts && bStarts) return 1;
                return aName.localeCompare(bName);
            });
    }, [searchTerm]);

    const initialValues = {
        eventDetails: {
            title: eventsData?.title || '',
            slug: eventsData?.slug || '',
            tags: eventsData?.tags || [],
            description: eventsData?.description || '',
            coverImage: eventsData?.coverImage || '',
            published: eventsData?.published || false,
        },
        timeLineDetails:
            timelineData.length > 0
                ? (timelineData || []).map((item) => ({
                    date: item.date || '',
                    title: item.title || '',
                    subtitle: item.subtitle || '',
                    status: item.status || '',
                    location: item.location || '',
                    countryName: item.countryName || '',
                    countryCode: item.countryCode || '',
                    imageUrl: item.imageUrl || '',
                    imageCaption: item.imageCaption || '',
                    imageType: item.imageType || '',
                    imageSource: item.imageSource || '',
                    events: item.events.length ? item.events : [''],
                }))
                : [
                    {
                        date: '',
                        title: '',
                        subtitle: '',
                        status: '',
                        location: '',
                        countryName: '',
                        countryCode: '',
                        imageUrl: '',
                        imageCaption: '',
                        imageType: '',
                        imageSource: '',
                        events: [''],
                    },
                ],
    };

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: Yup.object({
            eventDetails: Yup.object({
                title: Yup.string().required('Title is Required'),
                slug: Yup.string().required('Slug is Required'),
                tags: Yup.array().of(Yup.string()).required("Enter atleast 1 Tag"),
                description: Yup.string().required('Description is Required'),
                coverImage: Yup.string(),
                published: Yup.boolean(),
            }),
            timeLineDetails: Yup.array()
                .of(
                    Yup.object({
                        date: Yup.string().required('Date is Required'),
                        title: Yup.string().required('Timeline Title is Required'),
                        subtitle: Yup.string(),
                        status: Yup.string(),
                        location: Yup.string().required("Location is Required"),
                        countryName: Yup.string().required("Country Name is Required"),
                        countryCode: Yup.string().required("Country Code is Required"),
                        imageUrl: Yup.string().required("Image URL is Required"),
                        imageCaption: Yup.string(),
                        imageType: Yup.string().required("ImageType is Required"),
                        imageSource: Yup.string().required("Image Source is Required"),
                        events: Yup.array().of(Yup.string().required('Enter atleast 1 Event Data')),
                    })
                )
                .min(1, 'At least one timeline entry is required'),
        }),
        onSubmit: async (values) => {
            console.log(values);
            console.log(formType);
            const payload = {
                eventDetails: values.eventDetails,
                timeLinesDetails: values.timeLineDetails,
            };
            try {
                const res: any = await _post('timeline/add', payload);
                toast.success(res.message,{
                    icon: <CircleCheck className="text-green-500" />,
                });
                setFormSubmitLoading(false)
                navigate('/');
            } catch (error) {
                toast.error('Submission failed!', {
                    icon: <XCircle className="text-red-500" />,
                });
                console.error('Submission Error:', error);
                setFormSubmitLoading(false)
            }
        },
    });

    const {
        values,
        handleChange,
        handleSubmit,
        setFieldValue,
    } = formik;

    const handleFinalSubmit = async () => {
        const validationErrors = await formik.validateForm();

        if (Object.keys(validationErrors).length > 0) {
            // Flatten nested errors into readable strings
            const flattenErrors = (errorsObj: any, parentKey = ''): string[] => {
                let messages: string[] = [];

                for (const key in errorsObj) {
                    if (typeof errorsObj[key] === 'string') {
                        messages.push(`${errorsObj[key]}`);
                    } else if (typeof errorsObj[key] === 'object' && errorsObj[key] !== null) {
                        messages = messages.concat(
                            flattenErrors(errorsObj[key], `${parentKey}${key}.`)
                        );
                    }
                }

                return messages;
            };

            const errorMessages = flattenErrors(validationErrors);

            errorMessages.forEach((msg) => toast.error(msg, {
                icon: <XCircle className="text-red-500" />,
            }));

            setFormSubmitLoading(false)

            return;
        }

        handleSubmit();
    };


    return (
        <Fragment>
            <LoadingOverlay
				isLoading={dataLoading}
				progress={progress}
				loadingText={`Fetching Data: `}
				overlayBg="bg-white/30 backdrop-blur-md"
			/>
            <FormikProvider value={formik}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        setFormSubmitLoading(true);
                        handleFinalSubmit();
                    }}
                    className="space-y-8 p-4"
                >
                    <Card>
                        <CardContent className="space-y-4">
                            <h2 className="text-xl font-bold">Event Details</h2>
                            <Input
                                name="eventDetails.title"
                                placeholder="Title"
                                value={values.eventDetails.title}
                                onChange={handleChange}
                            />
                            <Input
                                name="eventDetails.slug"
                                placeholder="Slug"
                                value={values.eventDetails.slug}
                                onChange={handleChange}
                            />
                            <Input
                                name="eventDetails.tags"
                                placeholder="Comma-separated tags"
                                value={values.eventDetails.tags.join(', ')}
                                onChange={(e) =>
                                    setFieldValue(
                                        'eventDetails.tags',
                                        e.target.value.split(',').map((t) => t.trim())
                                    )
                                }
                            />
                            <Textarea
                                name="eventDetails.description"
                                placeholder="Description"
                                value={values.eventDetails.description}
                                onChange={handleChange}
                            />
                            <Input
                                name="eventDetails.coverImage"
                                placeholder="Cover Image URL"
                                value={values.eventDetails.coverImage}
                                onChange={handleChange}
                            />
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="published"
                                    checked={values.eventDetails.published}
                                    onCheckedChange={(checked) =>
                                        setFieldValue('eventDetails.published', checked)
                                    }
                                />
                                <label htmlFor="published">Published</label>
                            </div>
                        </CardContent>
                    </Card>

                    <FieldArray
                        name="timeLineDetails"
                        render={(arrayHelpers) => (
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold">Timeline Details</h2>
                                {values.timeLineDetails.map((detail, index) => (
                                    <Card key={index} className="relative">
                                        <CardContent className="space-y-3">
                                            <h3 className="font-semibold">Entry #{index + 1}</h3>
                                            <Input
                                                name={`timeLineDetails.${index}.title`}
                                                placeholder="Title"
                                                value={detail.title}
                                                onChange={handleChange}
                                            />
                                            <Input
                                                name={`timeLineDetails.${index}.subtitle`}
                                                placeholder="Subtitle"
                                                value={detail.subtitle}
                                                onChange={handleChange}
                                            />
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            className="w-full justify-start text-left font-normal"
                                                        >
                                                            {detail.date ? format(new Date(detail.date), 'PPP') : 'Pick a date'}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-full p-0 right-1">
                                                        <Calendar
                                                            mode="single"
                                                            selected={detail.date ? new Date(detail.date) : undefined}
                                                            onSelect={(date) =>
                                                                setFieldValue(`timeLineDetails.${index}.date`, date?.toISOString() || '')
                                                            }
                                                            autoFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>

                                                <Input
                                                    name={`timeLineDetails.${index}.status`}
                                                    placeholder="Status"
                                                    value={detail.status}
                                                    onChange={handleChange}
                                                />

                                                <Input
                                                    name={`timeLineDetails.${index}.location`}
                                                    placeholder="Location"
                                                    value={detail.location}
                                                    onChange={handleChange}
                                                />

                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className="w-full flex justify-between"
                                                        >
                                                            <span>{detail.countryName || 'Select a country'}</span>
                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </PopoverTrigger>

                                                    <PopoverContent
                                                        className="w-[var(--radix-popover-trigger-width)] p-0 max-h-60 overflow-y-auto"
                                                        align="start"
                                                        side="bottom"
                                                        onCloseAutoFocus={() => {
                                                            setSearchTerm('');
                                                        }}
                                                    >
                                                        <Command>
                                                            <CommandInput
                                                                placeholder="Search country..."
                                                                className="h-9"
                                                                value={searchTerm}
                                                                onValueChange={setSearchTerm}
                                                            />
                                                            <CommandEmpty>No country found.</CommandEmpty>
                                                            <CommandGroup>
                                                                {filteredCountries.map((country) => (
                                                                    <CommandItem
                                                                        key={country.code}
                                                                        className="flex items-center gap-2"
                                                                        onSelect={() => {
                                                                            setFieldValue(`timeLineDetails.${index}.countryName`, country.name);
                                                                            setFieldValue(`timeLineDetails.${index}.countryCode`, country.code);
                                                                            // setSearchTerm('');  // Resets the search term on country selection
                                                                        }}
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                'h-4 w-4',
                                                                                detail.countryCode === country.code ? 'opacity-100' : 'opacity-0'
                                                                            )}
                                                                        />
                                                                        <img
                                                                            src={country.imageUrl}
                                                                            alt={country.name}
                                                                            className="w-5 h-3 object-cover rounded-sm"
                                                                        />
                                                                        <span>{country.name}</span>
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </Command>
                                                    </PopoverContent>
                                                </Popover>

                                                <Input
                                                    name={`timeLineDetails.${index}.imageUrl`}
                                                    placeholder="Image URL"
                                                    value={detail.imageUrl}
                                                    onChange={handleChange}
                                                />

                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button variant="outline" className="w-full flex justify-between">
                                                            {detail.imageType || 'Select Image Type'} <ChevronsUpDown />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-100 p-0">
                                                        <Command>
                                                            <CommandGroup>
                                                                {['Original', 'AI'].map((type) => (
                                                                    <CommandItem
                                                                        key={type}
                                                                        value={type}
                                                                        onSelect={() =>
                                                                            setFieldValue(`timeLineDetails.${index}.imageType`, type)
                                                                        }
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                'mr-2 h-4 w-4',
                                                                                detail.imageType === type ? 'opacity-100' : 'opacity-0'
                                                                            )}
                                                                        />
                                                                        {type}
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </Command>
                                                    </PopoverContent>
                                                </Popover>

                                                <Input
                                                    name={`timeLineDetails.${index}.imageSource`}
                                                    placeholder="Image Source"
                                                    value={detail.imageSource}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <Textarea
                                                name={`timeLineDetails.${index}.events`}
                                                placeholder="Events (separated by new lines)"
                                                value={detail.events.join('\n')}
                                                onChange={(e) =>
                                                    setFieldValue(
                                                        `timeLineDetails.${index}.events`,
                                                        e.target.value.split('\n')
                                                    )
                                                }
                                            />
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="sm"
                                                        className="absolute top-2 right-2"
                                                        onClick={() => arrayHelpers.remove(index)}
                                                    >
                                                        <Trash size={16} />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent side="top">
                                                    Delete this Event
                                                </TooltipContent>
                                            </Tooltip>
                                        </CardContent>
                                    </Card>
                                ))}
                                <Button
                                    type="button"
                                    onClick={() =>
                                        arrayHelpers.push({
                                            date: '',
                                            title: '',
                                            subtitle: '',
                                            status: '',
                                            location: '',
                                            countryName: '',
                                            countryCode: '',
                                            imageUrl: '',
                                            imageCaption: '',
                                            imageType: '',
                                            imageSource: '',
                                            events: [''],
                                        })
                                    }
                                >
                                    <Plus size={16} className="mr-2" /> Add Timeline Entry
                                </Button>
                            </div>
                        )}
                    />

                    <Button type="submit" className="w-full" disabled={formSubmitLoading}>
                        {
                            formSubmitLoading ?
                                <span className='flex items-center'>
                                    Submitting <LoaderCircle className='animate-spin ml-2' />
                                </span>
                                :
                                <span>Submit</span>
                        }
                    </Button>
                </form>
            </FormikProvider>
        </Fragment>
    );
};

export default TimelineForm;
