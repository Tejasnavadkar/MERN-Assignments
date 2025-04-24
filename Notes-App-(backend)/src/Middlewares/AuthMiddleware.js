import Handlers from "../utils/Handlers"


export const AuthenticateUser = async (req,res,next) =>{

     try {
        const token = req.headers.authorization.replace('Bearer ','') //  replace Bearer with ''

        if(!token){
            return res.status(401).json('token not found')
        }

        // verify token

        const decoded = Handlers.verifyJwtToken(token)

        if(!decoded){
            return res.status(401).json({msg:'invalid token'})
        }

        req.userEmail = decoded.email
        req.userId = decoded.id

        next()
        
     } catch (error) {
        throw new Error('err in middleware:',error)
     }

}