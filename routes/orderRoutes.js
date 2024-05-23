const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');
router.route('/')
    .get(orderController.getOrders)
    .post(orderController.addOrder)

router.route('/:username')
    .get(orderController.getMyOrders)

router.route('/:orderID')
    .delete(orderController.deleteOrder)


module.exports = router;