import { Image, StyleSheet, TextInput, View, TouchableOpacity, Text, Button } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');


const salvaToken = async(token:string) => {
  try{
    await AsyncStorage.setItem('@auth_token',token)
  }catch(error){
    console.error('Falha ao salvar o token', error)
  }
}



  async function Logar(email: string, senha: string) {
    const credenciais = {
      email: email,
      senha: senha
    };

    try {
      const response = await fetch('https://dolce-coffee-api.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credenciais)
      });

      if (!response.ok) {
        throw new Error('Erro na requisição');
      }

      const data = await response.json();
      if (data) {
        await salvaToken(data.token)
        console.log(`Token Salvo: ${data.token}`)
      }
 
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require('@/assets/images/banner-login1.jpg')}
        style={styles.backgroundImage}
      />
      <View style={styles.container}>
        <ThemedText type="title" style={styles.bemVindo}>Bem Vindo</ThemedText>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder='Insira seu email'
          placeholderTextColor="#000" 
        />
        <TextInput
          style={styles.input}
          onChangeText={setSenha}
          value={senha}
          placeholder='Insira sua senha'
          secureTextEntry={true} 
          placeholderTextColor="#000" 
        />
        <View style={styles.buttonContainer}>
          <Button title='Entrar' onPress={() => Logar(email, senha)} color="#8B4513" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bemVindo: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#FFF',
  },
  input: {
    height: 50, 
    width: '80%', 
    marginVertical: 10, 
    paddingHorizontal: 20, 
    borderColor: '#FFF', 
    borderWidth: 1, 
    borderRadius: 10, 
    backgroundColor: '#FFF', 
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.9, 
  },
  buttonContainer: {
    width: '80%', 
    marginVertical: 10,
  },
});
