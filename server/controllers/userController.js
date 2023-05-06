const User = require("../models/userModels");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const emailcheck = await User.findOne({ email });
    if (emailcheck) return res.json({ message: "Email already exists" });

    const passwordhash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: passwordhash,
      name,
    });
    delete user._doc.password;
    return res.json({ message: "User registered successfully", user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.json({ message: "User does not exist" });
        const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ message: "Incorrect password" });
        delete user._doc.password;
    return res.json({ message: "User logged in successfully", user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.alluser = async (req, res,next) => {
    try {
        const user = await User.find({ _id: { $ne: req.params.id } }).select(
        "-password"
        );
        res.json(user);
    } catch (ex) {
        next(ex);
    }
    }
