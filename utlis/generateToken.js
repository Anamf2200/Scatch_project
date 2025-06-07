const jwt= require("jsonwebtoken");

const generateToken=(useroradmin)=>{
  const role= useroradmin.gstin?"admin":"user";
  return  jwt.sign({email: useroradmin.email,id: useroradmin._id,role:useroradmin.role},process.env.JWT_KEY)
}

module.exports.generateToken=generateToken