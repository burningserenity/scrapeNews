const mongoose = require("mongoose");

// Save a reference to the Schema constructor, because typing mongoose.Schema the one time I have to is ridiculous
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    author: String,
    body: String
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
