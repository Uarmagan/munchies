"use client";

import { Restaurant } from "@/types";
import { RestaurantCard } from "./restaurant-card";
import { Skeleton } from "@/components/ui/skeleton";

interface RestaurantGridProps {
  restaurants: Restaurant[];
  isLoading: boolean;
}

function RestaurantCardSkeleton() {
  return <Skeleton className="h-[200px] rounded-xl" />;
}

export function RestaurantGrid({
  restaurants,
  isLoading,
}: RestaurantGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <RestaurantCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
}
