import BoardModel from "../models/Board.js"


const createBoard = async (payload) => {

   try {
    const board = await BoardModel.create(payload)
    return board
   } catch (error) {
    throw new Error('err in createBoard service:',error.message)
   }

}

const getAllBoards = async (userId) => {

    try {
     const allBoards = await BoardModel.find({members:userId})
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

 

export default {
    createBoard,
    getAllBoards,
    getBoardId,
    updateBoard
}