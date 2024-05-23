const mongoose = require('mongoose');
const orderSchemah=new mongoose.Schema({
    fullName:{type:String,required:true},
    email:{type:String,required:true},
    userName:{type:String,requierd:true},
    productName:{type:String ,required:true},
    quantity:{type:Number,required:true},
    price:{type:Number,required:true},
    RejesterDate:Date
})
orderSchemah.pre('save',(function(next){
    this.RejesterDate=Date.now();
   next();
}))
 module.exports=mongoose.model("Order",orderSchemah);
 
 