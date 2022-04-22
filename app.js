const express = require('express');

const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors({origin: 'http://localhost:3000'}));// colocar o endereço de onde está vindo as requisições do front end, pode ser utilizado mais de um endereço, back por exemplo

/* sintaxe com mais de um endereço:
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