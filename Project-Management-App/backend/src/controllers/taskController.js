// import listServices from "../services/listServices.js"
import taskModel from "../models/Task.js"
import listServices from "../services/listServices.js"
import taskServices from "../services/taskService.js"

const createTaskController = async (req, res) => {

    try {

        const { listId, title, description, assignedTo } = req.body

        if (!listId || !title || !description || !assignedTo) {
            return res.status(422).json({ message: 'invalid inputs' })
        }

        const payload = {
            listId,
            title,
            description,
            assignedTo
        }

        // create task service
       const createdTask = await taskServices.createTask(payload)

       const list = await listServices.findList(listId)

       if(!list){
        return res.status(404).json({message:'list of this listId not found'})
       }

       list.tasks.push(createdTask._id) // add/associate task to list 
       await list.save()

       return res.status(201).json({ message:'task created', createdTask:createdTask })
       

    } catch (error) {
        res.status(500).json({ message: 'server error', error: error.message })
    }

}

const updateTaskController = async (req, res) => {

   try {
    const { taskId } = req.params

    const { title, description, assignedTo } = req.body;

    if (!taskId) {
        return res.status(422).json({ meassage: 'taskId is required' })
    }

    //    const payload = {
    //     taskId,
    //     title,
    //     description,
    //     assignedTo
    //    }

    const existingTask = await taskModel.findById(taskId)

    if (!existingTask) {
        return res.status(404).json({ message: 'task not found' })
    }

    existingTask.title = title || existingTask.title;
    existingTask.description = description || existingTask.description;
    existingTask.assignedTo = assignedTo || existingTask.assignedTo;

    existingTask.activityLog.push({ action: 'Task updated', timestamp: new Date() })

    await existingTask.save()

    res.status(200).json({ message: 'task updated successfully'})
   } catch (error) {

    return res.status(500).json({message:'server error',error:error.message})
    
   }

}


const deleteTaskController = async (req, res) => {
    const { taskId } = req.params;
    const {listId} = req.body
  
    try {
        await taskModel.findByIdAndDelete(taskId);
        const list = await listServices.findList(listId)

        // Remove task from list's tasks array
        // Convert taskId to string(coz in document it present in different frorm lok objectId('chdjhbkak')) for comparison since ObjectIds are objects so used toString()
        list.tasks = list.tasks.filter((task)=>task.toString() !== taskId)
    //    console.log('updatedTask--',updateTask)

       await list.save() // here when we delete task we also remove from list task array
        res.status(200).json({ message: 'Task deleted' });
    } catch (error) {

        res.status(500).json({ message: 'server error', error: error.message })

    }
    
  };

  const moveTaskController = async (req, res) => {
    const { taskId } = req.params;
    const { sourceLiId,destinationListId } = req.body;
  
  try {
    const task = await taskModel.findById(taskId);
  
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
  
    task.list = destinationListId;
    task.activityLog.push({ action: 'Task moved to new list', timestamp: new Date() });
  
    await task.save();
    
    // remove task reference from sourcelist
    const sourceList = await listServices.findList(sourceLiId)
    sourceList.tasks = sourceList.tasks.filter((task)=>task.toString() !== taskId)
    await sourceList.save()
    
    // add task refernce in destination list
    const destinationList = await listServices.findList(destinationListId)
    destinationList.tasks.push(taskId)
    await destinationList.save()
  
    res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({message:'server error',error:error.meassage})
  }
  };


export default {
    createTaskController,
    updateTaskController,
    deleteTaskController,
    moveTaskController
}