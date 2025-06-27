import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

const ImageWithSkeleton = ({ src, full = false }: { src: string, full?: boolean }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`${full?"w-full h-48 object-cover rounded-lg":"h-24 w-24"} relative`}>
      {!loaded && <Skeleton className="w-full h-full rounded-md absolute top-0 left-0" />}
      <img
        src={src}
        alt="Thumbnail"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover rounded-md transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};

export default ImageWithSkeleton;