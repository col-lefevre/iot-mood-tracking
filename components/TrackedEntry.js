import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons/faFaceSmile";
import { faFaceMeh } from "@fortawesome/free-regular-svg-icons/faFaceMeh";
import { faFaceFrown } from "@fortawesome/free-regular-svg-icons/faFaceFrown";
import { faClock } from "@fortawesome/free-regular-svg-icons/faClock";
import { faCalendar } from "@fortawesome/free-regular-svg-icons/faCalendar";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";

import { globalStyles } from "../modules/globalStyles";

export function TrackedEntry({ mood_name, mood_num, mood_date, trashFunc }) {
    let icon_name;
    let entry_color;

    if (mood_num == 1) {
        icon_name = faFaceSmile;
        entry_color = globalStyles.greenBackground;
    } else if (mood_num == 2) {
        icon_name = faFaceMeh;
        entry_color = globalStyles.yellowBackground;
    } else if (mood_num == 3) {
        icon_name = faFaceFrown;
        entry_color = globalStyles.redBackground;
    }

    return (
        <View style={[styles.entryContainer, entry_color]}>
            <View style={styles.infoContainer}>
                <IconText
                    text={capitalizeFirstLetter(mood_name)}
                    icon_name={icon_name}
                />
                <IconText text={getTime(mood_date)} icon_name={faClock} />
                <IconText text={getDate(mood_date)} icon_name={faCalendar} />
            </View>
            <TouchableOpacity onPress={trashFunc}>
                <FontAwesomeIcon icon={faTrash} size={17.5} color={"white"} />
            </TouchableOpacity>
        </View>
    );
}

function IconText({ text, icon_name }) {
    return (
        <View style={styles.iconTextContainer}>
            <FontAwesomeIcon icon={icon_name} size={17.5} color={"white"} />
            <Text style={globalStyles.lightGreyColor}>{text}</Text>
        </View>
    );
}

function getTime(timestamp) {
    time = new Date(timestamp);
    let formattedTime = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
    }).format(time);
    return formattedTime;
}

function getDate(timestamp) {
    time = new Date(timestamp);
    let formattedTime = new Intl.DateTimeFormat("en-US", {
        year: "2-digit",
        month: "numeric",
        day: "numeric",
    }).format(time);
    return formattedTime;
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const styles = StyleSheet.create({
    entryContainer: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        opacity: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10,
        borderRadius: 10,
        width: "100%",
    },
    moodName: {
        color: "white",
        letterSpacing: 2,
        fontSize: 24,
    },
    infoContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 12.5,
    },
    iconTextContainer: {
        flexDirection: "row",
        gap: 5,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    moodContainer: {
        flexDirection: "row",
        gap: 7.5,
        alignItems: "center",
        justifyContent: "flex-start",
    },
});
