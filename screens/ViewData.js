import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, FlatList } from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons/faArrowsRotate";

import { fetchData, deleteData } from "../modules/supabase";
import { globalStyles } from "../modules/globalStyles";

import { TrackedEntry } from "../components/TrackedEntry";

function ViewData() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getTrackingData();
    }, []);

    function getTrackingData() {
        fetchData(setData, "mood_tracking");
    }

    async function deleteTrackingItem(id) {
        await deleteData("mood_tracking", id);
        getTrackingData();
    }

    return (
        <View style={globalStyles.container}>
            <FlatList
                data={data}
                style={globalStyles.flatList}
                renderItem={({ item }) => (
                    <TrackedEntry
                        mood_date={item.created_at}
                        mood_name={item.mood_name}
                        mood_num={item.mood_num}
                        trashFunc={() => deleteTrackingItem(item.id)}
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
