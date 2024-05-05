import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';



function HistoricoPedidos() {
  const [pedidos,setPedidos] = useState([])

  const navigate = useNavigate()

  const handleRedirect = () => {
    navigate('/login')
  };

  useEffect(() => {
    async function fetchPedidos() {
      try {
        const token = Cookies.get('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
    
        //const response = await axios.get('https://dolce-coffee-api.onrender.com/pedidos', config);
        const response = await axios.get('http://localhost:5000/historico', config);
        setPedidos(response.data.arrayPedidos);

      } catch (error) {
        if(error.response && error.response.status === 401){
          handleRedirect()
        } else {
          console.error('Erro ao buscar produtos', error);

        }
     
      }
    }

    fetchPedidos();
  }, []);

  return (
    <div>
      <header>
        <h1>Histórico de Pedidos - @name/usuario</h1>
      </header>
      <main>
        <table>
          <thead>
            <tr>
              <th>Pedido</th>
              <th>Data</th>
              <th>Produtos</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr className={pedido.status === 'Confirmado' ? 'pedido-confirmado' : 'pedido-cancelado'}>
                <td>{pedido.numero}</td>
                <td>{pedido.data}</td>
                <td>{pedido.produtos}</td>
                <td>{pedido.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default HistoricoPedidos;