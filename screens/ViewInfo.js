import { View, Text, StyleSheet } from "react-native";
import { MoodEntry } from "../components/MoodEntry";

import { globalStyles } from "../modules/globalStyles";

export default function ViewInfo() {
    return (
        <View style={globalStyles.container}>
            <Text>Info!</Text>
            <MoodEntry
                mood_name={"Happy"}
                mood_num={1}
                mood_date={new Date()}
            />
            <MoodEntry
                mood_name={"Unsure"}
                mood_num={2}
                mood_date={new Date()}
            />
            <MoodEntry
                mood_name={"Unhappy"}
                mood_num={3}
                mood_date={new Date()}
            />
        </View>
    );
}

const styles = StyleSheet.create({});
