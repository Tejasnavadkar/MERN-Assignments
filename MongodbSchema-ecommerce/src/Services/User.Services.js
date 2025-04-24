import UserModel from "../Models/UserModel.js";

const findUserById = async (userId) => {
    try {
        const user = await UserModel.findById(userId);
        return user;
    } catch (error) {
        console.log('error in findUserById service', error);
        throw error;
    }
}

export default {
    findUserById
}