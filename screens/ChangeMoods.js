import { View, FlatList } from "react-native";
import { useEffect, useState } from "react";

import { globalStyles } from "../modules/globalStyles";
import { fetchData, updateMoodValue } from "../modules/supabase";

import { ValueEntry } from "../components/ValueEntry";

export default function ChangeMoods() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getMoodValues();
    }, []);

    function getMoodValues() {
        fetchData(setData, "mood_values");
    }

    async function processMoodUpdate(id, mood_name) {
        await updateMoodValue(id, mood_name);
        getMoodValues();
    }

    return (
        <View style={globalStyles.container}>
            <FlatList
                data={data}
                style={globalStyles.flatList}
                renderItem={({ item }) => (
                    <ValueEntry
                        id={item.id}
                        mood_name={item.mood_name}
                        updateRow={processMoodUpdate}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}
