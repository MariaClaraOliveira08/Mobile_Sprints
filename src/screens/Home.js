import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Layout from "../Components/Layout";
import { StatusBar } from "react-native";
import api from "../axios/axios";
import * as SecureStore from "expo-secure-store";
import { useFocusEffect } from "@react-navigation/native";

function Home({ navigation }) {
  const [totalReservas, setTotalReservas] = useState(0); // constante que armazena o estado

  async function carregarTotalReservas() {
    try {
      const userId = await SecureStore.getItemAsync("userId");  //recupera o userId armazenado
      if (userId) {
        const response = await api.totalReservas(userId); //requisição para a api para obter o total de reservas do usuário
        setTotalReservas(response.data.total_reservas); //atualiza o estado com o total de reservas retornado pela api
      }
    } catch (error) {
      console.error("Erro ao buscar total de reservas:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarTotalReservas(); //chama a função para carregar o total de reservas
    }, [])
  );

  return (
    <Layout>
      <StatusBar hidden={false} />
      <View style={styles.container}>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Salas")}
          >
            <Text style={styles.buttonText}>Salas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("MinhasReservas")}
          >
            <Text style={styles.buttonText}>Reservas: {totalReservas}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>BEM-VINDO AO SITE!</Text>
        <View style={styles.line1}></View>
        <Text style={styles.subtitle}>SENAI FRANCA–SP</Text>
        <View style={styles.line2}></View>

        <Image
          source={require("../../assets/escola.jpg")}
          style={styles.imagem}
        />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 600,
    height: 400,
    boxShadow: "0px 4px 10px rgba(0,0,0,0.4)",
  },
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    alignItems: "flex-start",
  },
  buttonRow: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 20,
    gap: 12,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#fff",
    marginBottom: 4,
    textAlign: "left",
  },
  subtitle: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#fff",
    textAlign: "left",
  },
  line1: {
    width: "49%",
    height: 2,
    backgroundColor: "#fff",
  },
  line2: {
    width: "30%",
    height: 1,
    backgroundColor: "#fff",
    marginTop: 1,
  },
});

export default Home;
