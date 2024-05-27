import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Cart() {
  const [produtos, setProdutos] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const produtosLocalStorage = [];
    let total = 0;

    for (let index = 0; index < localStorage.length; index++) {
      const element = localStorage.key(index);

      if (element.includes("produto_")) {
        const id_produto = element.substring(8);
        const quantidade_produto = parseInt(localStorage.getItem(element));

        const produto = {
          id_produto: id_produto,
          quantidade: quantidade_produto
        };

        const valorProduto = 30.00;
        const valorProdutoXQuantidade = valorProduto * quantidade_produto;
        total += valorProdutoXQuantidade;

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
    console.log("excluir");
  }

  const subtrairProduto = (id_produto) => {
    let quantidade = parseInt(localStorage.getItem("produto_" + id_produto));
    localStorage.removeItem("produto_" + id_produto);

    if (quantidade > 1) {
      quantidade -= 1
      somaTotal(id_produto, "subtrair");
    }

    localStorage.setItem('produto_' + id_produto, quantidade);
    document.getElementById("quantidadeProduto_" + id_produto).innerHTML = quantidade;

  }

  const aumentarProduto = (id_produto) => {
    let quantidade = parseInt(localStorage.getItem("produto_" + id_produto));
    localStorage.removeItem("produto_" + id_produto);

    quantidade += 1
    localStorage.setItem('produto_' + id_produto, quantidade);

    document.getElementById("quantidadeProduto_" + id_produto).innerHTML = quantidade;

    somaTotal(id_produto, "somar");
  }

  const somaTotal = (id_produto, operacao) => {
    var preco = parseFloat(document.getElementById("precoProduto_" + id_produto).textContent);
    var precoTotal = parseFloat(valorTotal);

    if (operacao === "subtrair") {
      setValorTotal(precoTotal - preco);
    }
    else {
      setValorTotal(precoTotal + preco);
    }

  }

  const handleFinalizeOrder = () => {
    // Aqui você pode adicionar a lógica para finalizar o pedido
    // Por exemplo, enviar os detalhes do pedido para o servidor
    navigate("/FinalizarPedido");
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
            <div key={produto.id_produto}>
              <p>Produto: {produto.id_produto}</p>
              <p>Quantidade: {produto.quantidade}</p>
              <button onClick={() => excluirProduto(produto.id_produto)}>Remover</button>
              <button onClick={() => subtrairProduto(produto.id_produto)}>Subtrair</button>
              <button onClick={() => aumentarProduto(produto.id_produto)}>Adicionar</button>
            </div>
          ))}
        </section>
        <hr />
        <section className="total-section">
          <h2>Total:</h2>
          <div className="total-price">R$ {valorTotal.toFixed(2)}</div>
        </section>
      </main>
      <section className="order-finalization">
        <button className="finalize-order" onClick={handleFinalizeOrder}>Finalizar Pedido</button>
        <a href="/"><button className="return-home">Página Inicial</button></a>
      </section>
    </div>
  );
}

export default Cart;
