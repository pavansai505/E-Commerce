const adminDao=require('./admin.dao')
// const csvtojson = require("csvtojson");
// const formidable = require('formidable');
const itemModel=require('../items/items.entity')
const orderModel=require('../orders/orders.entity')
const saleModel=require('../sales/sales.entity')
const {serverConfig}=require('../../../config').appConfig
const mail=require('../mail/mail.controller')
const path=require('path')
const signup=(req,res)=>{
    const data=req.body
    adminDao.addAdmin(data,(err,response)=>{
        if(err) res.status(500).send(response)
        else res.status(200).send(response)
    })
}

const signin=(req,res)=>{
    const data=req.body
    console.log(data);
    adminDao.signinAdmin(data)
    .then(data=>res.status(200).send(data))
    .catch(data=>res.status(500).send(data))
}

const getAllAdmins=(req,res)=>{

    adminDao.getAdmins((err,response)=>{
     if(err) res.send({message:"error"})
     res.send({message:response})

 })
}
const signout=(req,res)=>{
    currentadmin=null;
    res.send({message:'admin logged out '})
}

//add a new user to the table
const addUser=(req,res)=>{
    const body=req.body
    console.log(body);
    adminDao.saveUser(body,(err,response)=>{
        if(err) res.status(500).send("error")
        else res.status(200).send(response)
    })
}
//get all the users from the table
const getAllUsers=(req,res)=>{
    adminDao.getUsers((err,response)=>{
        if(err) res.status(500).send("error")
        else res.status(200).send(response)
    })
}



//update one user
const updateOneUser=(req,res)=>{
    const id=req.params.id
    const body=req.body
    adminDao.updateSingleUser({"id":id,"body":body},(err,response)=>{
        if(err) res.status(500).send("error")
        else res.status(200).send(response)
    })
}
//delete a particular user
const deleteOneUser=(req,res)=>{
    const id=req.params.id
    adminDao.deleteSingleUser(id,(err,response)=>{
        if(err) res.status(500).send("error")
        else res.status(200).send(response)
    })
}


//adding items
const addItem=(req,res)=>{
    const info=req.body
    let uploadFile = req.files.image
    console.log(uploadFile)
    const imageUrl = `http://localhost:${serverConfig.port}/images/${uploadFile.name}`;
    console.log(imageUrl)
    uploadFile
        .mv(path.join(__dirname, '../../../images', uploadFile.name))
    
    console.log(req.body)
    var data={
        cost:info.price,
        features:info.features,
        productName:info.name,
        category:info.category,
        stock:info.quantity,
        brand:info.brand,
        description:info.description,
        image:imageUrl
    }
    console.log(data)
    adminDao.addOneItem(data)
    .then(data=>res.status(200).send(data))
    .catch(data=>res.status(500).send(data))
}


// const BulkUpload=(req,res)=>{
    
// 
//     console.log('here')
//     let form = new formidable.IncomingForm();
//     console.log(form)
//     form.keepExtensions = true;
//     form.parse(req, (err, fields, files) => {
//       if (err) {
//         return res.status(400).json({
//           error: 'file could not be uploaded',
//         });
//       }
//       //console.log('------------------------------',files.file)
//       csvtojson()
//         .fromFile(files.file.filepath)
//         .then(csvData => {//console.log(csvData)
//           itemModel.insertMany(csvData, (err, rest) => {
//             if (err) { console.log(err);return res.send({ message: err }) }
//             //console.log(err,rest)
//             res.send({message:"Items uploaded Successfully"})
//           });
//         }
//         );
//     })
// }


const deleteItem=(req,res)=>{
    console.log('-------------------------------')
    const productId=req.params.id
    console.log('====================')
    itemModel.deleteOne({_id:productId},(err,response)=>{
        console.log(err)
        if (err) res.send({ message: err }) 
        res.send({message:"Item removed Successfully"})
    })
}

const updateItem=(req,res)=>{
    const productId=req.params.id
    const info=req.body
    let uploadFile = req.files.image
    console.log(uploadFile)
    const imageUrl = `http://localhost:${serverConfig.port}/images/${uploadFile.name}`;
    console.log(imageUrl)
    uploadFile
        .mv(path.join(__dirname, '../../../images', uploadFile.name))
    
    console.log(req.body)
    var data={
        cost:info.price,
        features:info.features,
        productName:info.name,
        category:info.category,
        stock:info.quantity,
        brand:info.brand,
        description:info.description,
        image:imageUrl
    }
    itemModel.updateOne({_id:productId},{$set:data},(err,response)=>{
        if (err) { return res.send({ message: err }) }
        res.send(response)
    })

}

const getItems=(req,res)=>{
    itemModel.find({},(err,response)=>{
        if (err) { return res.send({ message: err }) }
        res.send(response)
    })

}
const getCertainItems=(req,res)=>{
    itemModel.find({
        '_id': { $in: req.body.idArray}
    }, (err,response)=>{
        if (err) { return res.send({ message: err }) }
        res.send(response)
    })

}

const getOrders=(req,res)=>{
    orderModel.find({},(err,response)=>{
        if (err) { return res.send({ message: err }) }
        res.send(response)
    })
}

const getSales=(req,res)=>{
    saleModel.find({},(err,response)=>{
        if (err) { return res.send({ message: err }) }
        res.send(response)
    })
}

const updateItemStock=(req,res)=>{
    const id=req.params.id
    const data=req.body
    itemModel.updateOne({_id:id},{stock:data.stock},(err,response)=>{
        if (err) { return res.send({ message: err }) }
        itemModel.find({stock:{$lt:11}},(err,response1)=>{
            if (err) { return res.send({ message: err }) }
            mail.sendMail(response1)
        })
        
        res.send(response)
    })
}







module.exports={
    signup,
    signin,
    getAllAdmins,
    signout,
    addUser,
    getAllUsers,
    updateOneUser,
    deleteOneUser,
    addItem,
    // BulkUpload,
    deleteItem,
    updateItem,
    getItems,
    getOrders,
    getSales,
    getCertainItems,
    updateItemStock
}