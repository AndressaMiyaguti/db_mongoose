const { Schema, model } = require("mongoose");
/* Outra forma de instanciar 
const Schema = require("mongoose").Schema;
const model = require("mongoose").model; */
const mongoose = require("mongoose");

const UserSchema = new Schema({
  // new pq Schema é uma classe do mongoose
  //definindo os campos que a tabela ira ter
  name: { type: String, required: true }, //true pq é imprescindível o preenchimento
  email: {
    type: String,
    required: true,
    match: [
      /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i,
      "Gentileza fornecer um email válido",
    ],
  }, //regex para validação de email /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i e o segundo parâmetro é a mensagem que aparecerá para o usuário
  passwordHash: { type: String, required: true },
  street: { type: String, required: true },
  number: { type: Number, required: true },
  postalCode: { type: Number, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },

  role: {
    type: String,
    required: true,
    enum: ["customer", "seller"], // Papel do usuário utilizamos o enum, que permite receber um array de opções para aquele campo, no caso se é usuário ou colaborador
    default: "customer",
  }, //o default define como padrão o tipo de usuário da criação
  creditCars: [
    new Schema({
      number: { type: Number, required: true },
      name: { type: String, required: true },
      flags: { type: String, required: true, enum: ["MasterCard", "Visa"] },
      securityCode: { type: Number, required: true, maxLength: 3 },
      expiryDate: { type: String, trin: true, required: true }, //o TRIN se tiver um espaço no começo ou no final ele apaga
    }),
  ],

  createdAt: { type: Date, required: true, default: new Date() },
  isActive: { type: Boolean, required: true, default:true},
  desactivatedAt: {},
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
