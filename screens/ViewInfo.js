import { View, Text, StyleSheet } from "react-native";

import { globalStyles } from "../modules/globalStyles";

export default function ViewInfo() {
    return (
        <View style={globalStyles.container}>
            <Text>Info!</Text>
        </View>
    );
}

const styles = StyleSheet.create({});
