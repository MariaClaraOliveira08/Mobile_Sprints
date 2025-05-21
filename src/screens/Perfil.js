// Importações necessárias do React e React Native
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

export default function PerfilUsuario() {
  // Estados para armazenar os dados do perfil
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Função para salvar as alterações
  async function handleUpdate() {
    console.log(user);
    // Chama a função de atualização da API e faz o tratamento da resposta
    await api.updateUser(user).then(
      (response) => {
        Alert.alert("Perfil atualizado com sucesso", response.data.message);
      },
      (error) => {
        // Se houver erro, exibe uma mensagem de erro
        Alert.alert("Erro", error.response.data.error);
      }
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MEU PERFIL</Text>

      <View style={styles.card}>
        {/* Campo para o nome */}
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Digite seu nome"
        />

        {/* Campo para o email */}
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu email"
        />

        {/* Campo para a senha */}
        <Text style={styles.label}>Senha:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Digite sua senha"
          secureTextEntry={true}
        />

        {/* Botão para salvar as alterações */}
        <TouchableOpacity style={styles.botaoSalvar} onPress={handleUpdate}>
          <Text style={styles.botaoTexto}>Atualizar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFB6B6",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#FFECEC",
    borderRadius: 15,
    padding: 20,
    width: "85%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  avatarContainer: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    tintColor: "#FF5A5F",
  },
  label: {
    alignSelf: "flex-start",
    color: "#FF5A5F",
    marginBottom: 5,
    marginTop: 10,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },
  atualizarButton: {
    backgroundColor: "#FF5A5F",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
    marginRight: 5,
    alignItems: "center",
  },
  excluirButton: {
    backgroundColor: "#FF5A5F",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
