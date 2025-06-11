import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import sheets from "../axios/axios";
import Layout from "../Components/Layout";
import DateTimePicker from "../Components/DateTimePicker";

export default function CriarReserva({ navigation, route }) {
  const { salaId, salaDescricao } = route.params || {};

  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState(null);
  const [horaInicio, setHoraInicio] = useState(null);
  const [horaFim, setHoraFim] = useState(null);
  const [sala, setSala] = useState(salaId ? salaId.toString() : "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (salaId) {
      setSala(salaId.toString());
    }
  }, [salaId]);

  const handleReserva = async () => {
    if (!descricao || !data || !horaInicio || !horaFim || !sala) {
      Alert.alert("Erro", "Por favor, preencha todos os campos!");
      return;
    }

    try {
      const userId = await SecureStore.getItemAsync("userId");
      if (!userId) {
        Alert.alert("Erro", "Usuário não identificado.");
        return;
      }

      const dataFormatada = data.toISOString().split("T")[0];

      const horaInicioStr = horaInicio
        .toTimeString()
        .split(":")
        .slice(0, 2)
        .join(":");

      const horaFimStr = horaFim
        .toTimeString()
        .split(":")
        .slice(0, 2)
        .join(":");

      const inicio_periodo = new Date(`${dataFormatada}T${horaInicioStr}:00`);
      const fim_periodo = new Date(`${dataFormatada}T${horaFimStr}:00`);

      if (isNaN(inicio_periodo.getTime()) || isNaN(fim_periodo.getTime())) {
        Alert.alert("Erro", "Horário inválido.");
        return;
      }

      const dadosReserva = {
        fk_id_usuario: userId,
        descricao,
        inicio_periodo: inicio_periodo.toISOString(),
        fim_periodo: fim_periodo.toISOString(),
        fk_number: sala,
      };

      setLoading(true);
      const response = await sheets.postReserva(dadosReserva);
      Alert.alert("Sucesso", response.data.message);
      navigation.navigate("MinhasReservas");
    } catch (error) {
      console.log("Erro ao reservar sala:", error);
      Alert.alert("Erro", "Não foi possível realizar a reserva.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = () => {
    setDescricao("");
    setData(null);
    setHoraInicio(null);
    setHoraFim(null);
    if (!salaId) setSala("");
  };

  return (
    <Layout>
      <View style={styles.container}>
        <StatusBar hidden={false} />
        <Text style={styles.title}>Reserva da Sala</Text>
        <View style={styles.card}>
          <Text style={styles.label}>Sala:</Text>
          <Text style={styles.salaInfo}>
            {sala} {salaDescricao ? `- ${salaDescricao}` : ""}
          </Text>

          <Text style={styles.label}>Descrição da Reserva:</Text>
          <TextInput
            style={styles.input}
            value={descricao}
            onChangeText={setDescricao}
            placeholder="Digite a descrição"
          />

          <Text style={styles.label}>Data da Reserva:</Text>
          <DateTimePicker
            type={"date"}
            buttonTitle={
              !data || !(data instanceof Date)
                ? "Selecione a data"
                : data.toLocaleDateString("pt-BR")
            }
            setValue={setData}
            dateKey={"data"}
          />

          <Text style={styles.label}>Horário de Início:</Text>
          <DateTimePicker
            type={"time"}
            buttonTitle={
              !horaInicio || !(horaInicio instanceof Date)
                ? "Selecione o horário de início"
                : horaInicio.toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
            }
            setValue={setHoraInicio}
          />

          <Text style={styles.label}>Horário de Término:</Text>
          <DateTimePicker
            type={"time"}
            buttonTitle={
              !horaFim || !(horaFim instanceof Date)
                ? "Selecione o horário de término"
                : horaFim.toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
            }
            setValue={setHoraFim}
          />

          <View style={{ height: 15 }} />

          <TouchableOpacity
            style={styles.reservarBtn}
            onPress={handleReserva}
            disabled={loading}
          >
            <Text style={styles.btnText}>
              {loading ? "Reservando..." : "RESERVAR"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelarBot} onPress={handleCancelar}>
            <Text style={styles.cancelarText}>CANCELAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
}

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
    textAlign: "center",
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
  salaInfo: {
    width: "100%",
    backgroundColor: "#eee",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    color: "#555",
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
