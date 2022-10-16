const mongoose = require('mongoose')
const bcrypt=require('bcrypt')
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
        type:[]
    }

})


UserSchema.pre('save',function(next){
    var user=this
    if(this.isModified('password') || this.isNew()){
        bcrypt.genSalt(10,(err,salt)=>{
            if(err){
                next(err)
            }
            bcrypt.hash(user.password,salt,(err,hash)=>{
                if(err){
                    next(err)
                }
                user.password=hash 
                next() 
            })

        })
    }
    else{
        next()
    }
})
module.exports=mongoose.model('user',UserSchema)