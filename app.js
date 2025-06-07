const express= require('express')
const app =express()

const cookieParser= require("cookie-parser")
const path = require("path")
const db= require('./config/mongoose-connection')
const ownersRouter= require("./routes/ownersRouter")
const usersRouter= require("./routes/usersRouter")
const productsRouter= require("./routes/productsRouter");
const index= require("./routes/index");
const flash= require("connect-flash");
const expressSession= require("express-session")
require("dotenv").config();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")));
app.use(cookieParser());
app.set('view engine','ejs')
app.use(expressSession({
    resave:false,
    saveUninitialized:false,
secret:process.env.EXPRESS_SESSION_SECRET
}));
app.use(flash());
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.admin = req.admin;
  next();
});


app.use("/owners",ownersRouter)
app.use('/users',usersRouter)
app.use("/products",productsRouter)
app.use("/",index);



// app.get('/',(req,res)=>{
//     res.se("index")
// })

   
   



app.listen(3000)