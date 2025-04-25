import express from 'express'
import notesController from '../Controllers/notesController.js'
import { AuthenticateUser } from '../Middlewares/AuthMiddleware.js'
const router = express.Router()


router.post('/createNote',AuthenticateUser,notesController.createNoteController)
router.get('/getAllNotes',AuthenticateUser,notesController.getAllNotesController)
router.put('/updateNote/:noteId',AuthenticateUser,notesController.updateNoteController)
router.delete('/deleteNote/:noteId',AuthenticateUser,notesController.deleteNoteController)



export default router