import EventCard from '../EventCard';
import theatreImg from "@assets/stock_images/theatre_stage_perfor_37da1add.jpg";

export default function EventCardExample() {
  const mockEvent = {
    id: "1",
    title: "Hamlet - Shakespeare's Masterpiece",
    description: "Experience the timeless tragedy of revenge and madness in this stunning modern adaptation.",
    category: "theatre",
    date: new Date("2025-10-15T19:30:00"),
    location: "Royal Theatre",
    imageUrl: theatreImg,
    createdById: "user1",
  };

  return (
    <div className="p-8 max-w-sm">
      <EventCard event={mockEvent} />
    </div>
  );
}
