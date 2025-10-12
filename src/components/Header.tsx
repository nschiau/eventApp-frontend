import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Calendar, LogOut, Plus } from "lucide-react";

interface HeaderProps {
  isAuthenticated: boolean;
  onLogout?: () => void;
}

export default function Header({ isAuthenticated, onLogout }: HeaderProps) {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <a className="flex items-center gap-2 hover-elevate px-3 py-2 rounded-md transition-all" data-testid="link-home">
              <Calendar className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold text-foreground">Events</span>
            </a>
          </Link>

          {isAuthenticated && (
            <nav className="flex items-center gap-2">
              <Link href="/events">
                <a>
                  <Button
                    variant={location === "/events" ? "secondary" : "ghost"}
                    data-testid="link-events"
                  >
                    Events
                  </Button>
                </a>
              </Link>
              
              <Link href="/create">
                <a>
                  <Button
                    variant={location === "/create" ? "secondary" : "ghost"}
                    data-testid="link-create"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Event
                  </Button>
                </a>
              </Link>

              <Button
                variant="ghost"
                onClick={onLogout}
                data-testid="button-logout"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
