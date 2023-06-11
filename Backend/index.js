const express= require("express")
const {userRouter} = require("./routes/user.routes")
const {noteRouter} = require("./routes/note.routes")
const {connection} = require("./db")
const app=express()
require("dotenv").config()
const cors = require("cors")

app.use(express.json())
app.use(cors())

app.use("/users",userRouter)
app.use("/notes",noteRouter)



app.listen(process.env.port, async ()=>{
  try {

    await connection
    console.log("connected to db")
    console.log(`server is running in ${process.env.port} server`)
    
  } catch (err) {
    console.log(err)
    console.log("something went wrong")
  }
})


