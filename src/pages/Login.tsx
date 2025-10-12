import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await api.login(username, password);
      
      if (result.success) {
        if (result.isNewUser) {
          toast({
            title: "Welcome to Events!",
            description: `New account created for ${result.user.username}. You're now signed up and logged in!`,
          });
        } else {
          toast({
            title: "Welcome back!",
            description: `Successfully logged in as ${result.user.username}`,
          });
        }
        
        onLogin(); // This will check localStorage and set auth state
        setLocation("/events");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Invalid username or password.";
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-card">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold">Events</span>
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Sign In or Sign Up</CardTitle>
          <CardDescription className="text-center">
            Enter your username and password. If you don't have an account, one will be created for you!
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                data-testid="input-username"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                data-testid="input-password"
              />
            </div>
          </CardContent>
          
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
              data-testid="button-login"
            >
              {isLoading ? "Processing..." : "Sign In / Sign Up"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
