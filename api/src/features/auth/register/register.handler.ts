import { supabase } from '../../../shared/supabase.js';
import { RegisterResponse } from './register.schema.js';

export const registerHandler = async (email: string, password: string, username: string): Promise<RegisterResponse> => {

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username }
    }
  });

  if (authError) throw authError;
  if (!authData.user) throw new Error("User creation failed");

  return {
    user: authData.user,
    message: 'Registration successful! Profile created via database trigger.',
  };
};