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




async getAgenda(){
  try{
    const cursor = await this.collection.find()

    const agendamentos = await cursor.toArray();
    return agendamentos
  }
  catch(error){
    throw error;
  }
}




}


module.exports = CRUD