import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    TextInput,
    StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons/faFaceSmile";
import { faFaceMeh } from "@fortawesome/free-regular-svg-icons/faFaceMeh";
import { faFaceFrown } from "@fortawesome/free-regular-svg-icons/faFaceFrown";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";

import { globalStyles } from "../modules/globalStyles";
import { fetchData, supabase } from "../modules/supabase";

export default function ChangeMoods() {
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
                style={styles.flatList}
                renderItem={({ item }) => (
                    <FlatListEntry
                        id={item.id}
                        mood_name={item.mood_name}
                        updateRow={updateRow}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}

function FlatListEntry({ mood_name, id, updateRow }) {
    const [text, setText] = useState("");

    let subtitleText;
    let titleIcon;
    let entryColor;

    if (id == 1) {
        subtitleText = "Positive";
        titleIcon = faFaceSmile;
        entryColor = globalStyles.greenBackground;
    } else if (id == 2) {
        subtitleText = "Neutral";
        titleIcon = faFaceMeh;
        entryColor = globalStyles.yellowBackground;
    } else if (id == 3) {
        subtitleText = "Negative";
        titleIcon = faFaceFrown;
        entryColor = globalStyles.redBackground;
    }

    return (
        <View style={[styles.flatListEntry, entryColor]}>
            <View style={styles.entryTitleContainer}>
                <FontAwesomeIcon icon={titleIcon} color="white" size={20} />
                <Text style={styles.entryTitleText}>
                    {capitalizeFirstLetter(mood_name)}
                </Text>
            </View>
            <Text style={styles.subtitle}>{subtitleText} Mood</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder={`Enter replacement for "${mood_name}"`}
                    onChangeText={(textInput) => setText(textInput)}
                    style={styles.textInput}
                    // maxLength={20}
                />
                <TouchableOpacity
                    style={styles.customButton}
                    onPress={() => updateRow(id, text)}
                >
                    <FontAwesomeIcon icon={faCheck} size={20} color={"white"} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const styles = StyleSheet.create({
    flatList: {
        flex: 1,
        paddingHorizontal: 20,
    },
    flatListEntry: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginVertical: 10,
        borderRadius: 10,
    },
    entryTitleContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 10,
    },
    entryTitleText: {
        letterSpacing: 1,
        fontSize: 20,
        color: "white",
    },
    subtitle: {
        color: "white",
        fontStyle: "italic",
    },
    customButton: {
        padding: 5,
        flex: 1,
        alignItems: "center",
    },
    textInput: {
        opacity: 0.3,
        flex: 9,
        backgroundColor: "white",
        textAlignVertical: "center",
        paddingLeft: 10,
    },
    inputContainer: {
        flexDirection: "row",
        flex: 1,
        marginTop: 10,
    },
});
