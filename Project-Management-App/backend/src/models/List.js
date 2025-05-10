import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    board:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Board'
    },
    tasks:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Task'
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const listModel = mongoose.model('List',listSchema)
export default listModel