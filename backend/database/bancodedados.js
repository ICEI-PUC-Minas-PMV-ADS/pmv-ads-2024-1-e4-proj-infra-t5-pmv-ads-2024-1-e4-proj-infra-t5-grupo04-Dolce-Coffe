require('dotenv').config();
const { MongoClient } = require('mongodb');

class Database {
  constructor(dbName) {
    this.dbName = 'dolce_db';
    this.client = new MongoClient(process.env.MONGO_URI);
  }

  async connect() {
    try {
      await this.client.connect();
      console.log("Conectado ao MongoDB");
      this.db = this.client.db(this.dbName);
    } catch (error) {
      console.error("Erro ao conectar:", error);
    }
  }

  async close() {
    await this.client.close();
    console.log("Conexão encerrada");
  }
}

module.exports = Database;
