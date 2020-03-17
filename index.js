const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const socket = require("socket.io");
const userRoute = require("./routes/user/user");
const postRoute = require("./routes/post/posts");
const cors = require("cors");
const { postsBus, commentsBus } = require('./services/posts');

//1.Stworzyc middleware ktory bedzie sprawdzal czy mam token, jesli mam to wyrzucam go jako req.user
//2.Po wyrzuconym tokenie robie enxta i funkcje(middleware), ktora nazywa sie isLogin
//3.isLogin sprawdza czy mam req.user, jesli mam to pozwala mi wejscia na konkretny rout np posts

dotenv.config();

app.use(cors());

//Connect to DB with .env variable
mongoose.connect(process.env.DB_CONNECT,{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, },() => console.log("Connected to DB"));

//bodyparser without outside libraries
app.use(express.json());

//route middleware
app.use("/api/user", userRoute);
app.use("/api/posts", postRoute);


//socket.io
const server = app.listen(3000, () => console.log("SERVER ON"));
const io = socket(server);
postsBus.on('newPost', post => io.emit('posts', post));
commentsBus.on('newComment', comment => {
  console.log(comment, "Dodaje")
  io.emit('comments', comment)
});
 