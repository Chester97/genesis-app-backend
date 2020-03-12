const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 30
    },
    surname: {
        type: String,
        required: true,
        min:2,
        max:50
    },
    login: {
        type: String,
        required: true,
        min: 3,
        max: 40
    },
    password: {
        type: String,
        required: true,
        max: 100,
        min: 4
    },
    email: {
        type:String,
        required: false,
        min:7,
        max: 50
    }
});

module.exports = mongoose.model("User", userSchema);