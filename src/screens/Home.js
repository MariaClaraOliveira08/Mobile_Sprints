import React from "react";
import { View, Button, StyleSheet } from "react-native";
import Layout from "../Components/Layout";

function Home({ navigation }) {
  return (
    <Layout>
      <View style={styles.container}>
        <Button
          title="Salas"
          onPress={() => navigation.navigate("Salas")}
          color="#FF8787"
        />
        <Button
          title="Reservas"
          onPress={() => navigation.navigate("Reserva")}
          color="#FF8787"
        />
        <Button
          title="Disponibilidade"
          onPress={() => navigation.navigate("Disponibilidade")}
          color="#FF8787"
        />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

export default Home;
