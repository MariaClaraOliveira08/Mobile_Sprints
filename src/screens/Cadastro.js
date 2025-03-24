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
  const user = { name, cpf, email, password }; 

  async function handleCadastro() {
    await api.postCadastro(user).then(
      (response) => {
        Alert.alert("Cadastro realizado com sucesso!!", response.data.message);
      },
      (error) => {
        Alert.alert('Erro', error.response.data.error);
      }
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Faça Seu Cadastro</Text>
      
      <View style={styles.inputContainer}>
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
        
        {/* Botões dentro do mesmo container */}
        <TouchableOpacity onPress={handleCadastro} style={styles.button}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.linkText}>Já tem uma conta? Faça Login</Text>
        </TouchableOpacity>
      </View>
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
  inputContainer: {
    width: "100%",  // Garantindo que os inputs ocupem toda a largura
    marginBottom: 30,  // Aumentando o espaço abaixo dos campos de entrada
    backgroundColor: "#e6e1e1", // Cor de fundo para o container
    padding: 16, // Aumentei o padding para dar mais espaçamento
    borderRadius: 15, // Bordas arredondadas
    shadowColor: "#362121", // Cor da sombra
    shadowOpacity: 0.34, // Sombra sutil
    shadowRadius: 26, // Raio da sombra
    elevation: 15, // Sombra no Android
    alignItems: "center", // Centralizando os itens dentro do container
  },
  input: {
    width: "100%",
    height: 50,
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#e3dbdd",
    borderRadius: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#F92F2B",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#faf7f7",
    fontSize: 18,
  },
  linkText: {
    color: "#8a8383",
    fontWeight: "bold",
    textAlign: "center", // Centralizar o texto do link
  },
});