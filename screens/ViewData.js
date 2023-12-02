import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, FlatList } from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons/faArrowsRotate";

import { fetchData, deleteData } from "../modules/supabase";
import { globalStyles } from "../modules/globalStyles";

import { TrackedEntry } from "../components/TrackedEntry";

function ViewData({ navigation }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        getTrackingData();
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={styles.refreshIcon}
                    onPress={getTrackingData}
                >
                    <FontAwesomeIcon
                        icon={faArrowsRotate}
                        size={20}
                        color={"white"}
                    />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

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
    },
    refreshIcon: {
        padding: 5,
        marginRight: 20,
        flex: 1,
        justifyContent: "center",
    },
});

export default ViewData;
