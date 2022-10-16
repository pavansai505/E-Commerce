const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    userId:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        unique:true,
        required:true
    },
    userMail:{
        type:String,
        unique:true,
        required:true
    }
    ,
    password:{
        type:String,
        required:true
    },
    cartList:{
        type:Array,
        required:false
    },
    wishList:{
        type:Array,
        required:false
    },
    coupons:{
        type:[],
        required:false
    }

})



module.exports=mongoose.model('user',UserSchema)