import { ImageType, TimelineSide } from "@/common/constants";
import TimelineItem from "./TimelineItem";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { TimelineItemProps } from "@/common/schema";
import { _get } from "@/utils/crudService";

const Timeline = () => {
	const { id } = useParams();

	const [timelineData, setTimelineData] = useState<TimelineItemProps[]>([]);

	useEffect(() => {
		if (id) {
			fetchTimelineData(id);
		}
	}, [id]);

	const fetchTimelineData = async (id: string) => {
		const eventsData: TimelineItemProps[] = await _get(
			`/events/${id}/timeline`
		);
		setTimelineData(eventsData);
	};

	return (
		<div className="flex flex-col">
			{/* <span className="mt-4 font-bold text-2xl">{title}</span> */}
			<div className="relative w-full max-w-6xl mx-auto py-10">
				{/* Central vertical line */}
				<div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-300 z-0" />

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
	);
};

export default Timeline;
