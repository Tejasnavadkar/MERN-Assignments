import mongoose from "mongoose";

const ConnectDb = () =>{
    try {
        const connectionString = process.env.DB_URL

        mongoose.connect(connectionString).then(()=>{
            console.log('db connected successfully')
        }).catch((err)=>{
            console.log('error in db connection',err)
        })
        
    } catch (error) {
        throw new Error('error while connecting db:',error)
    }
} 

export default ConnectDb