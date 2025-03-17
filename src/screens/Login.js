import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import api from "../axios/axios"; // Certifique-se de que o caminho está correto

export default function Login({ navigation }) {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const user = { cpf, password }; // Crie o objeto user com cpf e password
    console.log(user); // Para depuração

    try {
      const response = await api.postLogin(user); // Chame a API
      Alert.alert("OK", response.data.message); // Exiba a mensagem de sucesso
    } catch (error) {
      console.log(error); // Para depuração
      Alert.alert("Erro", error.response?.data?.error || "Erro desconhecido"); // Exiba a mensagem de erro
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Faça Seu Login</Text>
      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Salas")}>
        <Text style={styles.linkText}>Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8b0b1e",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#cbbcc0",
  },
  input: {
    width: "100%",
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "#e3dbdd",
    borderRadius: 20,
  },
  button: {
    backgroundColor: "#b9526c",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    color: "#cbbcc0",
  },
  linkText: {
    marginTop: 10,
    color: "#cbbcc0",
    fontWeight: "bold",
  },
});
