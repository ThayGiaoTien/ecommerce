const router= require('express').Router()

const auth= require('../middleware/auth')
const authAdmin= require('../middleware/authAdmin')
const productCtrl= require('../controllers/productCtrl')

router.route('/products')
    .get(productCtrl.getProducts)
    .post(auth, authAdmin, productCtrl.createProduct)

router.route('/products/:id')
    .delete(auth, authAdmin, productCtrl.deleteProduct)
    .put(auth, authAdmin, productCtrl.updateProduct)

module.exports= router