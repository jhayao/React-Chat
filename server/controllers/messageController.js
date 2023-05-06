const Message = require("../models/messageModel.js");

module.exports.sendMsg = async (req, res,next) => {
    try {
        const { message, sender, receiver } = req.body;
        const msg = await Message.create({
            message : {text: message},
            users: [sender, receiver],
            sender: sender,
        });
        if(msg)
        {
            res.json({message:"message sent successfully"});
        }
        else{
            res.json({message:"message not sent"})
        }
       
    } catch (ex) {
        next(ex);
    }
};

module.exports.getMsg = async (req, res,next) => {
    try {
        console.log(req.body)
        const messages = await Message.find({
            users: { $all: [req.body.sender, req.body.receiver] },
        }).sort({ createdAt: 1 });

        const projectedMsg = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === req.body.sender.toString(),
                message: msg.message.text,
                createdAt: msg.createdAt,
            }
        })

        res.json(projectedMsg);
    } catch (ex) {
        next(ex);
    }
}


