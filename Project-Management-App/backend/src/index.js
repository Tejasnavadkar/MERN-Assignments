import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import userRouter from './routes/userRoutes.js'
import boardRouter from './routes/boardRoutes.js'
import listRouter from './routes/listRoutes.js'
import taskRouter from './routes/taskRoutes.js'
import { connectToDb } from './Db/db.js'

const app = express()
const PORT = process.env.PORT

connectToDb() // db connection
app.use(cors())
app.use(express.json()) // to parse body

// api endpoints
app.use('/api/user',userRouter)
app.use('/api/board',boardRouter)
app.use('/api/list',listRouter)
app.use('/api/task',taskRouter)



app.listen(PORT,()=>console.log(`server started at ${PORT}`))