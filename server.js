// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const request = require("request");
const cheerio = require("cheerio");
const axios = require("axios");
const logger = require("morgan");
const bodyParser = require("body-parser");

// Nice abbreviating, that'll save some typing
const app = express();

// Use models for MongoDB
const db = require("./models");

// Set listening port based on environment
const port = process.env.PORT || 3000;

// Middleware
app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));

// Configure mongoose
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/newsscraper" || "mongodb://heroku_brhbx6dt:hfuo9qjrf11m75omlm10pk7cbr@ds231725.mlab.com:31725/heroku_brhbx6dt", {
    useMongoClient: true
});

app.get("/", (req, res) => {
    axios.get("http://www.clickhole.com/features/news/").then((response) => {
        const $ = cheerio.load(response.data);
        $("h2.headline").each(function(i, element) {
            const result = {};
            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");
            axios.get(`http://www.clickhole.com${result.link}`).then((nestResponse) => {
                const $$ = cheerio.load(nestResponse.data);
                result.summary = $$("div.article-text")
                    .children("p")
                    .first()
                    .text();
                console.log(`\n${result.summary}\n`);
            })
        });
    });
});

app.listen(port, () => {
    console.log("Listening on port " + port + "...");
});
