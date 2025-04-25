import UserModel from "../Models/User.Model.js"



const findUser = async (email) => {

    try {
        // populate to show entire notes
        const user = await UserModel.findOne({email}).populate({
            path: 'notes.note',
            model: 'Note'
        })
        return user

    } catch (error) {
        throw new Error('error in findUser service:',error)
    }
}

const createUser = async (payload) => {

    try {

        const user = await UserModel.create(payload)
        return user

    } catch (error) {
        throw new Error('error in createUser service:',error)
    }

}

export default {
    findUser,
    createUser
}