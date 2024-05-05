const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
//const path = require('path');
const verificaAutenticacao = require('./middleware/autenticaToken');
const port = process.env.PORT || 5000;


const Database = require('./database/bancodedados')
const CRUD = require('./database/dataControl');


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

const db = new Database()


let login
let produtos


app.listen(port, async() => {
  console.log("Servidor iniciado na porta:", port)
  await db.connect()

  login = new CRUD(db, 'usuarios');
  produtos = new CRUD(db,'produtos')

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
  //  const userId = req.usuario.id;
  //  const userName = req.usuario.nome;
  //  const userRole = req.usuario.role.toUpperCase();
    const arrayProdutos = await produtos.getProdutos();
    res.json({ /*userId, userName, userRole,*/ arrayProdutos });
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});





app.get('/pedidos',verificaAutenticacao, async (req, res) => {
  try {
   const userId = req.usuario.id;
   const userName = req.usuario.nome;
   const userRole = req.usuario.role.toUpperCase();
    

    const arrayProdutos = await produtos.getProdutos();
    res.json({ userId, userName, userRole, arrayProdutos });
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});