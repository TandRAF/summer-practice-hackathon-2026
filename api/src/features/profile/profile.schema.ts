import { z } from 'zod';

export interface UserProfile {
  id: string;
  username: string;
  full_name?: string;
  location?: string;
  timezone?: string;
  biography?: string;
  avatar_url?: string;
  updated_at: string;
}

export const updateProfileSchema = z.object({
  username: z.string().min(3).max(20).optional(),
  full_name: z.string().max(100).optional(),
  location: z.string().max(100).optional(),
  timezone: z.string().max(50).optional(),
  biography: z.string().max(500).optional(),
}).strict(); // Enforce strict parsing so only these fields pass through

export const updateAvatarSchema = z.object({
  avatar_url: z.string().url({ message: "Must be a valid URL" }),
});