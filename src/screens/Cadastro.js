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
// Importa a instância do axios para fazer as requisições
import api from "../axios/axios";  

// Importa a navegação para poder mudar de tela
import { useNavigation } from "@react-navigation/native";  

// Importa os ícones do Ionicons
import { Ionicons } from "@expo/vector-icons";  


export default function Cadastro({ navigation }) {
  // Estado que mantém os dados do usuário para cadastro
  const [user, setUser] = useState({
    name: "",      
    cpf: "",       
    email: "",     
    password: "",
    showPassword: true,  
  });

  // Função responsável por enviar os dados do cadastro para a API
  async function handleCadastro() {
    console.log(user); 
    // Chama a função de cadastro da API e faz o tratamento da resposta
    await api.postCadastro(user).then(
      (response) => {
        // Se o cadastro for bem-sucedido, exibe uma mensagem e navega para a tela de Login
        Alert.alert("Cadastro realizado com sucesso!!", response.data.message);
        // Navega para a tela de login após o cadastro
        navigation.navigate("Login");  
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
      source={require("../../assets/Imagem_de_fundo.jpg")}  
      style={styles.background}
    >
      {/* Container para o logo da aplicação */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/logo-senai-1.png")}  
          style={styles.logo}
          //Para se ajustar dentro do contêiner
          resizeMode="contain"  
        />
      </View>

      {/* Container principal de conteúdo */}
      <View style={styles.container}>
        {/* Título da tela */}
        <Text style={styles.title}>Faça Seu Cadastro</Text>  

        {/* Container que mantém os campos de entrada */}
        <View style={styles.inputContainer}>
          {/* Campo de entrada para o nome */}
          <TextInput
            style={styles.input}
            placeholder="Nome"  
            value={user.name}
            onChangeText={(value) => setUser({ ...user, name: value })}  
          />
          
          {/* Campo de entrada para o CPF */}
          <TextInput
            style={styles.input}
            placeholder="CPF"  
            value={user.cpf}
            onChangeText={(value) => setUser({ ...user, cpf: value })} 
          />
          
          {/* Campo de entrada para o e-mail */}
          <TextInput
            style={styles.input}
            placeholder="E-mail"  
            value={user.email}
            onChangeText={(value) => setUser({ ...user, email: value })}  
          />
          
          {/* Container para o campo de senha e o ícone de olho para mostrar/esconder a senha */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Senha"  
              value={user.password}
              secureTextEntry={user.showPassword}  
              onChangeText={(value) => setUser({ ...user, password: value })} 
            />

            {/* Ícone para alternar entre mostrar/esconder a senha */}
            <TouchableOpacity
            // Mantém as outras propriedades de 'user' intactas. (...user)
            // Altera o valor de 'showPassword' (inverte de true para false ou vice-versa).
              onPress={() => setUser({ ...user, showPassword: !user.showPassword })}  
            >
              <Ionicons
                name={user.showPassword ? "eye-off" : "eye"}  
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
  // Container principal que ocupa toda a tela
  container: {
    flex: 1, // O container ocupa todo o espaço disponível
    justifyContent: "center", // Centraliza o conteúdo verticalmente
    alignItems: "center", // Centraliza o conteúdo horizontalmente
    backgroundColor: "transparent", // Define o fundo como transparente
    padding: 20, // Adiciona um padding interno de 20 unidades ao redor do conteúdo
  },
  
  // Estilo para o título principal
  title: {
    fontSize: 28, // Tamanho grande para o texto do título
    fontWeight: "bold", // Aplica negrito ao título
    marginBottom: 20, // Adiciona um espaço de 20 unidades abaixo do título
    color: "#F92F2B", // Define a cor do título como vermelho
  },

  // Container que envolve o campo de entrada de texto
  inputContainer: {
    width: "100%", // O container ocupa toda a largura disponível
    marginBottom: 30, // Adiciona um espaço de 30 unidades abaixo do container
    backgroundColor: "#FEFEFE", // Fundo branco claro para o container
    padding: 16, // Cria um espaçamento interno de 16 unidades
    borderRadius: 15, // Arredonda os cantos do container
    // Sombra para dar efeito de profundidade no container
    shadowColor: "#362121", //sombra do container
    elevation: 15, // Eleva o container com sombra, criando um efeito de profundidade
    alignItems: "center", // Centraliza os itens dentro do container
  },

  // Estilo do campo de entrada de texto
  input: {
    width: "100%", // O campo de entrada ocupa toda a largura do container
    height: 50, // Define a altura do campo para 50 unidades
    marginBottom: 20, // Adiciona um espaço de 20 unidades abaixo do campo de entrada
    paddingHorizontal: 10, // Cria um espaço de 10 unidades nas laterais
    backgroundColor: "#F5F5F5", // Fundo cinza claro para o campo de entrada
    borderRadius: 20, // Arredonda os cantos do campo de entrada
    fontSize: 16, // Define o tamanho da fonte para o texto inserido
  },

  // Container para o campo de senha (com ícone ou ação ao lado)
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
// Estilo do campo de entrada de senha
passwordInput: {
  flex: 1, // Ocupa o máximo de espaço possível
  height: 50, // Altura do campo
  fontSize: 16, // Tamanho do texto
},

  // Estilo para o botão de ação (login, submit, etc.)
  button: {
    backgroundColor: "#F92F2B", // Fundo vermelho para o botão
    paddingVertical: 15, // Padding de 15 unidades na direção vertical
    paddingHorizontal: 20, // Padding de 20 unidades na direção horizontal
    borderRadius: 25, // Arredonda os cantos do botão
    width: "100%", // O botão ocupa toda a largura do container
    alignItems: "center", // Centraliza o conteúdo dentro do botão
    marginBottom: 20, // Adiciona um espaço de 20 unidades abaixo do botão
    shadowColor: "#000", // Sombra para dar profundidade ao botão
    elevation: 6, // Aplica uma sombra suave ao botão, fazendo-o parecer ligeiramente elevado
  },

  // Estilo do texto dentro do botão
  buttonText: {
    fontWeight: "bold", // Aplica negrito ao texto
    color: "#faf7f7", // Cor branca para o texto do botão
    fontSize: 16, // Tamanho da fonte
  },

  // Estilo para o texto de link ou mensagem auxiliar
  linkText: {
    color: "#8a8383", // Cor cinza escuro para o texto do link
    fontWeight: "bold", // Aplica negrito ao texto
    textAlign: "center", // Centraliza o texto
  },

  // Estilo do fundo da tela (para imagem de fundo)
  background: {
    flex: 1, // O fundo ocupa toda a tela
    resizeMode: "cover", // A imagem de fundo cobre a tela sem distorcer
    justifyContent: "center", // Centraliza o conteúdo sobre o fundo
  },

  // Container que envolve o logo
  logoContainer: {
    marginBottom: -60, // Adiciona um espaço negativo, movendo o logo para cima
    alignItems: "center", // Centraliza o logo horizontalmente
  },

  // Estilo do logo
  logo: {
    width: 330, // Largura do logo
    height: 150, // Altura do logo
  },
});
