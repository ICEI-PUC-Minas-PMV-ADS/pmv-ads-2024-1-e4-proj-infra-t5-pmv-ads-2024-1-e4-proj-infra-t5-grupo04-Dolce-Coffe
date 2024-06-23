import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



interface Produto {
  _id: string;
  nome: string;
  valor: number;
  desc: string;
  tipo: string;
  url_foto: string;
}


interface QuartaSecProps {
  handleAddToCart: (produto: Produto) => void;
}

function MainSection() {
  return (
    <ImageBackground
      source={{
        uri: 'https://images.pexels.com/photos/15076694/pexels-photo-15076694/free-photo-of-coffee.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1.pnj',
      }}
      style={styles.mainSection}
      imageStyle={styles.imageBackground}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Confira Nosso</Text>
        <Text style={styles.subtitle}>Cardápio Completo</Text>
        <Text style={styles.description}>
          Descubra nossa variedade de cafés premium e bebidas artesanais em nosso cardápio digital.
        </Text>
      </View>
    </ImageBackground>
  );
}

function QuartaSec({ handleAddToCart }: QuartaSecProps) {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>('quente');

  useEffect(() => {

    const getProdutos = async () => {
      try {
        const response = await fetch('https://dolce-coffee-api.onrender.com/home', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Erro na requisição');
        }

        const data = await response.json();
        setProdutos(data.arrayProdutos);
      } catch (err) {
        console.error(err);
      }
    };

    getProdutos();

  }, []);

  const handleClickCategoria = (categoria: string) => {
    setCategoriaAtiva(categoria);
  };

  return (
    <View style={styles.quartaSec}>
      <View style={styles.container}>
        <View style={styles.categoryButtons}>
          <TouchableOpacity
            style={[styles.categoryButton, categoriaAtiva === 'quente' && styles.activeCategory]}
            onPress={() => handleClickCategoria('quente')}
            activeOpacity={0.10}
          >
            <Text style={styles.categoryButtonText}>Cafés Quentes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.categoryButton, categoriaAtiva === 'gelado' && styles.activeCategory]}
            onPress={() => handleClickCategoria('gelado')}
            activeOpacity={0.10}
          >
            <Text style={styles.categoryButtonText}>Cafés Gelados</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.categoryButton, categoriaAtiva === 'comida' && styles.activeCategory]}
            onPress={() => handleClickCategoria('comida')}
            activeOpacity={0.10}
          >
            <Text style={styles.categoryButtonText}>Para Comer</Text>
          </TouchableOpacity>
        </View>
        {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sliderContainer}>  verificar como ocultar a barra de scroll*/}
        <ScrollView horizontal style={styles.sliderContainer}>
          {categoriaAtiva &&
            produtos
              .filter((produto) => produto.tipo === categoriaAtiva)
              .map((produto) => (
                <TouchableOpacity key={produto._id} style={styles.card} onPress={() => handleAddToCart(produto)}>
                  <Image source={{ uri: produto.url_foto }} style={styles.cardImage} />
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{produto.nome}</Text>
                    <Text style={styles.cardText}>Valor: R$ {produto.valor}</Text>
                    <Text style={styles.cardText}>{produto.desc}</Text>
                  </View>
                </TouchableOpacity>
              ))}
        </ScrollView>
      </View>
    </View>
  );
}

function Home() {
  
  const [cart, setCart] = useState<Produto[]>([]);


  const handleAddToCart = async (produto: Produto) => {
    const updatedCart = [...cart, produto];

    setCart(updatedCart);

    console.log('Produto adicionado: ', produto)

    try {
      await AsyncStorage.setItem('carrinho', JSON.stringify(updatedCart));
    } catch (error) {
      console.error('Erro ao salvar o carrinho:', error);
    }

  };

  return (
    <View >
      <MainSection />
      <QuartaSec handleAddToCart={handleAddToCart} />
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
  },
  mainSection: {
    width: '100%',
    height: hp('50%'),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  imageBackground: {
    resizeMode: 'cover',
  },
  overlay: {
    backgroundColor: 'rgba(10, 10, 10, 0.8)',
    padding: wp('5%'),
    width: '100%',
  },
  title: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    marginBottom: hp('1%'),
    color: '#fff',
  },
  subtitle: {
    fontSize: wp('4%'),
    marginBottom: hp('1%'),
    color: '#fff',
  },
  description: {
    marginBottom: hp('1%'),
    fontSize: wp('3%'),
    color: '#fff',
  },
  quartaSec: {
    backgroundColor: 'lightgray',
    padding: hp('1%'),
  },
  categoryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('2%'),
  },
  categoryButton: {
    backgroundColor: '#8B4513',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('3%'),
    borderRadius: 8,
  },
  categoryButtonText: {
    color: 'white',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  activeCategory: {
    backgroundColor: '#666',
  },

  sliderContainer: {
    flexDirection: 'row',
    overflow: 'hidden',
  },

  card: {
    marginRight: wp('2%'),
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    width: wp('40%'),
    height: hp('30%'),
  },
  cardImage: {
    width: '100%',
    height: '70%',
    resizeMode: 'cover',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  cardContent: {
    padding: wp('2%'),
  },
  cardTitle: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    marginBottom: hp('0.5%'),
  },
  cardText: {
    fontSize: wp('3.5%'),
  },
});

export default Home;