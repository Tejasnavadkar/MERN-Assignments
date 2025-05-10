import jwt from 'jsonwebtoken'
// tokens handlers

const generateJwtToken = (jwtPayload) =>{

     try {

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }

       return jwt.sign(jwtPayload,process.env.JWT_SECRET)
     } catch (error) {
        throw new Error('err in generateToken handler:',error)
     }

}

const verifyJwtToken = (token) =>{

    try {

       if (!process.env.JWT_SECRET) {
           throw new Error("JWT_SECRET is not defined");
       }

      return jwt.verify(token,process.env.JWT_SECRET)
    } catch (error) {
       throw new Error(`err in verifyJwtToken handler: ${error}`)
    }

}

export default {
    generateJwtToken,
    verifyJwtToken
}