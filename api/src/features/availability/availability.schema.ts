import { z } from 'zod';

export interface DailyAvailability {
  id: string;
  user_id: string;
  target_date: string;
  is_available: boolean;
  responded_at: string;
}

export const setAvailabilitySchema = z.object({
  target_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Must be YYYY-MM-DD format"),
  is_available: z.boolean(),
}).strict();