import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';


function Menu() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-overlay-dark content">
      <div className="container">
        <div className="logo">
          <img src="./logo.png" alt="logo" />
          <h3><span>Dolce</span>Coffe</h3>
        </div>
        <div className="collapse navbar-collapse list-menu justify-content-end" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link text-white" href="#">Histórico</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#" onClick={console.log()}>
                Carrinho <i className="bi bi-cart3"></i>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">Perfil <i className="bi bi-person-circle"></i></a>
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

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <section className="bg-secondary .bg-light text-dark">
      <div className="container">
        <div>
          <h2>Cafés Quentes</h2>
          <Slider {...settings}>
            {produtos
              .filter(produto => produto.tipo === 'quente')
              .map(produto => (
                <div key={produto._id}>
                  <div className="card" style={{ maxWidth: '18rem' }}>
                    <img src={produto.imagem} className="card-img-top" alt={produto.nome} />
                    <div className="card-body d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="card-title">{produto.nome}</h5>
                        <p className="card-text">Valor: R$ {produto.valor}</p>
                        <p className="card-text">{produto.desc}</p>
                      </div>
                      <i className="bi bi-bag-heart-fill"></i>
                    </div>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
        <div>
          <h2>Cafés Gelados</h2>
          <Slider {...settings}>
            {produtos
              .filter(produto => produto.tipo === 'quente')
              .map(produto => (
                <div key={produto._id}>
                  <div className="card" style={{ maxWidth: '18rem' }}>
                    <img src={produto.imagem} className="card-img-top" alt={produto.nome} />
                    <div className="card-body d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="card-title">{produto.nome}</h5>
                        <p className="card-text">Valor: R$ {produto.valor}</p>
                        <p className="card-text">{produto.desc}</p>
                      </div>
                      <i className="bi bi-bag-heart-fill"></i>
                    </div>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
        <div>
          <h2>Para Comer</h2>
          <Slider {...settings}>
            {produtos
              .filter(produto => produto.tipo === 'quente')
              .map(produto => (
                <div key={produto._id}>
                  <div className="card" style={{ maxWidth: '18rem' }}>
                    <img src={produto.imagem} className="card-img-top" alt={produto.nome} />
                    <div className="card-body d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="card-title">{produto.nome}</h5>
                        <p className="card-text">Valor: R$ {produto.valor}</p>
                        <p className="card-text">{produto.desc}</p>
                      </div>
                      <i className="bi bi-bag-heart-fill"></i>
                    </div>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <div className="container">
        <span className="text-muted">© 2024 Dolce Coffe. Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}

function Home() {
    return (
        <div>
          <Menu />
          <MainSection />
          <QuartaSec />
          <Footer/>
        </div>
      );
  }


 export default Home;