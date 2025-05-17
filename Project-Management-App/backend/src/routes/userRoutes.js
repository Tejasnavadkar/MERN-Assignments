import express from 'express'
import userController from '../controllers/userController.js'
import { AuthenticateUser } from '../middlewares/authMiddleware.js'

const router = express.Router()


router.post('/registerUser',userController.registerUserController)
router.post('/loginUser',userController.loginUserController)
router.get('/getUsers',AuthenticateUser,userController.getUserController)


export default router