import mongoose from 'mongoose'

const fileSchema=new mongoose.Schema({
    name:{type:String,required:true},
    path:{type:String,required:true},
    size:{type:Number,required:true},
    sender:{type:String,required:false},
    receiver:{type:String,required:false},
    uuid:{type:String,required:true}
},{timestamps:true})


export default mongoose.model('File',fileSchema)