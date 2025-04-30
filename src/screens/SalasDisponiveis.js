import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import api from "../axios/axios";
import Layout from "../Components/Layout";
import { StatusBar } from "react-native";


export default function SalasDisponiveis() {
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    buscarSalasDisponiveis();
  }, []);

  async function buscarSalasDisponiveis() {
    try {
      const response = await api.getSalasSemReservas();
      setSalas(response.data.classrooms);
    } catch (error) {
      console.log("Erro ao buscar salas disponíveis:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <StatusBar hidden={false} />
      <View style={styles.container}>
        <Text style={styles.title}>Disponibilidade</Text>

        {/* Cabeçalho da "tabela" */}
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>Número</Text>
          <Text style={styles.headerText}>Descrição</Text>
          <Text style={styles.headerText}>Capacidade</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#F2B7FD" />
        ) : (
          <FlatList
            data={salas}
            keyExtractor={(item) => item.number.toString()}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={styles.cell}>{item.number}</Text>
                <Text style={styles.cell}>{item.description || "-"}</Text>
                <Text style={styles.cell}>{item.capacity || "-"}</Text>
              </View>
            )}
          />
        )}
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#d93030",
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ff5e3a",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  headerText: {
    flex: 1,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#f8c7c7",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  cell: {
    flex: 1,
    textAlign: "center",
    fontWeight: "500",
  },
});
