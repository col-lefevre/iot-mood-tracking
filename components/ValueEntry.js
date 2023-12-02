import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
} from "react-native";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons/faFaceSmile";
import { faFaceMeh } from "@fortawesome/free-regular-svg-icons/faFaceMeh";
import { faFaceFrown } from "@fortawesome/free-regular-svg-icons/faFaceFrown";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";

import { globalStyles } from "../modules/globalStyles";

export function ValueEntry({ mood_name, id, updateRow }) {
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
                    style={[
                        styles.textInput,
                        globalStyles.transWhiteBackground,
                    ]}
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
        gap: 7.5,
    },
    entryTitleText: {
        letterSpacing: 1,
        fontSize: 20,
        color: "white",
    },
    subtitle: {
        color: "#DEDEDE",
    },
    customButton: {
        padding: 5,
        flex: 1,
        alignItems: "center",
    },
    textInput: {
        flex: 9,
        textAlignVertical: "center",
        paddingLeft: 10,
        color: "white",
    },
    inputContainer: {
        flexDirection: "row",
        flex: 1,
        marginTop: 10,
    },
});
