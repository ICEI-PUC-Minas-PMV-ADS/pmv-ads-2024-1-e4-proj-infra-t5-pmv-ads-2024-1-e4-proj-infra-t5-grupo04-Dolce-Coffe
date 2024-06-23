import { Image, StyleSheet, TextInput, View, TouchableOpacity, Text, Button,TouchableWithoutFeedback,Keyboard  } from 'react-native';
import { useContext, useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '@/context/AuthContext';


export default function Login() {
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');

  const data = {email,senha}

  const {signIn} = useContext(AuthContext)

  async function handleSignIn(data) {
    await signIn(data)
}



  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
          <Button title='Entrar' onPress={() => handleSignIn(data)} color="#8B4513" />
        </View>
      </View>
    </View>
    </TouchableWithoutFeedback>
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
