import BoardModel from "../models/Board.js";
import listModel from "../models/List.js";
import boardServices from "../services/boardServices.js";
import listServices from "../services/listServices.js";

const createListController = async (req, res) => {
  
    try {
        const { boardId, title } = req.body;

        const payload = { 
            title,
            board:boardId 
        }
      
        const list = await listServices.createList(payload);
        
        if(!list){
            return res.status(401).json({message:'unable to create list'})
        }
        // once create list give ref/insert to related board's list
        await BoardModel.findByIdAndUpdate(boardId, { $push: { lists: list._id } });
      
        res.status(201).json({list:list});
    } catch (error) {
        res.status(500).json({message:'server Error',error:error.message})
    }
};

const updateListController = async (req, res) => {
    const { listId } = req.params;
    const { title } = req.body;
  
    const list = await listServices.findList(listId);
  
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }
  
    list.title = title || list.title;
    await list.save();
  
    res.status(200).json({
        message:'list updated succefully',
        list:list
    });
};

const deleteListController = async (req, res) => {
    const { listId } = req.params;
    const {boardId} = req.body
  
     await listModel.findByIdAndDelete(listId); // here when i delete list then also delete its id from board model
    const board = await BoardModel.findById(boardId)
    board.lists = board.lists.filter((list)=>list.toString() !== listId)
    await board.save()

    res.status(200).json({ message: 'List deleted' });
};


  export default {
    createListController,
    updateListController,
    deleteListController,
    deleteListController
  }