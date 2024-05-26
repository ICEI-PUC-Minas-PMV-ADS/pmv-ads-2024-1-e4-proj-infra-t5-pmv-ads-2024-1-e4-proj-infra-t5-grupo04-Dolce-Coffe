import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Cart() {
  const [produtos, setProdutos] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('');

  const navigate = useNavigate();

  const calcularValorTotal = (produtos) => {
    let total = 0;
    produtos.forEach(produto => {
      total += produto.valor * produto.quantidade;
    });
    return total;
  };

  useEffect(() => {
    const produtosLocalStorage = [];
    let total = 0;
  
    for (let index = 0; index < localStorage.length; index++) {
      const key = localStorage.key(index);
  
      if (key.includes("produto_")) {
        const produto = JSON.parse(localStorage.getItem(key));
        total += produto.valor * produto.quantidade;
        produtosLocalStorage.push(produto);
      }
    }
  
    setProdutos(produtosLocalStorage);
    setValorTotal(total);
  }, []);
  

  const excluirProduto = (id_produto) => {
    localStorage.removeItem("produto_" + id_produto);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  const handleCreditCardClick = () => {
    setSelectedOption('Cartão de Crédito/Débito');
  }

  const handleCashClick = () => {
    setSelectedOption('Dinheiro');
  }

  const handleDeliveryOption = (option) => {
    setDeliveryOption(option);
  }

  const handleFinalizeOrder = () => {
    const numeroPedido = Math.floor(Math.random() * 10000) + 1;
    alert(`Pedido gerado com sucesso! Nº ${numeroPedido}`);
  }

  return (
    <div>
      <header>
        <span className="bi bi-cart"><b>Carrinho</b></span>
      </header>
      <main>
        <section className="summary">
          <h2>Itens no Carrinho</h2>
          {produtos.map((produto) => (
            <div key={produto._id} className="produto-container">
              <div className="produto-info">
                <p>Produto: {produto.nome}</p>
                <p>Quantidade: {produto.quantidade}</p>
                <p>Valor: R$ {produto.valor.toFixed(2)}</p>
                <button onClick={() => excluirProduto(produto._id)}>Remover</button>
              </div>
              <div className="produto-image">
                <img src={produto.url_foto} alt={produto.nome} />
              </div>
            </div>
          ))}


        </section>
        <hr />
        <section className="total-section">
          <h2>Total:</h2>
          <div className="total-price">R$ {valorTotal.toFixed(2)}</div>
        </section>
        <div className="payment-methods">
          <h5>Forma de Pagamento:</h5>
          <button id="credit-card" onClick={handleCreditCardClick}><i className="bi bi-credit-card"></i>Cartão de Crédito/Débito</button>
          <button id="cash" onClick={handleCashClick}><i className="bi bi-cash"></i>Dinheiro</button>
        </div>
        <div id="selected-option">{selectedOption}</div>

        {selectedOption && (
          <div className="delivery-options">
            <h5>Forma de Entrega:</h5>
            <button onClick={() => handleDeliveryOption('Retirada na Loja')}>Retirada na Loja</button>
            <button onClick={() => handleDeliveryOption('Entrega Domiciliar')}>Entrega Domiciliar</button>
          </div>
        )}

        {deliveryOption && (
          <div id="delivery-selected">{deliveryOption}</div>
        )}
      </main>

      <section className="order-finalization">
        <button className="finalize-order" onClick={handleFinalizeOrder}>Finalizar Pedido</button>
        <a href="/"><button className="return-home">Página Inicial</button></a>
      </section>
    </div>
  );
}

export default Cart;
