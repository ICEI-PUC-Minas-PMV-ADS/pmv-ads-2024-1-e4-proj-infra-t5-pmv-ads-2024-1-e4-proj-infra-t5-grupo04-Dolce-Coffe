import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';


function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/login')
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://dolce-coffee-api.onrender.com/cadastrar', {
        nome,
        sobrenome,
        email,
        senha
      });
      handleRedirect()

    } catch (error) {
      console.error('Erro ao cadastrar:', error);
    }
  };

  return (
    <div className="bg-secundario">
      <div className='container'>
        <div className="row justify-content-center align-items-center" style={{ height: '100vh' }}>
          {/* Div com a imagem */}
          <div className="col-md-4">
            <img src="./assets/images/banner-login.jpg" alt="Imagem" className="img-fluid rounded-5" />
          </div>

          {/* Div com o formulário de login */}
          <div className="col-md-4  rounded-4">
            <div className="text-center mb-4">
              <h1 className='text-secundario'>Cadastro</h1>
            </div>

            <form onSubmit={handleSubmit}>
              <div className='d-flex justify-content-between'>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Insira seu nome"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Insira seu sobrenome"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Insira seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Insira sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary btn-block">Cadastrar</button>

              </div>
            </form>



          </div>
        </div>
      </div>
    </div>
  )


}

export default Login;
