const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');


router.route('/')
    .get(productController.getAllProducts)

router.route('/:userName')    
    .post(productController.addNewProduct)

router.route('/:productId')
    .get(productController.getSingleProduct)

router.route('/:productId/:userName')    
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct)


module.exports = router;

