import React from "react";
import Login from "./screens/Login";
import Salas from "./screens/Salas";
import Cadastro from "./screens/Cadastro";
import Home from "./screens/Home";
import SalasDisponiveis from "./screens/SalasDisponiveis";
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
        <Stack.Screen name="SalasDisponiveis" component={SalasDisponiveis}/>
        <Stack.Screen name="Salas" component={Salas} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
