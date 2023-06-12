const express = require("express")
const {UserModel} = require("../models/user.model")
const bcrypt = require("bcrypt")
const userRouter = express.Router()
require("dotenv").config()
const jwt = require("jsonwebtoken")

userRouter.post("/register",async(req,res)=>{
 // 1) get data from body
    const {name,email,pass,gender,age,city,is_married} = req.body
    try
    {

        let finduser = await UserModel.findOne({email})

        if(finduser)
        {
            res.json({mesg:"User already exist, please login"})
        }

        else
        {

    bcrypt.hash(pass,5,async(err,hash)=>{
        if(err)
        {
          res.json({err:err.message})
        }
        else
        {
          const user = new UserModel({name,email,pass:hash,gender,age,city,is_married})
          await user.save()
          res.json({msg:"user is registered" , user:req.body})
        }
  
     })

    }
          
      } catch (error) {
          res.json({error:error.message})
      }
})

userRouter.post("/login",async(req,res)=>{

    // 1) get email, pass from req.body
    const {email,pass} = req.body

    try {

        let user = await UserModel.findOne({email})

        if(user)
        {
            bcrypt.compare(pass,user.pass,(err,result)=>{
                if(result)
                {
                    let token = jwt.sign({userID:user._id,user:user.name},process.env.secrete)

                    res.json({mesg:"login successfull", token:token})
                }
                else
                {
                    res.json({mesg:"wrong crediantials"})
                }
            })
        }
        else
        {
            res.json({mesg:"user does not exists"})
        }  
        
    } catch (error) {
        
       res.json({error:error.message})
    }

})

module.exports = {
    userRouter
}