
const jwt= require("jsonwebtoken")
const user= require("../models/user.model")
const owner= require("../models/owner.model")
const ownerModel = require("../models/owner.model")
const userModel = require("../models/user.model")



module.exports.isAuthenticated=async(req,res,next)=>{

const token= req.cookies.token
if(!token){
    req.flash("Login required")
    return res.redirect("/")
}
try{
const decoded= jwt.verify(token,process.env.JWT_KEY)
if(decoded.role==="admin"){

    const admin= await ownerModel.findOne({email:decoded.email}).select("-password")
    if(!admin)throw new Error ("Admin not found")
        req.admin=admin
    req.role="admin"
    next()
}else if(decoded.role==="user"){
    const user= await userModel.findOne({email:decoded.email}).select("-password")
    if(!user)throw new Error("User not found")
        req.user=user
    req.role="user"
    next()
}

}
catch(err){
console.error(err)
req.flash("error","Invalid error")
return res.redirect("/")
}

}