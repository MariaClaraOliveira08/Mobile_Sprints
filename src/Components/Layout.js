import React from "react";
import { View, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

export default function Layout({ children }) {
  const navigation = useNavigation(); // Hook de navegação

  return (
    <ImageBackground
      source={require("../../assets/Imagem_de_fundo.jpg")}
      style={styles.imagem}
    >
      <View style={{ flex: 1 }}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("PerfilUsuario")}>
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
    resizeMode: "cover",
    justifyContent: "center",
  },
  header: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
  },
});
