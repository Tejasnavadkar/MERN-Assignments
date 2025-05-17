import taskModel from "../models/Task.js"


const createTask = async (payload) =>{

    try {
       const task = await taskModel.create(payload)
       return task
    } catch (error) {

        throw new Error(`err in create Task service: ${error.message}`)
        
    }

}

const getTask = async (taskId) =>{

    try {
       const task = await taskModel.findById(taskId)
       return task
    } catch (error) {

        throw new Error(`err in get Task service: ${error.message}`)
        
    }

}


export default {
    createTask,
    getTask
}