const jwt = require("express-jwt");

//função que verifica se o cabeçalho está presente de
function extractToken(req, res) {
  if (!req.headers.authorization) {
    throw new Error("Cabeçalho de autenticação não encontrado"); //O throw tem o mesmo funcionamento do return, ele para a execução da função caso caia no if
  }
  //Caso o cabeçalho exista daremos o retorno do token de autorização
  return req.headers.authorization.split(" "[1]); //O TOKEN VEM PRECEDIDO DA PALAVRA BEARER USANDO O SPLIT ELE VAI PEGAR O CONTEÚDO, TRANSFORMA-LO EM UM ARRAY IDENTIFICANDO O ESPAÇO E RETORNAMOS A POSIÇÃO 1, PQ A POSIÇÃO 0 É O BEARER E O 1 É O TOKEN
}

module.exports = jwt({
  secret: process.env.SECRET,
  userProperties: "user", //Propriedade do usuário, objeto de configuração para identificar de qual camada será autorizado a visualização do usuário ex: aplicações com mais de uma area restrita
  getToken: extractToken, //o getToken recebe o método que será utilizado para extrair o token da requisição
  algorithms: ["HS256"], //algoritmo que será utilizado para gerar o token (PESQUISAR)
});
