import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'


function Menu() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">DOLCE COFFEE</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">Início</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Histórico</a>
              </li>
  
              <li className="nav-item">
                <a className="nav-link" href="#">Carrinho(ico)</a>
              </li>
  
              <li className="nav-item">
                <a className="nav-link" href="#">Perfil(ico)</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
  
  function MainSection() {
    return (
      <section className="main-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <img src="sua-imagem.jpg" alt="Imagem Principal" className="img-fluid" />
              <h3>Confira Nosso</h3>
              <h1>Cárdapio Completo</h1>
              <p>Descubra nossa variedade de cafés premium e bebidas artesanais em nosso cardápio digital. De grãos suaves a sabores intensos, cada xícara oferece uma experiência única. Explore conosco e desfrute de uma jornada de café incomparável.</p>
            </div>
          </div>
        </div>
      </section >
    );
  }
  
  
  
  
  function QuartaSec() {
  
    const [produtos, setProdutos] = useState([]);
  
    useEffect(() => {
      async function fetchProdutos() {
        try {
          const response = await axios.get('https://dolce-coffee-api.onrender.com/home');
          setProdutos(response.data.arrayProdutos)
        } catch (error) {
          console.error('Erro ao buscar produtos', error)
        }
      }
  
  
      fetchProdutos();
  
    }, []);
  
    return (
      <section className="blue-section bg-primary text-white">
        <div className="container">
          <div>
            <h2>Cafés Quentes</h2>
            <ul className='row align-items-start'>
              {produtos
                .filter(produto => produto.tipo === 'quente')
                .map(produto => (
                  <li key={produto._id} className="col-md-3">
                    <div className="card">
                      <div className="card-body">
                        <h3 className="card-title">{produto.nome}</h3>
                        <p className="card-text">Valor: R$ {produto.valor}</p>
                        <p className="card-text">{produto.desc}</p>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
  
          <div>
            <h2>Cafés Gelados</h2>
            <ul className='row align-items-start'>
              {produtos
                .filter(produto => produto.tipo === 'frio')
                .map(produto => (
                  <li key={produto._id} className="col-md-3">
                    <div className="card">
                      <div className="card-body">
                        <h3 className="card-title">{produto.nome}</h3>
                        <p className="card-text">Valor: R$ {produto.valor}</p>
                        <p className="card-text">{produto.desc}</p>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </section>
    );
    
  }





  function Home() {
    return (
        <div>
          <Menu />
          <MainSection />
          <QuartaSec />
        </div>
      );
  }


  export default Home;