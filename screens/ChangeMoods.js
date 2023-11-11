import { View, Text, Button, FlatList, TextInput } from "react-native";
import { useEffect, useState } from "react";

import { globalStyles } from "../modules/globalStyles";
import { supabase } from "../modules/supabase";

export default function ChangeMoods({ navigation }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const { data, error } = await supabase.from("mood_values").select("*");
        if (error) {
            console.error("Error fetching data:", error.message);
        } else {
            let sortedData = data.sort((a, b) => a.mood_num - b.mood_num);
            setData(sortedData);
        }
    }

    async function updateRow(moodNum, moodName) {
        let rowData = { mood_num: moodNum, mood_name: moodName };
        try {
            const { error } = await supabase
                .from("mood_values")
                .update(rowData)
                .eq("mood_num", rowData.mood_num)
                .single();
            if (error) {
                console.error("Error updating data:", error.message);
            } else {
                console.log("Data updated successfully");
                fetchData();
                console.log(`${moodNum} | ${moodName}`);
            }
        } catch (error) {
            console.error("Error updating data:", error.message);
        }
    }

    return (
        <View style={globalStyles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <FlatListEntry
                        mood_num={item.mood_num}
                        mood_name={item.mood_name}
                        updateRow={updateRow}
                    />
                )}
                keyExtractor={(item) => item.mood_num.toString()}
            />
            <Button
                onPress={() => navigation.navigate("ViewData")}
                title={"View Data"}
            />
        </View>
    );
}

function FlatListEntry({ mood_name, mood_num, updateRow }) {
    const [text, setText] = useState("");

    return (
        <View>
            <Text>{mood_name}</Text>
            <TextInput
                placeholder={`Input replacement for ${mood_name}`}
                onChangeText={(textInput) => setText(textInput)}
                maxLength={20}
            />
            <Text>{`${text.length} / 20`}</Text>
            <Button
                onPress={() => updateRow(mood_num, text)}
                title={"Submit"}
            />
        </View>
    );
}
