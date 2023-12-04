import { StyleSheet, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { faChartSimple } from "@fortawesome/free-solid-svg-icons/faChartSimple";
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons/faFaceSmile";

import ViewData from "./screens/ViewData";
import ChangeMoods from "./screens/ChangeMoods";
import HeaderTitle from "./components/HeaderTitle";

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName;

                        if (route.name === "Tracking") {
                            iconName = faChartSimple;
                        } else if (route.name === "Moods") {
                            iconName = faFaceSmile;
                        }

                        return (
                            <FontAwesomeIcon
                                icon={iconName}
                                size={size}
                                color={color}
                            />
                        );
                    },
                    tabBarActiveTintColor: "white",
                    tabBarInactiveTintColor: "grey",
                    tabBarStyle: {
                        backgroundColor: "black",
                        borderTopColor: "black",
                        borderTopWidth: 0,
                        fontSize: 20,
                        // ...Platform.select({
                        //     android: {
                        //         height: 55,
                        //     },
                        //     ios: {
                        //         height: 70,
                        //     },
                        // }),
                        // height: 60,
                        // paddingVertical: 7,
                    },
                    tabBarLabelStyle: {
                        fontSize: 13,
                        letterSpacing: 0.5,
                    },
                })}
            >
                <Tab.Screen
                    name="Tracking"
                    component={ViewData}
                    options={{
                        headerStyle: styles.headerStyle,
                        headerTitle: () => (
                            <HeaderTitle
                                title={"Tracking"}
                                subtitle={"View the moods you've tracked."}
                            />
                        ),
                        headerTitleAlign: "left",
                    }}
                />
                <Tab.Screen
                    name="Moods"
                    component={ChangeMoods}
                    options={{
                        headerStyle: styles.headerStyle,
                        headerTitle: () => (
                            <HeaderTitle
                                title={"Moods"}
                                subtitle={
                                    "Change the moods recorded by the buttons."
                                }
                            />
                        ),
                        headerTitleAlign: "left",
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: "#000000",
        height: 120,
        elevation: 0, // This removes the shadow on Android
        shadowOpacity: 0, // This removes the shadow on iOS
    },
});
