const mongoose=require('mongoose')
const {v4:uuidv4}=require('uuid')
const itemSchema=new mongoose.Schema({
    productId:{
        type:String,
        required:true,
        default:uuidv4()
    },
    cost:{
        type:Number,
        min:0,
        required:true
    },
    features:{
        type:String,
        required:true
    },
    productName:{
        type:String,
        required:true,
        trim:true
    },
    category:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        min:0,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }

})

module.exports=mongoose.model("item",itemSchema)