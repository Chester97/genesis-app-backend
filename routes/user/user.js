const router = require("express").Router();
const User = require("../../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../../validation");


router.post("/register", async (req,res) => {

    //Validate request body
    const { error } = registerValidation(req.body);

    if(error) {
        const errorMsg = error.details[0];
        return res.status(400).send(errorMsg);
    }
    
    //If user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(401).send({ message: "Email already exist" });

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //Create new user  (Check that is it work or not)!
    const { name,surname,login,email } = req.body; 
    const user = new User({
        name,
        surname,
        login,
        email,
        password: hashPassword,
    });
    
    try {
        const savedUser = await user.save();
        res.status(200).send(savedUser);
    }catch(err) {
        res.status(409).send({ message:err });
    }

});

router.post("/login", async (req,res) => {

    
    const { error } = loginValidation(req.body);   
    if(error) {
        const errorMsg = error.details[0];
        return res.status(400).send(errorMsg);
    }
    
    //Check if the login
    const user = await User.findOne({login: req.body.login});
    if(!user) return res.status(400).send({message: "Login doesnt exist"});
    const { _id, name, surname, login, email } = user;

    //Password is correct or not
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(401).send({message: "Invalid Password!"});

    //Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header("auth-token", token).status(200).send({accessToken: token, _id, name, surname, login, email});

});

module.exports = router;  