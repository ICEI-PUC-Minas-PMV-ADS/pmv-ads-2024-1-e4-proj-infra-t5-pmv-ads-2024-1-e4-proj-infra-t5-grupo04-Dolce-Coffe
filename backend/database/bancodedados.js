const { MongoClient } = require('mongodb');


class Database{
  constructor(url,dbName){
    this.url =  'mongodb://127.0.0.1:27017';
    this.dbName = 'ortopura_db';
    this.client = new MongoClient(this.url)
  }

  
  
  async connect() {
    try{
      await this.client.connect();
      console.log("Conectado ao mongoDB")
      this.db = this.client.db(this.dbName)
    } 
    catch (error) {
      console.error("Erro ao conectar:", error)
    }
  }
  

async close(){
  await this.client.close()
  console.log("Conexao encerrada")
}







}


module.exports = Database;
