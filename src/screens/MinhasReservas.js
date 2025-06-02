import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  Button,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import sheets from "../axios/axios";
import Layout from "../Components/Layout";
import DateTimePicker from "../Components/DateTimePicker";

function formatarData(dataString) {
  const data = new Date(dataString);
  const dia = data.toLocaleDateString("pt-BR");
  const hora = data.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${dia} - ${hora}`;
}

export default function MinhasReservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [reservaSelecionada, setReservaSelecionada] = useState(null);

  const [descricao, setDescricao] = useState("");
  const [dataInicio, setDataInicio] = useState(null);
  const [dataFim, setDataFim] = useState(null);

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    async function carregarUserId() {
      try {
        const id = await SecureStore.getItemAsync("userId");
        console.log("ID recuperado:", id);
        if (id) {
          setUserId(id);
          buscarReservas(id);
        } else {
          Alert.alert("Erro", "Usuário não identificado.");
          setLoading(false);
        }
      } catch (error) {
        console.log("Erro ao recuperar userId:", error);
        setLoading(false);
      }
    }

    carregarUserId();
  }, []);

  async function buscarReservas(id) {
    try {
      const response = await sheets.getMinhasReservas(id);
      if (response.data && response.data.reservas) {
        setReservas(response.data.reservas);
        console.log(response.data.reservas);
      } else {
        setReservas([]);
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
    setDataInicio(new Date(reserva.inicio_periodo));
    setDataFim(new Date(reserva.fim_periodo));
    setModalVisible(true);
  }

  async function atualizarReserva() {
    if (!descricao || !dataInicio || !dataFim) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    try {
      await sheets.atualizarReserva(reservaSelecionada.id_schedule, {
        id_schedule: reservaSelecionada.id_schedule,
        descricao: descricao,
        inicio_periodo: dataInicio.toISOString(),
        fim_periodo: dataFim.toISOString(),
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
      await sheets.deletarReserva(id);
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
                    {formatarData(item.inicio_periodo)}
                    {"\n"}até{"\n"}
                    {formatarData(item.fim_periodo)}
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
                <Text style={styles.label}>Descrição:</Text>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => {}}
                  activeOpacity={1}
                >
                  <TextInput
                    style={{ padding: 0 }}
                    value={descricao}
                    onChangeText={setDescricao}
                    placeholder="Descrição"
                  />
                </TouchableOpacity>

                <Text style={styles.label}>Data e Hora de Início:</Text>
                <DateTimePicker
                  type="datetime"
                  buttonTitle={
                    dataInicio instanceof Date
                      ? dataInicio.toLocaleString("pt-BR")
                      : "Selecionar início"
                  }
                  setValue={setDataInicio}
                />

                <Text style={styles.label}>Data e Hora de Término:</Text>
                <DateTimePicker
                  type="datetime"
                  buttonTitle={
                    dataFim instanceof Date
                      ? dataFim.toLocaleString("pt-BR")
                      : "Selecionar término"
                  }
                  setValue={setDataFim}
                />

                <Button
                  title="Atualizar"
                  color="#fa8072"
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
    width: "85%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
});
