const router=require('express').Router()
const adminCtrl = require('./admin.controller')
const auth=require('../auth')

router.post('/signup',adminCtrl.signup)
router.post('/signin',adminCtrl.signin)
router.get('/',adminCtrl.getAllAdmins)

router.get('/getUsers',auth.authenticateadmin,adminCtrl.getAllUsers)
router.post('/addUser',auth.authenticateadmin,adminCtrl.addUser)
router.delete('/deleteUser/:id',auth.authenticateadmin,adminCtrl.deleteOneUser)
router.put('/updateUser/:id',auth.authenticateadmin,adminCtrl.updateOneUser)
router.post('/product/addItem',auth.authenticateadmin,adminCtrl.addItem)
// router.post('/product/bulkUpload',adminCtrl.BulkUpload)
router.delete('/product/delete/:id',auth.authenticateadmin,adminCtrl.deleteItem)
router.put('/product/update/:id',auth.authenticateadmin,adminCtrl.updateItem)
router.put('/product/updatestock/:id',auth.authenticateadmin,adminCtrl.updateItemStock)
router.get('/product/getItems',adminCtrl.getItems)
router.post('/product/getCertainItems',auth.authenticateadmin,adminCtrl.getCertainItems)

router.get('/order/getOrders',auth.authenticateadmin,adminCtrl.getOrders)

router.get('/sales/getSales',auth.authenticateadmin,adminCtrl.getSales)


module.exports=router
