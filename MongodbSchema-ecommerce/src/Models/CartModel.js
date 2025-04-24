import mongoose, { Types } from "mongoose";

const CartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    products:[{
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product',
            required:true
        },
        quantity:{
            type:Number,
            required:true,
            min:1,
            default:1
        }
    }],
    total:{
        type:Number,
        required:true,
        default:0,
        min:0
    }
},{
    timestamps:true
})

const CartModel = mongoose.model('Cart',CartSchema)

export default CartModel