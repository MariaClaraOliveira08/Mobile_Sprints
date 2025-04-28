// Importa as bibliotecas necessárias
import React from "react";
import Login from "./screens/Login";
import Salas from "./screens/Salas";
import Cadastro from "./screens/Cadastro";
import Home from "./screens/Home";
import Reserva from "./screens/Reserva";
import Disponibilidade from "./screens/Disponibilidade";
import DispoDetail from "./screens/DispoDetail";
import Layout from "./Components/Layout";
import { NavigationContainer } from "@react-navigation/native"; // Container para gerenciar a navegação
import { createStackNavigator } from "@react-navigation/stack"; // Cria uma navegação baseada em pilha (Stack Navigation)

// Cria um navegador baseado em pilha
const Stack = createStackNavigator();

export default function App() {
  return (
    // Envolve toda a aplicação no NavigationContainer para habilitar a navegação
    <NavigationContainer>
      {/* Define as telas dentro da navegação Stack */}
      <Stack.Navigator>
        {/* Tela inicial do aplicativo - Tela de Login */}
        <Stack.Screen name="Login" component={Login} />

        {/* Tela de Cadastro - Para novos usuários se registrarem */}
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Layout" component={Layout} />
        <Stack.Screen name="Reserva" component={Reserva} />
        <Stack.Screen name="Disponibilidade" component={Disponibilidade} />
        <Stack.Screen name="DispoDetail" component={DispoDetail} />
        {/* Tela de Salas - Redirecionado após o login bem-sucedido */}
        <Stack.Screen name="Salas" component={Salas} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
