import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { createClient } from "@supabase/supabase-js";
// Work around fix: https://github.com/supabase/supabase/issues/8464
import "react-native-url-polyfill/auto";

const supabase = createClient(
    process.env.EXPO_PUBLIC_SUPABASE_URL,
    process.env.EXPO_PUBLIC_SUPABASE_KEY
);

export default function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
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
        <SafeAreaView style={styles.container}>
            <Text>Supabase Data:</Text>
            <FlatList
                data={data}
                style={styles.flatList}
                renderItem={({ item }) => (
                    <FlatListEntry
                        mood_time={item.created_at}
                        mood_name={item.mood_name}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </SafeAreaView>
    );
}

function FlatListEntry({ mood_name, mood_time }) {
    return (
        <View style={styles.flatListEntry}>
            <Text style={styles.moodName}>{mood_name}</Text>
            <Text style={styles.moodTime}>{formatTime(mood_time)}</Text>
        </View>
    );
}

function formatTime(timestamp) {
    time = new Date(timestamp);
    let formattedTime = new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        // year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        // timeZoneName: "short",
    }).format(time);
    return formattedTime;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    flatList: {
        marginHorizontal: 20,
    },
    flatListEntry: {
        flexDirection: "row",
        gap: 10,
        justifyContent: "flex-start",
    },
    moodName: {
        color: "black",
    },
    moodTime: {
        color: "blue",
    },
});
