import React from "react";
import Layout from "../Components/Layout";
import { View, Text, StyleSheet,ScrollView } from "react-native";

export default function DispoDetail({ route }) {
  const { sala } = route.params;

  return (
    <Layout>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Sala {sala.number}</Text>
        <Text style={styles.subtitle}>{sala.description}</Text>
        <Text style={styles.capacity}>Capacidade: {sala.capacity} pessoas</Text>
      </View>
    </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
  },
  capacity: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
