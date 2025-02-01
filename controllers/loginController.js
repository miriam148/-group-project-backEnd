const userModel = require("../models/usersModels")
const bcrypt = require('bcrypt')
const { tokenGenerate } = require('../utils/utils')

const signup = async (req, res) => {
try {

    console.log(req.body);
    const { name, lastname, phoneNumber, road, postCode, city,  email, password, role, subscription} = req.body;
    const existsUser = await userModel.findOne({ email });
      if (existsUser) {
          return res.status(400).json({ message: "El email ya está registrado." });
      }
    const newUser = new userModel( {
        name,
        lastname,
        phoneNumber,
        road,
        postCode,
        city,
        email,
        password: await bcrypt.hash(password, 10),
        role,
        subscription
    }) 
   
    console.log(newUser)
    await newUser.save()
    res.status(201).send("Usuario creado correctamente")
} catch (error) {

    if (error.code === 11000) {
        return res
        .status(409)
        .send({ status: "Failed", error: "El usuario ya existe" })
    }

    res.status(500).send({ status: "failed", error: error.message })
    
}}


const login = async (req, res) => {
    try {
        const { email, password } =req.body
        const user = await userModel.findOne({ email:email})
        if (!user) {
            return res.status(404).send("Usuario o contraseña no válidos")

        }

        const validatePassword = await bcrypt.compare(password, user.password)
        if (!validatePassword) {
            return res.status(404).send("Usuario o contraseña no válidos")
        }

        const payload = {
            _id: user._id,
            email: user.email,
            role: user.role
        }
       
       
   const token = tokenGenerate(payload,false)
   const token_refresh = tokenGenerate(payload,true)
        res.status(200).send({user, token, token_refresh}) 
    } catch (error) {
        res.status(500).send({ status: "failed", error: error.message})
        
    }
}

module.exports = { signup, login, tokenGenerate}