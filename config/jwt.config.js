const jwt = require("jsonwebtoken");

function generateToken(user) {
  // a função recebe como props os dados do usuário
  //Desestruturação dos dados do usuário
  const { _id, name, email, role } = user;
  const signature = process.env.SECRET;
  const expiration = "12h";

  //retorno da assinatura do usuário
  return jwt.sign({ _id, name, email, role }, signature, {
    expiresIn: expiration,
  });
}

module.exports = generateToken;
