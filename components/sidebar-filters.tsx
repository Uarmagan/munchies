"use client";

import { Filter } from "@/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface SidebarFiltersProps {
  filters: Filter[];
  selectedFilters: string[];
  onToggle: (filterId: string) => void;
}

export function SidebarFilters({
  filters,
  selectedFilters,
  onToggle,
}: SidebarFiltersProps) {
  return (
    <aside className="hidden w-[300px] shrink-0 lg:block">
      <div className="flex h-full min-h-[600px] flex-col rounded-lg bg-white p-8 shadow-sm border">
        <h2 className="mb-10 text-3xl font-medium tracking-tight">Filter</h2>

        <div className="mb-12">
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-400">
            Food Categories
          </h3>
          <div className="flex flex-col items-start gap-3">
            {filters.map((filter) => (
              <Badge
                key={filter.id}
                onClick={() => onToggle(filter.id)}
                variant="outline"
                className={cn(
                  "cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-all hover:border-gray-300",
                  selectedFilters.includes(filter.id)
                    ? "border-black bg-white text-black ring-1 ring-black"
                    : "border-border bg-white text-gray-600"
                )}
              >
                {filter.name}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-400">
            Delivery Time
          </h3>
          <div className="flex flex-wrap gap-3">
            {["0-10 min", "10-30 min", "30-60 min", "1 hour+"].map((time) => (
              <Badge
                key={time}
                variant="outline"
                className="cursor-not-allowed rounded-lg border-border bg-white px-4 py-3 text-xs font-medium text-gray-400"
              >
                {time}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-400">
            Price Range
          </h3>
          <div className="flex flex-wrap gap-3">
            {["$", "$$", "$$$", "$$$$"].map((price) => (
              <Badge
                key={price}
                variant="outline"
                className="flex h-12 w-12 cursor-not-allowed items-center justify-center rounded-lg border-border bg-white text-xs font-medium text-gray-400"
              >
                {price}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
