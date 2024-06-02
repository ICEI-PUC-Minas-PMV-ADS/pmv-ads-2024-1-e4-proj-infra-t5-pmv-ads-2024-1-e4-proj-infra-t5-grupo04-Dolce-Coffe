import { Image, StyleSheet, TextInput, View, TouchableOpacity, Text, Button } from 'react-native';
import { useEffect, useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Carrinho() {

    const [pedidos, setPedidos] = useState([])

    useEffect(() => {

        const fetchPedidos = async () => {
            try {
                const token = await getToken()
                if (token) {
                    await getProdutos(token)
                }
            } catch (error) {
                console.error('Erro ao buscar pedidos', error)
            }
        }

        const getToken = async () => {
            try {
                const token = await AsyncStorage.getItem('@auth_token');
                return token;
            } catch (e) {
                console.error('Falha ao recuperar o token', e);
            }
        }

        const getProdutos = async (token: string) => {
            try {
                const response = await fetch('https://dolce-coffee-api.onrender.com/pedidos', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                });

                if (!response.ok) {
                    throw new Error('Erro na requisição');
                }

                const data = await response.json();
                setPedidos(data.arrayPedidos);
            } catch (err) {
                console.error(err);
            }
        };

        fetchPedidos();

    }, []);






    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <ThemedText type="title" style={styles.titulo}>Seu Carrinho</ThemedText>
            </View>

            <View style={styles.container}>
                 {pedidos.map((pedido) => (
                    <View style={styles.cardPedido} key={pedido._id}>
                        <View >
                            <Text style={styles.tituloCard}>
                                Pedido #{pedido._id}
                            </Text>
                            <Text style={styles.data}>
                                Realizado em {pedido.data}
                            </Text>
                            {pedido.produtos.map((produto, idx) => (
                                <View key={idx} style={styles.itens}>
                                    <Text style={styles.item}>
                                        Item: {produto.nome}
                                    </Text>
                                    <Text style={styles.quantidade}>
                                        Quantidade: {produto.qtd}
                                    </Text>
                                </View>
                            ))}
                            <Text style={styles.valor}>
                                R$: {pedido.valor_total}
                            </Text>
                        </View>
                    </View>
                ))} 

            </View>
            <View style={styles.containerBotao}>
            <Button title='Finalizar' color="#8B4513" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

  containerBotao:{
    justifyContent: 'center',
    borderRadius:100,
    padding:15,
    width:'30%'
  },

    cardPedido: {
        position: 'relative',
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#FFF',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
        width: '80%',
    },
    tituloCard: {
        fontWeight: '600', // semibold
        fontSize: 16,
        marginBottom: 1,
    },
    data: {
        fontSize: 12,
        fontWeight: '400', // regular (um pouco mais fino que regular)
        opacity: 0.5,
        marginBottom: 10,
    },
    itens: {
        marginBottom: 10,
    },
    item: {
        fontWeight: '600', // semibold
        fontSize: 14,
    },
    quantidade: {
        fontSize: 12,
        opacity: 0.5,
    },
    valor: {
        fontWeight: '600', // semibold
        fontSize: 30,
        textAlign: 'right',
    },

    header: {
        position: 'absolute',
        top: 0,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    titulo: {
        top: 0,
        fontWeight: '300',
        textAlign: 'center',
        marginBottom: 10,
        color: 'black',
    },

});
