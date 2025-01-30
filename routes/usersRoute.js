const express = require("express");
const router = express.Router();



const { addUser, deleteUser, updateUser, getById, getAllUsers} = require("../controllers/usersController");
const { tokenVerification, adminVerification } = require("../middlewares/authorization");

router.post("/users", adminVerification, addUser)
router.get("/users", getAllUsers)
router.delete("/users/:idUser", deleteUser)
router.patch("/users/:idUser", updateUser)
router.get("/user/myProfile", tokenVerification ,getById)

module.exports = router