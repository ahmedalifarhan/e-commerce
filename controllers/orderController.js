const Order = require('../models/orderModel');
const addOrder = async (req, res) => {
    try {
        const newOrder = new Order({ ...req.body });
        const result = await newOrder.save();
        res.status(201).json({ message: 'Order added successfuly', result })
    }
    catch (error) {
        res.status(400).json({ message: 'Error', error })
    }
}
// Get for admin
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders)
    }
    catch (error) {
        res.status(400).json({ message: 'Error', error })
    }
}
// Get for user
const getMyOrders = async (req, res) => {
    try {
        const userName=req.params.username;
        const orders = await Order.find({userName:userName});
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(400).json({ message: 'Error', error })
    }
}
// Delete order
const deleteOrder = async(req,res)=>{
    try {
        const orderId=req.params.orderID;
        const deletedOrder= await Order.findByIdAndDelete(orderId);
        res.status(200).json(deletedOrder);
    }
    catch (error) {
        res.status(400).json({ message: 'Error', error })
    }
}
module.exports={
    addOrder,
    getOrders,
    getMyOrders,
    deleteOrder

}