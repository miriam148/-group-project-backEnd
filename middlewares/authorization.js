const jwt = require('jsonwebtoken')

const tokenVerification = async (req, res, next) => {
 const token = req.header('auth')
 if (!token) return res.status(401).send("Acceso denegado")
    try {
        const payload = jwt.verify(token, process.env.secretword)
         req.payload = payload
         next()
    } catch (error) {
        res.status(400).send('Token caducado o no válido')
        
    }
}


module.exports = { tokenVerification }