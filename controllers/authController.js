   const bcrypt= require("bcrypt")
const cookieParser=("cookie-parser")
const userModel= require("../models/user.model")
const {generateToken}=require("../utlis/generateToken")
const ownerModel= require("../models/owner.model")

   
   
   module.exports.registerUser= async(req,res)=>{
    try{

        let {email,name,password,role}=req.body
                let user = await userModel.findOne({email:email});
if (user) {
            req.flash("error", "You already have an account. Please login.");
            return res.redirect("/"); 
        }
        bcrypt.genSalt(10,async(err,salt)=>{
           bcrypt.hash(password,salt,async (err,hash)=>{
            if(err)return res.send(err.message)
                else{
            let user= await userModel.create({
email,
name,
password:hash,
role
            });

let token= generateToken(user);
res.cookie("token",token)

                    req.flash("success", "User created successfully");
                    res.redirect('/shop')
            
                }
           });
        })

    }
    catch(err){
        res.send(err.message)
    }
}

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check admin first
  const admin = await ownerModel.findOne({ email });
  if (admin) {
    await bcrypt.compare(password, admin.password, (err, result) => {
      if (result) {
        const token = generateToken(admin);
        res.cookie("token", token);
        return res.redirect("/owners/admin");
      } else {
        req.flash("error", "Email or Password incorrect");
        return res.redirect("/");
      }
    });
    return; // Important: stop further execution
  }

  const user = await userModel.findOne({ email });
  if (!user) {
    req.flash("error", "Email or Password incorrect");
    return res.redirect("/");
  }

 await  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      const token = generateToken(user);
      res.cookie("token", token);
      return res.redirect("/shop");
    } else {
      req.flash("error", "Email or Password incorrect");
      return res.redirect("/");
    }
  });
};

module.exports.Admin=async (req,res)=>{
    let owner= await ownerModel.find();
    if(owner.length>0){
        return res.status(503).send("You cannot create a new owner")
    }

    let {name,email,password}=req.body;
    let createdUser= await ownerModel.create({
name,
email,
password
    });
    res.status(201).send(createdUser);
}

module.exports.placeOrder = async (req, res) => {
  try {
    // Fetch the user and populate cart items
    const user = await userModel.findById(req.user._id).populate("cart");

    if (!user.cart.length) {
      req.flash("error", "Cart is empty");
      return res.redirect("/checkout");
    }

    // Create order summary
    const orderItems = user.cart.map(item => ({
      productId: item._id,
      name: item.name,
      price: item.price,
      discount: item.discount,
      platformFee: 20,
      total: Number(item.price) + 20 - Number(item.discount)
    }));

    const totalAmount = orderItems.reduce((acc, item) => acc + item.total, 0);

    // Save order in user's orders
    user.orders.push({
      items: orderItems,
      totalAmount,
      date: new Date()
    });

    // Clear cart
    user.cart = [];

    await user.save();

    req.flash("success", "Order placed successfully!");
    res.redirect("/orders");
  } catch (err) {
    console.error("Error placing order:", err);
    req.flash("error", "Something went wrong");
    res.redirect("/checkout");
  }
};


module.exports.getOrders = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    res.render("orders", { orders: user.orders || [] });
  } catch (err) {
    console.error("Error fetching orders:", err);
    req.flash("error", "Unable to fetch orders");
    res.redirect("/");
  }
};
// 



module.exports.logoutUser=async(req,res)=>{
    res.cookie("token","");
    res.redirect("/")
}