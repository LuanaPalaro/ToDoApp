import React, {useState} from 'react'; 
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native/types_generated/index';

export default function App() {
  return (
    <View>
      <Text style={styles.tittle}> Minhas tarefas</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Digite o reparo necessário...'
          value={tarefaAtual}
          onChangeText={setTarefaAtual}
        />
        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdicionarTarefa} />
      </View>
      <ScrollView
      style={styles.scrollArea}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicador={false}
      >
        <View style={styles.listaBox}>
          {listaTarefas.map((tarefa, index)=>(
            <View key={index} style={styles.cardTarefa}>
              <Text style ={styles.textoTarefa}> • {tarefa} </Text>
          
        </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
