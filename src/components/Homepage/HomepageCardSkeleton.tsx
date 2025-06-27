import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const HomepageCardSkeleton = () => (
  <Card className="w-full shadow-md mb-3">
    <CardHeader>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <Skeleton className="h-24 w-24 rounded-md" />
      </div>
    </CardHeader>
    <CardContent>
      <Skeleton className="h-4 w-1/3" />
    </CardContent>
    <CardFooter>
      <Skeleton className="h-10 w-32 rounded-md" />
    </CardFooter>
  </Card>
);

export default HomepageCardSkeleton;