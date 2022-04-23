const router = require("express").Router();
const bcrypt = require("bcrypt");

const UserModel = require("../models/user.model")
const generateToken = require('../config/jwt.config')
const isAuth = require("../middlewares/isAuth")
const attachCurrentUser = require("../middlewares/attachCurrentUser")

router.post("/signup", async (req, res) => {//as rotas post tem que conter o body(corpo da requisição)
try{
  const userObj = req.body
  if(!userObj.password || !userObj.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/)){//verifica se a senha não existe ou não atende a algum requisito 
    return res.status(400).json({message: "Senha inválida"})
  }
//Na criptografia usamos o salt, que quebra a string em varios pedaços para criptografar a senha, quanto mais saltos mais segura a validação, porém consome muitos dados e deixa lenta a aplicação
 const saltRounds = 10;
 const salt = bcrypt.genSalt(saltRounds);

 const passwordHash = await bcrypt.hash(userObl.password, salt);// await pq precisa esperar para criptografar
 const createdUser = await UserModel.create({ //Criação do usuário no banco de dados

  ...userObj,
  passwordHash:passwordHash,
 })
 delete createdUser.passwordHash;

 return res.status(201).json(createdUser);

}catch (err){
  console.error(err);
  return res.status(500).json({message: JSON.stringify(err)});
}
})

////////////////////////ROTA DE LOGIN///////////////////////
//criar um token de login
router.post( "/login", async (req, res) => {
  try{
    const {email, password} = req.body; //desestruturação
    
    const user= await UserModel.findOne({email}); //verifica no banco se o email existe)
    if(!user){
      return res.status(404).json({message: "Email not found"})
    }
    if (await bcrypt.compare(password, user.passwordHash)){ //verifica se a senha informada é igual a armazenada
      const token = generateToken(user)

      return res.status(200).json(token);
    } else {
      return res.status(401).json({ message: "password ou email não existem"})
    }
  
  }catch(err){
    console.error(err);
    return res.status(500).json({message: JSON.stringify(err)});
  }
})

///ROTA DE LEITURA DO PERFIL DO USUÁRIO

router.get("/profile", isAuth, attachCurrentUser, (req, res) => {
  try{
    const loggedInUser = req.createdUser; // armazena as informações do usuário
    if(loggedInUser){
      return res.status(200).json(loggedInUser);
    } else{
      return res.status(401).json({message: "User not found"})
    }
  
  }catch(err){
    console.error(err);
    return res.status(500).json({message: JSON.stringify(err)})
  }
})


module.exports = router;
/*
  (?=.*\d)              // deve conter ao menos um dígito
  (?=.*[a-z])           // deve conter ao menos uma letra minúscula
  (?=.*[A-Z])           // deve conter ao menos uma letra maiúscula
  (?=.*[$*&@#])         // deve conter ao menos um caractere especial
  [0-9a-zA-Z$*&@#]{8,}  // deve conter ao menos 8 dos caracteres mencionados
$*/