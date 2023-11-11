import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";

import { supabase } from "../modules/supabase";
import { globalStyles } from "../modules/globalStyles";

export default function ViewData({ navigation }) {
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
        <View style={globalStyles.container}>
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
            <Button
                onPress={() => navigation.navigate("ChangeMoods")}
                title={"Change Moods"}
            />
        </View>
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
    flatList: {
        marginHorizontal: 20,
        flexGrow: 0,
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
