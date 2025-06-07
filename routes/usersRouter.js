

const express= require("express")
const router= express.Router()
const {registerUser,loginUser, logoutUser, getOrders, Account}=require("../controllers/authController")
const { route } = require("./ownersRouter")
const isLoggedin = require("../middleware/isLoggedin")


router.get("/",(req,res)=>{
    res.send("hey its's working users")
})


router.post("/register",registerUser)
router.post("/login",loginUser);

router.get('/logout',logoutUser)


module.exports=router;