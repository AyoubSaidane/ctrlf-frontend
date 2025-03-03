"use client"
import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Image from "next/image"

interface Expert {
  name: string;
  email: string;
  image: string;
  documents: string[];
}

interface ExpertsCarouselProps {
  experts: Expert[];
}

export function ExpertsCarousel({ experts }: ExpertsCarouselProps) {
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">Expert Resources</h2>
      <Carousel 
        opts={{ 
          align: "start",
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className="overflow-x-auto cursor-grab pb-4">
          {experts.map((expert, index) => (
            <CarouselItem 
              key={index} 
              className="md:basis-1/3 lg:basis-1/4"
            >
              <div className={cn(
                "border rounded-lg overflow-hidden",
                index === 0 ? "ml-0 mr-4" : "mx-2"
              )}>
                <div className="aspect-square relative">
                  <Image
                    src={expert.image}
                    alt={expert.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{expert.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Expert Resource
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
