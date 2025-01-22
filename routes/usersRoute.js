const express = require("express");
const router = express.Router();
const { addUser, getUser, deleteUser, updateUser, getById} = require("../controllers/usersController");
const { tokenVerification } = require("../middlewares/authorization");

router.post("/users", addUser)
router.get("/users", getUser)
router.delete("/users/:idUser", deleteUser)
router.patch("/users/:idUser", updateUser)
router.get("/user/myProfile", tokenVerification ,getById)

module.exports = router