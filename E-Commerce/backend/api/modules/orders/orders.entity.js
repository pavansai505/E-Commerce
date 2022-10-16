const mongoose=require('mongoose')
const orderSchema=new mongoose.Schema({
    productId:{
        type:String,
        required:true,
    },
    cost:{
        type:Number,
        min:0,
        required:true
    },
    productName:{
        type:String,
        required:true,
        trim:true
    },
    quantity:{
        type:Number,
        min:0,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
        trim:true
    },
    address:{
        type:String,
        required:true
    },
    date:{
        type:String,
        default:new Date()
    }

})

module.exports=mongoose.model("order",orderSchema)