const express = require("express");
const router = express.Router();
const { addUser, deleteUser, updateUser, getById} = require("../controllers/usersController");
const { tokenVerification } = require("../middlewares/authorization");

router.post("/user", addUser)
router.delete("/user/:idUser", deleteUser)
router.patch("/user/:idUser", updateUser)
router.get("/user/myProfile", tokenVerification ,getById)

module.exports = router