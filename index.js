const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const socket = require("socket.io");
const userRoute = require("./routes/user/user");
const postRoute = require("./routes/post/posts");
const Posts = require("./model/Posts");
const cors = require("cors");
const { postsBus } = require('./services/posts');

dotenv.config();

app.use(cors());

//Connect to DB with .env variable
mongoose.connect(process.env.DB_CONNECT,{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },() => console.log("Connected to DB"));

//bodyparser
app.use(express.json());

//route middleware
app.use("/api/user", userRoute);
app.use("/api/posts", postRoute);


//socket.io
const server = app.listen(3000, () => console.log("SERVER ON"));
const io = socket(server);
postsBus.on('newPost', post => io.emit('posts', post));
