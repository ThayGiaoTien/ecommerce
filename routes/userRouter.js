const router= require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth= require('../middleware/auth')
const authAdmin= require('../middleware/authAdmin')

router.post('/register', userCtrl.register)
router.post('/login', userCtrl.login)
router.get('/logout', userCtrl.logout)
router.post('/refresh_token',userCtrl.refreshToken)
router.get('/infor', auth, userCtrl.getUser)

module.exports= router
