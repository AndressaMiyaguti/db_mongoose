const mongoose = require("mongoose");

//FUNÇÃO DE CONFIGURAÇÃO DO BANCO DE DADOS, QUE FARÁ A CONEXÃO COM O BANCO

//FUNÇÃO ASSÍNCRONA POIS É NECESSÁRIO ESPERAR
//TODA VEZ QUE TRABALhAMOS COM PROMISE É NECESSÁRIO UM TRATAMENTO DE ERRO  COM TRY E CAT POR EX
async function connect() {
  try {
    // o TRY, sempre vem acompanhado do catch
    //dentro da variável de conexão estará o await, a url pode ser a local ou na que sofreu deploy, essa contem a url local mais o nome da tabela criado no mongoose
    //No objeto colocamos os objetos de configurações
    const connection = await mongoose.connect(
      "mongodb://localhost:27017/nomeCriadoNoMongoose",
      {

        useNewUrlParser: true,
        useUnifiedTopology: true,

      }
    );

    console.log("Conectado ao banco de dados:", connection.connection.name);
  } catch (err) {
    console.log("Erro de conexão", err);
  }
}

module.exports = connect;
