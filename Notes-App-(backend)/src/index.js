import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import ConnectDb from './Db/Db.js'
import userRouter from './Routes/user.Routes.js'
import notesRoutes from './Routes/notes.Routes.js'
const app = express()
const PORT = process.env.PORT


ConnectDb()
app.use(cors())
app.use(express.json())

// configure routes here
app.use('/api/user',userRouter)
app.use('/api/notes',notesRoutes)

app.listen(PORT,()=>console.log(`server started at port ${PORT}`))

