import ProductModel from "../Models/ProductModel.js"


const findProductsByVendorId = async (id) =>{

   try {
    const allProducts = await ProductModel.find({vendorId:id})
    return allProducts

   } catch (error) {
    console.log('error in findProducts service',error)
    throw new Error('error in findProducts service',error)
   }

}

export default {
    findProductsByVendorId
}