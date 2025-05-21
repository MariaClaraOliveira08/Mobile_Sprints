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
import DateTimePicker from "../Components/DateTimePicker";

export default function CriarReserva({ navigation }) {
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState(null);
  const [horaInicio, setHoraInicio] = useState(null);
  const [horaFim, setHoraFim] = useState(null);
  const [sala, setSala] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReserva = async () => {
    if (!descricao || !data || !horaInicio || !horaFim || !sala) {
      Alert.alert("Erro", "Por favor, preencha todos os campos!");
      return;
    }

    const dataFormatada = data.toISOString().split("T")[0];

    const horaInicioStr = horaInicio
      .toTimeString()
      .split(":")
      .slice(0, 2)
      .join(":");

    const horaFimStr = horaFim.toTimeString().split(":").slice(0, 2).join(":");

    const inicio_periodo = new Date(`${dataFormatada}T${horaInicioStr}:00`);
    const fim_periodo = new Date(`${dataFormatada}T${horaFimStr}:00`);

    if (isNaN(inicio_periodo.getTime()) || isNaN(fim_periodo.getTime())) {
      Alert.alert("Erro", "Horário inválido.");
      return;
    }

    const dadosReserva = {
      fk_id_usuario: 1, // Altere conforme necessário
      descricao,
      inicio_periodo: inicio_periodo.toISOString(),
      fim_periodo: fim_periodo.toISOString(),
      fk_number: sala,
    };

    try {
      setLoading(true);
      const response = await sheets.postReserva(dadosReserva);
      Alert.alert("Sucesso", response.data.message);
      navigation.goBack();
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
    setSala("");
  };

  return (
    <Layout>
      <View style={styles.container}>
        <StatusBar hidden={false} />
        <Text style={styles.title}>Reserva</Text>
        <View style={styles.card}>
          <Text style={styles.label}>Descrição:</Text>
          <TextInput
            style={styles.input}
            value={descricao}
            onChangeText={setDescricao}
            placeholder="Digite a descrição"
          />

          <Text style={styles.label}>Data:</Text>
          <DateTimePicker
            type={"date"}
            buttonTitle={
              !data ? "Selecione a data da reserva" : data.toLocaleDateString()
            }
            setValue={setData}
          />

          <Text style={styles.label}>Horário de Início:</Text>
          <DateTimePicker
            type={"time"}
            buttonTitle={
              !horaInicio
                ? "Selecione o horário de início"
                : horaInicio.toLocaleTimeString([], {
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
              !horaFim
                ? "Selecione o horário de término"
                : horaFim.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
            }
            setValue={setHoraFim}
          />

          <Text style={styles.label}>Número da Sala:</Text>
          <TextInput
            style={styles.input}
            value={sala}
            onChangeText={setSala}
            placeholder="Ex: 101"
            keyboardType="numeric"
          />

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
