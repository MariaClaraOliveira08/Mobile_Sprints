import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Layout from '../Components/Layout'; // Você já tem o Layout

const Reserva = () => {
  const [fkNumber, setFkNumber] = useState('');
  const [descricao, setDescricao] = useState('');
  const [inicio, setInicio] = useState('');
  const [fim, setFim] = useState('');

  const reservarSala = async () => {
    if (!fkNumber || !descricao || !inicio || !fim) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch('//http://localhost:5000/api/reservas/v1/shuedule', { // <-- CORRIJA AQUI
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fk_id_usuario: 1, // <-- Usuario fixo por enquanto
          descricao: descricao,
          inicio_periodo: inicio,
          fim_periodo: fim,
          fk_number: fkNumber,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Reserva feita com sucesso!');
        setFkNumber('');
        setDescricao('');
        setInicio('');
        setFim('');
      } else {
        console.error('Erro da API:', data);
        alert('Erro ao fazer a reserva: ' + (data.error || 'Tente novamente.'));
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Não foi possível conectar ao servidor.');
    }
  };

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Reservar Sala</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Número da Sala</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 101"
            value={fkNumber}
            onChangeText={setFkNumber}
          />

          <Text style={styles.label}>Descrição da Reserva</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Aula de Reforço"
            value={descricao}
            onChangeText={setDescricao}
          />

          <Text style={styles.label}>Início (AAAA-MM-DD HH:MM:SS)</Text>
          <TextInput
            style={styles.input}
            placeholder="2025-04-28 14:00:00"
            value={inicio}
            onChangeText={setInicio}
          />

          <Text style={styles.label}>Fim (AAAA-MM-DD HH:MM:SS)</Text>
          <TextInput
            style={styles.input}
            placeholder="2025-04-28 16:00:00"
            value={fim}
            onChangeText={setFim}
          />

          <TouchableOpacity style={styles.buttonReservar} onPress={reservarSala}>
            <Text style={styles.buttonText}>Reservar</Text>
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
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
