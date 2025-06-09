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
  Alert,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import sheets from "../axios/axios";
import Layout from "../Components/Layout";

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
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    async function carregarUserId() {
      try {
        const id = await SecureStore.getItemAsync("userId");
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
      } else {
        setReservas([]);
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
    setModalVisible(true);
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
            ListEmptyComponent={
              <Text style={styles.emptyMessage}>
                Nenhuma reserva cadastrada
              </Text>
            }
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
              <Text style={styles.modalTitle}>Detalhes da Reserva</Text>

              <Text style={{ marginBottom: 20 }}>
                Sala: {reservaSelecionada?.sala}
                {"\n"}
                Descrição: {reservaSelecionada?.descricao}
                {"\n"}
                Período:{"\n"}
                {reservaSelecionada
                  ? `${formatarData(
                      reservaSelecionada.inicio_periodo
                    )} até ${formatarData(reservaSelecionada.fim_periodo)}`
                  : ""}
              </Text>

              <Button
                title="Excluir"
                color="#dc3545"
                onPress={() =>
                  Alert.alert(
                    "Confirmar exclusão",
                    "Tem certeza que deseja excluir esta reserva?",
                    [
                      { text: "Cancelar", style: "cancel" },
                      {
                        text: "Excluir",
                        style: "destructive",
                        onPress: () =>
                          excluirReserva(reservaSelecionada.id_schedule),
                      },
                    ]
                  )
                }
              />
              <Button
                title="Fechar"
                color="#fa8072"
                onPress={() => setModalVisible(false)}
              />
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
  emptyMessage: {
    color: "#fff"
  }
});
