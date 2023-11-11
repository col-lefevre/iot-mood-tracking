import { createClient } from "@supabase/supabase-js";
// Work around fix: https://github.com/supabase/supabase/issues/8464
import "react-native-url-polyfill/auto";

const supabase = createClient(
    process.env.EXPO_PUBLIC_SUPABASE_URL,
    process.env.EXPO_PUBLIC_SUPABASE_KEY
);

async function fetchData(setData, tableName) {
    const { data, error } = await supabase.from(tableName).select("*");
    if (error) {
        console.error("Error fetching data:", error.message);
    } else {
        let sortedData = data.sort((a, b) => a.id - b.id);
        setData(sortedData);
    }
}

export { supabase, fetchData };
