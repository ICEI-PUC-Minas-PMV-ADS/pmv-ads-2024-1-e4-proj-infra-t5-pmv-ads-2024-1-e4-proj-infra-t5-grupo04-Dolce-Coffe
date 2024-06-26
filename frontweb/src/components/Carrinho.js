import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'
import Cookies from 'js-cookie'


function Cart() {
  const [produtos, setProdutos] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('');
  const [notification, setNotification] = useState(false);
  const navigate = useNavigate();

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
    const produtosLocalStorage = [];
    for (let index = 0; index < localStorage.length; index++) {
      const key = localStorage.key(index);
      if (key.includes("produto_")) {
        const produto = JSON.parse(localStorage.getItem(key));
        produto.valorTotal = produto.valor || 0;
        if (!produto.quantidade || produto.quantidade === 0) {
          produto.quantidade = 1;
        }
        produtosLocalStorage.push(produto);
      }
    }
    setProdutos(produtosLocalStorage);
  }, []);

  const handleCreditCardClick = () => {
    setSelectedOption('Cartão de Crédito/Débito');
  }

  const handleCashClick = () => {
    setSelectedOption('Dinheiro');
  }

  const handleDeliveryOption = (option) => {
    setDeliveryOption(option);
  }

  const limparCarrinho = () => {
    setProdutos([]); // Limpar o carrinho
    localStorage.clear(); // Limpar os dados no armazenamento local
    navigate('/historico'); // Redirecionar para a página de histórico imediatamente
  };

  const handleFinalizeOrder = async (produtos) => {
    if (selectedOption && deliveryOption) {
      const numeroPedido = Math.floor(Math.random() * 10000) + 1;
      alert(`Pedido gerado com sucesso! Nº ${numeroPedido}`);
      limparCarrinho();

      const agrupados = produtos.reduce((acc, produto) => {
        const { nome, valor } = produto;
        if (!acc[nome]) {
          acc[nome] = { nome, valor, qtd: 0, valor_total: 0 };
        }
        acc[nome].qtd += 1;
        acc[nome].valor_total += valor;
        return acc;
      }, {});

      const produtosAgrupados = Object.values(agrupados);

      // Calculando o valor total de todos os produtos
      const valor_total = produtosAgrupados.reduce((total, produto) => total += produto.valor_total, 0);

      // Montando o resultado final
      const resultado = {
        produtos: produtosAgrupados,
        valor_total
      };

      const token = Cookies.get('token')


      try {
        const res = await fetch('https://dolce-coffee-api.onrender.com/pedidos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(resultado),
        });

        const data = await res.json();
        console.log('Resposta do servidor:', data);

      } catch (error) {
        console.log(error);
      }

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
    localStorage.removeItem(`produto_${id_produto}`);
  };

  return (
    <div>
      <header>
        <span className="bi bi-cart"><b>Carrinho</b></span>
      </header>
      <main>
        <section className="summary">
          <h2>Itens no Carrinho</h2>
          <hr style={{ marginBottom: "20px" }} />
          {produtos.map((produto) => (
            <div key={produto._id} className="produto-container">

              <div className="produto-info">
                <p>Produto: {produto.nome}</p>
                <p>Quantidade:
                  <div className="produto-quantity">
                    <button onClick={() => diminuirQuantidade(produto._id)} style={{ backgroundColor: '#8B4513', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>
                      <i className="bi bi-dash-lg" style={{ fontSize: '1.2rem' }}></i>
                    </button>
                    <span style={{ backgroundColor: '#f8f9fa', padding: '5px 10px', borderRadius: '5px', margin: '0 5px' }}>{produto.quantidade || 0}</span>
                    <button onClick={() => aumentarQuantidade(produto._id)} style={{ backgroundColor: '#8B4513', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>
                      <i className="bi bi-plus-lg" style={{ fontSize: '1.2rem' }}></i>
                    </button>
                  </div>

                </p>
                <p>Valor: R$ {produto.valor ? (produto.valor * (produto.quantidade || 1)).toFixed(2) : '0.00'}</p>
              </div>
              <div className="produto-image">
                <img src={produto.url_foto} alt={produto.nome} />
                <button className="remove-button" onClick={() => removerProduto(produto._id)}>
                  <i className="bi bi-trash3-fill"></i>
                </button>
              </div>
            </div>
          ))}
        </section>
        <hr />
        <section className="total-section">
          <h2>Total:</h2>
          <div className="total-price">R$ {calcularValorTotal(produtos)}</div>
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
        {notification && (


          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Aviso</h5>
                </div>
                <div className="modal-body text-center">
                  <p>Por favor, selecione a forma de pagamento e a forma de entrega.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <section className="order-finalization">
        <button className="finalize-order" onClick={() => handleFinalizeOrder(produtos)}>Finalizar Pedido</button>
        <a href="/"><button className="return-home">Página Inicial</button></a>
      </section>
    </div>
  );
}

export default Cart;
