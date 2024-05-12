import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Cart() {
  return (
    <div>
      <header>
        <span className="bi bi-cart"><b>Carrinho</b></span>
      </header>
      <main>
        <section className="summary">
          <h2>Itens no Carrinho</h2>
          <table>
            <tbody>
              <tr>
                <th>Produto</th>
                <th>Preço</th>
                <th>Quantidade</th>
              </tr>
              <tr>
                <td>
                  <div className="product">
                    <img src="https://picsum.photos/90/90" alt="Imagem do produto" />
                    <div className="info">
                      <div className="title">Nome do Produto</div>
                      <div className="price">R$ 120</div>
                    </div>
                  </div>
                </td>
                <td>R$ 120</td>
                <td>
                  <div className="qty">
                    <button><i className="bi bi-trash3-fill"></i></button>
                    <span>2</span>
                    <button><i className="bi bi-plus"></i></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <hr />
        <section className="total-section">
          <h2>Total:</h2>
          <div className="total-price">R$ 240,00</div>
        </section>
        <section className="order-finalization">
          <a href="/FinalizarPedido" className="confirm-button">Continuar</a>
          <a href="/Home" className="cancel-button">Cancelar</a>
        </section>
      </main>
    </div>
  );
}

export default Cart;
