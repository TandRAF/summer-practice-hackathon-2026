import { z } from 'zod';

export const createEventSchema = z.object({
  group_id: z.string().uuid(),
  venue_id: z.string().uuid(),
  title: z.string().min(3).max(100),
  event_time: z.string().datetime(), // ISO 8601 string
}).strict();