import { supabase } from '../../../shared/supabase.js';
export const loginHandler = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error)
        throw new Error(error.message);
    return {
        user: data.user,
        token: data.session?.access_token,
    };
};
//# sourceMappingURL=login.handler.js.map