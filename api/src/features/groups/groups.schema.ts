import { z } from 'zod';

export const updateMemberStatusSchema = z.object({
  status: z.enum(['Confirmed', 'Declined']),
}).strict();