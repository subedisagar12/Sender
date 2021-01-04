import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

// Routers import
import FileRouter from './routes/FileRoutes.js'
import DownloadRouter from './routes/DownloadRoutes.js'

const app=express()
dotenv.config()
let PORT=process.env.PORT||'8000'

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.use('/file',FileRouter)
app.use('/files/download',DownloadRouter)

// Database connection
mongoose.connect(process.env.DATABASE_CONNECTION,{useNewUrlParser:true,useUnifiedTopology:true})
let con=mongoose.connection
con.on('open',()=>{
    console.log("Connected to database")
})

// Server Initialization
app.listen(PORT,()=>{
    console.log(`Server started at port ${PORT}`)
})