import express from 'express'
import multer from 'multer'
import path from 'path'
import {v4 as uuidv4} from 'uuid'

// Model import
import FileModel from '../models/FileModel.js'
const router=express.Router()

let storage=multer.diskStorage({
    destination:(req,file,cb)=>cb(null,'uploads/'),
    filename:(req,file,cb)=>{
        const fileName=`${Date.now()}-${Math.round(Math.random()*1E8)}${path.extname(file.originalname)}`

        cb(null,fileName)
    }
})

let upload=multer({
    storage,
    limits:{fileSize:1000000*100},

}).single('myfile')

router.post('/upload',(req,res)=>{
    // Validate request
    
    // Store File
    upload(req,res,async(err)=>{
        if(!req.file){
            return res.json({error:"Empty File"})
        }
        if(err){return res.status(500).json({error:err.message})}

// Store into database
        const newFile=new FileModel({
            name:req.file.filename,
            uuid:uuidv4(),
            path:req.file.path,
            size:req.file.size
        })

        let response=await newFile.save()
        return res.status(200).json({file:`${process.env.BASE_URL}/files/download/${response.uuid}`})

    })
    

    // Create Link
})

export default router