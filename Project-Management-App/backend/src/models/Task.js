import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    list:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'List'
    },
    activityLog:[{  // to track every activity log like task created,task moved to another list etc
        action:String,
        timestamp:{
            type:Date,
            default:Date.now
        }
    }],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const taskModel = mongoose.model('Task',taskSchema)
export default taskModel