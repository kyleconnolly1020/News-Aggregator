//Import Mongoose and use schema constructor
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Create a new ArticleSchema object 
var ArticleSchema = new Schema({
    headline: {
        type: String,
        required: true,
        unique: true
    },

    summary: {
        type: String,
        required: true
    },

    url: {
        type: String,
        required: true
    },

    //The Article is populated with associated Comments 
    //Comments are linked to Article model by the ObjectId
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

//Create the model with the above schema
var Article = mongoose.model("Article", ArticleSchema);

//Export the Article model 
module.exports = Article; 