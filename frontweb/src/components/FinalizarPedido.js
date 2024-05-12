import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 

function FinalizarPedido() {
  const [selectedOption, setSelectedOption] = useState('');

  const handleCreditCardClick = () => {
    setSelectedOption('Forma de Pagamento Selecionada: Cartão de Crédito/Débito');
  };

  const handleCashClick = () => {
    setSelectedOption('Forma de Pagamento Selecionada: Dinheiro');
  };

  return (
    <main className="main">
      <section className="summary">
        <h2>Resumo da Compra</h2>
        <table>
          <tbody>
            <tr>
              <th>Subtotal:</th>
              <td>R$ 240,00</td>
            </tr>
            <tr>
              <th>Taxa de Entrega:</th>
              <td>R$ 0,00</td>
            </tr>
            <tr>
              <th>Quantidade de Produtos:</th>
              <td>2</td>
            </tr>
            <tr className="total">
              <th>Total da Compra:</th>
              <td>R$ 240,00</td>
            </tr>
          </tbody>
        </table>
        <hr />
        <h4>*Pagamento somente na entrega </h4>
        <div className="payment-methods">
          <p>Forma de Pagamento:</p>
          <button id="credit-card" onClick={handleCreditCardClick}><i className="bi bi-credit-card"></i>Cartão de Crédito/Débito</button>
          <button id="cash" onClick={handleCashClick}><i className="bi bi-cash"></i>Dinheiro</button>
        </div>
        <div id="selected-option">{selectedOption}</div>            
      </section>
      <section className="order-finalization">
        <button className="finalize-order">Finalizar Pedido</button>
        <a href="/"><button className="return-home">Página Inicial</button></a>
      </section>
    </main>
  );
}

export default FinalizarPedido;
