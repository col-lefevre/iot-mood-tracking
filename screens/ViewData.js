import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons/faFaceSmile";
import { faFaceMeh } from "@fortawesome/free-solid-svg-icons/faFaceMeh";
import { faFaceFrown } from "@fortawesome/free-solid-svg-icons/faFaceFrown";

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
                style={styles.flatList}
                renderItem={({ item }) => (
                    <FlatListEntry
                        mood_time={item.created_at}
                        mood_name={item.mood_name}
                        mood_num={item.mood_num}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}

function FlatListEntry({ mood_name, mood_time, mood_num }) {
    let emojiName;
    let emojiColor;

    if (mood_num == 1) {
        emojiName = faFaceSmile;
        emojiColor = "green";
    } else if (mood_num == 2) {
        emojiName = faFaceMeh;
        emojiColor = "blue";
    } else if (mood_num == 3) {
        emojiName = faFaceFrown;
        emojiColor = "red";
    }

    return (
        <View style={styles.flatListEntry}>
            <FontAwesomeIcon icon={emojiName} size={24} color={emojiColor} />
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
        flex: 1,
        marginHorizontal: 5,
    },
    flatListEntry: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between",
    },
    moodName: {
        color: "black",
        fontSize: 20,
    },
    moodTime: {
        color: "blue",
        fontSize: 15,
    },
});
