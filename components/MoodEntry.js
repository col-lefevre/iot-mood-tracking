import { Text, StyleSheet, View } from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons/faFaceSmile";
import { faFaceMeh } from "@fortawesome/free-regular-svg-icons/faFaceMeh";
import { faFaceFrown } from "@fortawesome/free-regular-svg-icons/faFaceFrown";
import { faClock } from "@fortawesome/free-regular-svg-icons/faClock";
import { faCalendar } from "@fortawesome/free-regular-svg-icons/faCalendar";

import { globalStyles } from "../modules/globalStyles";

export function MoodEntry({ mood_name, mood_num, mood_date }) {
    let icon_name;
    let entry_color;
    let entry_valence;

    if (mood_num == 1) {
        icon_name = faFaceSmile;
        entry_color = globalStyles.greenBackground;
        entry_valence = "Positive";
    } else if (mood_num == 2) {
        icon_name = faFaceMeh;
        entry_color = globalStyles.yellowBackground;
        entry_valence = "Neutral";
    } else if (mood_num == 3) {
        icon_name = faFaceFrown;
        entry_color = globalStyles.redBackground;
        entry_valence = "Negative";
    }

    return (
        <View style={[styles.entryContainer, entry_color]}>
            <Text style={styles.moodName}>
                {capitalizeFirstLetter(mood_name)}
            </Text>
            <View style={styles.infoContainer}>
                <IconText text={entry_valence} icon_name={icon_name} />
                <IconText text={getTime(mood_date)} icon_name={faClock} />
                <IconText text={getDate(mood_date)} icon_name={faCalendar} />
            </View>
        </View>
    );
}

function IconText({ text, icon_name }) {
    return (
        <View style={styles.iconTextContainer}>
            <FontAwesomeIcon icon={icon_name} size={17.5} color={"white"} />
            <Text style={styles.itText}>{text}</Text>
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
        paddingVertical: 20,
        paddingHorizontal: 25,
        opacity: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        marginVertical: 10,
        borderRadius: 10,
        gap: 5,
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
    itText: {
        color: "#eaeaea",
    },
});
