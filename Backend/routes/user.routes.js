const express = require("express")
const {UserModel} = require("../models/user.model")
const bcrypt = require("bcrypt")
const userRouter = express.Router()
require("dotenv").config()
const jwt = require("jsonwebtoken")

userRouter.post("/register",async(req,res)=>{
 // 1) get data from body
    const {name,email,pass} = req.body
    try {

        // 2) using bacrypt hash for hasing the password (pass, sault round, callback(err,hash))
   bcrypt.hash(pass,5,async(err,hash)=>{
      if(err)
      {
        res.json({err:err.message})
      }
      else
      {
        const user = new UserModel({name,email,pass:hash})
        await user.save()
        res.json({msg:"user is registered" , user:req.body})
      }

      
   })
        
    } catch (error) {
        res.json({error:error.message})
    }

})

userRouter.post("/login",async(req,res)=>{

    // 1) get email, pass from req.body
    const {email,pass} = req.body

    try {

        // 2) find email using findOne({email})
        const user = await UserModel.findOne({email})

        if(user)
        {
            // then compare sending body pass and database pass are same or not for that we have to compare using bcrypt compare(pass,user.pass,callback(err,result))
            bcrypt.compare(pass,user.pass,(err,result)=>{
                if(result)
                {
                    // for generating token we have to use jwt.sign({payload,secret key})

                    let token = jwt.sign({userID:user._id,user:user.name},process.env.secrete)

                    res.json({msg:"login successfully",token:token})
                }
                else
                {
                    res.json({msg:"wrong credantials"})
                }
            })
        }
        else
        {
            res.json({msg:"user does not exists"})
        }
        
    } catch (error) {
        
        res.json({error:error.message})
    }

})

module.exports = {
    userRouter
}