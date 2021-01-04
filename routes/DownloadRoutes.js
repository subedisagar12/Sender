import express from 'express'
import File from '../models/FileModel.js'
import path from 'path'

let router=express.Router()
const __dirname=path.resolve()
router.get('/:uuid',async(req,res)=>{
    let file= await File.findOne({uuid:req.params.uuid})
    if(!file){return res.status(400).json({error:{messagae:"File not found"}})}

    try{
        let filePath=`${__dirname}/../share_files/${file.path}`
        res.download(filePath)
    }catch(e){res.status(400).json(e.message)}

})
export default router