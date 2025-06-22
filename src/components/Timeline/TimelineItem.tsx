import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Button } from "../ui/button";

interface TimelineItemProps {
  date: string;
  title: string;
  subtitle: string;
  side: "left" | "right";
  status?: string;
  events?: string[];
}

const TimelineItem = ({
  date,
  title,
  subtitle,
  side,
  status,
  events,
}: TimelineItemProps) => {
  const isLeft = side === "left";

  return (
    <div className="relative w-full flex justify-between items-start">
      {/* LEFT CONTENT */}
      <div className={`w-1/2 ${isLeft ? "flex justify-end pr-6" : "invisible"}`}>
        <Card className="w-full max-w-md">
          <CardContent className="p-4">
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-sm text-gray-700">{subtitle}</p>
            {status && (
              <div className="flex items-center text-green-600 mt-2">
                <CheckCircle className="h-4 w-4 mr-1" /> {status}
              </div>
            )}
            {(events || [])?.length > 0 && (
              <ul className="mt-3 list-disc ml-5 space-y-1 text-sm text-gray-600">
                {(events || []).map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      {/* CENTER DOT + DATE (on opposite side of content) */}
      <div className="absolute flex left-1/2 transform -translate-x-1/2 z-10 text-center">
        <div className="bg-black rounded-full h-8 w-8 mx-auto border-4 border-white" />
        <div className={`absolute ${isLeft ? "left-full pl-2" : "right-full pr-2"}`}>
          <Button variant="outline" size="lg">
            {date}
          </Button>
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className={`w-1/2 ${!isLeft ? "flex justify-start pl-6" : "invisible"}`}>
        <Card className="w-full max-w-md">
          <CardContent className="p-4">
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-sm text-gray-700">{subtitle}</p>
            {status && (
              <div className="flex items-center text-green-600 mt-2">
                <CheckCircle className="h-4 w-4 mr-1" /> {status}
              </div>
            )}
            {(events || [])?.length > 0 && (
              <ul className="mt-3 list-disc ml-5 space-y-1 text-sm text-gray-600">
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
