const express = require('express');
const cors = require("cors");
const usersRouter = require('./routes/usersRoute');
const loginRouter = require ('./routes/loginRoutes')
require('dotenv').config()
const connectToDB = require ('./db/db')
const app = express();
app.use(express.json());
app.use(cors());

connectToDB()

app.use('/api', usersRouter )
app.use('/api', loginRouter)

app.listen(3000, () => {
    console.log("Server is running http://localhost:3000");
  });

  