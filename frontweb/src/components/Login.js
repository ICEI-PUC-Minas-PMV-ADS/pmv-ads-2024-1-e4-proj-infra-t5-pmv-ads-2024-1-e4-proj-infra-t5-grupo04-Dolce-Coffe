import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const imagePath = process.env.PUBLIC_URL + '/images/banner-login.jpg';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://dolce-coffee-api.onrender.com/login', {
        email,
        senha
      });
      
      // Lógica adicional para tratar a resposta, redirecionar o usuário, etc.
      console.log('Resposta do servidor:', response.data);
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
            <img src={imagePath} alt="Imagem" className="img-fluid rounded-5" />
          </div>

          {/* Div com o formulário de login */}
          <div className="col-md-4 bg-terciario">
            <div className="text-center mb-4">
              <h2>Login</h2>
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
              <button type="submit" className="btn btn-primary btn-block">Entrar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
