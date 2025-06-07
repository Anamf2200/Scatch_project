const jwt = require("jsonwebtoken")
const ownerModel= require('../models/owner.model')


module.exports=async(req,res,next)=>{
    if(!req.cookies.token){
        req.flash("error","Admin login required")
       return res.redirect("/")
    }
    try{
     let decoded= await jwt.verify(req.cookies.token,process.env.JWT_KEY)  

     if (decoded.role !== "admin") {
            req.flash("error", "Unauthorized access");
            return res.redirect("/");
        }
     let admin= await ownerModel.findOne({email:decoded.email}).select("-password")
     req.admin=admin

     next()
    }
    catch(err){

        
        req.flash("error","Admin not found")
        res.redirect("/")
    }
}