import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client-side Supabase instance. Used for reading claims, parcels, and
// scheme-match data on the Atlas, Dashboard, and DSS pages.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
