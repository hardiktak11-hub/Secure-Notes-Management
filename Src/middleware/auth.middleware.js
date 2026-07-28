import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyJWT = async (req,res,next)=>{

try{
const token = req.cookies.accessToken;

//if token is invalid
if(!token){
   return res.status(401).json({
        success:false,
        message:"unauthorized token"
    });
}

//verify the jwt and decode its payload
const decodedToken = jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET
);

//removing sensitive information
const loggedinuser = await User.findById(decodedToken._id).select(
    "-password -refreshToken"
);
if(!loggedinuser){
    return res.status(401).json({
        success:false,
        message:"invalid access token"
    });
}

req.user = loggedinuser;
next();
}
catch(error){
return res.status(401).json({
    success:false,
    message:"invalid or expired access token"
 });
}
}