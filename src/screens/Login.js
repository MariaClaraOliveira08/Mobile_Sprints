import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import api from "../axios/axios";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";

export default function Login() {
  const navigation = useNavigation();

  const [user, setUser] = useState({
    cpf: "",
    password: "",
    showPassword: true,
  });

  async function saveToken(token) {
    try {
      await SecureStore.setItemAsync("token", token); //armazena o token no segurestore
      console.log("Token salvo com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar token:", error);
    }
  }

  async function saveUserId(userId) {
    try {
      await SecureStore.setItemAsync("userId", userId.toString()); //armazena o id como string no segurestore
      console.log("ID do usuário salvo com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar ID do usuário:", error);
    }
  }

  async function handleLogin() {
    console.log("Dados enviados para login:", user);

    try {
      const response = await api.postLogin(user);

      const token = response.data.token;
      const userId = response.data.user?.id_usuario;

      if (!token) {
        Alert.alert("Erro", "Token não recebido. Verifique suas credenciais.");
        return;
      }

      if (userId === undefined || userId === null) {
        console.warn("ID do usuário não encontrado na resposta.");
      }

      console.log("TOKEN GERADO:", token);
      console.log("ID DO USUÁRIO:", userId);

      await saveToken(token);

      if (userId !== undefined && userId !== null) { // verifica se o id está definido e se não está nulo
        await saveUserId(userId); //chamada da função para salvar o userId
      }

      Alert.alert("Sucesso", response.data.message);
      navigation.navigate("Home");
    } catch (error) {
      console.log("Erro no login:", error.response);
      Alert.alert("Erro", error.response?.data?.error);
    }
  }

  return (
    <ImageBackground
      source={require("../../assets/Imagem_de_fundo.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/logo-senai-1.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Faça Seu Login</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="CPF"
            value={user.cpf}
            onChangeText={(value) => setUser({ ...user, cpf: value })}
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Senha"
              value={user.password}
              secureTextEntry={user.showPassword}
              onChangeText={(value) => setUser({ ...user, password: value })}
            />
            <TouchableOpacity
              onPress={() =>
                setUser({ ...user, showPassword: !user.showPassword })
              }
            >
              <Ionicons
                name={user.showPassword ? "eye-off" : "eye"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
            <Text style={styles.linkText}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

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
    paddingRight: 18,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: "#F5F5F5",
    borderRadius: 25,
    alignSelf: "center",
  },
  passwordInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
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
