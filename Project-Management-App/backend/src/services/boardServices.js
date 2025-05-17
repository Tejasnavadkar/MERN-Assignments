import BoardModel from "../models/Board.js"


const createBoard = async (payload) => {

   try {
    const board = await BoardModel.create(payload)
    return board
   } catch (error) {
    throw new Error('err in createBoard service:',error.message)
   }

}

const getAllBoards = async () => {

    try {
     const allBoards = await BoardModel.find().populate({ // here we perform nested populations
      path:'lists',
      populate:{
         path:'tasks',
         select: 'title description assignedTo activityLog createdAt' // specify fields you want from tasks
      }
     }).populate('members')
     
     return allBoards

    } catch (error) {
     throw new Error('err in getBoards service:',error.message)
    }
 
 }

 const getBoardId = async (boardId) => {

    try {
     const Board = await BoardModel.findById(boardId).populate('lists')
     .populate('members', 'username email'); // populate lists and members  Now you have full user details (only username and email) and full list details inside the board response! No need to make 10 extra API calls from frontend.
     return Board
    } catch (error) {
     throw new Error('err in getBoardId service:',error.message)
    }
 
 }

 const updateBoard = async (boardId) => {

    try {
       const board = await BoardModel.findById(boardId)
       return board
    } catch (error) {
        throw new Error('err in getBoardId service:',error.message)
    }

 }

 const deleteBoard = async (boardId) => {
    try {
        const board = await BoardModel.findById(boardId)
            .populate({  // nested population
                path: 'lists',
                populate: {
                    path: 'tasks'
                }
            });
        
        if (!board) {
            throw new Error('Board not found');
        }

        // Delete all tasks from each list
        for (const list of board.lists) {
            if (list.tasks && list.tasks.length > 0) {
                await Promise.all(list.tasks.map(task => 
                    task.deleteOne() // delete each task at every iteration
                ));
            }
            // Delete the list
            await list.deleteOne(); // after deleting all tasks, delete list
        }

        // Finally delete the board
        await board.deleteOne();  // then finally delete board
        
        return true;
    } catch (error) {
        throw new Error(`Error in deleteBoard service: ${error.message}`);
    }
}

 

export default {
    createBoard,
    getAllBoards,
    getBoardId,
    updateBoard,
    deleteBoard
}