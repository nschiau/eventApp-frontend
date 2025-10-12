import { Badge } from "@/components/ui/badge";
import { Film, Music, PartyPopper, Theater } from "lucide-react";

type Category = "Concerts" | "Theatre" | "Cinema" | "Parties";

interface CategoryBadgeProps {
  category: Category;
}

const categoryConfig = {
  Theatre: {
    label: "Theatre",
    icon: Theater,
    className: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  },
  Cinema: {
    label: "Cinema",
    icon: Film,
    className: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  },
  Concerts: {
    label: "Concerts",
    icon: Music,
    className: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  },
  Parties: {
    label: "Parties",
    icon: PartyPopper,
    className: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  },
};

export default function CategoryBadge({ category }: CategoryBadgeProps) {
  const config = categoryConfig[category as keyof typeof categoryConfig] || {
    label: category,
    icon: Music,
    className: "bg-gray-500/20 text-gray-300 border-gray-500/30",
  };
  const Icon = config.icon;

  return (
    <Badge variant="outline" className={`${config.className} gap-1`} data-testid={`badge-category-${category}`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </Badge>
  );
}
