import bcrypt from 'bcrypt'

const saltRounds = 10

const hashPassword = async (password) =>{

    try {
        
      return await bcrypt.hash(password,saltRounds)

    } catch (error) {
        throw new Error('error in hashPassword handler',error)        
    }
}

const comparePassword = async (password,hashedPassword) =>{

  try {
      
    return bcrypt.compare(password,hashedPassword)

  } catch (error) {
      throw new Error('error in comparePassword handler',error)        
  }
}

export default{
    hashPassword,
    comparePassword
}