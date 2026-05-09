import { supabase } from '../../shared/supabase.js';
import { DailyAvailability } from './availability.schema.js';

export const getTodayAvailabilityHandler = async (userId: string, todayDate: string|undefined): Promise<DailyAvailability | null> => {
  const { data, error } = await supabase
    .from('daily_availability')
    .select('*')
    .eq('user_id', userId)
    .eq('target_date', todayDate)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 is "Row not found", which is fine here
    throw new Error(`Failed to fetch availability: ${error.message}`);
  }

  return (data as DailyAvailability) || null;
};

export const upsertAvailabilityHandler = async (userId: string, targetDate: string, isAvailable: boolean) => {
  // Using upsert so if they change their mind today, it just updates the row
  const { data, error } = await supabase
    .from('daily_availability')
    .upsert(
      { 
        user_id: userId, 
        target_date: targetDate, 
        is_available: isAvailable, 
        responded_at: new Date().toISOString() 
      },
      { onConflict: 'user_id, target_date' } 
    )
    .select();

  if (error) throw new Error(error.message);
  
  if (!data || data.length === 0) {
    throw new Error("Update failed: Supabase RLS blocked the backend.");
  }

  return data[0] as DailyAvailability;
};