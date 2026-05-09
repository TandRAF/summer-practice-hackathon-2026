import { supabase } from '../../shared/supabase.js';
import { UserProfile } from './profile.schema.js';

export const getProfileHandler = async (userId: string): Promise<UserProfile> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    throw new Error(`Profile not found: ${error.message}`);
  }

  return data as UserProfile;
};

export const updateProfileHandler = async (userId: string, updates: Partial<UserProfile>) => {
  const { data, error } = await supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select(); // 1. REMOVED .single()

  if (error) throw new Error(error.message);

  // 2. Manually check if it updated 0 rows
  if (!data || data.length === 0) {
    throw new Error("Update failed: Either the profile doesn't exist, or Supabase RLS blocked the backend.");
  }

  // 3. Return the first item safely
  return data[0]; 
};

export const updateAvatarHandler = async (userId: string, avatarUrl: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .update({ 
      avatar_url: avatarUrl, 
      updated_at: new Date().toISOString() 
    })
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update avatar: ${error.message}`);
  }
  
  return data;
};