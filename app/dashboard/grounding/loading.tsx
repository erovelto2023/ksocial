import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Alert } from "@/components/ui/alert"

export default function GroundingLoading() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-8 space-y-2">
        <Skeleton className="h-10 w-[350px]" />
        <Skeleton className="h-4 w-[450px]" />
      </div>

      <Alert className="mb-6">
        <Skeleton className="h-4 w-4" />
        <div className="ml-3 space-y-2">
          <Skeleton className="h-5 w-[150px]" />
          <Skeleton className="h-4 w-full" />
        </div>
      </Alert>

      <div className="mb-8 space-y-4">
        {/* Search and Filters Skeleton */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Skeleton className="h-10 w-full sm:w-[300px]" />
          <Skeleton className="h-10 w-full sm:max-w-[500px]" />
        </div>

        {/* Exercise Cards Skeleton */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <Skeleton className="h-6 w-[180px]" />
                    <Skeleton className="h-4 w-[100px]" />
                  </div>
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-3/4" />
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <Skeleton className="h-6 w-[80px]" />
                <Skeleton className="h-9 w-[80px]" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Information Section Skeleton */}
      <div className="space-y-6">
        <Skeleton className="h-8 w-[200px]" />
        <div className="grid gap-6 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-[180px]" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-[1px] w-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-[150px]" />
                    <div className="space-y-2 pl-5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Skeleton key={j} className="h-4 w-[90%]" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
