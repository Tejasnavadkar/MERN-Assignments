import ProductServices from "../Services/Product.Services.js"
import mongoose from "mongoose"
import UserServices from "../Services/User.Services.js"
const getAllProducts = async (req,res) =>{

    try {
        const {vendorId} = req.body

        if(!vendorId){
            return res.status(404).json({
                message:'vendorId is required'
            })
        }

         // Validate if vendorId is a valid ObjectId
         if(!mongoose.Types.ObjectId.isValid(vendorId)) {
            return res.status(400).json({
                message: 'Invalid vendorId format'
            });
        }

          // Check if vendor exists
        const vendor = await UserServices.findUserById(vendorId)

        if (!vendor) {
            return res.status(404).json({
                message: 'Vendor/user not found'
            });
        }
       const products = await ProductServices.findProductsByVendorId(vendorId)

       if(!products){
          return res.status(404).json({
            message:'products not found'
          })
       }

       res.status(200).json({
        products
       })

    } catch (error) {
        console.log('error:--',error)
        throw new Error('error in getAllProducts Controller',error)
    }
}
export default {getAllProducts}