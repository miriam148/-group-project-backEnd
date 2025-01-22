const dbUrl = process.env.mongo_url;
const mongoose = require('mongoose')

const connectToDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("conexión a mongoDB exitosa");
  } catch (err) {
    console.log("error al conectar con mongoDB", err);
  }
};

module.exports = connectToDB;