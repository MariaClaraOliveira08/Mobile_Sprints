import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import api from "../axios/axios"; // Verifique se esse caminho está certo
import Layout from "../Components/Layout";
import { StatusBar } from "react-native";


function ListSalas() {
  const [salas, setSalas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [salaSelecionada, setSalaSelecionada] = useState(null);
  const [descricao, setDescricao] = useState("");
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");

  async function getSalas() {
    try {
      const response = await api.getSalas();
      setSalas(response.data.classrooms);
    } catch (error) {
      Alert.alert("Erro", "Erro ao buscar salas");
    }
  }

  useEffect(() => {
    getSalas();
  }, []);

  const abrirModalReserva = (sala) => {
    setSalaSelecionada(sala);
    setModalVisible(true);
  };

  const reservarSala = async () => {
    if (!salaSelecionada || !descricao || !inicio || !fim) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch('http://10.89.240.64:5000/api/reservas/v1/schedule', {

          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fk_id_usuario: 1, // Substitua pelo ID do usuário logado
            descricao: descricao,
            inicio_periodo: inicio,
            fim_periodo: fim,
            fk_number: salaSelecionada.number,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Reserva feita com sucesso!");
        setDescricao("");
        setInicio("");
        setFim("");
        setModalVisible(false);
      } else {
        console.error("Erro da API:", data);
        alert("Erro ao fazer a reserva: " + (data.error || "Tente novamente."));
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Não foi possível conectar ao servidor.");
    }
  };

  return (
    <Layout>
      <StatusBar hidden={false} />
      <View style={styles.container}>
        <Text style={styles.title}>Salas de Aula</Text>

        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>Número</Text>
          <Text style={styles.headerCell}>Descrição</Text>
          <Text style={styles.headerCell}>Capacidade</Text>
        </View>

        <ScrollView>
          {salas.map((sala, index) => {
            const backgroundColor = index % 2 === 0 ? "#FFD9D9" : "#FFFFFF";
            return (
              <TouchableOpacity
                key={sala.number}
                onPress={() => abrirModalReserva(sala)}
              >
                <View style={[styles.row, { backgroundColor }]}>
                  <Text style={styles.cell}>{sala.number}</Text>
                  <Text style={styles.cell}>{sala.description}</Text>
                  <Text style={styles.cell}>{sala.capacity}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Modal para Reservar Sala */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <Layout>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <Text style={styles.title}>
                Reservar Sala {salaSelecionada?.number}
              </Text>

              <View style={styles.card}>
                <Text style={styles.label}>Descrição</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Reunião de projeto"
                  value={descricao}
                  onChangeText={setDescricao}
                />

                <Text style={styles.label}>Início (AAAA-MM-DD HH:MM:SS)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="2025-04-28 14:00:00"
                  value={inicio}
                  onChangeText={setInicio}
                />

                <Text style={styles.label}>Fim (AAAA-MM-DD HH:MM:SS)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="2025-04-28 16:00:00"
                  value={fim}
                  onChangeText={setFim}
                />

                <TouchableOpacity
                  style={styles.buttonReservar}
                  onPress={reservarSala}
                >
                  <Text style={styles.buttonText}>Reservar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonFechar}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Layout>
        </Modal>
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
    textAlign: "center",
    marginBottom: 16,
    color: "#FF3F3F",
    fontWeight: "bold",
    fontSize: 30,
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
  modalContent: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    position: "absolute",   // Adiciona posição absoluta
    top: 0,                 // Alinha ao topo da tela
    left: 0,                // Alinha à esquerda da tela
    right: 0,               // Alinha à direita da tela
    bottom: 0,              // Alinha ao fundo da tela
  },
  
  fecharText: {
    color: "#007bff",
    fontSize: 16,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#FFC2C2",
    padding: 20,
    borderRadius: 16,
    width: "100%",
    maxWidth: 400,
    alignItems: "stretch",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#E4E4E4",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  buttonReservar: {
    backgroundColor: "#F44336",
    padding: 15,
    borderRadius: 30,
    marginTop: 10,
  },
  buttonFechar: {
    backgroundColor: "#B0B0B0",
    padding: 15,
    borderRadius: 30,
    marginTop: 10,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});

export default ListSalas;
