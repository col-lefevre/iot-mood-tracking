import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
    process.env.EXPO_PUBLIC_SUPABASE_URL,
    process.env.EXPO_PUBLIC_SUPABASE_KEY
);

export default function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            // Fetch data from a 'your_table_name' table
            const { data, error } = await supabase
                .from("mood_tracking")
                .select("*");

            if (error) {
                console.error("Error fetching data:", error.message);
            } else {
                setData(data);
            }
        }

        fetchData();
    }, []);

    return (
        <View>
            <Text>Data from Supabase:</Text>
            {data.map((item) => (
                <Text key={item.id}>{item.column_name}</Text>
            ))}
        </View>
    );
}
