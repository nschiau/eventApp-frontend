import { Event } from "@shared/schema";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import CategoryBadge from "./CategoryBadge";
import { Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Card
      className="overflow-hidden hover-elevate transition-all duration-200 group"
      data-testid={`card-event-${event.id}`}
    >
      {event.imageUrl && (
        <div className="relative aspect-video overflow-hidden">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
            data-testid={`img-event-${event.id}`}
          />
        </div>
      )}
      
      <CardHeader className="space-y-0 pb-2">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-xl font-semibold text-foreground line-clamp-2" data-testid={`text-title-${event.id}`}>
            {event.title}
          </h3>
        </div>
        <CategoryBadge category={event.category as any} />
      </CardHeader>
      
      <CardContent className="space-y-3">
        <p className="text-muted-foreground text-sm line-clamp-2" data-testid={`text-description-${event.id}`}>
          {event.description}
        </p>
        
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span data-testid={`text-date-${event.id}`}>
              {format(new Date(event.date), "PPP 'at' p")}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span data-testid={`text-location-${event.id}`}>{event.location}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
