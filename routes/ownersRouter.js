

const express= require("express");
const ownerModel = require("../models/owner.model");
const { Admin } = require("../controllers/authController");
const isAdmin = require("../middleware/isAdmin");
const {generateToken}=require("../utlis/generateToken")
const router= express.Router()
require("dotenv").config();
const bcrypt= require("bcrypt")


router.post("/create",async (req,res)=>{
    let owner= await ownerModel.find();
    if(owner.length>0){
        return res.status(503).send("You cannot ceate a new owner")
    }

    let {name,email,password}=req.body;
await bcrypt.genSalt(10,async(err,salt)=>{
    bcrypt.hash(password,salt,async(err,hash)=>{
      if(err)return res.send(err.message)
        else{
    let createdUser= await ownerModel.create({
name,
email,
password:hash,
role:"admin"
    });
        let token= generateToken(owner);
        res.cookie("token",token)
    res.send("Admin created successfully");

}

    })
})
    
})


    router.get("/admin",isAdmin, async (req,res)=>{
       let success= req.flash("success")
        res.render("createproducts",{success})
    }
       )

module.exports=router;