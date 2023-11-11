import { View, Text, Button, FlatList, TextInput } from "react-native";
import { useEffect, useState } from "react";

import { globalStyles } from "../modules/globalStyles";
import { fetchData, supabase } from "../modules/supabase";

export default function ChangeMoods({ navigation }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData(setData, "mood_values");
    }, []);

    async function updateRow(id, mood_name) {
        let rowData = { id: id, mood_name: mood_name };
        try {
            const { error } = await supabase
                .from("mood_values")
                .update(rowData)
                .eq("id", rowData.id)
                .single();
            if (error) {
                console.error("Error updating data:", error.message);
            } else {
                console.log("Data updated successfully");
                fetchData(setData, "mood_values");
            }
        } catch (error) {
            console.error("Error updating data:", error.message);
        }
    }

    return (
        <View style={globalStyles.container}>
            <FlatList
                data={data}
                style={globalStyles.flatList}
                renderItem={({ item }) => (
                    <FlatListEntry
                        id={item.id}
                        mood_name={item.mood_name}
                        updateRow={updateRow}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
            />
            <Button
                onPress={() => navigation.navigate("ViewData")}
                title={"View Data"}
            />
        </View>
    );
}

function FlatListEntry({ mood_name, id, updateRow }) {
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
            <Button onPress={() => updateRow(id, text)} title={"Submit"} />
        </View>
    );
}
