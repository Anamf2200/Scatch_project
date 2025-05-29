const mongoose= require("mongoose")

const productSchema= mongoose.Schema({
    name:String,
   price:Number,
   discount:{
    typeof:Number,
    default:0
   },
   bgColor:String,
   pannelcolor:String,
   textcolor:String

})
module.exports=mongoose.model('product',productSchema);