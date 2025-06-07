const mongoose= require("mongoose")

const userSchema= mongoose.Schema({
    name:{
        type:String,
        minlength:3,
        trim:true
    },
    email:String,
    password:String,
    cart:[{
        type:mongoose.Schema.ObjectId,
ref:"product"    }],
   orders: [
  {
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product"
        },
        name: String,
        price: Number,
        discount: Number,
        platformFee: Number,
        total: Number
      }
    ],
    totalAmount: Number,
 

    date: Date
  }
],
   role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  },

    pictures:String,
    contact:Number


})
module.exports=mongoose.model('user',userSchema);