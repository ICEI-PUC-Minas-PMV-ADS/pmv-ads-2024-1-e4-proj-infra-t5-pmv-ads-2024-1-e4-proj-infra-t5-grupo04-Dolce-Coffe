import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 

function FinalizarPedido() {
  const [selectedOption, setSelectedOption] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('');
  const navigate = useNavigate();

  const handleCreditCardClick = () => {
    setSelectedOption('Forma de Pagamento Selecionada: Cartão de Crédito/Débito');
  };

  const handleCashClick = () => {
    setSelectedOption('Forma de Pagamento Selecionada: Dinheiro');
  };

  const handleDeliveryOption = (option) => {
    setDeliveryOption(`Forma de Entrega Selecionada: ${option}`);
  };

  const handleFinalizeOrder = () => {
    // adicionar a lógica para finalizar o pedido, por exemplo, enviar os dados para o servidor sei la xD
    alert('Pedido Confirmado! Seu pedido será preparado em breve.');
    // Redireciona para a página de histórico de pedidos após clicar em OK no alerta
    window.location.href = '/historico';
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

        {selectedOption && (
          <div className="delivery-options">
            <p>Forma de Entrega:</p>
            <button onClick={() => handleDeliveryOption('Retirada na Loja')}>Retirada na Loja</button>
            <button onClick={() => handleDeliveryOption('Entrega Domiciliar')}>Entrega Domiciliar</button>
          </div>
        )}

        {deliveryOption && (
          <div id="delivery-selected">{deliveryOption}</div>
        )}
      </section>
      <section className="order-finalization">
        <button className="finalize-order" onClick={handleFinalizeOrder}>Finalizar Pedido</button>
        <a href="/"><button className="return-home">Página Inicial</button></a>
      </section>
    </main>
  );
}

export default FinalizarPedido;
