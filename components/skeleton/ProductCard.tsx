import { Skeleton } from "../ui/skeleton";

interface SkeletongProductCardProps {
  view: string;
}
export const SkeletonProductCard = ({ view }: SkeletongProductCardProps) => {
  const skeletonArray = new Array(6).fill(null);

  if (view === "grid") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skeletonArray.map((_, i) => (
          <div
            key={i}
            className="border rounded-lg p-3 space-y-3 animate-pulse"
          >
            <Skeleton className="w-full h-56 rounded-md" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-28" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {skeletonArray.map((_, i) => (
        <div
          key={i}
          className="border rounded-lg p-4 space-y-4 animate-pulse flex flex-col sm:flex-row"
        >
          <Skeleton className="w-full sm:w-40 h-40 rounded-md" />
          <div className="flex-1 p-4 space-y-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-5 w-5/6" />
            <Skeleton className="h-8 w-1/2" />
            <div className="flex gap-2 mt-2">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-28" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
