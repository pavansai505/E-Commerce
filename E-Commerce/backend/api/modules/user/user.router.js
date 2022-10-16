const router=require('express').Router()
const userCtrl=require('./user.controller')
const auth=require('../auth')
router.post('/signup',userCtrl.signup)
router.post('/signin',userCtrl.signin)
router.get('/',auth.authenticateadmin,userCtrl.getAllUsers)

router.get('/getUser/:userId',userCtrl.getOneUser)
router.get('/product/getItems',userCtrl.getItems)
router.post('/product/addToWishList/:userId',auth.authenticateuser,userCtrl.addToWishList)
router.delete('/product/removeFromWishList/:productId/:userId',auth.authenticateuser,userCtrl.removeFromWishList)
router.post('/product/addToCart/:userId',auth.authenticateuser,userCtrl.addToCart)
router.delete('/product/removeFromCart/:productId/:userId',auth.authenticateuser,userCtrl.removeFromCart)


router.post('/order/placeOrder',auth.authenticateuser,userCtrl.placeOrder)
router.post('/sales/modifySales',userCtrl.modifySales)
module.exports=router