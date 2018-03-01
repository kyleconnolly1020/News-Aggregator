var request = require("request");
var cheerio = require("cheerio");
var db = require("../models");

module.exports = function (app) {
    
    //Use Cheerio to scrape the article headlines from Financial Times, format it properly, and store it in MongoDB database
    app.get("/scrape", function (req, res) {
        request("https://www.ft.com/", function (error, response, html) {
            var $ = cheerio.load(html);

            $(".o-teaser__content").each(function (i, element) {
                var result = {};

                var title = $(this).children(".o-teaser__heading").text();
                var titletrim = title.trim();
                var titletrimNewLine = titletrim.replace(/\r?\n|\r/g, "");

                result.headline = titletrimNewLine;
                result.summary = $(this).children(".o-teaser__standfirst").text();
                result.url = `https://www.ft.com${$(this).children(".o-teaser__heading").children("a").attr("href")}`;

                db.Article.create(result)
                    .then(function (dbArticle) {
                    })
                    .catch(function (err) {
                        return res.json(err);
                    });
                
            });

            res.redirect("/");
        });
    });

    //Root route for displaying all stored articles 
    app.get("/", function (req, res) {
        db.Article.find({})
            .then(function (dbArticle) {
                res.render("articles", { articles: dbArticle });
            })
            .catch(function (err) {
                console.log(err);
            });
    });

    //Populate the comments for the article, based on the id of the article
    app.get("/comments/:id", function (req, res) {
        db.Article.findOne({ _id: req.params.id })
            .populate("comments")
            .then(function (dbArticle) {
                res.render("comments", { comments: dbArticle });
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    //Create a new comment for associated article (by _id)
    app.post("/comments/:id", function (req, res) {
        db.Comment.create(req.body)
            .then(function (dbComments) {
                return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { comments: dbComments._id } }, { new: true });
            })
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    //Route for deleting a comment for the article 
    app.delete("/comments/:id/:id2", function (req, res) {
        db.Article.findOneAndUpdate({ _id: req.params.id }, { $pullAll: { comments: [req.params.id2] } })
            .then(function () {
                db.Comment.findByIdAndRemove(req.params.id2)
                    .then(function (data) {
                        res.json(data);
                    });
            });
    });
};
