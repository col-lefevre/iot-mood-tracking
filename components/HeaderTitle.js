import { View, Text, StyleSheet } from "react-native";
import { globalStyles } from "../modules/globalStyles";

export default function HeaderTitle({ title, subtitle }) {
    return (
        <View>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={[styles.subtitleText, globalStyles.lightGreyColor]}>
                {subtitle}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    titleText: {
        color: "white",
        fontSize: 20,
        letterSpacing: 1,
        fontWeight: "bold",
        marginBottom: 5,
    },
    subtitleText: {
        fontSize: 15,
    },
});
