import { createClient } from "@supabase/supabase-js";

// Configura Supabase con las credenciales de tu proyecto
const SUPABASE_URL = "https://vabcucinthxdtiekpgqw.supabase.co";
const SUPABASE_KEY = import.meta.env.VITE_START_SUPABASE_ANON_KEY!;

const supa = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supa;
