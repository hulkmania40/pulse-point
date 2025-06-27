import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ImageWithSkeleton from "../utils/ImageWithSkeleton";
import { _get } from "@/utils/crudService";
import HomepageCardSkeleton from "./HomepageCardSkeleton";
import Chip from "../ui-components/Chip";

interface EventCard {
	_id: string;
	title: string;
	slug: string;
	description: string;
	coverImage: string;
  tags: string[];
  dateUpdated: string;
  dateCreated: string;
}

const Homepage = () => {
	const navigate = useNavigate();

	const [cards, setCards] = useState<EventCard[]>([]);
	const [eventsListLoading, setEventsListLoading] = useState<boolean>(false);

	useEffect(() => {
		setEventsListLoading(true);
		// Fetch events from the API
		fetchApi();
	}, []);

	const fetchApi = async () => {
		try {
			const data: EventCard[] = await _get("/events");
			setCards(data || []);
		} catch (error) {
			console.error("Failed to fetch events", error);
		}
		setEventsListLoading(false);
	};

	return (
		<div className="mt-3 flex flex-col w-full px-4">
			{eventsListLoading ? (
				<Fragment>
					<HomepageCardSkeleton />
					<HomepageCardSkeleton />
					<HomepageCardSkeleton />
				</Fragment>
			) : (
				cards.map((card) => (
					<Card key={card._id} className="w-full shadow-md mb-3">
						<CardHeader>
							<div className="flex items-start justify-between gap-4">
								<div className="flex-1">
									<CardTitle>{card.title}</CardTitle>
									<CardDescription className="mt-1 text-sm text-muted-foreground">
										{card.description}
									</CardDescription>
								</div>
								<ImageWithSkeleton src={card.coverImage} />
							</div>
						</CardHeader>
						<CardContent>
							<p className="flex items-center">Tags: <div className="flex flex-wrap gap-2 ml-2">{card.tags.map((tag) => <Chip key={tag} text={tag} />)}</div></p>
						</CardContent>
						<CardFooter>
							<Button
								onClick={() =>
									navigate(`/timeline/${card._id}`)
								}
							>
								View Details
							</Button>
						</CardFooter>
					</Card>
				))
			)}
		</div>
	);
};

export default Homepage;
