import UserModel from "../Models/User.Model"



const findUser = async (email) => {

    try {

        const user = await UserModel.findOne({email})
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