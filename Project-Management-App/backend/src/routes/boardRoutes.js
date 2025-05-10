import express from 'express'
import boardController from '../controllers/boardController.js'
import { AuthenticateUser } from '../middlewares/authMiddleware.js'
const router = express.Router()

router.post('/createBoard',AuthenticateUser,boardController.createBoardController)       // body:{ title }	desc: Create a new board
router.get('/getBoards',AuthenticateUser,boardController.getAllBoardsController)          //desc: Get all boards of logged-in user
router.get('/getBoardById/:boardId',AuthenticateUser,boardController.getBoardsByIdController)  //Get single board with lists & tasks by populating lists and tasks
router.put('/updateBoard/:boardId',AuthenticateUser,boardController.updateBoardController)  // body: { title }	Update board title
router.put('/updateBoard/:boardId/members',AuthenticateUser,boardController.addMemberController) // body: { memberId }	Add member (user) to board
router.delete('/deleteboard/:boardId',AuthenticateUser,boardController.deleteBoardController)  // delete board




export default router