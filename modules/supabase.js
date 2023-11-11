import { createClient } from "@supabase/supabase-js";
// Work around fix: https://github.com/supabase/supabase/issues/8464
import "react-native-url-polyfill/auto";

const supabase = createClient(
    process.env.EXPO_PUBLIC_SUPABASE_URL,
    process.env.EXPO_PUBLIC_SUPABASE_KEY
);

export { supabase };
