import mongoose from "mongoose";


export const connectToDb = () =>{

   try {
    mongoose.connect(process.env.DB_URL).then(()=>{
        console.log('db connection successfull')
    }).catch((err)=>{
        console.log(`unable to connect to db : ${err}`)
    })
   } catch (error) {
     throw new Error(`error while connecting db : ${error}`)
   }

}

