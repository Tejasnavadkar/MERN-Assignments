import UserModel from "../Models/User.Model.js"
import noteServices from "../Services/noteServices.js"



const createNoteController = async (req,res) =>{

    try {
        const {title,content,tags} = req.body

        if(!title){
            return res.status(401).json({msg:'title is required'})
        }

        const payload = {
            user:req.userId,
            title:title,
            tags:tags,
            content:content
        }

       const createdNote = await noteServices.createNote(payload)

       if(!createdNote){
        return res.status(401).json({msg:'unable to create note'})
       }

       //when new note creates add it to user's note 
       await UserModel.findByIdAndUpdate(req.userId,{
        $push:{notes:{note:createdNote._id}}
       })

       res.status(201).json({
        msg:'note created successfully',
        note:createdNote
       })

    } catch (error) {
        res.status(500).json({err:'server error',error})
    }
}

const getAllNotesController = async (req,res) => {

    try {

       const notes = await noteServices.getAllNotes()

       if(!notes){
        return res.status(401).json({msg:'Notes not fond'})
       }

       res.status(201).json({allNotes:notes})

    } catch (error) {
        return res.status(500).json({msg:'server error',error:error})
    }

}

const updateNoteController = async (req,res) => {

    try {
        const noteId = req.params.noteId
        const data = req.body

        console.log('noteId--',noteId)

    // first check note is exist
    const existingNote = await noteServices.findNote(noteId)

    if(!existingNote){
        return res.status(404).json({msg:'note is not exist'})
    }

    

   const updatedNote = await noteServices.updateNote(noteId,data)

   if(!updatedNote){
    return res.status(404).json({msg:'unable update note'})
   }

   console.log('updtedNote--',updatedNote)

   return res.status(201).json({
    msg:'note updated successfully',
    // updatedNote:updatedNote
   })
    } catch (error) {
        return res.status(500).json({msg:'server error',error:error.message})
    }

} 

const deleteNoteController = async (req,res) =>{

    try {
        const noteId = req.params.noteId

    // first check note is exist
    const existingNote = await noteServices.findNote(noteId)

    if(!existingNote){
        return res.status(404).json({msg:'note is not exist'})
    }

   const deletedNote = await noteServices.deleteNote(noteId)

   if(!deletedNote){
    return res.status(404).json({msg:'unable delete note'})
   }

   return res.status(201).json({
    msg:'note deleted successfully',
   })

    } catch (error) {
        return res.status(500).json({msg:'server error',error:error.message})
    }

}

export default {
    createNoteController,
    getAllNotesController,
    updateNoteController,
    deleteNoteController
}