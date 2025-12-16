"use client";

import Image from "next/image";
import { useRef, useState, useCallback } from "react";
import { Filter } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  filters: Filter[];
  selectedFilters: string[];
  onToggle: (filterId: string) => void;
  isLoading: boolean;
}

function FilterChip({
  filter,
  isSelected,
  onToggle,
}: {
  filter: Filter;
  isSelected: boolean;
  onToggle: (filterId: string) => void;
}) {
  return (
    <button
      onClick={() => onToggle(filter.id)}
      className={cn(
        "group relative flex h-20 min-w-[160px] cursor-pointer items-start justify-between rounded-lg border bg-white p-3 text-left shadow-sm transition-all hover:shadow-md",
        isSelected ? "border-black ring-1 ring-black" : "border-border"
      )}
    >
      <span className="z-10 text-sm font-medium text-gray-900">
        {filter.name}
      </span>
      <div className="absolute -bottom-2 -right-2 h-16 w-16 transition-transform group-hover:scale-110">
        <Image
          src={filter.image_url}
          alt={filter.name}
          fill
          className="object-contain"
        />
      </div>
    </button>
  );
}

function FilterChipSkeleton() {
  return <Skeleton className="h-20 w-[160px] rounded-xl" />;
}

export function FilterBar({
  filters,
  selectedFilters,
  onToggle,
  isLoading,
}: FilterBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftGradient, setShowLeftGradient] = useState(false);
  const [showRightGradient, setShowRightGradient] = useState(true);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const isAtStart = el.scrollLeft <= 0;
    const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;

    setShowLeftGradient(!isAtStart);
    setShowRightGradient(!isAtEnd);
  }, []);

  if (isLoading) {
    return (
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto py-1 pb-4 scrollbar-hide">
          {Array.from({ length: 6 }).map((_, i) => (
            <FilterChipSkeleton key={i} />
          ))}
        </div>
        <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-background to-transparent lg:hidden" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto py-1 pb-4 scrollbar-hide"
      >
        {filters.map((filter) => (
          <FilterChip
            key={filter.id}
            filter={filter}
            isSelected={selectedFilters.includes(filter.id)}
            onToggle={onToggle}
          />
        ))}
      </div>
      {showLeftGradient && (
        <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-background to-transparent lg:hidden" />
      )}
      {showRightGradient && (
        <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-background to-transparent lg:hidden" />
      )}
    </div>
  );
}
