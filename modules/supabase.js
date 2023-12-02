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
        console.log("Data fetched successfully");
    }
}

// Deletes row with specified from specified table
async function deleteData(tableName, id) {
    try {
        const { data, error } = await supabase
            .from(tableName)
            .delete()
            .eq("id", id);

        if (error) {
            console.error("Error deleting: ", error.message);
        } else {
            console.log("Data deleted successfully");
        }
    } catch (error) {
        console.error("Error deleting data:", error.message);
    }
}

// Sets specific mood value in mood_values table
async function updateMoodValue(id, mood_name) {
    let rowData = { id: id, mood_name: capitalizeFirstLetter(mood_name) };
    try {
        const { error } = await supabase
            .from("mood_values")
            .update(rowData)
            .eq("id", rowData.id)
            .single();
        if (error) {
            console.error("Error updating data:", error.message);
        } else {
            console.log("Data updated successfully");
        }
    } catch (error) {
        console.error("Error updating data:", error.message);
    }
}

// Clean user input
function capitalizeFirstLetter(str) {
    if (typeof str !== "string" || str.length === 0) {
        return str;
    }

    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export { supabase, fetchData, deleteData, updateMoodValue };
