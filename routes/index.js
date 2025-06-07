

const express= require("express");
const isLoggedin = require("../middleware/isLoggedin");
const router= express.Router();
const productModel= require("../models/product.model")
const userModel= require("../models/user.model")
const {placeOrder,getOrders}= require('../controllers/authController');
const ownerModel = require("../models/owner.model");
const isAdmin = require("../middleware/isAdmin");
const { isAuthenticated } = require("../middleware/isAuthenticated");




router.get("/",(req,res)=>{
    let error= req.flash("error");

    res.render("index", {error,loggedin:false})
})

router.get("/shop",isLoggedin,async (req,res)=>{
    let {filter,discount} =req.query
        let query= {}



if(discount==="true"){
    query.discount={$gt:0}
} 
 let products;

if(filter==="new"){
products=await productModel.find().sort({createdAt:-1}).limit(2)

}
else{
    products = await productModel.find(query);

}
let success= req.flash("success")


    res.render("shop",{products,success})
})

router.get("/addtocart/:productid",isLoggedin,async (req,res)=>{
    let user = await userModel.findOne({email:req.user.email})
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success","added to cart")
    res.redirect("/shop")

})


router.get("/cart",isLoggedin,async (req,res)=>{
let user= await userModel.findOne({email:req.user.email}).populate("cart");
    res.render("cart",{user})
})
router.get('/checkout',isLoggedin,async(req,res)=>{
    let user= await userModel.findById(req.user._id).populate("cart")
    res.render('checkout',{user})
})

router.post('/placeorder',isLoggedin,placeOrder)
router.get("/orders", isLoggedin, getOrders);



router.get('/account',isAuthenticated,async(req,res)=>{
    if(req.role=="admin"){
        const admin= req.admin
            res.render('account', { admin, user: null });

    }else if(req.role==="user"){
        const user= req.user
        res.render("account",{user,admin:null})
    } else {
    req.flash("error", "Unknown role");
    res.redirect('/')
  }

})





module.exports=router