import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';


function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate(); 

  const handleRedirect = () => {
    navigate('/home')
  };

  const handleCadastro = () => {
    navigate('/cadastro')
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://dolce-coffee-api.onrender.com/login', {
        email,
        senha
      });
      
      Cookies.set('token', response.data.token)
      handleRedirect()

    } catch (error) {
      console.error('Erro ao fazer login:', error);
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
              <h1 className='text-secundario'>Login</h1>
            </div>
  
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary btn-block">Entrar</button>
              <button type="button" onClick={handleCadastro} className="btn btn-primary btn-block">Cadastrar</button>
          
            </div>
            </form>
            
        
            
          </div>
        </div>
      </div>
    </div>
  )
  
  
}

export default Login;
