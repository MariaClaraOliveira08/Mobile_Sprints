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

export default function Cadastro({ navigation }) {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleCadastro() {
    const user = { name, cpf, email, password }; 
    console.log(user);

    // Verifica se os campos estão vazios antes de fazer a chamada à API
    if (!name || !cpf || !email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return; // Interrompe a execução se algum campo estiver vazio
    }

    try {
      const response = await api.postCadastro(user); 
      Alert.alert("OK", response.data.message); 
      navigation.navigate("Login"); 
    } catch (error) {
      console.log(error); 
      Alert.alert("Erro", error.response?.data?.error || "Erro ao cadastrar"); 
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Faça Seu Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={handleCadastro} style={styles.button}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.linkText}>Já tem uma conta? Faça Login</Text>
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