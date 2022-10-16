const mongoose = require('mongoose')
const bcrypt=require('bcrypt')
const Schema = mongoose.Schema

const adminSchema = new Schema({
    adminId:{
        type:String,
        required:true
    },
    adminName:{
        type:String,
        unique:true,
        required:true
    },
    adminMail:{
        type:String,
        unique:true,
        required:true
    }
    ,
    password:{
        type:String,
        required:true
    }
})

adminSchema.pre('save',function(next){
    var admin=this
    if(this.isModified('password') || this.isNew()){
        bcrypt.genSalt(10,(err,salt)=>{
            if(err){
                next(err)
            }
            bcrypt.hash(admin.password,salt,(err,hash)=>{
                if(err){
                    next(err)
                }
                admin.password=hash 
                next() 
            })

        })
    }
    else{
        next()
    }
})
module.exports=mongoose.model('admin',adminSchema)