const mongoose=require('mongoose')
const {dbConfig}=require('../config').appConfig

const createMongooseConnection=()=>{
    mongoose.connect(dbConfig.mongoUrl)
}

const getMongoConnection=()=>{
    return mongoose.connection
}


module.exports={
    createMongooseConnection,
    getMongoConnection
}