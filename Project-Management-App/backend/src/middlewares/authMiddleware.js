import jwtHandler from "../utils/jwtHandler.js"



export const AuthenticateUser = async (req,res,next) =>{

     try {
        const token = req.headers.authorization.replace('Bearer ','') //  replace Bearer with ''
        // console.log('token--',token)
        if(!token){
            return res.status(401).json('token not found')
        }

        // verify token

        const decoded = jwtHandler.verifyJwtToken(token)

        if(!decoded){
            return res.status(401).json({msg:'invalid token'})
        }

        req.userEmail = decoded.email
        req.userId = decoded.id

        next()
        
     } catch (error) {
        throw new Error(`err in middleware:${error}`)
     }

}