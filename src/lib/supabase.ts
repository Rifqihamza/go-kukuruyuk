import { createClient } from '@supabase/supabase-js';

// IMPORTANT: Ganti dengan credentials Supabase kamu
// Cara dapatkan:
// 1. Buka https://supabase.com
// 2. Login & buat project baru
// 3. Go to Project Settings > API
// 4. Copy URL dari "Project URL" dan anon key dari "anon public"
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
    },
});