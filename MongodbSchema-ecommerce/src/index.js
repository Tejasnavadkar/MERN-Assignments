import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import db from './Db/db.js'
import productRouters from './routes/Product.Routes.js'
const port = process.env.PORT
const app = express()


db.ConnectDb() // configure db connection
app.use(cors())
app.use(express.json())

//routes
app.use('/api/products',productRouters)


app.listen(port,()=>console.log(`server started at ${port}`))