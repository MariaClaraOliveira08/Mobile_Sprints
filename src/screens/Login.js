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
import {useNavigation} from "@react-navigation/native";

export default function Login({}) {
  const navigation = useNavigation();
    const [user, setUser] = useState({ 
        email: "",
        password: "",
        showPassword: false,
    });

    async function handleLogin(){
      console.log(user)
      await api.postLogin(user).then( //solicitação
          (response)=>{
              Alert.alert('OK', response.data.message)
          },(error)=>{
              Alert.alert('Erro', error.response.data.error)
          }
    )
  }
}


  return (
    <View style={styles.container}>

      <Text style={styles.title}>Faça Seu Login</Text>

      {/* Container que envolve os inputs, botão e link de cadastro */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="CPF"
          value={cpf}
          onChangeText={setCpf}
        />
        <View style={styles.passwordContainer}>
        <TextInput
        style={styles.passwordInput}
        placeholder="Senha"
        value={user.password}
        secureTextEntry={user.showPassword}
        onChangeText={(value)=> {
            setUser({...user, password: value});
        }}
        />
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
          <Text style={styles.linkText}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );


{}
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
    width: "100%", // Usando largura total da tela
    backgroundColor: "#e6e1e1", // Cor de fundo do container
    padding: 16, // Aumentei o padding para dar mais espaçamento
    borderRadius: 15, // Bordas arredondadas
    marginBottom: 30, // Aumentei o espaço entre o container e o botão
    shadowColor: "#362121", // Cor da sombra
    shadowOpacity: 0.34, // Sombra sutil
    shadowRadius: 26, // Raio da sombra
    elevation: 15, // Sombra no Android
    alignItems: "center", // Centralizando os itens
  },
  input: {
    width: "100%", // Largura ajustada para 80% da tela para um input mais longo
    height: 50, // Aumentando a altura dos inputs
    borderBottomWidth: 1,
    marginBottom: 20, // Maior espaçamento entre os inputs
    paddingHorizontal: 15, // Mais padding para os textos
    backgroundColor: "#fff", // Fundo branco para os inputs
    borderRadius: 25, // Bordas mais arredondadas
    fontSize: 16, // Aumentando o tamanho da fonte
    alignSelf: "center", // Centraliza o input horizontalmente
  },
  
  button: {
    backgroundColor: "#F92F2B",
    paddingVertical: 15, // Aumentei o padding vertical para o botão ficar mais longo
    paddingHorizontal: 20, // Ajustando o padding horizontal para mais largura
    borderRadius: 25, // Bordas bem arredondadas
    width: "89%", // Usando largura total da tela
    alignItems: "center",
    marginBottom: 20, // Espaçamento entre o botão e outros elementos
    shadowColor: "#000", // Sombra para dar destaque ao botão
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6, // Sombra do botão entrar
  },
  buttonText: {
    fontWeight: "bold",
    color: "#faf7f7",
    fontSize: 18, // Aumentando o tamanho da fonte do botão
  },
  
  linkText: {
    marginTop: 10,
    color: "#8a8383",
    fontWeight: "bold",
  },
})