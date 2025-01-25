const express = require("express");
const router = express.Router();
const { addUser, deleteUser, updateUser, getById, getUser} = require("../controllers/usersController");
const { tokenVerification } = require("../middlewares/authorization");

router.get("user/allUser", getUser)
router.post("/user", addUser)
router.delete("/user/:idUser", deleteUser)
router.patch("/user/:idUser", updateUser)
router.get("/user/myProfile", tokenVerification ,getById)

module.exports = router