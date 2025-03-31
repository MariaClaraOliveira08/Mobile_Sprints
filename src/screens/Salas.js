import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import api from "../axios/axios"; // Certifique-se de que o caminho está correto

function ListSalas() {
  const [salas, setSalas] = useState([]);

  async function getSalas() {
    try {
      const response = await api.getSalas();
      console.log(response.data.classrooms);
      setSalas(response.data.classrooms);
    } catch (error) {
      Alert.alert("Erro", "Erro ao buscar salas");
    }
  }

  useEffect(() => {
    getSalas();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Salas de Aula</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Número</Text>
        <Text style={styles.headerCell}>Descrição</Text>
        <Text style={styles.headerCell}>Capacidade</Text>
      </View>
      <ScrollView>
        {salas.map((sala, index) => {
          // Adicionando a alternância de cor de fundo para as linhas
          const backgroundColor = index % 2 === 0 ? "#FFD9D9" : "#FFFFFF"; // Rosa claro para linhas pares
          return (
            <View key={sala.id_sala} style={[styles.row, { backgroundColor }]}>
              <Text style={styles.cell}>{sala.number}</Text>
              <Text style={styles.cell}>{sala.description}</Text>
              <Text style={styles.cell}>{sala.capacity}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFCCCB",
  },
  title: {
    textAlign: "center",
    marginBottom: 16,
    color: "#B22222",
    fontFamily: "sans-serif",
    fontWeight: "bold",
    fontSize: 36,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#ff6347",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  headerCell: {
    flex: 1,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  row: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ListSalas;