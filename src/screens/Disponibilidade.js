import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import Layout from '../Components/Layout';

const Disponibilidade = () => {
  const [filtro, setFiltro] = useState('');
  const salas = [
    { number: 'B10', description: 'LAB INFORMÁTICA', capacity: 16 },
    { number: '101', description: 'Laboratório de Química', capacity: 25 },
    { number: '102', description: 'Sala de Aula - Física', capacity: 30 },
  ];

  const salasFiltradas = salas.filter((sala) =>
    sala.description.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.titulo}>Disponibilidade</Text>

        <View style={styles.cabecalho}>
          <Text style={styles.colunaCabecalho}>Número</Text>
          <Text style={styles.colunaCabecalho}>Descrição</Text>
          <Text style={styles.colunaCabecalho}>Capacidade</Text>
        </View>


        <FlatList
          data={salasFiltradas}
          keyExtractor={(item) => item.number}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardText}>{item.number}</Text>
              <Text style={styles.cardText}>{item.description}</Text>
              <Text style={styles.cardText}>{item.capacity}</Text>
            </View>
          )}
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F44336',
    textAlign: 'center',
    marginBottom: 20,
  },
  cabecalho: {
    flexDirection: 'row',
    backgroundColor: '#FF6F6F',
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  colunaCabecalho: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    color: '#000',
  },
  card: {
    backgroundColor: '#FFB3B3',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default Disponibilidade;
