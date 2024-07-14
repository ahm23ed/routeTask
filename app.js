import express from 'express'
import connectDB from './DB/connection.js'
import * as indexRouter from './modules/index.router.js'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
const port = process.env.PORT
const baseURL = process.env.BASEURL
app.use(express.json())
app.use(`${baseURL}/user`,indexRouter.userRouter)
app.use(`${baseURL}/category`,indexRouter.categoryRouter)
app.use(`${baseURL}/task`,indexRouter.taskRouter)


connectDB()
app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
})