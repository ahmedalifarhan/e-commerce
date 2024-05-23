const User = require('../models/userModel');

// For only Admins
const getAllUsers = async (req, res) => {
    const userName = req.params.username;
    const user = await User.findOne({"userName":userName });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if(user.isAdmin){
            let users = await User.find();
            res.json(users);

        }else{
            res.json({"erro":"you no admin"});
        }
    
}

const getUser = async (req, res) => {
        const userName = req.params.username;
        const password = req.params.password;
        const user = await User.findOne({ userName: userName });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if(user['password']!=password){
            res.json({ message: "Wronge password"});
        }
        res.json(user);
}
// For user ==> signUp
const addUser = async (req, res) => {
    try {
        const { email, ...otherUserData } = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email address" });
        }
        let user = new User({ email, ...otherUserData });
        await user.save();
        res.json(user);
    } catch (error) {
        return res.status(400).json(error);
    }
}

// For only user , update her profile
const updateuser = async (req, res) => {
    const userName = req.params.username;
    try {
        let user = await User.findOneAndUpdate({ userName: userName }, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: "Invalid userName or error updating user" });
    }
}

const addToCart = async (req, res) => {
    try {
        const userName = req.params.userName;
        const productToAdd = req.body.id; 
        const user = await User.findOne({"userName":userName });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.cart.products.push(productToAdd);
        await user.save();
        res.status(200).json({ message: "Product added to cart successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error", error });
    }
}


const removeFromCart = async (req, res) => {
    try {
        const userName = req.params.userName;
        const productIdToRemove = req.params._id; 
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.cart.products = user.cart.products.filter(_id => _id != productIdToRemove);
        await user.save();
        res.status(200).json({ message: "Product removed from cart successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error", error });
    }
}


const viewCart = async (req, res) => {
    try {
        const userName = req.params.userName;
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const cart = user.cart.products;
        res.status(200).json({ message: "User's cart retrieved successfully", cart });
    } catch (error) {
        res.status(500).json({ message: "Error", error });
    }
}


module.exports = {
    getAllUsers,
    getUser,
    addUser,
    updateuser,
    addToCart,
    removeFromCart,
    viewCart
}