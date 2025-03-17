import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from "react-native";
import api from '../axios/axios'; // Certifique-se de que o caminho está correto

 function Salas ({ navigation }) {
  const [salas, setSalas] = useState([]);

  useEffect(() => {
    fetchSalas();
  }, []);

  const fetchSalas = async () => {
    try {
      const response = await api.get("/classroom/"); // Ajuste o endpoint conforme necessário
      setSalas(response.data); // Supondo que a resposta seja um array de salas
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', error.response?.data?.error || "Erro ao buscar salas");
    }
  };

  const renderSala = ({ item }) => (
    <TouchableOpacity style={styles.salaItem} onPress={() => navigation.navigate("DetalhesSala", { salaId: item.id })}>
      <Text style={styles.salaText}>{item.nome}</Text> {/* Supondo que cada sala tenha um campo 'nome' */}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Salas de Aula</Text>
      <FlatList
        data={salas}
        renderItem={renderSala}
        keyExtractor={(item) => item.id.toString()} // Supondo que cada sala tenha um campo 'id'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#8b0b1e',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#cbbcc0',
  },
  salaItem: {
    backgroundColor: '#e3dbdd',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    width: '100%',
  },
  salaText: {
    fontSize: 18,
    color: '#333',
  },
});
export default Salas;