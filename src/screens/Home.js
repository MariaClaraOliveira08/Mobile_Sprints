import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Layout from "../Components/Layout";
import { StatusBar } from "react-native";

function Home({ navigation }) {
  return (
    <Layout>
      <StatusBar hidden={false} />
      <View style={styles.container}>
        {/* Botões no topo */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Salas")}
          >
            <Text style={styles.buttonText}>Salas</Text>
          </TouchableOpacity>

        </View>


        {/* Título e subtítulo logo abaixo dos botões */}
        <Text style={styles.title}>BEM-VINDO AO SITE!</Text>
        <View style={styles.line1}></View>
        <Text style={styles.subtitle}>SENAI FRANCA–SP</Text>
        <View style={styles.line2}></View>

        {/* Linha abaixo do título e subtítulo */}
        
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    alignItems: "flex-start", // alinha à esquerda
  },
  buttonRow: {
    flexDirection: "row",
    alignSelf: "center", // botões ainda centralizados
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
    textAlign: "left", // garante alinhamento do texto
  },
  subtitle: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#fff",
    textAlign: "left",
  },
  // Estilo da linha abaixo do subtítulo
  line1: {
    width: "49%",
    height: 2,
    backgroundColor: "#fff", // cor da linha
  },
  line2: {
    width: "30%",
    height: 1,
    backgroundColor: "#fff", // cor da linha
    marginTop: 1, // espaço acima da linha
  },
});

export default Home;
