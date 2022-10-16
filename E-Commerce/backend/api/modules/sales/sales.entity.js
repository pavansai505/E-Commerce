const mongoose=require('mongoose')
const saleSchema=new mongoose.Schema({
    productId:{
        type:String,
        required:true,
    },
    productName:{
        type:String,
        required:true,
        trim:true
    },
    sold:{
        type:Number,
        min:0,
        required:true
    },
    cost:{
        type:Number,
        min:0,
        required:true

    }

})

module.exports=mongoose.model("sale",saleSchema)