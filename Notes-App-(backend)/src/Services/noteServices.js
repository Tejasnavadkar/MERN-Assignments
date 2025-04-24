import NoteModel from "../Models/Note.Model"


const createNote = async (payload) => {

    try {

        const note = await NoteModel.create(payload)
        return note

    } catch (error) {
        throw new Error('error in createNote service:',error)
    }

}

export default {
    createNote
}