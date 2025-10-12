import { z } from "zod";

// User types
export interface User {
  id: string;
  username: string;
  password: string;
  createdAt?: Date;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  date: Date;
  location: string;
  imageUrl: string | null;
  createdById: string | null;
  createdAt?: Date;
}

// Validation schemas
export const insertUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const insertEventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  date: z.string().min(1, "Date is required"),
  location: z.string().min(1, "Location is required"),
  imageUrl: z.string().optional(),
});

export const updateEventSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  date: z.string().optional(),
  location: z.string().optional(),
  imageUrl: z.string().optional(),
});

// Inferred types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type UpdateEvent = z.infer<typeof updateEventSchema>;
