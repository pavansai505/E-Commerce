const userDao=require('./user.dao')
const userModel=require('./user.entity')
const orderModel=require('../orders/orders.entity')
const saleModel=require('../sales/sales.entity')
const itemModel=require('../items/items.entity')
const signup=(req,res)=>{
    const data=req.body
    userDao.addUser(data,(err,response)=>{
        if(err) res.status(500).send(response)
        else res.status(200).send(response)
    })
}

const signin=(req,res)=>{
    const data=req.body
    userDao.signinUser(data)
    .then(data=>res.status(200).send(data))
    .catch((data)=>{
        console.log(data)
        res.status(500).send(data)

    })
}

const getAllUsers=(req,res)=>{

       userDao.getUsers((err,response)=>{
        if(err) res.send({message:"error"})
        res.send({message:response})

    })
}

const placeOrder=(req,res)=>{
    data=req.body
    console.log(data)
    // const newOrder=new orderModel()
    // newOrder.productId=data.productId
    // newOrder.productName=data.productName
    // newOrder.cost=data.cost
    // newOrder.quantity=data.quantity
    // newOrder.userName=data.userName
    // newOrder.userId=data.userId
    // newOrder.address=data.address
    orderModel.insertMany(data,(err,addOrder)=>{
        if(err) res.send(err);
        else res.send({message:"order added successfully"})
    })
}

const modifySales=(req,res)=>{
    const data=req.body
    saleModel.findOneAndUpdate({productId:data.productId},{$set:data},{ upsert: true },(err,response)=>{
        if(err) res.send(err);
        else res.send({message:"sale added successfully"})
    })
}

const getItems=(req,res)=>{
    itemModel.find({},(err,response)=>{
        if (err) { return res.send({ message: err }) }
        res.send(response)
    })
}
const addToWishList=(req,res)=>{
    console.log('------------------------') 
    const data=req.body
    const userId=req.params.userId
    userModel.findOneAndUpdate({'_id':userId},{$addToSet:{wishList:data}},(err,response)=>{
        if(err) res.send(err)
        else res.send(response) 
    })

}
const removeFromWishList=(req,res)=>{
    const userId=req.params.userId
    const productId=req.params.productId
    userModel.findOneAndUpdate({'_id':userId},{$pull:{wishList:{_id:productId}}},(err,response)=>{
        if(err) res.send(Err)
        res.send(response)
    })

}
const addToCart=(req,res)=>{
    const data=req.body
    const userId=req.params.userId
    userModel.findOneAndUpdate({'_id':userId},{$addToSet:{cartList:data}},(err,response)=>{
        if(err) res.send(Err)
        res.send(response)
    })

}
const removeFromCart=(req,res)=>{
    const userId=req.params.userId
    const productId=req.params.productId
    userModel.findOneAndUpdate({'_id':userId},{$pull:{cartList:{_id:productId}}},(err,response)=>{
        if(err) res.send(Err)
        res.send(response)
    })

}

const getOneUser=(req,res)=>{
    const userId=req.params.userId
   userModel.findOne({_id:userId},(err,userResponse)=>{
    if (err) res.send(err)
    var idArray=[]
    if(userResponse.cartList){
        for(let i=0;i<userResponse.cartList.length;i++){
            idArray=[...idArray,userResponse.cartList[i]._id]
        }
        itemModel.find({
            '_id': { $in: idArray}
        }, (err,itemResponse)=>{
            if (err) { return res.send({ message: err }) }
            res.send({userData:userResponse,itemData:itemResponse})
        })
    }
    else{
        res.send({userData:userResponse,itemData:[]})
    }
    
    
})
 
}







module.exports={
    signup,
    signin,
    getAllUsers,
    placeOrder,
    modifySales,
    getItems,
    addToCart,
    removeFromCart,
    addToWishList,
    removeFromWishList,
    getOneUser
}