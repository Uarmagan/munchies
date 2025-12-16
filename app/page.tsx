"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { RestaurantsResponse, FiltersResponse } from "@/types";
import { FilterBar } from "@/components/filter-bar";
import { RestaurantGrid } from "@/components/restaurant-grid";
import { SidebarFilters } from "@/components/sidebar-filters";

export default function Home() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const { data: restaurantsData, isLoading: restaurantsLoading } = useQuery({
    queryKey: ["restaurants"],
    queryFn: async () => {
      const res = await fetch("/api/restaurants");
      if (!res.ok) throw new Error("Failed to fetch restaurants");
      return res.json() as Promise<RestaurantsResponse>;
    },
  });

  const { data: filtersData, isLoading: filtersLoading } = useQuery({
    queryKey: ["filters"],
    queryFn: async () => {
      const res = await fetch("/api/filters");
      if (!res.ok) throw new Error("Failed to fetch filters");
      return res.json() as Promise<FiltersResponse>;
    },
  });

  const filteredRestaurants = useMemo(() => {
    if (!restaurantsData?.restaurants) return [];
    if (selectedFilters.length === 0) return restaurantsData.restaurants;

    return restaurantsData.restaurants.filter((restaurant) =>
      selectedFilters.some((filterId) =>
        restaurant.filter_ids.includes(filterId)
      )
    );
  }, [restaurantsData, selectedFilters]);

  const toggleFilter = (filterId: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    );
  };

  return (
    <main className="flex gap-12 pb-16">
      <SidebarFilters
        filters={filtersData?.filters ?? []}
        selectedFilters={selectedFilters}
        onToggle={toggleFilter}
      />

      <div className="min-w-0 flex-1">
        <section className="mb-10">
          <FilterBar
            filters={filtersData?.filters ?? []}
            selectedFilters={selectedFilters}
            onToggle={toggleFilter}
            isLoading={filtersLoading}
          />
        </section>

        <section>
          <h2 className="mb-8 text-3xl font-medium tracking-tight">
            Restaurant&apos;s
          </h2>
          <RestaurantGrid
            restaurants={filteredRestaurants}
            isLoading={restaurantsLoading}
          />
        </section>
      </div>
    </main>
  );
}
