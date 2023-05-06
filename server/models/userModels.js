const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    name: {
        type: String,
        required: true,
        min: 3,
        max: 20,
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
