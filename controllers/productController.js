const Product = require('../models/productModel');
const User=require('../models/userModel');

const getAllProducts = async (req, res) => {
    let products = await Product.find();
    res.json(products);
}

const getSingleProduct = async (req, res) => {
    try {
        const id = req.params.productId;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "product not found" });
        }
        res.json(product);
    } catch (error) {
        return res.status(400).json({ message: "Invalid Id" });

    }

}

const addNewProduct = async (req, res) => {
    try {
        const userName = req.params.userName;
        const user = await User.findOne({"userName":userName });
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        if(user.isAdmin){
            let product = new Product(req.body);
            await product.save()
            res.json(product);

        }
        else{
            res.json({"erro":"You aren't an admin"});
        }
       

    } catch (error) {
        return res.status(400).json(error);
    }

}

const updateProduct = async (req, res) => {
    const userName = req.params.userName;
    const user = await User.findOne({"userName":userName });
    
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
    if(user.isAdmin){
    const id = req.params.productId;

    

    let product = await Product.findByIdAndUpdate(id, req.body, { new: true })

    res.json(product);}
    else{
        res.json({"erro":"you aren't an admin"});
    }

}

const deleteProduct = async (req, res) => {
    const userName = req.params.userName;
    const user = await User.findOne({"userName":userName });
    
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
    
       
    if(user.isAdmin){
    const id = req.params.productId;
    let product = await Product.findByIdAndDelete(id);
    if (!product) {
        return res.status(400).json({ message: "product not found!" });
    }
    res.json(product);
    }
    else{
        res.json({"erro":"you aren't an admin"});
    }
}

module.exports = {
    getAllProducts,
    getSingleProduct,
    addNewProduct,
    updateProduct,
    deleteProduct
}