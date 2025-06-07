const mongoose= require("mongoose")

const ownerSchema= mongoose.Schema({
    name:{
        type:String,
        minlength:3,
        trim:true
    },
    email:String,
    password:String,
   
    product:{
        type:Array,
        default:[]
    },
    pictures:String,
role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  }
})
module.exports=mongoose.model('owner',ownerSchema);