import express from 'express'
import ProductsController from '../Controllers/Products.Controller.js'
const router = express.Router()

router.get('/getProductsByVendorId',ProductsController.getAllProducts)

export default router