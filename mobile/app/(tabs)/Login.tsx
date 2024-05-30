import { Image, StyleSheet, TextInput, View, TouchableOpacity, Text, Button } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';

export default function HomeScreen() {
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');

  async function Logar(email: string, senha: string) {
    const credenciais = {
      email: email,
      senha: senha
    };
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MmVjNTFlMGNjYjBlNzQ5YTViMzY4ZiIsImVtYWlsIjoidmljdG9yQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxNTkxMDg1NCwiZXhwIjoxNzE1OTk3MjU0fQ.30cwWe_s_BIV4xbSx1_r7sHbdJBRLciAV4EAOGrP64Y';

    try {
      const response = await fetch('https://dolce-coffee-api.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(credenciais)
      });

      if (!response.ok) {
        throw new Error('Erro na requisição');
      }

      const dados = await response.json();
      console.log(dados);
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
