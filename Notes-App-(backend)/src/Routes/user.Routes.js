import express from 'express'
import userController from '../Controllers/userController.js'
const router = express.Router()


router.post('/registerUser',userController.registerUserController)
router.post('/loginUser',userController.loginUserController)



export default router