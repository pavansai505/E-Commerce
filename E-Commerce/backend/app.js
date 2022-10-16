const express=require('express')
const app=express()
const services=require('./app.service')
const path=require('path')
//static
app.use('/images',express.static(path.resolve(__dirname,"images")))
//middleware
services.useMiddleWares(app)
//mongo connection
services.mongoConnection()
//api
services.useApi(app)

module.exports=app