import { supabase } from '../../../shared/supabase.js';
import { LoginResponse } from './login.schema.js';

export const loginHandler = async (email: string, password: string): Promise<LoginResponse> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return {
    user: data.user,
    token: data.session?.access_token,
  };
};