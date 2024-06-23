const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
//const path = require('path');
const verificaAutenticacao = require('./middleware/autenticaToken');
const jwt = require('jsonwebtoken');
const path = require('path');


const port = process.env.PORT || 5000;
app.use(cookieParser());


app.use('/public', express.static(path.join(__dirname, 'public')));


const Database = require('./database/bancodedados')
const CRUD = require('./database/dataControl');


app.use(cors({
  origin: '*',
  credentials: true,
}));

app.use(cors({
  origin: 'http://localhost:3000', // Especificar o domínio do solicitante
  credentials: true,
}));

app.use(express.json());

const db = new Database()


let login
let produtos
let pedidos
let cadastro


app.listen(port, async () => {
  console.log("Servidor iniciado na porta:", port)
  await db.connect()

  login = new CRUD(db, 'usuarios');
  produtos = new CRUD(db, 'produtos')
  pedidos = new CRUD(db, 'pedidos')
  cadastro = new CRUD(db, 'usuarios')
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



app.post('/cadastrar', async (req, res) => {
  try {
    const { nome, sobrenome, email, senha } = req.body;
    const response = await cadastro.cadastraUsuario(nome, sobrenome, email, senha);
    res.status(response.status).json({ message: response.message });
  } catch (error) {
    if (error.message === 'Email já cadastrado') {
      res.status(400).json({ error: error.message });
    } else {
      console.error('Erro ao cadastrar', error);
      res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
  }
});


app.get('/home', async (req, res) => {
  try {
    const arrayProdutos = await produtos.getProdutos();
    res.json({ arrayProdutos });
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});




app.get('/pedidos', verificaAutenticacao, async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization && req.headers.authorization.split(' ')[1];
    const userId = jwt.verify(token, 'dolce-token')
    const arrayPedidos = await pedidos.getPedidos(userId.id);
    res.json({ arrayPedidos });

  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});




app.post('/pedidos', async (req, res) => {

  try {
    const token = req.cookies.token || req.headers.authorization && req.headers.authorization.split(' ')[1];

    //Pega e formata a data
    const date = new Date
    const dia = date.getDate();
    const mes = date.getMonth() + 1; 
    const ano = date.getFullYear();

    const data = `${dia}-${mes}-${ano}`

    const { id: user_id } = await jwt.decode(token)
    const pedido = req.body

    const {produtos, valor_total} = pedido

    console.log(pedido)

    const pedidoData = { data, user_id, produtos, valor_total }

    const enviaPedido = await pedidos.postPedido(pedidoData)

    res.status(200).json({ message: 'Pedido recebido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }

})