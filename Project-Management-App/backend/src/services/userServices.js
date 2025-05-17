import userModel from "../models/User.js"



const findUser = async (email) => {

    try {
        // populate to show entire notes
        // const user = await userModel.findOne({email}).populate({
        //     path: 'notes.note',
        //     model: 'Note'
        // })

       const user = await userModel.findOne({email})
        return user

    } catch (error) {
        throw new Error(`error in findUser service:${error}`)
    }
}

const getAllUsers = async () => {

    try {
        // populate to show entire notes
        // const user = await userModel.findOne({email}).populate({
        //     path: 'notes.note',
        //     model: 'Note'
        // })

       const allUsers = await userModel.find()
        return allUsers

    } catch (error) {
        throw new Error(`error in getAllUsers service:${error}`)
    }
}

const createUser = async (payload) => {

    try {

        const user = await userModel.create(payload)
        return user

    } catch (error) {
        throw new Error('error in createUser service:',error)
    }

}

export default {
    findUser,
    createUser,
    getAllUsers
}