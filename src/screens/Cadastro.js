import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import api from "../axios/axios";

export default function Cadastro({ navigation }) {
  const [user, setUser ] = useState({
    name: "",
    cpf: "",
    email: "",
    password: "",
    
  });

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

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={user.name}
        onChangeText={(value) => {
          setUser ({ ...user, name: value });
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={user.cpf}
        onChangeText={(value) => {
          setUser ({ ...user, cpf: value });
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={user.email}
        onChangeText={(value) => {
          setUser ({ ...user, email: value });
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={user.password}
        onChangeText={(value) => {
          setUser ({ ...user, password: value });
        }}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleCadastro} style={styles.button}>
          <Text style={styles.linkText}>Cadastre-se</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.linkText}>Já tem uma conta?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { // fundo
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#8b0b1e',
    padding: 20,
  },
  title: {  // título (faça seu cadastro)
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#cbbcc0'
  },
  input: { //campos a serem preenchidos
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#e3dbdd',
    borderRadius: 20,
  },

  buttonContainer: { //Botão do cadastre-se
    width: '100%',
    alignItems: 'center',
    marginTop: 20, 
    
  }, 

  button: {
    backgroundColor: '#b9526c',
    padding: 10,
    borderRadius: 5,
    width: '100%', // Largura total do botão
    alignItems: 'center',
  },

  buttonText: { //Cadastre-se
    fontWeight: 'bold',
    color: '#cbbcc0',
  },
  linkText: { //Já tem conta
    marginTop: 10, // Espaço acima do texto "Já tem uma conta?"
    color: '#cbbcc0', // Cor do texto do link
    fontWeight: 'bold',
  },
});