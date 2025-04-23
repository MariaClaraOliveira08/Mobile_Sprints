import React from "react";
import { View, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Layout({ children }) {
  return (
    <ImageBackground
      source={require("../../assets/Imagem_de_fundo.jpg")} // Caminho da imagem
      style={styles.imagem} // Estilo para a imagem de fundo
    >
      <View style={{ flex: 1 }}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => { console.log("Botão Clicado") }}>
            <Icon name="person" size={30} color="white" />
          </TouchableOpacity>
        </View>
        {/* Conteúdo principal */}
        <View style={styles.container}>{children}</View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imagem: {
    flex: 1,
    resizeMode: "cover", // Faz a imagem cobrir toda a tela
    justifyContent: "center", // Centraliza o conteúdo
  },
  header: {
    width: "100%", // Corrigido para 100% de largura
    height: 60,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
  },
});
