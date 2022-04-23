const { Schema, model } = require("mongoose");
/* Outra forma de instanciar 
const Schema = require("mongoose").Schema;
const model = require("mongoose").model; */
const mongoose = require("mongoose");

const UserSchema = new Schema({
  // new pq Schema é uma classe do mongoose
  //definindo os campos que a tabela ira ter
  name: { type: string, required: true }, //true pq é imprescindível o preenchimento
  email: {
    type: string,
    required: true,
    match: [
      /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i,
      "Gentileza fornecer um email válido",
    ],
  }, //regex para validação de email /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i e o segundo parâmetro é a mensagem que aparecerá para o usuário
  passwordHash: { type: string, required: true },
  street: { type: string, required: true },
  number: { type: number, required: true },
  postalCode: { type: number, required: true },
  city: { type: string, required: true },
  state: { type: string, required: true },

  role: {
    type: string,
    required: true,
    enum: ["customer", "seller"], // Papel do usuário utilizamos o enum, que permite receber um array de opções para aquele campo, no caso se é usuário ou colaborador
    default: "customer",
  }, //o default define como padrão o tipo de usuário da criação
  creditCars: [
    new Schema({
      number: { type: number, required: true },
      name: { type: string, required: true },
      flags: { type: string, required: true, enum: ["MasterCard", "Visa"] },
      securityCode: { type: number, required: true },
      expiryDate: { type: string, trin: true, required: true }, //o TRIN se tiver um espaço no começo ou no final ele apaga
    }),
  ],
});

const UserModel = model("User", userSchema);

module.exports = UserModel;
