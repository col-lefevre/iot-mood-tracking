import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, FlatList } from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons/faArrowsRotate";

import { fetchData } from "../modules/supabase";
import { globalStyles } from "../modules/globalStyles";

import { MoodEntry } from "../components/MoodEntry";

function ViewData({ navigation }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={getTrackingData}
                    style={{ padding: 7.5 }}
                >
                    <FontAwesomeIcon
                        icon={faArrowsRotate}
                        color={"white"}
                        size={18}
                        style={{ marginRight: 7.5 }}
                    />
                </TouchableOpacity>
            ),
        });
        getTrackingData();
    }, []);

    function getTrackingData() {
        fetchData(setData, "mood_tracking");
    }

    return (
        <View style={globalStyles.container}>
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

export default ViewData;
