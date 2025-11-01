import { Event, InsertEvent } from "@shared/schema";

const runtimeApiBase = (typeof window !== 'undefined' && (window as any)._env_?.REACT_APP_API_BASE_URL) as string | undefined;
const mode = (import.meta as any)?.env?.MODE as string | undefined;
const API_BASE_URL = runtimeApiBase || '/api';

// API client for .NET backend
export const api = {
  login: async (username: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Invalid credentials');
      }

      const userData = await response.json();
      
      // Store user data in localStorage for session management
      localStorage.setItem('currentUser', JSON.stringify(userData));
      
      return {
        success: true,
        user: userData,
        isNewUser: userData.isNewUser,
      };
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  register: async (username: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Registration failed');
      }

      const userData = await response.json();
      
      return {
        success: true,
        user: userData,
      };
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },

  logout: async () => {
    // Clear user data from localStorage
    localStorage.removeItem('currentUser');
    return { success: true };
  },

  getCurrentUser: () => {
    try {
      const userStr = localStorage.getItem('currentUser');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  },

  checkUsernameAvailability: async (username: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/check-username/${username}`);
      
      if (!response.ok) {
        throw new Error('Failed to check username availability');
      }

      const result = await response.json();
      return result.available;
    } catch (error) {
      console.error('Failed to check username availability:', error);
      throw error;
    }
  },

  getEvents: async (filters?: { category?: string; startDate?: string; endDate?: string }) => {
    try {
      let url = `${API_BASE_URL}/events`;
      const params = new URLSearchParams();
      
      if (filters?.category && filters.category !== "all") {
        url = `${API_BASE_URL}/events/category/${filters.category}`;
      }
      
      if (filters?.startDate) {
        params.append('startDate', filters.startDate);
      }
      
      if (filters?.endDate) {
        params.append('endDate', filters.endDate);
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const events = await response.json();
      
      // Convert date strings to Date objects
      return events.map((event: any) => ({
        ...event,
        date: new Date(event.date),
      }));
    } catch (error) {
      console.error('Failed to fetch events:', error);
      throw error;
    }
  },

  createEvent: async (event: InsertEvent) => {
    try {
      const response = await fetch(`${API_BASE_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...event,
          date: new Date(event.date).toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newEvent = await response.json();
      
      return {
        ...newEvent,
        date: new Date(newEvent.date),
      };
    } catch (error) {
      console.error('Failed to create event:', error);
      throw error;
    }
  },

  updateEvent: async (id: string, event: Partial<InsertEvent>) => {
    try {
      const updateData = { ...event };
      if (updateData.date) {
        updateData.date = new Date(updateData.date as any).toISOString() as any;
      }

      const response = await fetch(`${API_BASE_URL}/events/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return { success: true };
    } catch (error) {
      console.error('Failed to update event:', error);
      throw error;
    }
  },

  deleteEvent: async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/events/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return { success: true };
    } catch (error) {
      console.error('Failed to delete event:', error);
      throw error;
    }
  },
};

// Keep mockApi for backward compatibility during transition
export const mockApi = api;
