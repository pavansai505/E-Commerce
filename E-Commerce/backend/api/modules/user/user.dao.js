const userModel=require('./user.entity')
const {v4:uuidv4}=require('uuid')
const auth=require('../auth')

const addUser=(data,done)=>{
    const newUser=new userModel()
    newUser.userId=uuidv4()
    newUser.userName=data.userName
    newUser.userMail=data.userMail
    newUser.password=data.password
    newUser.save((err,addUser)=>{
        if(err) done(err);
        else done(null,{message:"user added successfully"})
    })
    
}

const signinUser=(data)=>{
    return new Promise((resolve,reject)=>{
        userModel.findOne({userMail:data.userMail},(err,user)=>{
            if(err || !user) {
                reject({message:false})
                return
            }
            auth.comparePassword(data.password,user.password,(error,isMatch)=>{
                if(error || !isMatch) {
                    reject({message:false,erer:isMatch})
                    return
                }
                else{
                    auth.generateToken({userMail:user.userMail},(tokenErr,token)=>{
                        resolve({message:true,token:token,user:user})
                    })
                }
            })
        })
    })

}


const getUsers=(done)=>{
    userModel.find((err,data)=>{
        if(err) done(err)
        done(null,data)
    })
}

module.exports={
    addUser,
    signinUser,
    getUsers
}