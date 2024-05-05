const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
//const path = require('path');
const verificaAutenticacao = require('./middleware/autenticaToken');
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 5000;
app.use(cookieParser());


const Database = require('./database/bancodedados')
const CRUD = require('./database/dataControl');


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());

const db = new Database()


let login
let produtos
let pedidos


app.listen(port, async() => {
  console.log("Servidor iniciado na porta:", port)
  await db.connect()

  login = new CRUD(db, 'usuarios');
  produtos = new CRUD(db,'produtos')
  pedidos = new CRUD(db,'pedidos')
})



app.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    const token = await login.logar(email, senha)
    res.status(200).json({ token });
  } catch (error) {
    if (error.message === 'Senha incorreta' || error.message === 'Usuário não encontrado') {
      res.status(401).json({ error: error.message });
    } else {
      console.error('Erro na autenticação', error);
      res.status(500).json({ error: 'Erro na autenticação' });
    }
  }
});



app.get('/home', verificaAutenticacao, async (req, res) => {
  try {
    const arrayProdutos = await produtos.getProdutos();
    res.json({ arrayProdutos });
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});




app.get('/pedidos',verificaAutenticacao,async (req, res) => {
  try {
    const token = req.cookies.token
    const userId = jwt.verify(token,'dolce-token')
    const arrayPedidos = await pedidos.getPedidos(userId.id);
    res.json({ arrayPedidos });
    
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});