import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import api from "../axios/axios"; 

export default function PerfilUsuario() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    carregarDadosUsuario();
  }, []);

  async function carregarDadosUsuario() {
    try {
      const response = await api.getUsuario(); // Verifique se essa rota existe no seu backend
      const usuario = response.data.user;

      setName(usuario.name);
      setEmail(usuario.email);
      // Por segurança, normalmente a senha não vem preenchida
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os dados do usuário.");
      console.log(error);
    }
  }

  async function handleUpdate() {
    if (!name || !email) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const dadosAtualizados = {
        name,
        email,
        password: password ? password : undefined, // Só envia a senha se o campo não estiver vazio
      };

      const response = await api.updateUsuario(dadosAtualizados); // Ajuste esse endpoint conforme sua API

      Alert.alert("Sucesso", "Dados atualizados com sucesso!");
      setPassword(""); // Limpa o campo de senha por segurança
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível atualizar os dados.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MEU PERFIL</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Digite seu nome"
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu email"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Senha (opcional):</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Digite sua nova senha"
          secureTextEntry
        />

        <TouchableOpacity style={styles.botaoSalvar} onPress={handleUpdate}>
          <Text style={styles.botaoTexto}>Atualizar Dados</Text>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#d93030",
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
  botaoSalvar: {
    backgroundColor: "#FF5A5F",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginTop: 20,
    alignItems: "center",
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
