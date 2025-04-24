import noteServices from "../Services/noteServices"



const createNoteController = async (req,res) =>{

    try {
        const {title,description,tags} = req.body

        if(!title){
            return res.status(401).json({msg:'title is required'})
        }

        const payload = {
            user:req.userId,
            title:title,
            tags:tags
        }

       const createdNote = await noteServices.createNote(payload)

       if(!createdNote){
        return res.status(401).json({msg:'unable to create note'})
       }

       res.status(201).json({
        msg:'note created successfully',
        note:createdNote
       })

    } catch (error) {
        res.status(500).json({err:'server error',error})
    }
}

export default {
    createNoteController
}