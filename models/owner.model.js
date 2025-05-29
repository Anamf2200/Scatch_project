const mongoose= require("mongoose")

const ownerSchema= mongoose.Schema({
    name:{
        typeof:String,
        minLength:3,
        trim:true
    },
    email:String,
    password:String,
   
    product:{
        typeof:Array,
        default:[]
    },
    pictures:String,
gstin:String

})
module.exports=mongoose.model('owner',ownerSchema);