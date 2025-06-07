

const mongoose= require("mongoose")
const dbgr= require ("debug")("development:mongoose")
const config= require('config')
mongoose.connect(`${config.get("MONGOOSE_URI")}/scatch`)
.then(()=>{
    console.log("connected");
    
})
.catch((err)=>{
    console.log(err)
})

module.exports= mongoose.connection;