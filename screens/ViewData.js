import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";

import { fetchData } from "../modules/supabase";
import { globalStyles } from "../modules/globalStyles";

export default function ViewData() {
    const [data, setData] = useState([]);
    // const [reload, setReload] = useState(false); // dummy var to trigger useEffect

    useEffect(() => {
        getTrackingData();
    }, []);

    function getTrackingData() {
        fetchData(setData, "mood_tracking");
    }

    return (
        <View style={globalStyles.container}>
            <Button onPress={getTrackingData} title={"Refresh Data"} />
            <Text>Supabase Data:</Text>
            <FlatList
                data={data}
                style={globalStyles.flatList}
                renderItem={({ item }) => (
                    <FlatListEntry
                        mood_time={item.created_at}
                        mood_name={item.mood_name}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
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
