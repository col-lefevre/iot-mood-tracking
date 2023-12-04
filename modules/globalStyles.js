import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: "#252424",
    },
    redBackground: { backgroundColor: "rgb(191, 21, 55)" }, // #BF1537
    yellowBackground: { backgroundColor: "rgb(221, 144, 4)" }, // #DD9004
    greenBackground: { backgroundColor: "rgb(43, 122, 78)" }, //#2B7A4E
    transWhiteBackground: { backgroundColor: "rgba(255, 255, 255, 0.2)" },
    lightGreyColor: { color: "#DEDEDE" },
    flatList: {
        flex: 1,
        paddingHorizontal: 20,
    },
});

export { globalStyles };
