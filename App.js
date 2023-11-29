import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import ViewData from "./screens/ViewData";
import ChangeMoods from "./screens/ChangeMoods";
import ViewInfo from "./screens/ViewInfo";

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === "Info") {
                            iconName = focused
                                ? "information-circle"
                                : "information-circle-outline";
                        } else if (route.name === "Tracking") {
                            iconName = focused
                                ? "analytics"
                                : "analytics-outline";
                        } else if (route.name === "Moods") {
                            iconName = focused ? "happy" : "happy-outline";
                        }

                        return (
                            <Ionicons
                                name={iconName}
                                size={size}
                                color={color}
                            />
                        );
                    },
                    tabBarActiveTintColor: "white",
                    tabBarInactiveTintColor: "grey",
                    tabBarStyle: {
                        backgroundColor: "#000000",
                        color: "white",
                        borderTopColor: "#000000",
                        fontSize: 20,
                    },
                })}
            >
                <Tab.Screen
                    name="Info"
                    component={ViewInfo}
                    options={styles.tabScreen}
                />
                <Tab.Screen
                    name="Tracking"
                    component={ViewData}
                    options={styles.tabScreen}
                />
                <Tab.Screen
                    name="Moods"
                    component={ChangeMoods}
                    options={styles.tabScreen}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    tabScreen: {
        headerStyle: {
            backgroundColor: "#000000",
        },
        headerTintColor: "white",
        headerTitleStyle: {
            fontWeight: "bold",
        },
        headerShadowVisible: false,
    },
});
