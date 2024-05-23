const mongoose = require('mongoose');

//create schema
const productSchema = new mongoose.Schema({
    productName:{type:String ,required:true},
    price:{type:Number ,required:true},
    Descreption:{type:String ,required:true},
    img:{type:String},
    RejesterDate:Date
});

productSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
})

//create model
module.exports = mongoose.model("Product", productSchema);