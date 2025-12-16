"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Card className="group relative flex h-[200px] flex-col justify-between overflow-hidden  border-border bg-white p-5 ">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className="bg-white px-2 py-1 text-xs font-medium text-black shadow-sm ring-1 ring-border"
          >
            <span className="mr-1.5 h-2 w-2 bg-munchies-green"></span>
            Open
          </Badge>
          <Badge
            variant="secondary"
            className=" bg-munchies-off-white px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-border"
          >
            {restaurant.delivery_time_minutes} min
          </Badge>
        </div>
      </div>

      <div className="absolute -right-8 -top-8 h-40 w-40 transition-transform duration-300 group-hover:scale-105">
        <Image
          src={restaurant.image_url}
          alt={restaurant.name}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="flex items-center justify-between">
        <h3 className="max-w-[60%] text-xl font-medium tracking-tight text-gray-900">
          {restaurant.name}
        </h3>
        <Button
          size="icon"
          className="h-10 w-10 shrink-0 rounded-full bg-munchies-green shadow-sm hover:bg-green-700"
        >
          <ArrowRight className="h-5 w-5 text-white" />
        </Button>
      </div>
    </Card>
  );
}
