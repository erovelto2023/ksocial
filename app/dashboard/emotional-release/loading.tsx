import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function EmotionalReleaseLoading() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-8 space-y-2">
        <Skeleton className="h-10 w-[350px]" />
        <Skeleton className="h-4 w-[450px]" />
      </div>

      <div className="mb-8 space-y-4">
        {/* Search and Filters Skeleton */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Skeleton className="h-10 w-full sm:w-[300px]" />
          <Skeleton className="h-10 w-full sm:max-w-[500px]" />
          <Skeleton className="h-10 w-[100px] sm:ml-auto" />
        </div>

        {/* Exercise Cards Skeleton */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="aspect-video" />
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <Skeleton className="h-6 w-[180px]" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
                <Skeleton className="mt-1 h-4 w-full" />
                <Skeleton className="mt-1 h-4 w-3/4" />
              </CardHeader>
              <CardFooter className="flex items-center justify-between pt-0">
                <Skeleton className="h-6 w-[80px]" />
                <Skeleton className="h-9 w-[80px]" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Information Section Skeleton */}
      <div className="space-y-6">
        <Skeleton className="h-8 w-[250px]" />
        <div className="grid gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-[180px]" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
