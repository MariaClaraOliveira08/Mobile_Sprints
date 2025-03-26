// Importa as dependências necessárias para o componente
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
import api from "../axios/axios";  // Importa a instância do axios para fazer as requisições
import { useNavigation } from "@react-navigation/native";  // Importa a navegação para poder mudar de tela
import { Ionicons } from "@expo/vector-icons";  // Importa os ícones do Ionicons

export default function Cadastro({ navigation }) {
  // Estado que mantém os dados do usuário para cadastro
  const [user, setUser] = useState({
    name: "",      // Nome do usuário
    cpf: "",       // CPF do usuário
    email: "",     // E-mail do usuário
    password: "",  // Senha do usuário
    showPassword: false,  // Controla se a senha será visível ou não
  });

  // Função responsável por enviar os dados do cadastro para a API
  async function handleCadastro() {
    // Chama a função de cadastro da API e faz o tratamento da resposta
    await api.postCadastro(user).then(
      (response) => {
        // Se o cadastro for bem-sucedido, exibe uma mensagem e navega para a tela de Login
        Alert.alert("Cadastro realizado com sucesso!!", response.data.message);
        navigation.navigate("Login");  // Navega para a tela de login após o cadastro
      },
      (error) => {
        // Se houver erro, exibe uma mensagem de erro
        Alert.alert("Erro", error.response.data.error);
      }
    );
  }

  return (
    // Define a imagem de fundo da tela
    <ImageBackground
      source={require("../../assets/Imagem_de_fundo.jpg")}  // Caminho da imagem de fundo
      style={styles.background}
    >
      {/* Container para o logo da aplicação */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/logo-senai-1.png")}  // Caminho do logo
          style={styles.logo}
          resizeMode="contain"  // Ajusta o logo dentro do container sem distorção
        />
      </View>

      {/* Container principal de conteúdo */}
      <View style={styles.container}>
        <Text style={styles.title}>Faça Seu Cadastro</Text>  {/* Título da tela */}

        {/* Container que mantém os campos de entrada */}
        <View style={styles.inputContainer}>
          {/* Campo de entrada para o nome */}
          <TextInput
            style={styles.input}
            placeholder="Nome"  // Placeholder para o campo de nome
            value={user.name}
            onChangeText={(value) => setUser({ ...user, name: value })}  // Atualiza o estado com o valor do campo
          />
          
          {/* Campo de entrada para o CPF */}
          <TextInput
            style={styles.input}
            placeholder="CPF"  // Placeholder para o campo de CPF
            value={user.cpf}
            onChangeText={(value) => setUser({ ...user, cpf: value })}  // Atualiza o estado com o valor do campo
          />
          
          {/* Campo de entrada para o e-mail */}
          <TextInput
            style={styles.input}
            placeholder="E-mail"  // Placeholder para o campo de e-mail
            value={user.email}
            onChangeText={(value) => setUser({ ...user, email: value })}  // Atualiza o estado com o valor do campo
          />
          
          {/* Container para o campo de senha e o ícone de olho para mostrar/esconder a senha */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Senha"  // Placeholder para o campo de senha
              value={user.password}
              secureTextEntry={user.showPassword}  // Controla se a senha será visível ou não
              onChangeText={(value) => setUser({ ...user, password: value })}  // Atualiza o estado com o valor do campo
            />

            {/* Ícone para alternar entre mostrar/esconder a senha */}
            <TouchableOpacity
              onPress={() => setUser({ ...user, showPassword: !user.showPassword })}  // Alterna o estado de visibilidade da senha
            >
              <Ionicons
                name={user.showPassword ? "eye-off" : "eye"}  // Define o ícone de olho aberto ou fechado
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          {/* Botão de cadastro que chama a função handleCadastro */}
          <TouchableOpacity onPress={handleCadastro} style={styles.button}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>

          {/* Link para navegar para a tela de Login, caso o usuário já tenha uma conta */}
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.linkText}>Já tem uma conta? Faça Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

// Estilos para os componentes da tela
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
    marginBottom: 20,
    color: "#F92F2B",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 30,
    backgroundColor: "#FEFEFE",
    padding: 16,
    borderRadius: 15,
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
    paddingHorizontal: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
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
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#faf7f7",
    fontSize: 16,
  },
  linkText: {
    color: "#8a8383",
    fontWeight: "bold",
    textAlign: "center",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  logoContainer: {
    marginBottom: -60,
    alignItems: "center",
  },
  logo: {
    width: 330,
    height: 150,
  },
});
