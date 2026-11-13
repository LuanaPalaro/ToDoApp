import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function App() {
  const [tarefaAtual, setTarefaAtual] = useState('');
  const [listaTarefas, setListaTarefas] = useState([]);

  const salvarDadosLocal = async (listaParaSalvar) => {
    try {
      const listaString = JSON.stringify(listaParaSalvar);
      await AsyncStorage.setItem('minhas_tarefas', listaString);
    } catch (error) {
      console.log('Erro ao salvar dados:', error);
    }
  };

  const resgatarDadosLocal = async () => {
    try {
      const textoLido = await AsyncStorage.getItem('minhas_tarefas');
      if (textoLido !== null) {
        const listaInflada = JSON.parse(textoLido);
        setListaTarefas(listaInflada);
      }
    } catch (error) {
      console.log('Erro ao resgatar dados:', error);
    }
  };

  const handleAdicionarTarefa = () => {
    if (tarefaAtual.trim() === '') {
      return;
    }
    
    const novaLista = [...listaTarefas, tarefaAtual];
    setListaTarefas(novaLista);
    salvarDadosLocal(novaLista); 
    setTarefaAtual('');
    };

  return (
    <View>
      <Text style={styles.title}>📝 Minhas Tarefas</Text>

      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          value={tarefaAtual}
          placeholder="Digite o reparo necessário..." 
          onChangeText={setTarefaAtual}
        />
        <TouchableOpacity style={styles.button} onPress={handleAdicionarTarefa}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.listaBox}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.listaBox}>
          {listaTarefas.map((tarefa, index) => (
            <View key={index} style={styles.cardTarefa}>
              <Text style={styles.textoTarefa}>· {tarefa}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#D1D1D6',
  },
  cardText: {
    fontSize: 16,
    color: '#1C1C1E',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D1D6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginRight: 10,
  },
  button: {
    width: 52,
    height: 52,
    backgroundColor: '#007AFF',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
  },
});
