// src/supabaseClient.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL; // Accessing the Supabase URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY; // Accessing the anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
