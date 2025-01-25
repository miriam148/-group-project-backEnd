const express = require("express");
const router = express.Router();
const { addUser, getUser, deleteUser, updateUser, getById, getAllUsers} = require("../controllers/usersController");
const { tokenVerification } = require("../middlewares/authorization");

router.post("/users", addUser)
router.get("/users", getUser)
router.get("/getAllUsers", getAllUsers)
router.delete("/users/:idUser", deleteUser)
router.patch("/users/:idUser", updateUser)
router.get("/user/myProfile", tokenVerification ,getById)

module.exports = router