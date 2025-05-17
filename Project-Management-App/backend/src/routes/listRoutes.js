import express from 'express'
// import boardController from '../controllers/boardController'
import { AuthenticateUser } from '../middlewares/authMiddleware.js'
import listController from '../controllers/listController.js'
const router = express.Router()

router.post('/createlist',AuthenticateUser,listController.createListController)       // body:{ title }	desc: Create a new list
router.put('/updatelist/:listId',AuthenticateUser,listController.updateListController)  // body: { title }	Update board list
router.delete('/deletelist/:listId',AuthenticateUser,listController.deleteListController)  // delete list
// todo find lists/ or populate list in boards

export default router