const express = require("express");
const router = express.Router();
const { addUser, deleteUser, updateUser, getById} = require("../controllers/usersController");
const { tokenVerification, adminVerification } = require("../middlewares/authorization");

router.post("/user", adminVerification, addUser)
router.delete("/user/:idUser", deleteUser)
router.patch("/user/:idUser", updateUser)
router.get("/user/myProfile", tokenVerification ,getById)

module.exports = router