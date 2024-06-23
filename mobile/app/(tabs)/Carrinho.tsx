import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '@/context/AuthContext';

export default function Carrinho() {
  const [produtos, setProdutos] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('');
  const [notification, setNotification] = useState(false);

  const [carrinho, setCarrinho] = useState()


  const { sendOrder } = useContext(AuthContext)

  const calcularValorTotal = (carrinho) => {
    let total = 0;
    carrinho.forEach(produto => {
      if (produto.valorTotal) {
        total += parseFloat(produto.valorTotal);
      }
    });
    return total.toFixed(2);
  };

  useEffect(() => {
    const fetchProdutos = async () => {
      const carrinho = await AsyncStorage.getItem('carrinho');

      const carrinhoObjetos = JSON.parse(carrinho);

      const carrinhoProcessado = {}

      carrinhoObjetos.forEach(objeto => {
        const { nome, valor } = objeto; // Obtém nome e valor de cada objeto

        // Se já existe uma entrada para esse nome no contador, incrementa a quantidade
        if (carrinhoProcessado[nome]) {
          carrinhoProcessado[nome].quantidade++;
        } else {
          // Se não existe, cria uma nova entrada inicializando a quantidade com 1
          carrinhoProcessado[nome] = {
            nome,
            valor,
            quantidade: 1
          };
        }

        const resultadoArray = Object.values(carrinhoProcessado);
        setCarrinho(resultadoArray)

      });

    };

    fetchProdutos();
  }, []);

  const handleCreditCardClick = () => {
    setSelectedOption('Cartão de Crédito/Débito');
    console.log(carrinho)
  };

  const handleCashClick = () => {
    setSelectedOption('Dinheiro');
  };

  const handleDeliveryOption = (option) => {
    setDeliveryOption(option);
  };

  const limparCarrinho = async () => {
    setCarrinho([]);
    await AsyncStorage.clear();
    // Navegar para outra tela pode ser implementado aqui se necessário
  };

  const handleFinalizeOrder = () => {
    if (selectedOption && deliveryOption) {
      const numeroPedido = Math.floor(Math.random() * 10000) + 1;
      Alert.alert('Pedido gerado com sucesso!', `Nº ${numeroPedido}`);

      // limparCarrinho();
    } else {
      setNotification(true);
      setTimeout(() => {
        setNotification(false);
      }, 1000);
    }
  };


  const TesteEnvio = async () => {
    console.log('Enviando pedido...');

    const carrinho = {
      produtos: [{ nome: 'Super Moccha', quantidade: 1, valor: 15.5 }],
      valor_total: 20
    };

    await sendOrder(carrinho); // Chama sendOrder com o objeto carrinho
  };



  const aumentarQuantidade = (id_produto) => {
    const novosProdutos = produtos.map(produto => {
      if (produto._id === id_produto) {
        const novaQuantidade = (produto.quantidade || 0) + 1;
        produto.quantidade = novaQuantidade;
        produto.valorTotal = produto.valor * novaQuantidade;
      }
      return produto;
    });
    setProdutos(novosProdutos);
  };

  const diminuirQuantidade = (id_produto) => {
    const novosProdutos = produtos.map(produto => {
      if (produto._id === id_produto) {
        const novaQuantidade = produto.quantidade - 1;
        if (novaQuantidade <= 0) {
          return null;
        } else {
          produto.quantidade = novaQuantidade;
          produto.valorTotal = produto.valor * novaQuantidade;
        }
      }
      return produto;
    }).filter(Boolean);
    setProdutos(novosProdutos);
  };

  const removerProduto = (id_produto) => {
    const novosProdutos = produtos.filter(produto => produto._id !== id_produto);
    setProdutos(novosProdutos);
    AsyncStorage.removeItem(`produto_${id_produto}`);
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Carrinho</Text>
        <TouchableOpacity onPress={TesteEnvio} style={{ marginTop: '50%', padding: 3, backgroundColor: 'green' }}>
          <Text style={{ fontSize: 20, color: 'white' }}>TESTAR REQUISICAO</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Itens no Carrinho</Text>
        {/* <View style={styles.produtoContainer}> */}
        {carrinho && carrinho.map((produto, indice) => (
          <View key={produto._id} style={styles.produtoContainer}>
            <View style={styles.produtoInfo}>
              <Text>Produto: {produto.nome}</Text>
              <View style={styles.quantidadeContainer}>
                <TouchableOpacity onPress={() => diminuirQuantidade(produto._id)} style={styles.button}>
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantidadeText}>{produto.quantidade || 0}</Text>
                <TouchableOpacity onPress={() => aumentarQuantidade(produto._id)} style={styles.button}>
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>
              <Text>Valor: R$ {produto.valor ? (produto.valor * (produto.quantidade || 1)).toFixed(2) : '0.00'}</Text>
            </View>
            <TouchableOpacity onPress={() => removerProduto(produto._id)} style={styles.removeButton}>
              <Text style={styles.removeButtonText}>Remover</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalTitle}>Total:</Text>
        <Text style={styles.totalPrice}>R$ {calcularValorTotal(produtos)}</Text>
      </View>
      <View style={styles.paymentMethods}>
        <Text>Forma de Pagamento:</Text>
        <TouchableOpacity
          onPress={handleCreditCardClick}
          style={[
            styles.paymentButton,
            selectedOption === 'Cartão de Crédito/Débito' && styles.selectedPaymentButton
          ]}
        >
          <Text style={[styles.buttonText, selectedOption === 'Cartão de Crédito/Débito' && styles.selectedButtonText]}>Cartão de Crédito/Débito</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleCashClick}
          style={[
            styles.paymentButton,
            selectedOption === 'Dinheiro' && styles.selectedPaymentButton
          ]}
        >
          <Text style={[styles.buttonText, selectedOption === 'Dinheiro' && styles.selectedButtonText]}>Dinheiro</Text>
        </TouchableOpacity>
        {selectedOption && (
          <View style={styles.selectedOptionContainer}>
            <Text>Forma de Pagamento Selecionada: {selectedOption}</Text>
          </View>
        )}
      </View>
      {selectedOption && (
        <View style={styles.deliveryOptions}>
          <Text>Forma de Entrega:</Text>
          <TouchableOpacity
            onPress={() => handleDeliveryOption('Retirada na Loja')}
            style={[
              styles.deliveryButton,
              deliveryOption === 'Retirada na Loja' && styles.selectedDeliveryButton
            ]}
          >
            <Text style={[styles.buttonText, deliveryOption === 'Retirada na Loja' && styles.selectedButtonText]}>Retirada na Loja</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDeliveryOption('Entrega Domiciliar')}
            style={[
              styles.deliveryButton,
              deliveryOption === 'Entrega Domiciliar' && styles.selectedDeliveryButton
            ]}
          >
            <Text style={[styles.buttonText, deliveryOption === 'Entrega Domiciliar' && styles.selectedButtonText]}>Entrega Domiciliar</Text>
          </TouchableOpacity>
          {deliveryOption && (
            <View style={styles.selectedOptionContainer}>
              <Text>Forma de Entrega Selecionada: {deliveryOption}</Text>
            </View>
          )}
        </View>
      )}
      {notification && (
        <View style={styles.notification}>
          <Text>Por favor, selecione a forma de pagamento e a forma de entrega.</Text>
        </View>
      )}
      <View style={styles.orderFinalization}>
        <Button title="Finalizar Pedido" onPress={handleFinalizeOrder} color="#8B4513" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  produtoContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  produtoInfo: {
    marginBottom: 10,
  },
  quantidadeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#8B4513',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  quantidadeText: {
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  removeButton: {
    marginTop: 10,
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  totalContainer: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  totalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  paymentMethods: {
    padding: 20,
  },
  paymentButton: {
    backgroundColor: '#FFA500', // Laranja
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedPaymentButton: {
    backgroundColor: '#808080', // Cinza
  },
  selectedOptionContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 5,
  },
  deliveryOptions: {
    padding: 20,
  },
  deliveryButton: {
    backgroundColor: '#008000', // Verde
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedDeliveryButton: {
    backgroundColor: '#808080', // Cinza
  },
  selectedButtonText: {
    color: '#000', // Preto
  },
  notification: {
    padding: 20,
    backgroundColor: '#ffdddd',
    borderRadius: 10,
    marginBottom: 20,
  },
  orderFinalization: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
