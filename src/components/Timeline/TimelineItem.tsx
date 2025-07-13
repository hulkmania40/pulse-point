import { Card, CardContent } from "@/components/ui/card";
import { Bot, Camera, CheckCircle, Info, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useState } from "react";
import { ImageType, type TimelineSide } from "@/common/constants";
import { renderFlagIcon } from "@/common/helper";
import ImageWithSkeleton from "../utils/ImageWithSkeleton";
import { format, parseISO, getDate, getMonth } from "date-fns";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export interface TimelineItemProps {
	date: string;
	title: string;
	subtitle: string;
	side: TimelineSide;
	status?: string;
	events?: string[];
	imageUrl?: string;
	imageCaption?: string;
	imageSource?: string;
	imageType: ImageType;
	location?: string;
	countryName?: string;
	countryCode?: string;
}

const MAX_WORDS = 20;

const TimelineItem = ({
	date,
	title,
	subtitle,
	side,
	status,
	events,
	imageUrl,
	imageCaption = "",
	imageSource = "",
	imageType = ImageType.ORIGINAL,
	location,
	countryName,
	countryCode,
}: TimelineItemProps) => {
	const isLeft = side === "left";
	const [showFullCaption, setShowFullCaption] = useState(false);
	const captionWords = imageCaption.split(" ");
	const shouldTruncate = captionWords.length > MAX_WORDS;
	const displayedCaption = showFullCaption
		? imageCaption
		: captionWords.slice(0, MAX_WORDS).join(" ") +
		(shouldTruncate ? "..." : "");

	const renderImageSection = () => (
		<div className="relative">
			{/* Badge */}
			<div className="absolute top-2 right-2 z-10">
				<HoverCard>
					<HoverCardTrigger asChild>
						<div className="flex items-center space-x-1 text-xs bg-white px-2 py-1 rounded-full shadow cursor-pointer">
							<Info className="w-3 h-3" />
							<Tooltip>
								<TooltipTrigger asChild>
									<span>
										{
											imageType === ImageType.AI ? <Bot size={14} /> : <Camera size={14} />
										}
									</span>
								</TooltipTrigger>
								<TooltipContent side="top">
									{
										imageType === ImageType.AI ? "AI Generated" : "Original"
									}
								</TooltipContent>
							</Tooltip>
						</div>
					</HoverCardTrigger>
					<HoverCardContent className="text-xs max-w-xs">
						Source: {imageSource || "Not Provided"}
					</HoverCardContent>
				</HoverCard>
			</div>

			{/* Image */}
			<ImageWithSkeleton src={imageUrl || ""} full />

			{/* Caption */}
			{imageCaption && (
				<p className="mt-2 text-sm text-gray-700">
					{displayedCaption}
					{shouldTruncate && (
						<button
							className="text-blue-500 ml-2"
							onClick={() => setShowFullCaption(!showFullCaption)}
						>
							{showFullCaption ? "Read less" : "Read more"}
						</button>
					)}
				</p>
			)}
		</div>
	);

	const isFirstJan = getDate(parseISO(date)) === 1 && getMonth(parseISO(date)) === 0;

	const formattedDate = isFirstJan
		? format(parseISO(date), "yyyy")
		: format(parseISO(date), "dd MMM yyyy");

	return (
		<div className="relative w-full flex justify-between items-start">
			{/* LEFT CONTENT */}
			<div
				className={`w-1/2 ${isLeft ? "flex justify-end pr-6" : "invisible"
					}`}
			>
				<Card className="w-full max-w-md">
					<CardContent className="p-4 space-y-4">
						<h3 className="text-lg font-bold">{title}</h3>
						<p className="text-sm text-gray-700">{subtitle}</p>
						{status && (
							<div className="flex items-center text-green-600">
								<CheckCircle className="h-4 w-4 mr-1" />{" "}
								{status}
							</div>
						)}
						{imageUrl && renderImageSection()}
						{(events || []).length > 0 && (
							<ul className="list-disc ml-5 space-y-1 text-sm text-gray-600">
								{(events || []).map((e, i) => (
									<li key={i}>{e}</li>
								))}
							</ul>
						)}
					</CardContent>
				</Card>
			</div>

			{/* CENTER DOT + DATE */}
			<div className="absolute flex left-1/2 transform -translate-x-1/2 z-10 text-center">
				<div className="bg-black rounded-full h-8 w-8 mx-auto border-4 border-white" />
				<div
					className={`absolute ${isLeft ? "left-full pl-2" : "right-full pr-2"
						}`}
				>
					<Card className="w-max max-w-md">
						<CardContent className="px-4 space-y-1 flex flex-col">
							<Button
								className="mb-4"
								variant="outline"
								size="lg"
							>
								{formattedDate}
							</Button>
							<span className="flex mb-4">
								<MapPin className="mr-1" /> {location}
							</span>
							{renderFlagIcon(countryCode, countryName)}
						</CardContent>
					</Card>
				</div>
			</div>

			{/* RIGHT CONTENT */}
			<div
				className={`w-1/2 ${!isLeft ? "flex justify-start pl-6" : "invisible"
					}`}
			>
				<Card className="w-full max-w-md">
					<CardContent className="p-4 space-y-4">
						<h3 className="text-lg font-bold">{title}</h3>
						<p className="text-sm text-gray-700">{subtitle}</p>
						{status && (
							<div className="flex items-center text-green-600">
								<CheckCircle className="h-4 w-4 mr-1" />{" "}
								{status}
							</div>
						)}
						{imageUrl && renderImageSection()}
						{(events || []).length > 0 && (
							<ul className="list-disc ml-5 space-y-1 text-sm text-gray-600">
								{(events || []).map((e, i) => (
									<li key={i}>{e}</li>
								))}
							</ul>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default TimelineItem;
