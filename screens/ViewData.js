import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";

import { fetchData } from "../modules/supabase";
import { globalStyles } from "../modules/globalStyles";

import { MoodEntry } from "../components/MoodEntry";

export default function ViewData() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getTrackingData();
    }, []);

    function getTrackingData() {
        fetchData(setData, "mood_tracking");
    }

    return (
        <View style={globalStyles.container}>
            <Button onPress={getTrackingData} title={"Refresh Data"} />
            <FlatList
                data={data}
                style={styles.flatList}
                renderItem={({ item }) => (
                    <MoodEntry
                        mood_date={item.created_at}
                        mood_name={item.mood_name}
                        mood_num={item.mood_num}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    flatList: {
        flex: 1,
        paddingHorizontal: 20,
    },
});
