const router=require('express').Router()

router.use('/user',require('./modules/user'))

router.use('/admin',require('./modules/admin'))

module.exports=router