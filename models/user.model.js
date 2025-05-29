const mongoose= require("mongoose")

const userSchema= mongoose.Schema({
    name:{
        typeof:String,
        minLength:3,
        trim:true
    },
    email:String,
    password:String,
    cart:{
        typeof:Array,
        default:[]
    },
    isAdmin:Boolean,
    order:{
        typeof:Array,
        default:[]
    },
    pictures:String,
    contact:Number


})
module.exports=mongoose.model('user',userSchema);