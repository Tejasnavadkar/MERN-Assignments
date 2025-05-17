import express from 'express'
const router = express.Router()
import taskController from '../controllers/taskController.js'
import {AuthenticateUser} from '../middlewares/authMiddleware.js'

router.post('/createTask',AuthenticateUser,taskController.createTaskController) // body: { listId, title, description, assignedTo }	Create task inside list
router.put('/updateTask/:taskId',AuthenticateUser,taskController.updateTaskController) // body: { title, description, assignedTo }	Update task
router.delete('/deleteTask/:taskId',AuthenticateUser,taskController.deleteTaskController) // delete task
router.put('/moveTask/:taskId',AuthenticateUser,taskController.moveTaskController) //{ destinationListId, position(optional add later this) }	Move task to another list (drag-drop)
router.get('/getTask/:taskId',AuthenticateUser,taskController.getTaskByIdController)
export default router
