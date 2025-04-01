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
    cpf: "",     
    password: "",  
    showPassword: false,  
  });

  // Função para lidar com o login do usuário
  async function handleLogin() {
    // Exibe no console os dados preenchidos no login
    console.log(user); 

    // Faz a requisição para a API enviando os dados do usuário
    await api.postLogin(user).then(
      (response) => {
        // Exibe uma mensagem de sucesso
        Alert.alert("OK", response.data.message);
        // Redireciona o usuário para a tela "Salas" 
        navigation.navigate("Salas"); 
      },
      (error) => {
        // Exibe uma mensagem de erro
        Alert.alert("Erro", error.response.data.error); 
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
            // Ajusta a imagem sem distorcer
            resizeMode="contain" 
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
              // Controla a visibilidade da senha
              secureTextEntry={user.showPassword} 
              onChangeText={(value) => {
                setUser({ ...user, password: value });
              }}
            />

            {/* Botão para alternar a visibilidade da senha */}
            <TouchableOpacity
              onPress={() =>  
                // Mantém as outras propriedades de 'user' intactas. (...user)
                // Altera o valor de 'showPassword' (inverte de true para false ou vice-versa).
                setUser({ ...user, showPassword: !user.showPassword })
              }
            >
              <Ionicons
              // "eye-off" para ocultar a senha, "eye" para mostrar.
                name={user.showPassword ? "eye-off" : "eye"} 
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
  // Container principal da tela
  container: {
    flex: 1, // Ocupa todo o espaço disponível
    justifyContent: "center", // Centraliza o conteúdo verticalmente
    alignItems: "center", // Centraliza o conteúdo horizontalmente
    backgroundColor: "transparent", // Fundo transparente
    padding: 20, // Espaçamento interno de 20 unidades
  },
  // Estilização do título principal
  title: {
    fontSize: 28, // Tamanho grande para o título
    fontWeight: "bold", // Aplica negrito ao título
    marginBottom: 40, // Espaço de 40 unidades abaixo do título
    color: "#F92F2B", // Cor vermelha para o título
  },
  // Container que envolve os campos de entrada
  inputContainer: {
    width: "100%", // O container ocupa toda a largura da tela
    height: "35%", // O container ocupa 35% da altura da tela
    backgroundColor: "#FEFEFE", // Fundo branco
    padding: 16, // Espaçamento interno de 16 unidades
    borderRadius: 15, // Cantos arredondados
    marginBottom: 160, // Grande espaço abaixo do container
    shadowColor: "#362121", // Sombra para dar efeito de profundidade
    elevation: 15, // Aplica uma sombra suave ao botão, fazendo-o parecer ligeiramente elevado
    alignItems: "center", // Centraliza os itens dentro do container
  },
  // Estilização dos campos de entrada de texto
  input: {
    width: "100%", // O campo ocupa toda a largura do container
    height: 50, // Altura de 50 unidades
    marginBottom: 20, // Espaço de 20 unidades abaixo do campo
    paddingHorizontal: 15, // Espaçamento interno nas laterais
    backgroundColor: "#F5F5F5", // Fundo cinza claro
    borderRadius: 25, // Cantos arredondados
    fontSize: 16, // Tamanho da fonte
    alignSelf: "center", // Centraliza o campo horizontalmente
  },
  // Container para o campo de senha
 passwordContainer: {
  flexDirection: "row", // Organiza os itens na horizontal
  alignItems: "center", // Alinha verticalmente no centro
  width: "100%", // O container ocupa toda a largura
  paddingRight: 18, // Espaçamento à direita (para ícone)
  marginBottom: 20, // Espaço abaixo do container
  paddingHorizontal: 15, // Espaçamento interno lateral
  backgroundColor: "#F5F5F5", // Fundo cinza claro
  borderRadius: 25, // Cantos arredondados
  alignSelf: "center", // Centraliza horizontalmente
},

passwordInput: {
  flex: 1, // Ocupa o máximo de espaço possível
  height: 50, // Altura do campo
  fontSize: 16, // Tamanho do texto
},
  // Estilização do botão
  button: {
    backgroundColor: "#F92F2B", // Fundo vermelho para o botão
    paddingVertical: 15, // Padding vertical de 15 unidades
    paddingHorizontal: 20, // Padding horizontal de 20 unidades
    borderRadius: 25, // Cantos arredondados
    width: "89%", // O botão ocupa 89% da largura do container
    alignItems: "center", // Centraliza o conteúdo dentro do botão
    marginBottom: 40, // Espaço abaixo do botão
    shadowColor: "#000", // Sombra suave para efeito de profundidade
    elevation: 6,  // Aplica uma sombra suave ao botão, fazendo-o parecer ligeiramente elevado
  },
  // Estilização do texto dentro do botão
  buttonText: {
    fontWeight: "bold", // Texto em negrito
    color: "#faf7f7", // Cor branca para o texto
    fontSize: 16, // Tamanho da fonte
  },
  // Estilização do texto de link
  linkText: {
    marginTop: -20, // Move o link para cima com margem negativa
    color: "#8a8383", // Cor cinza escuro para o texto
    fontWeight: "bold", // Texto em negrito
  },
  // Estilização do fundo da tela
  background: {
    flex: 1, // O fundo ocupa toda a tela
    resizeMode: "cover", // A imagem de fundo cobre toda a tela sem distorcer
    justifyContent: "center", // Centraliza o conteúdo sobre o fundo
  },
  // Container do logo
  logoContainer: {
    marginBottom: 10, // Espaço abaixo do logo
    alignItems: "center", // Centraliza o logo horizontalmente
  },
  // Estilização do logo
  logo: {
    width: 330, // Largura do logo
    height: 150, // Altura do logo
  },
});
