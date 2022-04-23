const express = require('express');
require("dotenv").config();
require('./config/db.config')(); //Conecta ao banco de dados

const VERSION = "0.1" //Versão do nosso projeto primeiro teste 
const userRouter = require('./routes/user.routes');
const cors = require('cors');

const app = express();

app.use(express.json());

/* sintaxe com mais de um endereço:
bkN4JGBIKP8shYEw
const whiteList =[]
app.use(corsorigin: function(origin, callback){
  #if verifica se a origem estiver presente na whiteListe executa a callback
  if (whiteListe.indexOf(origin)!= -1){
    callback(true)
  } else {
    throw new Error("not allowed")
  }
}})
*/


app.use(`/api/${VERSION}/users`, userRouter)// vai chegar tudo que for de users e o restante do endereço será configurado depois ( ex: create)

app.listen(Number(process.env.PORT), () => {
  console.log(` O servidor rodando na porta ${process.env.PORT}`)
})