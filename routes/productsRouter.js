

const express= require("express")
const router= express.Router()
const upload= require("../config/multer-config")
const productModel= require("../models/product.model")
const isAdmin = require("../middleware/isAdmin")

router.post("/create",isAdmin,upload.single("image"),async(req,res)=>{
  let{ image, name,price,discount,bgColor,pannelcolor,textcolor}  =req.body
let product= await productModel.create({
        image:req.file.buffer,
name,
price,
discount,
bgColor,
pannelcolor,
textcolor

});
req.flash("success","product created successfully")
res.redirect("/owners/admin")
})


module.exports=router;