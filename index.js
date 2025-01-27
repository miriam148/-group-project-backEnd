const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./routes/usersRoute");
const loginRouter = require("./routes/loginRoutes");
require("dotenv").config();
const connectToDB = require("./db/db");
const app = express();
app.use(express.json());

connectToDB();

app.use("/api", usersRouter);
app.use("/api", loginRouter);

app.listen(3000, () => {
  console.log("Server is running http://localhost:3000");
});

// definir el esquema de usuario
const userSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  phoneNumber: String,
  road: String,
  postCode: String,
  city: String,
  email: String
});

const User = mongoose.model('User', userSchema);

// ruta PATCH para actualizar un usuario
app.patch('/user/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updateUser = await User.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updateUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(updateUser);  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el usuario' });
  }
});

// iniciar servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});

// module.exports = 
