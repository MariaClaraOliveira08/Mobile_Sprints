import React from "react";
import Login from "./screens/Login";
import Salas from "./screens/Salas";
import Cadastro from "./screens/Cadastro";
import ReservarSala from "./screens/ReservarSala";
import Home from "./screens/Home";
import Layout from "./Components/Layout";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Layout" component={Layout} />
        <Stack.Screen name="Salas" component={Salas} />
        <Stack.Screen name="Reservar Sala" component={ReservarSala} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
