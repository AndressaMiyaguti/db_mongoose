const express = require('express');
require('./config/db.config')(); //Conecta ao banco de dados
require("./config/db.config")();
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors({origin: 'http://localhost:3000'}));// colocar o endereço de onde está vindo as requisições do front end, pode ser utilizado mais de um endereço, back por exemplo

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
const VERSION = "0.1" //Versão do nosso projeto primeiro teste 
const userRouter = require('./routes/user.routes');

app.use(`/api/${VERSION}/users`, userRouter)// vai chegar tudo que for de users e o restante do endereço será configurado depois ( ex: create)

app.listen(Number(process.env.PORT), () => {
  console.log(` O servidor rodando na porta ${process.env.PORT}`)
})