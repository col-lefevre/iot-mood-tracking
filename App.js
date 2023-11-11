import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import ViewData from "./screens/ViewData";
import ChangeMoods from "./screens/ChangeMoods";

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator
            initialRouteName="ViewData"
            screenOptions={{
                headerShown: true,
                headerBackVisible: false,
                headerLeft: null,
            }}
        >
            <Stack.Screen name="ViewData" component={ViewData} />
            <Stack.Screen name="ChangeMoods" component={ChangeMoods} />
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}
