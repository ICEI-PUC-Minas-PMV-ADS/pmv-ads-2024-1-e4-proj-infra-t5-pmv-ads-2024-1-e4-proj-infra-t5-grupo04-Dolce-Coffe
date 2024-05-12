import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';



function HistoricoPedidos() {
  const [pedidos, setPedidos] = useState([])

  const navigate = useNavigate()

  const handleRedirect = () => {
    navigate('/login')
  };

  useEffect(() => {
    async function fetchPedidos() {
      try {
        const token = Cookies.get('token');
        const config = {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const response = await axios.get('https://dolce-coffee-api.onrender.com/pedidos', config);
        setPedidos(response.data.arrayPedidos);

      } catch (error) {
        if (error.response && error.response.status === 401) {
          handleRedirect()
        } else {
          console.error('Erro ao buscar pedidos', error);

        }

      }
    }

    fetchPedidos();
  }, []);

  return (
    <div>
      <header>
        <h1>Seus Pedidos</h1>
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
            {pedidos.map((pedido, index) => (
              <tr key={index} className={pedido.status ? 'pedido-confirmado' : 'pedido-cancelado'}>
                <td>{pedido._id}</td>
                <td>{pedido.data}</td>
                <td>
                  <ul>
                    {pedido.produtos.map((produto, i) => (
                      <li key={i}>
                        <span>{produto.nome}</span>
                        <span> - </span>
                        <span>{produto.valor}</span>
                        <span> - </span>
                        <span>{produto.qtd}</span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{pedido.status ? 'Confirmado' : 'Cancelado'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <section className="order-finalization">
        <a href="/"><button className="return-home">Página Inicial</button></a>
      </section>
      </main>
    </div>
  );
}

export default HistoricoPedidos;