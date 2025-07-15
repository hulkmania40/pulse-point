import { ImageType, TimelineSide } from "@/common/constants";
import TimelineItem from "./TimelineItem";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { TimelineItemProps, Event } from "@/common/schema";
import { _get } from "@/utils/crudService";
import LoadingOverlay from "../ui-components/LoadingOverlay";
import { fetchEventTimelineDetails } from "@/services/events";

const Timeline = () => {
	const { id } = useParams();

	const [eventData, setEventData] = useState<Event>();
	const [timelineData, setTimelineData] = useState<TimelineItemProps[]>([]);
	const [dataLoading, setDataLoading] = useState<boolean>(false);
	const [progress, setProgress] = useState<number>(0);
	const [hasFetched, setHasFetched] = useState(false);

	useEffect(() => {
		if (id && !hasFetched) {
			setHasFetched(true);
			fetchTimelineData(id);
		}
	}, [id]);

	const fetchTimelineData = async (id: string) => {
		setDataLoading(true);
		setProgress(0);

		let simulatedProgress = 0;
		const interval = setInterval(() => {
			simulatedProgress += Math.random() * 10; // increase randomly to simulate network loading
			setProgress(Math.min(simulatedProgress, 95)); // cap at 95% until API finishes
		}, 200);

		try {
			const data: any = await fetchEventTimelineDetails(id);
			setEventData(data.eventDetails);
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
	};

	return (
		<Fragment>
			<LoadingOverlay
				isLoading={dataLoading}
				progress={progress}
				loadingText={`Fetching Data: `}
				overlayBg="bg-white/30 backdrop-blur-md"
			/>

			<div className="flex flex-col">
				<span className="mt-4 font-bold text-2xl">
					{eventData?.title}
				</span>
				<span className="mt-4 font-medium text-lg">
					{eventData?.description}
				</span>
				<div className="relative w-full max-w-6xl mx-auto py-10">
					{/* Central vertical line */}
					<div className="absolute left-1/2 transform -translate-x-1/2 top-12 bottom-12 w-1 bg-gray-300 z-0" />

					<div className="flex flex-col space-y-16">
						{timelineData.map((item, idx) => (
							<TimelineItem
								key={idx}
								date={item.date}
								title={item.title}
								subtitle={item?.subtitle || ""}
								side={
									idx % 2 === 0
										? TimelineSide.LEFT
										: TimelineSide.RIGHT
								}
								status={item.status}
								events={item.events}
								imageUrl={item.imageUrl}
								imageCaption={item.imageCaption}
								imageSource={item.imageSource}
								imageType={item.imageType as ImageType}
								location={item.location}
								countryName={item.countryName}
								countryCode={item.countryCode}
							/>
						))}
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Timeline;
