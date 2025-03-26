// Importa as bibliotecas necessárias para a construção do componente
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import api from "../axios/axios";  // Importa a API para realizar a requisição de login
import { useNavigation } from "@react-navigation/native";  // Importa a navegação entre telas
import { Ionicons } from "@expo/vector-icons";  // Importa o pacote de ícones

export default function Login() {
  const navigation = useNavigation(); // Inicializa a navegação

  // Estado para armazenar os dados do usuário no login
  const [user, setUser] = useState({
    email: "",     // Campo de e-mail do usuário
    password: "",  // Campo de senha do usuário
    showPassword: false,  // Controla se a senha será visível ou não
  });

  // Função para lidar com o login do usuário
  async function handleLogin() {
    console.log(user); // Exibe no console os dados preenchidos no login

    // Faz a requisição para a API enviando os dados do usuário
    await api.postLogin(user).then(
      (response) => {
        Alert.alert("OK", response.data.message); // Exibe uma mensagem de sucesso
        navigation.navigate("Salas"); // Redireciona o usuário para a tela "Salas"
      },
      (error) => {
        Alert.alert("Erro", error.response.data.error); // Exibe uma mensagem de erro
      }
    );
  }

  return (
    // Define a imagem de fundo da tela de login
    <ImageBackground
      source={require("../../assets/Imagem_de_fundo.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Container para exibir o logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/logo-senai-1.png")}
            style={styles.logo}
            resizeMode="contain" // Ajusta a imagem sem distorcer
          />
        </View>

        {/* Título da tela de login */}
        <Text style={styles.title}>Faça Seu Login</Text>

        {/* Container para os campos de entrada */}
        <View style={styles.inputContainer}>
          {/* Campo de entrada para o CPF */}
          <TextInput
            style={styles.input}
            placeholder="CPF"
            value={user.cpf}
            onChangeText={(value) => setUser({ ...user, cpf: value })}
          />

          {/* Campo de entrada para a senha */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Senha"
              value={user.password}
              secureTextEntry={user.showPassword} // Controla a visibilidade da senha
              onChangeText={(value) => {
                setUser({ ...user, password: value });
              }}
            />

            {/* Botão para alternar a visibilidade da senha */}
            <TouchableOpacity
              onPress={() =>
                setUser({ ...user, showPassword: !user.showPassword })
              }
            >
              <Ionicons
                name={user.showPassword ? "eye-off" : "eye"} // Ícone de olho aberto/fechado
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          {/* Botão para realizar o login */}
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          {/* Link para redirecionar o usuário para a tela de cadastro */}
          <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
            <Text style={styles.linkText}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

// Estilização da tela de login
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#F92F2B",
  },
  inputContainer: {
    width: "100%",
    height: "35%",
    backgroundColor: "#FEFEFE",
    padding: 16,
    borderRadius: 15,
    marginBottom: 160,
    shadowColor: "#362121",
    shadowOpacity: 0.34,
    shadowRadius: 26,
    elevation: 15,
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 50, 
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: "#F5F5F5",
    borderRadius: 25,
    fontSize: 16,
    alignSelf: "center",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50, 
    paddingRight: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: "#F5F5F5",
    borderRadius: 25,
    fontSize: 16,
    alignSelf: "center",
  },
  passwordInput: {
    flex: 1,
    height: 50,
    backgroundColor: "#F5F5F5",
    borderRadius: 25,
    fontSize: 16,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#F92F2B",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: "89%",
    alignItems: "center",
    marginBottom: 40,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#faf7f7",
    fontSize: 16,
  },
  linkText: {
    marginTop: -20,
    color: "#8a8383",
    fontWeight: "bold",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  logoContainer: {
    marginBottom: 10,
    alignItems: "center",
  },
  logo: {
    width: 330,
    height: 150,
  },
});