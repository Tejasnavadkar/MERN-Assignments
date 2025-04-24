import mongoose from "mongoose";

const ConnectDb = async () =>{

   try {
    const connectionString = process.env.DB_URL

    mongoose.connect(connectionString).then(()=>{
        console.log('Db connection successfull')
    }).catch((err)=>{
        console.log(`Db connection error`,err)
    })

   } catch (error) {
    throw new Error('error in db connection',error)
   }

}

export default {ConnectDb}