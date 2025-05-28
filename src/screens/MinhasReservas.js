import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  TextInput,
  Button,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../axios/axios";
import Layout from "../Components/Layout";

export default function MinhasReservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [reservaSelecionada, setReservaSelecionada] = useState(null);

  const [descricao, setDescricao] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const carregarUserId = async () => {
      try {
        const id = await AsyncStorage.getItem("userId");
        console.log("ID recuperado:", id);
        if (id) {
          setUserId(id);
          buscarReservas(id);
        } else {
          Alert.alert("Erro", "Usuário não identificado.");
        }
      } catch (error) {
        console.log("Erro ao recuperar userId:", error);
      }
    };

    carregarUserId();
  }, []);

  async function buscarReservas(id) {
    try {
      const response = await api.get(`/schedule/${id}`);
      if (response.data && response.data.reservas) {
        setReservas(response.data.reservas);
      } else {
        console.log("Nenhuma reserva encontrada.");
      }
    } catch (error) {
      console.log("Erro ao buscar reservas:", error);
      Alert.alert("Erro", "Não foi possível carregar suas reservas.");
    } finally {
      setLoading(false);
    }
  }

  function abrirModal(reserva) {
    setReservaSelecionada(reserva);
    setDescricao(reserva.descricao);
    setDataInicio(reserva.inicio_periodo);
    setDataFim(reserva.fim_periodo);
    setModalVisible(true);
  }

  async function atualizarReserva() {
    try {
      await api.put(`/schedule/${reservaSelecionada.id_schedule}`, {
        descricao: descricao,
        inicio_periodo: dataInicio,
        fim_periodo: dataFim,
      });

      Alert.alert("Sucesso", "Reserva atualizada!");
      setModalVisible(false);
      buscarReservas(userId);
    } catch (error) {
      console.log("Erro ao atualizar reserva:", error);
      Alert.alert("Erro", "Não foi possível atualizar.");
    }
  }

  async function excluirReserva(id) {
    try {
      await api.delete(`/schedule/${id}`);
      Alert.alert("Sucesso", "Reserva excluída!");
      setModalVisible(false);
      buscarReservas(userId);
    } catch (error) {
      console.log("Erro ao excluir reserva:", error);
      Alert.alert("Erro", "Não foi possível excluir.");
    }
  }

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>Minhas Reservas</Text>

        <View style={styles.headerRow}>
          <Text style={styles.headerText}>Sala</Text>
          <Text style={styles.headerText}>Descrição</Text>
          <Text style={styles.headerText}>Período</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#F77C7C" />
        ) : (
          <FlatList
            data={reservas}
            keyExtractor={(item) => item.id_schedule.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => abrirModal(item)}>
                <View style={styles.row}>
                  <Text style={styles.cell}>{item.sala}</Text>
                  <Text style={styles.cell}>{item.descricao}</Text>
                  <Text style={styles.cell}>
                    {item.inicio_periodo} - {item.fim_periodo}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}

        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Editar Reserva</Text>

              <ScrollView>
                <TextInput
                  style={styles.input}
                  value={descricao}
                  onChangeText={setDescricao}
                  placeholder="Descrição"
                />
                <TextInput
                  style={styles.input}
                  value={dataInicio}
                  onChangeText={setDataInicio}
                  placeholder="Início (YYYY-MM-DD)"
                />
                <TextInput
                  style={styles.input}
                  value={dataFim}
                  onChangeText={setDataFim}
                  placeholder="Fim (YYYY-MM-DD)"
                />

                <Button
                  title="Atualizar"
                  color="#28a745"
                  onPress={atualizarReserva}
                />
                <Button
                  title="Excluir"
                  color="#dc3545"
                  onPress={() => excluirReserva(reservaSelecionada.id_schedule)}
                />
                <Button
                  title="Fechar"
                  color="#fa8072"
                  onPress={() => setModalVisible(false)}
                />
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F77C7C",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#E63946",
    textAlign: "center",
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    width: "90%",
    marginBottom: 10,
  },
  headerText: {
    fontWeight: "bold",
    color: "#fff",
    width: "30%",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#FFECEC",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: "90%",
    justifyContent: "space-between",
  },
  cell: {
    width: "30%",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
});
