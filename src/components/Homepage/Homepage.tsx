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
import { EditIcon, Tag } from "lucide-react";
import { Badge } from "../ui/badge";
import { FollowButton } from "../ui-components/FollowButton";

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
							<div>
								<Button
									variant="outline"
									onClick={() => navigate(`/edit/${card._id}`)}
								>
									<EditIcon />
								</Button>
							</div>
						</CardHeader>
						<CardContent>
							<p className="flex items-center">
								<div className="flex flex-wrap gap-2">
									{card.tags.map((tag) => (
										<Badge variant="outline">
											<Tag size={14} className="mr-1" />{" "}
											{tag}{" "}
										</Badge>
									))}
								</div>
							</p>
						</CardContent>
						<CardFooter>
							<Button
								className="mr-2"
								onClick={() => navigate(`/event/${card._id}`)}
							>
								View Details
							</Button>
							<FollowButton />
						</CardFooter>
					</Card>
				))
			)}
		</div>
	);
};

export default Homepage;
