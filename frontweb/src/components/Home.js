import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


function Menu() {
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
        <Link to="https://dolce-coffee-api.onrender.com/pedidos" className="nav-link text-white">
          Pedidos
        </Link>
      </li>
      <li>
        <Link to="https://dolce-coffee-api.onrender.com/carrinho" className="nav-link text-white" onClick={() => window.location.href = '/carrinho'}>
          <i className="bi bi-cart3"></i>
        </Link>
      </li>
      <li>
        <Link to="https://dolce-coffee-api.onrender.com/login" className="nav-link text-white" onClick={() => window.location.href = '/login'}>
          <i className="bi bi-person-circle"></i>
        </Link>
      </li>
    </ul>
  </div>
</nav>
  
  )
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
          </div>
        </div>
      </div>
    </section>
  );
}

function QuartaSec({ handleAddToCart }) {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD
  const [categoriaAtiva, setCategoriaAtiva] = useState('quente');
  const [sliderIndex, setSliderIndex] = useState(0);
=======
  const [categoriaAtiva, setCategoriaAtiva] = useState('quente'); 
  const [sliderIndex, setSliderIndex] = useState(0); // Estado para controlar o slide ativo
>>>>>>> 247e7ac46bfe3bd2492214983f948306968d8c33
  const navigate = useNavigate()

  const handleRedirect = () => {
    navigate('/login')
  };

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const token = Cookies.get('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const response = await axios.get('https://dolce-coffee-api.onrender.com/home', config);
        setProdutos(response.data.arrayProdutos);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          handleRedirect()
        } else {
          console.error('Erro ao buscar produtos', error);
          setLoading(false);
        }

      }
    }

    fetchProdutos();
  }, []);

  const handleClickCategoria = (categoria) => {
    setCategoriaAtiva(categoria);
    setSliderIndex(0);
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    afterChange: (index) => setSliderIndex(index),
  };

  return (
    <section className="bg-secondary bg-light text-dark">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-md-4 text-center">
            <button
              type="button"
              className={`btn btn-primary ${categoriaAtiva === 'quente' ? 'active' : ''}`}
              onClick={() => handleClickCategoria('quente')}
            >
              Cafés Quentes
            </button>
          </div>
          <div className="col-md-4 text-center">
            <button
              type="button"
              className={`btn btn-primary ${categoriaAtiva === 'gelado' ? 'active' : ''}`}
              onClick={() => handleClickCategoria('gelado')}
            >
              Cafés Gelados
            </button>
          </div>
          <div className="col-md-4 text-center">
            <button
              type="button"
              className={`btn btn-primary ${categoriaAtiva === 'comida' ? 'active' : ''}`}
              onClick={() => handleClickCategoria('comida')}
            >
              Para Comer
            </button>
          </div>
        </div>
        {categoriaAtiva && (
          <Slider {...sliderSettings} initialSlide={sliderIndex}>
            {produtos
              .filter((produto) => produto.tipo === categoriaAtiva)
              .map((produto) => (
                <div key={produto._id} className="col-md-4 mb-4">
                  <div className="card">
                    <img src={produto.url_foto} className="card-img" alt={produto.nome} />
                    <div className="card-body">
                      <div>
                        <h5 className="card-title">{produto.nome}</h5>
                        <p className="card-text">Valor: R$ {produto.valor}</p>
                        <p className="card-text">{produto.desc}</p>
                      </div>
                      <div className="icon-container">
                        <button onClick={() => handleAddToCart(produto)} className="btn btn-secondary">
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
    </section>
  );
}

function Home() {
  const handleAddToCart = (produto) => {
    // Implemente a lógica para adicionar o produto ao carrinho aqui
    console.log('Produto adicionado ao carrinho:', produto);
  };

  return (
    <div>
      <Menu />
      <MainSection />
      <QuartaSec handleAddToCart={handleAddToCart} />
    </div>
  );
}

export default Home;
