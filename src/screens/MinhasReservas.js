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
import api from "../axios/axios"; 
import Layout from "../Components/Layout"; 

export default function MinhasReservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [reservaSelecionada, setReservaSelecionada] = useState(null);

  const [descricao, setDescricao] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [horaFim, setHoraFim] = useState("");

  // Buscar reservas ao carregar a tela
  useEffect(() => {
    buscarReservas();
  }, []);

  // Função para buscar as reservas do usuário
  async function buscarReservas() {
    try {
      const response = await api.getMinhasReservas();
      if (response && response.data && response.data.schedule) {
        setReservas(response.data.schedule);
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

  // Abrir o modal para editar reserva
  function abrirModal(reserva) {
    setReservaSelecionada(reserva);
    setDescricao(reserva.description);
    setDataInicio(reserva.start_date);
    setHoraInicio(reserva.start_time);
    setDataFim(reserva.end_date);
    setHoraFim(reserva.end_time);
    setModalVisible(true);
  }

  // Função para atualizar uma reserva
  async function atualizarReserva() {
    try {
      await api.atualizarReserva(reservaSelecionada.id, {
        description: descricao,
        start_date: dataInicio,
        start_time: horaInicio,
        end_date: dataFim,
        end_time: horaFim,
      });

      Alert.alert("Sucesso", "Reserva atualizada!");
      setModalVisible(false);
      buscarReservas();
    } catch (error) {
      console.log("Erro ao atualizar reserva:", error);
      Alert.alert("Erro", "Não foi possível atualizar.");
    }
  }

  // Função para excluir uma reserva
  async function excluirReserva(id) {
    try {
      await api.deletarReserva(id);
      Alert.alert("Sucesso", "Reserva excluída!");
      buscarReservas();
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
          <Text style={styles.headerText}>Data</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#F77C7C" />
        ) : (
          <FlatList
            data={reservas}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => abrirModal(item)}>
                <View style={styles.row}>
                  <Text style={styles.cell}>{item.classroom}</Text>
                  <Text style={styles.cell}>{item.description}</Text>
                  <Text style={styles.cell}>
                    {item.start_date} {item.start_time}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}

        {/* Modal para editar ou excluir */}
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
                  placeholder="Data de início (YYYY-MM-DD)"
                />
                <TextInput
                  style={styles.input}
                  value={horaInicio}
                  onChangeText={setHoraInicio}
                  placeholder="Hora de início (HH:MM)"
                />
                <TextInput
                  style={styles.input}
                  value={dataFim}
                  onChangeText={setDataFim}
                  placeholder="Data de fim (YYYY-MM-DD)"
                />
                <TextInput
                  style={styles.input}
                  value={horaFim}
                  onChangeText={setHoraFim}
                  placeholder="Hora de fim (HH:MM)"
                />

                <Button
                  title="Atualizar"
                  color="#28a745"
                  onPress={atualizarReserva}
                />
                <Button
                  title="Excluir"
                  color="#dc3545"
                  onPress={() => excluirReserva(reservaSelecionada.id)}
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
  card: {
    backgroundColor: "#FFECEC",
    borderRadius: 12,
    padding: 20,
    width: "85%",
    elevation: 5, // para sombra no Android
    shadowColor: "#000", // para sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#E63946",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#FFECEC",
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  updateButton: {
    backgroundColor: "#E63946",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#E63946",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
