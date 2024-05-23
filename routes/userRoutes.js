const express = require("express");
const router = express.Router();


const userController = require("../controllers/userController");
router.route("/")
    .post(userController.addUser);

    
        

router.route("/:username")
    .post(userController.updateuser)
    .get(userController.getAllUsers);


router.route("/:username/:password")
    .get(userController.getUser);


// Routes for cart operations
router.route('/cart/get/:userName')
    .get(userController.viewCart) 

router.route('/cart/add/:userName/')
    .post(userController.addToCart);

router.route('/:userName/:_id/cart/remove/')
    .delete(userController.removeFromCart);

module.exports = router;

