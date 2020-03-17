const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    min: 1,
    max: 250,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Posts",
    required: true,
  }
});

module.exports = mongoose.model("Comments", commentsSchema);