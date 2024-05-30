import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

interface Produto {
  nome: string;
  valor: number;
  qtd: number;
}

interface Pedido {
  _id: string;
  data: string;
  produtos: Produto[];
  status: boolean;
}

const Pedidos: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);


  useEffect(() => {
    async function fetchPedidos() {
      try {
        const token = Cookies.get('token');
        const config = {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response: AxiosResponse<{ arrayPedidos: Pedido[] }> = await axios.get('https://dolce-coffee-api.onrender.com/pedidos', config);
        setPedidos(response.data.arrayPedidos);
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
        } else {
          console.error('Erro ao buscar pedidos', error);
        }
      }
    }

    fetchPedidos();
  }, []);

  return (
    <ScrollView>
      <View>
        <Text>Seus Pedidos</Text>
      </View>
      <View >
        <View>
          <View>
            <Text>Pedido</Text>
            <Text>Data</Text>
            <Text>Produtos</Text>
            <Text>Status</Text>
          </View>
          {pedidos.map((pedido, index) => (
            <View key={index}>
              <Text>{pedido._id}</Text>
              <Text>{pedido.data}</Text>
              <View>
                {pedido.produtos.map((produto, i) => (
                  <Text key={i}>
                    {produto.nome} - {produto.valor} - {produto.qtd}
                  </Text>
                ))}
              </View>
              <Text>{pedido.status ? 'Confirmado' : 'Cancelado'}</Text>
            </View>
          ))}
        </View>
        <View>
          <TouchableOpacity>
            <Text>Página Inicial</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}


export default Pedidos;
