import { Image, StyleSheet, Platform, SafeAreaView, TextInput, Button } from 'react-native';
import { useEffect, useState } from 'react'

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';



export default function HomeScreen() {

  interface Produto {
    _id: string
    nome: string
  }

  interface Produtos {
    arrayProdutos: Produto[]
  }

  const [produtos, setProdutos] = useState<Produtos>({ arrayProdutos: [] });

  function Chama() {

    //let token ='xablau'
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MmVjNTFlMGNjYjBlNzQ5YTViMzY4ZiIsImVtYWlsIjoidmljdG9yQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxNTkxMDg1NCwiZXhwIjoxNzE1OTk3MjU0fQ.30cwWe_s_BIV4xbSx1_r7sHbdJBRLciAV4EAOGrP64Y'

    try {
      const response = fetch('https://dolce-coffee-api.onrender.com/home', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        // body: JSON.stringify(token)
      })
        .then(response => {
          // if(!response.ok){
          //   // throw new Error('Erro na requisiçao')
          //   console.log()
          // }
          return response.json();
        })
        .then(dados => {
          setProdutos(dados);
        })
    } catch (err) {
      console.error(err)
    }
  }

  const [senha, onChangeSenha] = useState('');
  const [email, onChangeEmail] = useState('');

  function Logar(email: string, senha: string) {

    const credenciais = {
      email: email,
      senha: senha
    }

    try {
      const response = fetch('https://dolce-coffee-api.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credenciais)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro na requisiçao')
          }
          return response.json();
        })
        .then(dados => {
          console.log(dados)
        })
    } catch (err) {
      console.error(err)
    }

  }


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>

        <SafeAreaView>
          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            value={email}
            placeholder='Insira seu email'
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeSenha}
            value={senha}
            placeholder='Insira sua senha'
          />
          <Button title='Entrar' onPress={() => Logar(email, senha)} />
        </SafeAreaView>

        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it teste</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>


      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Fazendo GET</ThemedText>
        <ThemedText>
          Fazendo as requisicoes
        </ThemedText>

        <ThemedText>
          {produtos.arrayProdutos.map(produto => (
              <ThemedText type="title">{produto.nome}</ThemedText>
            ))}
        </ThemedText>

        <Button title='CHAMAR PRODUTOS' onPress={() => Chama()} />
      </ThemedView>



    </ParallaxScrollView>
  );
}



const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
