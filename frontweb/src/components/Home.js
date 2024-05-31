import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Slider from 'react-slick';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Menu({ totalItems }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-overlay-dark content">
      <div className="container">
        <div className="logo">
          <img src="./logo192.png" alt="logo" />
          <h3><span>Dolce</span>Coffee</h3>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <ul className="nav-link">
          <li>
            <Link to="/historico" className="nav-link text-white">
              Pedidos
            </Link>
          </li>
          <li>
            <Link to="/carrinho" className="nav-link text-white">
              <i className="bi bi-cart3"></i> {totalItems > 0 && <span className="badge bg-primary">{totalItems}</span>}
            </Link>
          </li>
          <li>
            <Link to="/login" className="nav-link text-white">
              <i className="bi bi-person-circle"></i>
            </Link>
          </li>
        </ul>
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
            <p>
              Descubra nossa variedade de cafés premium e bebidas artesanais em nosso cardápio digital.
              De grãos suaves a sabores intensos, cada xícara oferece uma experiência única.
              Explore conosco e desfrute de uma jornada de café incomparável.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuartaSec({ handleAddToCart }) {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriaAtiva, setCategoriaAtiva] = useState('quente');
  const [mensagem, setMensagem] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const token = Cookies.get('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const response = await axios.get('https://dolce-coffee-api.onrender.com/home', config);
        setProdutos(response.data.arrayProdutos);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate('/login');
        } else {
          console.error('Erro ao buscar produtos', error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProdutos();
  }, [navigate]);

  const handleClickCategoria = (categoria) => {
    setCategoriaAtiva(categoria);
    setSliderIndex(0);
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    afterChange: (index) => setSliderIndex(index),
  };

  const addToCart = (produto) => {
    localStorage.setItem(`produto_${produto._id}`, JSON.stringify(produto));
    handleAddToCart(produto);
    setMensagem(`Produto adicionado ao carrinho: ${produto.nome}`);
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 1000);
    setTotalItems(prevTotalItems => prevTotalItems + 1);
  };

  return (
    <section className="bg-secondary bg-light text-dark">
      <div className="container">
        <div className="row justify-content-between">
          {['quente', 'gelado', 'comida'].map((categoria) => (
            <div className="col-md-4 text-center" key={categoria}>
              <button
                type="button"
                className={`btn btn-primary ${categoriaAtiva === categoria ? 'active' : ''}`}
                onClick={() => handleClickCategoria(categoria)}
              >
                {`Cafés ${categoria.charAt(0).toUpperCase() + categoria.slice(1)}`}
              </button>
            </div>
          ))}
        </div>
        {categoriaAtiva && (
          <Slider {...sliderSettings} initialSlide={sliderIndex}>
            {produtos
              .filter((produto) => produto.tipo === categoriaAtiva)
              .map((produto) => (
                <div key={produto._id} className="col-md-4 mb-4">
                <div className="card">
                  <img src={produto.url_foto} className="card-img" alt={produto.nome} />
                  <div className="card-body white-bg">
                    <h5 className="card-title">{produto.nome}</h5>
                    <p className="card-text">
                      Valor: <br /> R$ {produto.valor}
                    </p>
                    <div className="icon-container">
                      <button onClick={() => addToCart(produto)} className="btn btn-secondary">
                        <i className="bi bi-bag-heart-fill"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              ))}
              
          </Slider>
        )}
      </div>
      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title"></h5>
              </div>
              <div className="modal-body text-center">
                <p>{mensagem}</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}

function Home() {
  const [totalItems, setTotalItems] = useState(0);

  const handleAddToCart = (produto) => {
    setTotalItems(prevTotalItems => prevTotalItems + 1);
  };

  return (
    <div>
      <Menu totalItems={totalItems} />
      <MainSection />
      <QuartaSec handleAddToCart={handleAddToCart} />
    </div>
  );
}

export default Home;
