const { register, login,alluser } = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);

router.get('/alluser/:id',alluser);

module.exports = router;