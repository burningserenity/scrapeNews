const mongoose = require("mongoose");
// Saving a reference to the Schema constructor, because typing out mongoose.Schema every time is too much
const Schema = mongoose.Schema;

// New schema object
const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        dropDups: true
    },
    link: {
        type: String,
        required: true
    },
    summary: {
        type: String
    },
    siteName: {
        type: String,
        required: true
    },
    siteURL: {
        type: String,
        required: true
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
});

const Article = mongoose.model("Article", ArticleSchema)

module.exports = Article;
