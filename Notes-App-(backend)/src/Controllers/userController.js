import userServices from "../Services/userServices"
import Handlers from "../utils/Handlers"
import PasswordHandler from "../utils/PasswordHandler"


const registerUserController = async (req,res) => {
try {
    
    const {name,email,password} = req.body

    if(!name || !email || !password){
        return res.status(401).json({
            msg:'credentials are required'
        })
    }

   const isUserExist =  await userServices.findUser(email)

   if(isUserExist){
      return res.status(409).json({
        msg:'user already exist'
      })
   }

   const hashedPassword = await PasswordHandler.hashPassword(password)

   const payload = {
    name,
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

    const token = Handlers.generateJwtToken(jwtPayload)
    return res.status(201).json({
        user:createdUser,
        token:token
    })


} catch (error) {
     res.status(500).json({
        msg:'server error',
        error:error
     })
}
}

const loginUserController = async (req,res) =>{
try {
    
    const {email,password} = req.body

    if(!email || !password){
        return res.status(401).json({
            msg:'credentials are required'
        })
    }

    const isUserExist = userServices.findUser(email)

    if(!isUserExist){
        return res.status(402).json({msg:'username or password not exist'})
    }

    const hashedPassword = isUserExist.password
   const isMatch = await PasswordHandler.comparePassword(password,hashedPassword)

   if(!isMatch){
    return res.status(401).json({msg:'username or password not exist'})
   }

   const jwtPayload = {
    id:isUserExist._id,
    email:isUserExist.email
   }

   const token = Handlers.generateJwtToken(jwtPayload)

   res.status(201).json({
    user:isUserExist,
    token:token
   })
} catch (error) {
    res.status(500).json({
        msg:'server error',
        error:error
     })
}

}

export default {
    registerUserController,
    loginUserController
}