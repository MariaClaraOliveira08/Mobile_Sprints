import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Layout from '../Components/Layout';

const Reserva = () => {
  const [fkNumber, setFkNumber] = useState('');
  const [descricao, setDescricao] = useState('');
  const [inicio, setInicio] = useState('');
  const [fim, setFim] = useState('');

  const reservarSala = () => {
    console.log('Reserva enviada:', {
      fk_number: fkNumber,
      descricao,
      inicio_periodo: inicio,
      fim_periodo: fim,
    });
    alert('Reserva enviada (simulação).');
  };

  return (
    <Layout>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Reservas</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Número da Sala</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 101"
          value={fkNumber}
          onChangeText={setFkNumber}
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          placeholder="Motivo da reserva"
          value={descricao}
          onChangeText={setDescricao}
        />

        <Text style={styles.label}>Início (AAAA-MM-DD HH:MM:SS)</Text>
        <TextInput
          style={styles.input}
          placeholder="2025-04-23 14:00:00"
          value={inicio}
          onChangeText={setInicio}
        />

        <Text style={styles.label}>Término (AAAA-MM-DD HH:MM:SS)</Text>
        <TextInput
          style={styles.input}
          placeholder="2025-04-23 16:00:00"
          value={fim}
          onChangeText={setFim}
        />

        <TouchableOpacity style={styles.buttonReservar} onPress={reservarSala}>
          <Text style={styles.buttonText}>RESERVAR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonCancelar}>
          <Text style={styles.buttonCancelarText}>CANCELAR</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </Layout>
  );
};

export default Reserva;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#F44336',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFC2C2',
    padding: 20,
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    alignItems: 'stretch',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#E4E4E4',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  buttonReservar: {
    backgroundColor: '#F44336',
    padding: 15,
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  buttonCancelar: {
    backgroundColor: '#E4E4E4',
    padding: 15,
    borderRadius: 30,
  },
  buttonCancelarText: {
    color: '#888',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
