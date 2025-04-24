import express from 'express'
import notesController from '../Controllers/notesController'
import { AuthenticateUser } from '../Middlewares/AuthMiddleware'
const router = express.Router()


router.post('/createNote',AuthenticateUser,notesController.createNoteController)
router.get('/getAllNote',)
router.put('/updateNote',)
router.delete('/deleteNote',)



export default router