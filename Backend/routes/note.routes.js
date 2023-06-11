const express = require("express")
const noteRouter = express.Router()
const {NoteModel} = require("../models/note.model")
const {auth} = require("../middleware/auth.middleware")


noteRouter.use(auth)

noteRouter.post("/create",async(req,res)=>{

    try {

        const note = new NoteModel(req.body)
        await note.save()

        res.json({msg:"new note has been added",note:req.body})
        
    } catch (error) {
        res.json({error:error.message})
    }

})
noteRouter.get("/",async(req,res)=>{

    try {

        const notes = await NoteModel.find({userID:req.body.userID})

       res.send(notes)
        
    } catch (error) {
        res.json({error:error.message})
    }

})
noteRouter.patch("/update/:noteID",async(req,res)=>{

    // userID IN user ==== userId in notes
    const {noteID} = req.params
    const userIDinUserDoc = req.body.userID

    try {

        const note = await NoteModel.findOne({_id:noteID})
        const userIDinNoteDoc = note.userID

        if(userIDinUserDoc === userIDinNoteDoc)
        {
         await NoteModel.findByIdAndUpdate({_id:noteID},req.body)
         res.json({msg:`${note.title} has been updated`})
        }
        else
        {
            res.json({msg:"not authorized"})
        }
        
    } catch (error) {
        res.json({error:error})
    }
    

})
noteRouter.delete("/delete/:noteID",async(req,res)=>{

    const {noteID} = req.params
    const userIDinUserDoc = req.body.userID

    try {

        const note = await NoteModel.findOne({_id:noteID})
        const userIDinNoteDoc = note.userID
        
        if(userIDinUserDoc === userIDinNoteDoc)
        {
         await NoteModel.findByIdAndDelete({_id:noteID},req.body)
         res.json({msg:`${note.title} has been deleted`})
        }
        else
        {
            res.json({msg:"not authorized"})
        }
        
    } catch (error) {
        res.json({error:error.message})
    }
    

})

module.exports={
    noteRouter
}
