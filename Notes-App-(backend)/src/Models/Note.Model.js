import mongoose from "mongoose";


const NoteSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
    },
    tags:{
        type:Array
    }

},{
    timestamps:true
})

const NoteModel = mongoose.model('Notes',NoteSchema)

export default NoteModel