import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '@/context/AuthContext';

export default function Carrinho() {
  const [produtos, setProdutos] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('');
  const [notification, setNotification] = useState(false);
  const { sendOrder } = useContext(AuthContext);

  const calcularValorTotal = (produtos) => {
    let total = 0;
    produtos.forEach(produto => {
      if (produto.valorTotal) {
        total += parseFloat(produto.valorTotal);
      }
    });
    return total.toFixed(2);
  };

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const carrinho = await AsyncStorage.getItem('carrinho');
        if (!carrinho) {
          console.log('Carrinho vazio');
          return;
        }
        const carrinhoObjetos = JSON.parse(carrinho);
        const produtosProcessados = carrinhoObjetos.map(produto => {
          return {
            ...produto,
            quantidade: produto.quantidade || 1,
            valorTotal: produto.valor * (produto.quantidade || 1)
          };
        });
        setProdutos(produtosProcessados); 
      } catch (error) {
        console.error('Erro ao processar o carrinho:', error);
      }
    };
    fetchProdutos();
  }, []);
  
  const handleCreditCardClick = () => {
    setSelectedOption('Cartão de Crédito/Débito');
  };

  const handleCashClick = () => {
    setSelectedOption('Dinheiro');
  };

  const handleDeliveryOption = (option) => {
    setDeliveryOption(option);
  };

  const limparCarrinho = async () => {
    setProdutos([]);
    await AsyncStorage.clear();
  };

  const handleFinalizeOrder = async () => {
    if (selectedOption && deliveryOption) {
      const numeroPedido = Math.floor(Math.random() * 10000) + 1;
      Alert.alert('Pedido gerado com sucesso!', `Nº ${numeroPedido}`);

      const agrupados = produtos.reduce((acc, produto) => {
        const { nome, valor } = produto;
        if (!acc[nome]) {
          acc[nome] = { nome, valor, qtd: 0, valor_total: 0 };
        }
        acc[nome].qtd += 1;
        acc[nome].valor_total += valor * produto.quantidade;
        return acc;
      }, {});

      const produtosAgrupados = Object.values(agrupados);
      const valor_total = produtosAgrupados.reduce((total, produto) => total += produto.valor_total, 0);

      const resultado = {
        produtos: produtosAgrupados,
        valor_total
      };

      sendOrder(resultado);
      limparCarrinho();
    } else {
      setNotification(true);
      setTimeout(() => {
        setNotification(false);
      }, 1000);
    }
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
    updateAsyncStorage(novosProdutos);
  };

  const diminuirQuantidade = (id_produto) => {
    const novosProdutos = produtos.map(produto => {
      if (produto._id === id_produto) {
        const novaQuantidade = produto.quantidade - 1;
        if (novaQuantidade > 0) {
          produto.quantidade = novaQuantidade;
          produto.valorTotal = produto.valor * novaQuantidade;
        }
      }
      return produto;
    }).filter(Boolean);
    setProdutos(novosProdutos);
    updateAsyncStorage(novosProdutos);
  };

  const removerProduto = (id_produto) => {
    const novosProdutos = produtos.filter(produto => produto._id !== id_produto);
    setProdutos(novosProdutos);
    updateAsyncStorage(novosProdutos);
  };

  const updateAsyncStorage = async (produtos) => {
    await AsyncStorage.setItem('carrinho', JSON.stringify(produtos));
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Carrinho</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Itens no Carrinho</Text>
        {produtos.map((produto) => (
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
              <Text>Valor: R$ {produto.valorTotal.toFixed(2)}</Text>
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
          <Text style={[styles.buttonText, selectedOption === 'Cartão de Crédito/Débito' && styles.selectedButtonText]}>
            Cartão de Crédito/Débito
          </Text>
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
    shadowRadius: 8,
    elevation: 5,
  },
  produtoInfo: {
    marginBottom: 10,
  },
  quantidadeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantidadeText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#8B4513',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderTopWidth: 1,
    borderColor: '#e9ecef',
  },
  totalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28a745',
  },
  paymentMethods: {
    padding: 20,
  },
  paymentButton: {
    backgroundColor: '#8B4513',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedPaymentButton: {
    backgroundColor: '#28a745',
  },
  selectedOptionContainer: {
    marginTop: 10,
  },
  selectedButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deliveryOptions: {
    padding: 20,
  },
  deliveryButton: {
    backgroundColor: '#8B4513',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedDeliveryButton: {
    backgroundColor: '#28a745',
  },
  notification: {
    padding: 20,
    backgroundColor: '#ffc107',
    alignItems: 'center',
  },
  orderFinalization: {
    padding: 20,
  },
});

