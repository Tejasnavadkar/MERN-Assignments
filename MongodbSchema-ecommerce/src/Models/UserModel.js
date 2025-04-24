import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['user','admin'],
        default: 'user'
    },
    cart:[{
        product: {
            type: mongoose.Schema.Types.ObjectId,  // productId
            ref: 'Product'
        },
        quantity: {  // product quantity
            type: Number,
            default: 1,
            min: 1
        }
    }]
},
{
    timestamps:true
}
)

const UserModel = mongoose.model('User',UserSchema)
export default UserModel