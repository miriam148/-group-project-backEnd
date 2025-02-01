const express = require('express')
const { signup, login } = require('../controllers/loginController')
const { tokenGenerate } = require('../utils/utils')
const { tokenVerification } = require('../middlewares/authorization')

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/refresh-token', tokenVerification, tokenGenerate )

module.exports = router