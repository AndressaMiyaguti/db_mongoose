const UserModule = require('../models/user.model');

async function attachCurrentUser(req,res){
  try{
    const loggedInUser = req.user; //O req.user é definido na linha 14 do isAuth
  const user = await UserModel.findOne({
    _id: loggedInUser._id},
    //Excluindo o campo passwordHash da resposta, por medidas de segurança
    { passwordHash: 0, __V: 0});
    if(!user){
      
      return res.status(400).json({message: "usuário não encontrado"})
    }
    //Caso o usuário esteja  cadastrado, retornamos o user 
    req.currentUser = user;
  
  }catch(err){console.error(err);
    return res.status(500).JSON.stringify(err);}
}