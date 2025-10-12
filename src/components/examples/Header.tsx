import Header from '../Header';
import { useState } from 'react';

export default function HeaderExample() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <div className="min-h-screen">
      <Header 
        isAuthenticated={isAuthenticated} 
        onLogout={() => {
          console.log('Logout clicked');
          setIsAuthenticated(false);
        }}
      />
      <div className="p-8">
        <p className="text-muted-foreground">Header component with navigation</p>
        <button 
          onClick={() => setIsAuthenticated(!isAuthenticated)}
          className="mt-4 text-primary underline"
        >
          Toggle auth state
        </button>
      </div>
    </div>
  );
}
