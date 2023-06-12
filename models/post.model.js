// const express = require("express")

const mongoose = require("mongoose")

const postSchema = mongoose.Schema({

title: String,
body : String,
device : String , enum:["Laptop", "Tablet", "Mobile"],
no_of_comments: Number,
userID:String,
user:String
 
},{
    versionKey:false
})

const PostModel = mongoose.model("post",postSchema)

module.exports = {
    PostModel
}