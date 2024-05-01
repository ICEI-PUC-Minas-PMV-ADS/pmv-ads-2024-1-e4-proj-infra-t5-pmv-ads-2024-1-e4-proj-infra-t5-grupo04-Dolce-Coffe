import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';


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
                <a className="nav-link" href="#">Cardapio(ico)</a>
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
  
  
  





  function Home() {
    return (
        <div>
          <Menu />
          <MainSection />
        </div>
      );
  }


  export default Home;