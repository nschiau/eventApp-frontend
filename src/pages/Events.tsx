import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import EventCard from "@/components/EventCard";
import { api } from "@/lib/api";
import { Event } from "@shared/schema";
import { Film, Music, PartyPopper, Theater, Calendar as CalendarIcon } from "lucide-react";

const categories = [
  { value: "all", label: "All Events", icon: CalendarIcon },
  { value: "theatre", label: "Theatre", icon: Theater },
  { value: "cinema", label: "Cinema", icon: Film },
  { value: "concerts", label: "Concerts", icon: Music },
  { value: "parties", label: "Parties", icon: PartyPopper },
];

interface EventsProps {
  onLogout: () => void;
}

export default function Events({ onLogout }: EventsProps) {
  const [, setLocation] = useLocation();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  console.log('Events component rendered');
  console.log('Events data:', events);
  console.log('Loading state:', isLoading);

  const loadEvents = async () => {
    setIsLoading(true);
    try {
      const data = await api.getEvents({
        category: selectedCategory,
        startDate,
        endDate,
      });
      setEvents(data);
    } catch (error) {
      console.error("Failed to load events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, [selectedCategory, startDate, endDate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card">
      <Header isAuthenticated={true} onLogout={onLogout} />
      
      <main className="container mx-auto px-4 md:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Discover Events</h1>
          <p className="text-muted-foreground text-lg">
            Find cultural experiences that inspire you
          </p>
        </div>

        <div className="mb-8 space-y-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Button
                  key={cat.value}
                  variant={selectedCategory === cat.value ? "default" : "outline"}
                  onClick={() => setSelectedCategory(cat.value)}
                  className="gap-2"
                  data-testid={`button-filter-${cat.value}`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </Button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                data-testid="input-start-date"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                data-testid="input-end-date"
              />
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-96 bg-card rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20">
            <CalendarIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-2xl font-semibold mb-2">No events found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters or create a new event
            </p>
            <Button onClick={() => setLocation("/create")} data-testid="button-create-first">
              Create Event
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onDelete={(id) => {
                  setEvents(events.filter(e => e.id !== id));
                }}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
