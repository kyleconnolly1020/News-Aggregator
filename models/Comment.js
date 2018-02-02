//Import Mongoose and use schema constructor
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Create a new CommentSchema object 
var CommentSchema = new Schema({
    body: String
});

//Create the model with the above schema
var Comment = mongoose.model("Comment", CommentSchema);

//Export the Comment model 
module.exports = Comment; 