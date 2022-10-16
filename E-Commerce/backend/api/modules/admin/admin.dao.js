const adminModel=require('./admin.entity')
const userModel=require('../user/user.entity')
const itemModel=require('../items/items.entity')
const {v4:uuidv4}=require('uuid')
const auth=require('../auth')
const bcrypt=require('bcrypt')

const addAdmin=(data,done)=>{
    const newAdmin=new adminModel()
    newAdmin.adminId=uuidv4()
    newAdmin.adminName=data.adminName
    newAdmin.adminMail=data.adminMail
    newAdmin.password=data.password
    newAdmin.save((err,addadmin)=>{
        if(err) done(err);
        else done(null,{message:"admin added successfully"})
    })
    
}
const signinAdmin=(data)=>{
    return new Promise((resolve,reject)=>{
        adminModel.findOne({adminMail:data.adminMail},(err,admin)=>{
            if(err || !admin) {
                reject({message:false})
                return
            }
            auth.comparePassword(data.password,admin.password,(err,isMatch)=>{
                if(err || !isMatch) {
                    reject({message:false})
                    return
                }
                else{
                    auth.generateToken({adminName:admin.adminName},(tokenErr,token)=>{
                        resolve({message:true,token:token,admin:admin})
                    })
                }
            })
        })
    })

}

const getAdmins=(done)=>{
    adminModel.find((err,data)=>{
        if(err) done(err)
        done(null,data)
    })
}

//add a new user to the table
const saveUser=(data,done)=>{
    
    const newUser=new userModel()
    newUser.userId=uuidv4()
    newUser.userName=data.userName
    newUser.userMail=data.userMail
    newUser.password=data.password
    newUser.save((err,addUser)=>{
        if(err) done(err);
        else done(null,{message:"user created by admin successfully"})
    })
}
//get all the users from the table
const getUsers=(done)=>{
    userModel.find((err,response)=>{
        if(err) done(err)
        else done(null,response)
    })
}

//update one user
const updateSingleUser=(data,done)=>{
    
    
        bcrypt.hash(data.body.password,10,(err,hash)=>{
            if(err){
                res.send(err)
            }
            else{
                data.body.password=hash 
                const info=data.body
                userModel.updateOne({"_id":data.id},{$set:info},
                (err,response)=>{
                    if(err) done(err)
                    else done(null,{message:"user data updated"})
                })
            }
            
        })
        
}
//delete single user
const deleteSingleUser=(id,done)=>{
    console.log("deleting",id);
    userModel.deleteOne({"_id":id},(err,response)=>{
        if(err) done(err)
        else done(null,{message:"user data deleted"})
    })
}

//adding items
const addOneItem=(data,done)=>{
    return new Promise((resolve,reject)=>{
        const newItem=new itemModel()
        newItem.productId=uuidv4()
        newItem.cost=data.cost
        newItem.features=data.features
        newItem.productName=data.productName
        newItem.category=data.category
        newItem.stock=data.stock
        newItem.brand=data.brand 
        newItem.description=data.description
        newItem.image=data.image
        newItem.save((err,addItem)=>{
            if(err) {
                reject({message:err})
                return
            }
            else resolve({message:"Item added successfully"})
    })
    })
}




module.exports={
    addAdmin,
    signinAdmin,
    getAdmins,
    saveUser,
    getUsers,
    updateSingleUser,
    deleteSingleUser,
    addOneItem
}