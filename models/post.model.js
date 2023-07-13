// const express = require("express")

const mongoose = require("mongoose")

const postSchema = mongoose.Schema({

FirstName:String,
LastName:String,
Email:String,
Department:String, 
Salary:Number,
userID:String,
user:String
 
},{
    versionKey:false
})

const PostModel = mongoose.model("post",postSchema)

module.exports = {
    PostModel
}