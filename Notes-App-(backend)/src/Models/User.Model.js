import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    notes:[{
        note:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Notes'
        }
    }]
},{
    timestamps:true
})

const UserModel = mongoose.model('User',UserSchema)

export default UserModel