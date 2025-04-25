import NoteModel from "../Models/Note.Model.js"


const createNote = async (payload) => {

    try {

        const note = await NoteModel.create(payload)
        return note

    } catch (error) {
        throw new Error('error in createNote service:', error)
    }

}

const getAllNotes = async () => {

    try {

        const notes = await NoteModel.find()
        return notes

    } catch (error) {
        throw new Error('error in getAllNotes service:', error)
    }

}

const findNote = async (noteId) => {

    try {
        const note = await NoteModel.findById(noteId)
        return note
    } catch (error) {
        console.log('error in find note',error)
        throw new Error('error in findNote service:', error)
    }

}

const updateNote = async (noteId, payload) => {

    try {
        const updatedNote = await NoteModel.findByIdAndUpdate(noteId, payload)
        return updatedNote
    } catch (error) {
        throw new Error('error while updating Note:',error)
    }

}

const deleteNote = async (noteId) => {

    try {
        const deletedNote = await NoteModel.findByIdAndDelete(noteId)
        return deletedNote
    } catch (error) {
        throw new Error('error while deleting Note:',error)
    }

}

export default {
    createNote,
    getAllNotes,
    findNote,
    updateNote,
    deleteNote
}