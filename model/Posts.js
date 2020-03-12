const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    min: 10,
    max: 50
  },
  description: {
    type: String,
    required: true,
    min: 20,
    max: 1000
  }
});

module.exports = mongoose.model("Posts", postsSchema);