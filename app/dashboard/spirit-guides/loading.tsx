import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function SpiritGuidesLoading() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-8 space-y-2">
        <Skeleton className="h-10 w-[300px]" />
        <Skeleton className="h-4 w-[450px]" />
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_250px]">
        <div className="space-y-6">
          {/* Search and Filters Skeleton */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Skeleton className="h-10 w-full sm:w-[300px]" />
            <div className="flex flex-1 gap-4">
              <Skeleton className="h-10 w-full sm:max-w-[400px]" />
              <Skeleton className="h-10 w-full sm:max-w-[300px]" />
            </div>
          </div>

          {/* Exercise Cards Skeleton */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
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
                  <Skeleton className="h-6 w-[100px]" />
                  <Skeleton className="h-9 w-[80px]" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-[150px]" />
              <Skeleton className="h-4 w-[200px]" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <Skeleton className="h-4 w-[120px]" />
                  <Skeleton className="h-4 w-[50px]" />
                </div>
                <Skeleton className="h-2 w-full" />
              </div>
              <Skeleton className="h-[1px] w-full" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-[150px]" />
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Skeleton className="h-2 w-2 rounded-full" />
                    <Skeleton className="h-4 w-[180px]" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-[180px]" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-[150px]" />
                <div className="space-y-2 pl-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-4 w-[120px]" />
                  ))}
                </div>
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
