const jwt = require('jsonwebtoken')


const tokenVerification = async (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send("Acceso denegado");
    try {

      const payload = jwt.verify(token, process.env.secretword);
      req.payload = payload;
      next();

    } catch (error) {
      try {
        const payload = jwt.verify(token, process.env.SECRET_TOKEN_REFRESH);
        req.payload = payload;
        next();
      } catch (error) {
        res.status(400).send("Token caducado o no valido");
      }
    }
  };

  const adminVerification = async (req, res, next) => {
    try {
      const payload = req.payload;
      if (payload.role === "user")
        return res.status(401).send("No tienes permisos");
      next();
    } catch (error) {
      res.status(400).send("Token caducado o no valido");
    }
  };


module.exports = { tokenVerification, adminVerification }