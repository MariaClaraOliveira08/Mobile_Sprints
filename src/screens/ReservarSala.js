// Importações necessárias do React e React Native
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import sheets from "../axios/axios";
import Layout from "../Components/Layout";

export default function CriarReserva({ navigation }) {
  // Estados para armazenar os dados do formulário
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFim, setHoraFim] = useState("");
  const [sala, setSala] = useState("");
  const [loading, setLoading] = useState(false);

  // Função que será chamada ao clicar no botão de "Reservar"
  const handleReserva = async () => {
    // Verifica se todos os campos estão preenchidos
    if (!descricao || !data || !horaInicio || !horaFim || !sala) {
      Alert.alert("Erro", "Por favor, preencha todos os campos!");
      return;
    }

    // Monta o objeto com os dados da reserva
    const dadosReserva = {
      fk_id_usuario: 1, // Substitua pelo ID real do usuário logado
      descricao,
      inicio_periodo: `${data} ${horaInicio}`, // Formata o início
      fim_periodo: `${data} ${horaFim}`, // Formata o fim
      fk_number: sala,
    };

    // Tenta enviar os dados para a API
    try {
      setLoading(true); // Ativa o estado de carregamento
      const response = await sheets.postReserva(dadosReserva); // Chamada à API

      // Alerta de sucesso e volta para a tela anterior
      Alert.alert("Sucesso", response.data.message);
      navigation.goBack();
    } catch (error) {
      // Loga e exibe erro caso falhe
      console.log("Erro ao reservar sala:", error);
      Alert.alert("Erro", "Não foi possível realizar a reserva.");
    } finally {
      setLoading(false); // Desativa o carregamento
    }
  };

  // Função para limpar os campos do formulário
  const handleCancelar = () => {
    setDescricao("");
    setData("");
    setHoraInicio("");
    setHoraFim("");
    setSala("");
  };

  // JSX da interface do usuário
  return (
    <Layout>
      <View style={styles.container}>
        <StatusBar hidden={false} /> {/* Exibe a barra de status */}
        <Text style={styles.title}>Reserva</Text>
        <View style={styles.card}>
          {" "}
          {/* Card com os campos devidos */}
          <Text style={styles.label}>Descrição:</Text>
          {/* O que vai estar encima do input */}
          <TextInput
            style={styles.input}
            value={descricao}
            onChangeText={setDescricao}
            placeholder="Digite a descrição"
          />
          <Text style={styles.label}>Data (AAAA-MM-DD):</Text>
          <TextInput
            style={styles.input}
            value={data}
            onChangeText={setData}
            placeholder="Exemplo: 2025-05-06"
          />
          {/* Campos para horário de início e término */}
          <View style={styles.row}>
            <TextInput
              style={styles.inputSmall}
              value={horaInicio}
              onChangeText={setHoraInicio}
              placeholder="Início: HH:MM"
            />
            <TextInput
              style={styles.inputSmall}
              value={horaFim}
              onChangeText={setHoraFim}
              placeholder="Término: HH:MM"
            />
          </View>
          <Text style={styles.label}>Número da Sala:</Text>
          <TextInput
            style={styles.input}
            value={sala}
            onChangeText={setSala}
            placeholder="Ex: 101"
          />
          {/* Botão para confirmar a reserva */}
          <TouchableOpacity
            style={styles.reservarBtn}
            onPress={handleReserva}
            disabled={loading}
          >
            <Text style={styles.btnText}>
              {loading ? "Reservando..." : "RESERVAR"}
            </Text>
          </TouchableOpacity>
          {/* Botão para cancelar/limpar o formulário */}
          <TouchableOpacity style={styles.cancelarBot} onPress={handleCancelar}>
            <Text style={styles.cancelarText}>CANCELAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
}

// Estilos da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#d93030",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fbb",
    width: "100%",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    width: "100%",
    backgroundColor: "#eee",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  inputSmall: {
    flex: 1,
    backgroundColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  reservarBtn: {
    backgroundColor: "#e53935",
    padding: 12,
    borderRadius: 20,
    width: "60%",
    alignItems: "center",
    marginBottom: 10,
  },
  cancelarBot: {
    backgroundColor: "#ddd",
    padding: 12,
    borderRadius: 20,
    width: "60%",
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelarText: {
    color: "#555",
    fontWeight: "bold",
  },
});
