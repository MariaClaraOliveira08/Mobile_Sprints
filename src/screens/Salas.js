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
  StatusBar,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import api from "../axios/axios";
import Layout from "../Components/Layout";

export default function SalasDisponiveis({ navigation }) {
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [salaSelecionada, setSalaSelecionada] = useState(null);
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [mostrarDatePicker, setMostrarDatePicker] = useState(false);
  const [horarios, setHorarios] = useState([]);

  useEffect(() => {
    buscarSalas();
  }, []);

  async function buscarSalas() {
    try {
      const response = await api.getSalas();
      if (response && response.data && response.data.classrooms) {
        setSalas(response.data.classrooms);
      } else {
        console.log("Dados de salas não encontrados");
      }
    } catch (error) {
      console.log("Erro ao buscar salas:", error);
    } finally {
      setLoading(false);
    }
  }

  async function buscarHorariosDisponiveis() {
    if (!dataSelecionada || !salaSelecionada) return;

    const dataFormatada = dataSelecionada.toISOString().split("T")[0]; // Formata para "YYYY-MM-DD"

    try {
      const response = await api.getHorariosDisponiveisPorSalaEData(
        salaSelecionada.number,
        dataFormatada
      );
      if (response && response.data && response.data.time_slots) {
        setHorarios(response.data.time_slots);
      } else {
        console.log("Nenhum horário disponível encontrado");
      }
    } catch (error) {
      console.log("Erro ao buscar horários:", error);
    }
  }

  function renderHorarios() {
    if (horarios.length === 0) {
      return <Text style={styles.noHorarios}>Nenhum horário disponível</Text>;
    }

    return horarios.map((horario, index) => (
      <TouchableOpacity
        key={index}
        style={styles.horarioItem}
        onPress={() => {
          navigation.navigate("Reservar Sala", {
            sala: salaSelecionada.number,
            data: dataSelecionada.toISOString().split("T")[0],
            horaInicio: horario.start_time,
            horaFim: horario.end_time,
          });
        }}
      >
        <Text style={styles.horarioText}>
          {horario.start_time} - {horario.end_time}
        </Text>
      </TouchableOpacity>
    ));
  }

  // Função para formatar a data em dd/mm/yyyy
  function formatarData(date) {
    const dia = date.getDate().toString().padStart(2, "0");
    const mes = (date.getMonth() + 1).toString().padStart(2, "0");
    const ano = date.getFullYear();
    return `${ano}/${mes}/${dia}`;
  }

  return (
    <Layout>
      <StatusBar hidden={false} />
      <View style={styles.container}>
        <Text style={styles.title}>Salas</Text>

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
              <TouchableOpacity
                onPress={() => {
                  setSalaSelecionada(item);
                  setModalVisible(true);
                  setHorarios([]);
                  setDataSelecionada(new Date()); // Define a data atual como padrão
                }}
              >
                <View style={styles.row}>
                  <Text style={styles.cell}>{item.number}</Text>
                  <Text style={styles.cell}>{item.description}</Text>
                  <Text style={styles.cell}>{item.capacity}</Text>
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
              <Text style={styles.modalTitle}>
                Sala {salaSelecionada?.number}
              </Text>

              <Text>Selecione a data:</Text>

              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setMostrarDatePicker(true)}
              >
                <Text style={styles.dateButtonText}>
                  {formatarData(dataSelecionada)}
                </Text>
              </TouchableOpacity>

              {mostrarDatePicker && (
                <DateTimePicker
                  value={dataSelecionada}
                  mode="date"
                  onChange={(event, selectedDate) => {
                    setMostrarDatePicker(false);
                    if (selectedDate) {
                      setDataSelecionada(selectedDate);
                    }
                  }}
                />
              )}

              <Button
                title="Ver horários disponíveis"
                color="#fa8075"
                onPress={buscarHorariosDisponiveis}
              />

              <ScrollView>
                <Text style={styles.horariosTitle}>Horários disponíveis:</Text>
                {renderHorarios()}
              </ScrollView>

              <Button
                title="Fechar"
                color="#fa8075"
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "85%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dateButton: {
    padding: 10,
    backgroundColor: "#f8c7c7",
    borderRadius: 6,
    marginTop: 8,
    marginBottom: 10,
  },
  dateButtonText: {
    color: "#333",
    textAlign: "center",
  },
  horariosTitle: {
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  horarioItem: {
    padding: 10,
    backgroundColor: "#Fa8174",
    borderRadius: 5,
    marginVertical: 5,
  },
  horarioText: {
    fontSize: 15,
    color: "#fff",
    textAlign: "center",
  },
  noHorarios: {
    color: "gray",
    fontStyle: "italic",
  },
});
