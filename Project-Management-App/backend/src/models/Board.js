import mongoose from 'mongoose'


const boardSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    owner:{  // kis owner ka hai
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    lists:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'List'
    }],
    createdAt:{
        type:Date,
        default:Date.now()
    }
}) 

const BoardModel = mongoose.model('Board',boardSchema)
export default BoardModel