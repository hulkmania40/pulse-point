import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ImageWithSkeleton from "./utils/ImageWithSkeleton";
import { useNavigate } from "react-router-dom";

const cards = [
  {
    id: 1,
    title: "Card One",
    img: "https://picsum.photos/200?random=1",
    description:
      "This is a longer description for card one that should wrap onto the next line gracefully if it overflows.",
  },
  {
    id: 2,
    title: "Card Two",
    img: "https://picsum.photos/200?random=2",
    description:
      "This is the description for card two. It's a bit longer as well.",
  },
  {
    id: 3,
    title: "Card Three",
    img: "https://picsum.photos/200?random=3",
    description:
      "This is the description for card three. Even if it is long, it should wrap properly next to the image.",
  },{
    id: 4,
    title: "Card Four",
    img: "https://picsum.photos/200?random=4",
    description:
      "This is the description for card three. Even if it is long, it should wrap properly next to the image.",
  },{
    id: 5,
    title: "Card Five",
    img: "https://picsum.photos/200?random=5",
    description:
      "This is the description for card three. Even if it is long, it should wrap properly next to the image.",
  },{
    id: 6,
    title: "Card Six",
    img: "https://picsum.photos/200?random=6",
    description:
      "This is the description for card three. Even if it is long, it should wrap properly next to the image.",
  },{
    id: 7,
    title: "Card Seven",
    img: "https://picsum.photos/200?random=7",
    description:
      "This is the description for card three. Even if it is long, it should wrap properly next to the image.",
  },{
    id: 8,
    title: "Card Eight",
    img: "https://picsum.photos/200?random=8",
    description:
      "This is the description for card three. Even if it is long, it should wrap properly next to the image.",
  },{
    id: 9,
    title: "Card Nine",
    img: "https://picsum.photos/200?random=9",
    description:
      "This is the description for card three. Even if it is long, it should wrap properly next to the image.",
  },{
    id: 10,
    title: "Card Ten",
    img: "https://picsum.photos/200?random=10",
    description:
      "This is the description for card three. Even if it is long, it should wrap properly next to the image.",
  },
];

const Homepage = () => {

  const navigate = useNavigate();

  return (
    <div className="mt-3 flex flex-col w-full">
      {cards.map((card) => (
        <Card key={card.id} className="w-full shadow-md mb-3">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <CardTitle>{card.title}</CardTitle>
                <CardDescription className="mt-1 text-sm text-muted-foreground">
                  {card.description}
                </CardDescription>
              </div>
              <ImageWithSkeleton src={card.img} />
            </div>
          </CardHeader>
          <CardContent>
            <p>Additional content goes here, like stats or previews.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={()=>{
              navigate("/timeline")
            }}>View Details</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Homepage;