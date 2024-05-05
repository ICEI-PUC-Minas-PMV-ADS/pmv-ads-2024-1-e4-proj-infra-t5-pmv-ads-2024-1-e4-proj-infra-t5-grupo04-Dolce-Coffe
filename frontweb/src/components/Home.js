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
          </div>
        </div>
      </div>
    </section>
  );
}

function QuartaSec({ handleAddToCart }) {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriaAtiva, setCategoriaAtiva] = useState('quente');
  const [sliderIndex, setSliderIndex] = useState(0); // Estado para controlar o slide ativo
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
    
        // const response = await axios.get('https://dolce-coffee-api.onrender.com/home', config);
        const response = await axios.get('http://localhost:5000/home', config);
        setProdutos(response.data.arrayProdutos);
        setLoading(false);
      } catch (error) {
        if(error.response && error.response.status === 401){
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
    setSliderIndex(0); // Define o slide de volta para 0 ao mudar de categoria
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    afterChange: (index) => setSliderIndex(index), // Atualiza o slide ativo
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
