import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';

function Menu() {
  return (
    <View style={styles.navbar}>
      <View style={styles.logo}>
        <Image source={require('./logo192.png')} style={styles.logoImage} />
        <Text style={styles.logoText}>Dolce Coffee</Text>
      </View>
      <View style={styles.navLinks}>
        <TouchableOpacity style={styles.navLink} onPress={() => window.location.href = '/historico'}>
          <Text style={styles.navLinkText}>Pedidos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navLink} onPress={() => window.location.href = '/carrinho'}>
          <Text style={styles.navLinkText}><i className="bi bi-cart3"></i></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navLink} onPress={() => window.location.href = '/login'}>
          <Text style={styles.navLinkText}><i className="bi bi-person-circle"></i></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function MainSection() {
  return (
    <View style={styles.mainSection}>
      <View style={styles.container}>
        <Text style={styles.title}>Confira Nosso</Text>
        <Text style={styles.subtitle}>Cardápio Completo</Text>
        <Text style={styles.description}>Descubra nossa variedade de cafés premium e bebidas artesanais em nosso cardápio digital. De grãos suaves a sabores intensos, cada xícara oferece uma experiência única. Explore conosco e desfrute de uma jornada de café incomparável.</Text>
      </View>
    </View>
  );
}

function QuartaSec({ handleAddToCart }) {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriaAtiva, setCategoriaAtiva] = useState('quente'); 
  const [sliderIndex, setSliderIndex] = useState(0); 

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const response = await axios.get('https://dolce-coffee-api.onrender.com/home');
        setProdutos(response.data.arrayProdutos);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar produtos', error);
        setLoading(false);
      }
    }

    fetchProdutos();
  }, []);

  const handleClickCategoria = (categoria) => {
    setCategoriaAtiva(categoria);
    setSliderIndex(0);
  };

  return (
    <View style={styles.quartaSec}>
      <View style={styles.container}>
        <View style={styles.categoryButtons}>
          <TouchableOpacity style={[styles.categoryButton, categoriaAtiva === 'quente' && styles.activeCategory]} onPress={() => handleClickCategoria('quente')}>
            <Text style={styles.categoryButtonText}>Cafés Quentes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.categoryButton, categoriaAtiva === 'gelado' && styles.activeCategory]} onPress={() => handleClickCategoria('gelado')}>
            <Text style={styles.categoryButtonText}>Cafés Gelados</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.categoryButton, categoriaAtiva === 'comida' && styles.activeCategory]} onPress={() => handleClickCategoria('comida')}>
            <Text style={styles.categoryButtonText}>Para Comer</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal={true} style={styles.sliderContainer}>
          {categoriaAtiva && produtos
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
  const handleAddToCart = (produto) => {
    console.log('Produto adicionado ao carrinho:', produto);
  };

  return (
    <View style={styles.container}>
      <Menu />
      <MainSection />
      <QuartaSec handleAddToCart={handleAddToCart} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'darkblue',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  logoText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navLink: {
    marginLeft: 20,
  },
  navLinkText: {
    color: 'white',
    fontSize: 20,
  },
  mainSection: {
    backgroundColor: 'lightblue',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  description: {
    marginBottom: 16,
  },
  quartaSec: {
    backgroundColor: 'lightgray',
    padding: 20,
  },
  categoryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  categoryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeCategory: {
    backgroundColor: 'darkblue',
  },
  sliderContainer: {
    flexDirection: 'row',
  },
  card: {
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    width: 150,
    height: 200,
  },
  cardImage: {
    width: '100%',
    height: '70%',
    resizeMode: 'cover',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardText: {
    fontSize: 14,
  },
});

export default Home;
