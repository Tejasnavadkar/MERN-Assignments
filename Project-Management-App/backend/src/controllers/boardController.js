import BoardModel from "../models/Board.js"
import boardServices from "../services/boardServices.js"


const createBoardController = async (req, res) => { // create board with title initially later we update by adding members,lists

    try {

        const { title } = req.body

        if (!title) {
            return res.status(400).json({ message: 'title is required' })
        }

        const payload = {
            title,
            owner: req.userId,
            members: req.userId
        }

        const createdBoard = await boardServices.createBoard(payload)

        if (!createdBoard) {
            return res.status(401).json({ message: 'unable to creates board' })
        }

        res.status(201).json({
            message: 'board created successfully',
            board: createdBoard
        })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

const getAllBoardsController = async (req, res) => { // get all boards of logged-in user

    try {
        // const userId = req.userId
        const allBoards = await boardServices.getAllBoards()
        // console.log('userId-',userId)
        // console.log('allBoards-',allBoards)
        return res.status(201).json({ message: 'all boards', allBoards: allBoards })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

const getBoardsByIdController = async (req, res) => { // get all boards

    try {
        const { boardId } = req.params
        const Board = await boardServices.getBoardId(boardId)

        if (!Board) {
            return res.status(404).json({ message: 'Board not found' });
        }

        return res.status(201).json({ message: 'board', Board: Board })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

const updateBoardController = async (req, res) => {
    const { boardId } = req.params;
    const { title } = req.body;

    const board = await boardServices.updateBoard(boardId);

    if (!board) {
        return res.status(404).json({ message: 'Board not found' });
    }

    board.title = title || board.title;
    await board.save();

    res.status(200).json({
        message: 'board updated successfully',
        board
    });
};

const addMemberController = async (req, res) => {
    const { boardId } = req.params;
    const { memberId } = req.body;
    
    // Todo: also check user with member id is present in db
    const board = await boardServices.getBoardId(boardId)

  
    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }
  
    if (!board.members.includes(memberId)) { // if pehelese nahi hai to hi add karo
      board.members.push(memberId);
      await board.save();
    }
  
    res.status(200).json({message:'member added to board',board:board});
};

const deleteBoardController = async (req, res) => {
    const { boardId } = req.params;
  
    try {
        await boardServices.deleteBoard(boardId)
  
   res.status(200).json({ 
            success: true,
            message: 'Board and all related lists and tasks deleted successfully' 
        });

    } catch (error) {
         res.status(500).json({ 
            success: false,
            message: 'Error deleting board', 
            error: error.message 
        });
    }
};

export default {
    createBoardController,
    getAllBoardsController,
    getBoardsByIdController,
    updateBoardController,
    addMemberController,
    deleteBoardController
}