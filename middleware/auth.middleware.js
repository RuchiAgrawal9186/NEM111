
const jwt = require("jsonwebtoken")
require("dotenv").config()
const auth = (req,res,next) =>{

  // 1) first get the data from the req.headers,authorization?split(" ")[1]
    const token = req.headers.authorization?.split(" ")[1]

    if(token)
    {
          try {

            // 2) check token availbale then verify using jwt verify (token,secret key)
            
            const decode = jwt.verify(token,process.env.secrete)
             if(decode)
             {
                req.body.userID = decode.userID
                req.body.user=decode.user
                next()
             }
             else
             {
                res.json({msg:"not authorize"})
             }
            
          } catch (error) {
            res.json({error:error.message})
          }
    }
    else
    {
        res.json({msg:"please login"})
    }

}

module.exports={
    auth
}