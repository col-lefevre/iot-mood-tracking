import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import ViewData from "./screens/ViewData";
import ChangeMoods from "./screens/ChangeMoods";
import ViewInfo from "./screens/ViewInfo";

// const Stack = createStackNavigator();

// function MyStack() {
//     return (
//         <Stack.Navigator
//             initialRouteName="ViewData"
//             screenOptions={{
//                 headerShown: true,
//                 headerBackVisible: false,
//                 headerLeft: null,
//             }}
//         >
//             <Stack.Screen name="ViewData" component={ViewData} />
//             <Stack.Screen name="ChangeMoods" component={ChangeMoods} />
//         </Stack.Navigator>
//     );
// }

// export default function App() {
//     return (
//         <NavigationContainer>
//             <MyStack />
//         </NavigationContainer>
//     );
// }

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
                    tabBarActiveTintColor: "blue",
                    tabBarInactiveTintColor: "gray",
                })}
            >
                <Tab.Screen name="Info" component={ViewInfo} />
                <Tab.Screen name="Tracking" component={ViewData} />
                <Tab.Screen name="Moods" component={ChangeMoods} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
