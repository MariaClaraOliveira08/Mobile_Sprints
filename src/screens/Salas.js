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
  StatusBar,
  ScrollView,
} from "react-native";
import api from "../axios/axios"; // Importa o módulo da API para fazer requisições
import Layout from "../Components/Layout"; // Importa o Layout padrão do projeto

export default function SalasDisponiveis({ navigation }) {
  // Declarando o estado para armazenar salas, controle de loading, e controle de modal
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [salaSelecionada, setSalaSelecionada] = useState(null);
  const [dataDigitada, setDataDigitada] = useState("");
  const [horarios, setHorarios] = useState([]);

  // Efeito colateral para buscar as salas ao carregar o componente
  useEffect(() => {
    buscarSalas();
  }, []);

  // Função para buscar todas as salas
  async function buscarSalas() {
    try {
      const response = await api.getSalas(); // Faz a requisição para buscar as salas
      if (response && response.data && response.data.classrooms) {
        setSalas(response.data.classrooms); // Atualiza o estado com os dados das salas
      } else {
        console.log("Dados de salas não encontrados");
      }
    } catch (error) {
      console.log("Erro ao buscar salas:", error); // Exibe erro caso não consiga buscar as salas
    } finally {
      setLoading(false); // Desativa o loading independentemente do sucesso ou falha da requisição
    }
  }

  // Função para buscar os horários disponíveis para uma sala e data específica
  async function buscarHorariosDisponiveis() {
    if (!dataDigitada || !salaSelecionada) return; // Verifica se a data e a sala foram selecionadas
    try {
      const response = await api.getHorariosDisponiveisPorSalaEData(
        salaSelecionada.number,
        dataDigitada
      );
      if (response && response.data && response.data.time_slots) {
        setHorarios(response.data.time_slots); // Atualiza o estado com os horários disponíveis
      } else {
        console.log("Nenhum horário disponível encontrado");
      }
    } catch (error) {
      console.log("Erro ao buscar horários:", error); // Exibe erro caso não consiga buscar os horários
    }
  }

  // Função para renderizar os horários disponíveis
  function renderHorarios() {
    if (horarios.length === 0) {
      return <Text style={styles.noHorarios}>Nenhum horário disponível</Text>; // Caso não haja horários disponíveis
    }

    // Mapeia os horários e os exibe como itens clicáveis
    return horarios.map((horario, index) => (
      <TouchableOpacity
        key={index}
        style={styles.horarioItem}
        onPress={() => {
          // Navega para a tela de "Reservar Sala" com os parâmetros necessários
          navigation.navigate("Reservar Sala", {
            sala: salaSelecionada.number,
            data: dataDigitada,
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

  return (
    <Layout>
      <StatusBar hidden={false} />
      <View style={styles.container}>
        <Text style={styles.title}>Salas</Text>

        {/* Cabeçalho da tabela de salas */}
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>Número</Text>
          <Text style={styles.headerText}>Descrição</Text>
          <Text style={styles.headerText}>Capacidade</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#F2B7FD" /> // Exibe o indicador de carregamento enquanto as salas são buscadas
        ) : (
          // Exibe a lista de salas quando o carregamento termina
          <FlatList
            data={salas} // Dados das salas
            keyExtractor={(item) => item.number.toString()} // Chave única para cada item
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  // Ao clicar em uma sala, abre o modal para selecionar a data
                  setSalaSelecionada(item);
                  setModalVisible(true);
                  setHorarios([]);
                  setDataDigitada("");
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

        {/* Modal para seleção de data e exibição dos horários disponíveis */}
        <Modal
          visible={modalVisible} // Define se o modal está visível
          transparent={true} // Torna o fundo do modal transparente
          animationType="slide" // Define o tipo de animação ao abrir o modal
          onRequestClose={() => setModalVisible(false)} // Fecha o modal ao pressionar o botão de voltar
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>
                Sala {salaSelecionada?.number}
              </Text>

              {/* Input para digitar a data */}
              <Text>Digite a data (YYYY-MM-DD):</Text>
              <TextInput
                style={styles.input}
                value={dataDigitada}
                onChangeText={setDataDigitada} // Atualiza o estado da data digitada
                placeholder="Ex: 2025-05-06" // Texto de ajuda para o usuário
              />

              {/* Botão para buscar os horários disponíveis */}
              <Button
                title="Ver horários disponíveis"
                color="#fa8075"
                onPress={buscarHorariosDisponiveis}
              />
              <ScrollView>
                <Text style={styles.horariosTitle}>Horários disponíveis:</Text>
                {renderHorarios()} {/* Exibe os horários disponíveis ou a mensagem de nenhum horário */}
              </ScrollView>

              {/* Botão para fechar o modal */}
              <Button title="Fechar" color="#fa8075" onPress={() => setModalVisible(false)} />
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
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#fa8072",
    borderRadius: 6,
    marginTop: 8,
    marginBottom: 10,
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
