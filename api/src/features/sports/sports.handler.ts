import { supabase } from '../../shared/supabase.js';
import { Sport, UserSportPreference } from './sports.schema.js';

export const getAllSportsHandler = async (): Promise<Sport[]> => {
  const { data, error } = await supabase.from('sports').select('*');
  if (error) throw new Error(error.message);
  return data as Sport[];
};

export const getUserPreferencesHandler = async (userId: string): Promise<UserSportPreference[]> => {
  const { data, error } = await supabase
    .from('user_sport_preferences')
    .select('*, sports(name)') // Join with sports table to get the name
    .eq('user_id', userId);

  if (error) throw new Error(error.message);
  return data as UserSportPreference[];
};

export const upsertPreferenceHandler = async (userId: string, sportId: string, skillLevel: string) => {
  const { data, error } = await supabase
    .from('user_sport_preferences')
    .upsert(
      { user_id: userId, sport_id: sportId, skill_level: skillLevel },
      { onConflict: 'user_id, sport_id' }
    )
    .select();

  if (error) throw new Error(error.message);
  return data[0] as UserSportPreference;
};