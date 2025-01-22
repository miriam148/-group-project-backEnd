const userModel = require("../controllers/usersController")
const bcrypt = require('bcrypt')
const { tokenGenerate } = require('../utils/utils')

const signup = async (req, res) => {
try {
    const { name, lastname, address, phoneNumber, email, password, role} = req.body
    const newUser = {
        name,
        lastname,
        address,
        phoneNumber,
        email,
        password: await bcrypt.hash(password, 10),
        role
    }
    await userModel.create(newUser);
    res.status(200).send("Usuario creado correctamente")
} catch (error) {

    if (error.code === 11000) {
        return res
        .status(500)
        .send({ status: "Failed", error: "El usuario ya existe" })
    }

    res.status(500).send({ status: "failed", error: error.message })
    
}
}


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

module.exports = { signup, login}