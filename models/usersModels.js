const mongoose = require('mongoose')
const Schema = mongoose.Schema;
 



const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    maxLength: [20, 'El nombre  no puede superar los 20 caracteres'],
    trim: true
  },
  lastname: {
    type: String,
    required: [true, "El apellido es obligatorio"],
    maxLength: [30, 'El apellido  no puede superar los 30 caracteres'],
    trim: true
  },
  phoneNumber: {
    type: Number,
    required: [true, "El teléfono es obligatorio"],
    minLength: [9, 'El teléfono  debe tener al menos 9 caracteres'],
    maxLength: [9, 'El teléfono  no puede superar los 9 caracteres'],
    trim: true
  },
  address: {
    road: { type: String, required: true, trim: true},
    postCode: { type: String, required: true, trim: true,  minLength: [5, 'El código postal  debe tener al menos 5 caracteres'],
        maxLength: [5, 'El código postal  no puede superar los 5 caracteres'], },
    city: { type: String, required: true, trim: true},
    
  },
  email: {
    type: String,
    required: [true, "El email es obligatorio"],
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, "la contraseña es obligatoria"],
    trim: true
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  favoritas: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "movie",
  },
  createAt: {
    type: Date,
    default: Date.now()
  }
});


const userModel = mongoose.model("User", userSchema, "user");
module.exports = userModel;