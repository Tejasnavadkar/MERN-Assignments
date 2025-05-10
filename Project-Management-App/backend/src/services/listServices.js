import listModel from "../models/List.js"

const createList = async (payload) =>{

   try {
    const list = await listModel.create(payload)
   return list
   } catch (error) {
    throw new Error(error.message)
   }
}

const findList = async (listId) =>{

    try {
     const list = await listModel.findById(listId)
    return list
    } catch (error) {
     throw new Error(error.message)
    }
 }

export default {
    createList,
    findList
}