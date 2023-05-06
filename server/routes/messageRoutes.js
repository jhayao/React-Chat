const { sendMsg,getMsg } = require("../controllers/messageController");

const router = require("express").Router();

router.post("/sendMsg", sendMsg);
router.post("/getMsg", getMsg);



module.exports = router;