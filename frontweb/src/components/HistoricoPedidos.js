import React from 'react';
import '../App.css';

function HistoricoPedidos({ pedidos }) {
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
            {pedidos.map((pedido, index) => (
              <tr key={index} className={pedido.status === 'Confirmado' ? 'pedido-confirmado' : 'pedido-cancelado'}>
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