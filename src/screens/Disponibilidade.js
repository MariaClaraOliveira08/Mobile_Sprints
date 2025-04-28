import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import Layout from "../Components/Layout";
import DispoDetail from "./DispoDetail";

export default function Disponibilidade({ navigation }) {
  const sala = [
    { number: "A1", description: "Laboratório de Química", capacity: 25 },
    { number: "A2", description: "Sala de Aula - Física", capacity: 30 },
    { number: "B1", description: "LAB INFORMÁTICA", capacity: 16 },
    { number: "B2", description: "Sala para reuniões", capacity: 20 },
    { number: "C1", description: "Sala de filmes", capacity: 30 },
    { number: "C2", description: "Laboratório de Biologia", capacity: 32 },
    { number: "D1", description: "Sala de Mecânica", capacity: 30 },
    { number: "D2", description: "Oficina de Soldagem", capacity: 32 },
  ];

  const handleTaskPress = (sala) => {
    navigation.navigate("DispoDetail", { sala });
  };

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>Salas Disponíveis:</Text>
        <FlatList
          data={sala}
          keyExtractor={(item) => item.number.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.itemCard}
              onPress={() => handleTaskPress(item)}
            >
              <Text>{item.number}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </Layout>
  );
}
const styles = StyleSheet.create({
  container:{
alignItems:"center"
  },
  itemCard: {
    padding: 15,
    width:200,
    backgroundColor: "#FF8787",
    marginBottom: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 16,
    color: "#FF3F3F",
    fontFamily: "sans-serif",
    fontWeight: "bold",
    fontSize: 36,
  }
});
