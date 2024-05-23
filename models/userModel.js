const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchemah=new mongoose.Schema({
    fullName:{type:String,required:true},
    email:{type:String,required:true},
    userName:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    Picture:{type:String},
    age:{type:Number,requierd:true},
    cart: { 
        products: [{ type: Schema.Types.ObjectId, ref: 'Product' }] 
    },
    isAdmin: { type: Boolean, default: false },
    RejesterDate:Date

})
userSchemah.pre('save',(function(next){
    this.RejesterDate=Date.now();
   next();
}))
 module.exports=mongoose.model("User",userSchemah);
 