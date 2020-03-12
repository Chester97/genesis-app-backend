const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Posts = require("../../model/Posts");
const User = require("../../model/User");
const io = require("../../index");
const { postsValidation } = require("../../validation");
const { onPostAdded } = require('../../services/posts');

router.post("/addPost", async (req,res) => {

    //variable for accessToken
    let currentAccessToken = null;

    //Validate request body
    const { error } = postsValidation(req.body);

    if(error) {
        const errorMsg = error.details[0];
        return res.status(400).send(errorMsg);
    }

    //Check if post exist
    await Posts.exists({...req.body}, (error, data) => {

        if(data) {
            isTitleInDB = true;
            return res.status(404).send({message: "Title already exist"})
        }
        if(req.headers.authorization) {
            currentAccessToken = req.headers.authorization.split(" ")[1];
        }else {
            res.status(400).send({ message: "No Auth token find" });
        }

        //verify user access token
        jwt.verify(currentAccessToken, process.env.TOKEN_SECRET, async (err, decoded) => {
            if (err) return res.status(404).send({message: err});
            const post = new Posts({
                author: decoded._id,
                ...req.body,
            });
    
            try {
                await post.save();
                onPostAdded(post);
                res.status(200).send(post);
            }catch(error) {
                res.status(409).send(error);
            }
        });
    });
});

router.get('/getPosts', async (req,res) => {

    //Get AccessToken and convert it
    let currentAccessToken = null;
    if(req.headers.authorization) {
        currentAccessToken = req.headers.authorization.split(" ")[1];
    };

    //verifyToken
    jwt.verify(currentAccessToken, process.env.TOKEN_SECRET, async (err, decoded) => {
        if(err) return res.status(404).send({ message: err });
        await Posts.find((error, data) => {
            if(data.length > 0) {
                return res.status(200).send(data);
            }
            return res.status(400).send({ message: "There is no post in DB" });
        });
    })
});


module.exports = router;