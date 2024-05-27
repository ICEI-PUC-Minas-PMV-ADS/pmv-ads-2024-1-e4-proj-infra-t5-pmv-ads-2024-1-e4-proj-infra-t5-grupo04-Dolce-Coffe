const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




class CRUD {
  constructor(database, collectionName) {
    this.db = database;
    this.collection = this.db.db.collection(collectionName);
  }


  async logar(email, senha) {
    try {
      const usuario = await this.collection.findOne({ email })

      if (!usuario) {
        throw new Error('Usuário não encontrado');
      }

      const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

      if (!senhaCorreta) {
        throw new Error('Senha incorreta');
      }

      const token = jwt.sign({ id: usuario._id, email: usuario.email, role: usuario.role }, 'dolce-token', {
        expiresIn: '1d'
      });

      return token;

    }
    catch (error) {
      throw error
    }
  }


  async cadastraUsuario(nome, sobrenome, email, senha) {
    try {
      const verificaEmail = await this.collection.findOne({ email });
      if (verificaEmail) {
        throw new Error('Email já cadastrado');
      }
      const senhaHash = await bcrypt.hash(senha, 10);
      await this.collection.insertOne({ nome, sobrenome, email, senha: senhaHash });
      return { status: 200, message: 'Usuário cadastrado com sucesso' };
    } catch (error) {
      throw new Error(`Erro ao cadastrar usuário: ${error.message}`);
    }
  }




  async getProdutos() {
    try {
      const cursor = await this.collection.find()

      const produtos = await cursor.toArray();
      return produtos
    }
    catch (error) {
      throw error;
    }
  }


  async getPedidos(userId) {
    try {
      const cursor = await this.collection.find({ user_id: userId })

      const pedidos = await cursor.toArray();
      return pedidos
    }
    catch (error) {
      throw error;
    }
  }




}


module.exports = CRUD