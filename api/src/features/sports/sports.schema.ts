import { z } from 'zod';

export interface Sport {
  id: string;
  name: string;
  min_players: number;
  max_players: number;
}

export interface UserSportPreference {
  id: string;
  user_id: string;
  sport_id: string;
  skill_level: string;
}

export const setPreferenceSchema = z.object({
  sport_id: z.string().uuid("Must be a valid sport UUID"),
  skill_level: z.enum(["Beginner", "Intermediate", "Advanced", "Pro"]),
}).strict();