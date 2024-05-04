import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Slider from 'react-slick';

function Menu() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-overlay-dark content">
      <div className="container">
        <div className="logo">
          <img src="./logo.png" alt="logo" />
          <h3><span>Dolce</span>Coffee</h3>
        </div>
        <div className="collapse navbar-collapse list-menu justify-content-end" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/historico" className="nav-link text-white">Histórico</Link>
            </li>
            <li className="nav-item">
              <Link to="/carrinho" className="nav-link text-white">
                Carrinho <i className="bi bi-cart3"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/perfil" className="nav-link text-white">Perfil <i className="bi bi-person-circle"></i></Link>
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
            <h1>Cardápio Completo</h1>
            <p>Descubra nossa variedade de cafés premium e bebidas artesanais em nosso cardápio digital. De grãos suaves a sabores intensos, cada xícara oferece uma experiência única. Explore conosco e desfrute de uma jornada de café incomparável.</p>
            <Link to="/cardapio" className="btn btn-primary custom-btn">Ver Cardápio</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuartaSec({ categoria, setCategoria, handleAddToCart }) {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriaAtiva, setCategoriaAtiva] = useState('quente');

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const response = await axios.get('https://dolce-coffee-api.onrender.com/home');
        setProdutos(response.data.arrayProdutos);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar produtos', error);
        setLoading(false);
      }
    }

    fetchProdutos();
  }, []);

    const handleClickCategoria = (categoria) => {
    if (categoriaAtiva === categoria) {
      setCategoriaAtiva(null);
      setCategoria(null);
    } else {
      setCategoriaAtiva(categoria);
      setCategoria(categoria);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <section className="bg-secondary bg-light text-dark">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-md-4 text-center">
            <button
              type="button"
              className="btn btn-primary"
              style={{ backgroundColor: categoriaAtiva === 'quente' ? '#6D4613' : '' }}
              onClick={() => handleClickCategoria('quente')}
            >
              Cafés Quentes
            </button>
          </div>
          <div className="col-md-4 text-center">
            <button
              type="button"
              className="btn btn-primary"
              style={{ backgroundColor: categoriaAtiva === 'gelado' ? '#6D4613' : '' }}
              onClick={() => handleClickCategoria('gelado')}
            >
              Cafés Gelados
            </button>
          </div>
          <div className="col-md-4 text-center">
            <button
              type="button"
              className="btn btn-primary"
              style={{ backgroundColor: categoriaAtiva === 'comida' ? '#6D4613' : '' }}
              onClick={() => handleClickCategoria('comida')}
            >
              Para Comer
            </button>
          </div>
        </div>
        {categoriaAtiva && (
          <div className="row mt-4">
            {produtos
              .filter((produto) => produto.tipo === categoriaAtiva)
              .map((produto) => (
                <div key={produto._id} className="col-md-4 mb-4">
                  <div className="card">
                    <img src={produto.imagem} className="card-img-top" alt={produto.nome} />
                    <div className="card-body">
                      <div>
                        <h5 className="card-title">{produto.nome}</h5>
                        <p className="card-text">Valor: R$ {produto.valor}</p>
                        <p className="card-text">{produto.desc}</p>
                      </div>
                      <div className="icon-container">
                          <button onClick={() => handleAddToCart(produto)} className="btn btn-secundary">
                            <i className="bi bi-bag-heart-fill"></i> 
                          </button>
                        </div>
                    </div>
                    
                  </div>

                </div>
                
              ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Home() {
  const [categoria, setCategoria] = useState('quente');

  const handleAddToCart = (produto) => {
    // Implemente a lógica para adicionar o produto ao carrinho aqui
    console.log('Produto adicionado ao carrinho:', produto);
  };

  return (
    <div>
      <Menu />
      <MainSection />
      <QuartaSec categoria={categoria} setCategoria={setCategoria} handleAddToCart={handleAddToCart} />
    </div>
  );
}

export default Home;
