import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import api from "../axios/axios";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";

export default function PerfilUsuario() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  useEffect(() => {
    carregarDadosUsuario();
  }, []);

  async function carregarDadosUsuario() {
    try {
      const userId = await SecureStore.getItemAsync("userId");
      if (!userId) {
        Alert.alert("Erro", "ID do usuário não encontrado.");
        return;
      }

      const response = await api.getUsuario(userId);
      const usuario = response.data.user;

      setName(usuario.name || "");
      setCpf(usuario.cpf || "");
      setEmail(usuario.email || "");
      setPassword(usuario.password || "");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os dados do usuário.");
      console.log("Erro ao carregar usuário:", error);
    }
  }

  async function atualizarUser() {
    if (!name || !cpf || !email || !password) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const userId = await SecureStore.getItemAsync("userId");
      if (!userId) {
        Alert.alert("Erro", "ID do usuário não encontrado.");
        return;
      }

      await api.updateUser(userId, { name, cpf, email, password });

      Alert.alert("Sucesso", "Dados atualizados com sucesso!");
      setPassword("");
    } catch (error) {
      console.log("Erro ao atualizar usuário:", error);
      Alert.alert("Erro", "Não foi possível atualizar os dados.");
    }
  }

  async function deleteUser() {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza que deseja excluir sua conta?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              const userId = await SecureStore.getItemAsync("userId");
              if (!userId) {
                Alert.alert("Erro", "ID do usuário não encontrado.");
                return;
              }

              await api.deleteUser(userId);

              Alert.alert("Conta excluída", "Sua conta foi removida com sucesso.");

              await SecureStore.deleteItemAsync("userId");
              navigation.navigate("Login");
            } catch (error) {
              console.log("Erro ao excluir usuário:", error);
              Alert.alert("Erro", "Não foi possível excluir a conta.");
            }
          },
        },
      ]
    );
  }

  async function atualizarSenha() {
    if (!novaSenha || !confirmarSenha) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    try {
      const userId = await SecureStore.getItemAsync("userId");
      if (!userId) {
        Alert.alert("Erro", "ID do usuário não encontrado.");
        return;
      }

      await api.updateUser(userId, { password: novaSenha });

      Alert.alert("Sucesso", "Senha atualizada com sucesso!");
      setModalVisible(false);
      setNovaSenha("");
      setConfirmarSenha("");
    } catch (error) {
      console.log("Erro ao atualizar senha:", error);
      Alert.alert("Erro", "Erro ao atualizar a senha.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MEU PERFIL</Text>

      <View style={styles.avatarContainer}>
        <Icon name="person" size={80} color="#f88" />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          editable={true}
        />

        <Text style={styles.label}>CPF:</Text>
        <TextInput style={styles.input} value={cpf} editable={false} />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          editable={true}
        />

        <Text style={styles.label}>Senha:</Text>
        <View style={styles.inputSenhaContainer}>
          <TextInput
            style={styles.inputSenha}
            value={password}
            editable={false}
            secureTextEntry={!showPassword}
          />
        </View>

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text
            style={{
              color: "#d93030",
              marginTop: 10,
              textDecorationLine: "underline",
            }}
          >
            Alterar senha
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoSalvar} onPress={atualizarUser}>
          <Text style={styles.botaoTexto}>Atualizar Dados</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botaoSalvar, { backgroundColor: "#D32F2F" }]}
          onPress={deleteUser}
        >
          <Text style={styles.botaoTexto}>Excluir Conta</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de Alterar Senha */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Alterar Senha</Text>

            <TextInput
              style={styles.input}
              placeholder="Nova senha"
              secureTextEntry
              value={novaSenha}
              onChangeText={setNovaSenha}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirmar nova senha"
              secureTextEntry
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                style={[styles.botaoSalvar, { backgroundColor: "#aaa" }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.botaoTexto}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.botaoSalvar}
                onPress={atualizarSenha}
              >
                <Text style={styles.botaoTexto}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    marginBottom: 10,
    color: "#d93030",
  },
  avatarContainer: {
    backgroundColor: "#FFECEC",
    borderRadius: 100,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
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
    marginTop: 5,
  },
  inputSenhaContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  inputSenha: {
    flex: 1,
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 15,
    width: "85%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d93030",
    marginBottom: 15,
  },
});
