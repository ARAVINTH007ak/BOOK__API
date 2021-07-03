const mongoose=require("mongoose");

//!Schema
const BookSchema=mongoose.Schema({
    ISBN:String,
    title:String,
    authors:[Number],
    language:String,
    pubDate:String,
    numOfPage:Number,
    category:[String],
    publication:Number,

    
});

//!Creating a book modal

const BookModel=mongoose.model("books",BookSchema);

//!Exporting
module.exports=BookModel;