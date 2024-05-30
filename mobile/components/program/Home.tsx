// components/Home.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
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
    <View style={styles.mainSection}>
      <View >
        <Text style={styles.title}>Confira Nosso</Text>
        <Text style={styles.subtitle}>Cardápio Completo</Text>
        <Text style={styles.description}>
          Descubra nossa variedade de cafés premium e bebidas artesanais em nosso cardápio digital.
          De grãos suaves a sabores intensos, cada xícara oferece uma experiência única.
          Explore conosco e desfrute de uma jornada de café incomparável.
        </Text>
      </View>
    </View>
  );
}

function QuartaSec({ handleAddToCart }: QuartaSecProps) {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>('quente');

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const response = await axios.get('https://dolce-coffee-api.onrender.com/home', {
          headers: {
            Authorization: 'Bearer SEU_TOKEN_AQUI', // Substitua SEU_TOKEN_AQUI pelo seu token real
          },
        });
        setProdutos(response.data.arrayProdutos);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar produtos', error);
        setLoading(false);
      }
    }

    fetchProdutos();
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
          >
            <Text style={styles.categoryButtonText}>Cafés Quentes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.categoryButton, categoriaAtiva === 'gelado' && styles.activeCategory]}
            onPress={() => handleClickCategoria('gelado')}
          >
            <Text style={styles.categoryButtonText}>Cafés Gelados</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.categoryButton, categoriaAtiva === 'comida' && styles.activeCategory]}
            onPress={() => handleClickCategoria('comida')}
          >
            <Text style={styles.categoryButtonText}>Para Comer</Text>
          </TouchableOpacity>
        </View>
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
  const handleAddToCart = (produto: Produto) => {
    console.log('Produto adicionado ao carrinho:', produto);
  };

  return (
    <View >
      <MainSection />
      <QuartaSec handleAddToCart={handleAddToCart} />
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'darkblue',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('5%'),
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: wp('7%'),
    height: hp('7%'),
    marginRight: wp('2%'),
  },
  logoText: {
    color: 'white',
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navLink: {
    marginLeft: wp('4%'),
  },
  navLinkText: {
    color: 'white',
    fontSize: wp('4%'),
  },
  mainSection: {
    backgroundColor: 'lightblue',

  },
  title: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    marginBottom: hp('1%'),
  },
  subtitle: {
    fontSize: wp('5%'),
    marginBottom: hp('2%'),
  },
  description: {
    marginBottom: hp('2%'),
    fontSize: wp('4%'),
  },
  quartaSec: {
    backgroundColor: 'lightgray',
    padding: hp('2%'),
  },
  categoryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('2%'),
  },
  categoryButton: {
    backgroundColor: 'blue',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('4%'),
    borderRadius: 5,
  },
  categoryButtonText: {
    color: 'white',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  activeCategory: {
    backgroundColor: 'darkblue',
  },
  sliderContainer: {
    flexDirection: 'row',
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