import userServices from "../services/userServices.js";
import jwtHandler from "../utils/jwtHandler.js";
import passwordHandler from "../utils/passwordHandler.js";



const registerUserController = async (req,res) => {

     try {
        const {username,email,password} = req.body

        if (!username || !email || !password) {
          return res.status(400).json({ message: 'All fields are required' });
        }
  
        const userExists = await userServices.findUser(email)
        if (userExists) {
          return res.status(400).json({ message: 'User already exists' });
        }
  
        const hashedPassword = await passwordHandler.hashPassword(password)
  
        const payload = {
          username,
          email,
          password:hashedPassword
         }
  
         const createdUser = await userServices.createUser(payload)
  
         if(!createdUser){
          return res.status(401).json({msg:'unable to create user'})
         }
  
         const jwtPayload = {
          id:createdUser._id,
          email:createdUser.email
         }
  
         const token = jwtHandler.generateJwtToken(jwtPayload)
  
         return res.status(201).json({
          user:createdUser,
          token:token
         })

     } catch (error) {
          res.status(500).json({
        msg:'server error',
        error:error.message
     })
     }
}

const loginUserController = async (req,res) => {

    try {
    
        const {email,password} = req.body
    
        if(!email || !password){
            return res.status(401).json({
                msg:'credentials are required'
            })
        }
    
        const isUserExist = await userServices.findUser(email)
    
        if(!isUserExist){
            return res.status(402).json({msg:'username or password not exist'})
        }
    
        const hashedPassword = isUserExist.password
        const isMatch = await passwordHandler.comparePassword(password,hashedPassword)
    
       if(!isMatch){
        return res.status(401).json({msg:'username or password not exist'})
       }
    
       const jwtPayload = {
        id:isUserExist._id,
        email:isUserExist.email
       }
    
       const token = jwtHandler.generateJwtToken(jwtPayload)
    
       res.status(201).json({
        user:isUserExist,
        token:token
       })

    } catch (error) {
        console.log('err in login controller:',error)
        res.status(500).json({
            msg:'server error',
            error:error.message
         })
    }

}

export default {
    registerUserController,
    loginUserController

}