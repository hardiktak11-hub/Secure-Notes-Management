import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

//Register Api

export const registerUser = async(req,res) =>{

try{
  
 //extracting the data from client(postmen)   
  const username=req.body.username;
  const email=req.body.email;
  const password=req.body.password;

 //if client doesnt enter any of the req field then req failed
 if(!username || !email || !password){
   return  res.status(400).json({
    success:false,
    message:"all field are required"
   });
 }

 //if user already exist then too req failed
 const existingUser = await User.findOne({
    $or:[{username},{email}]
 });
 if(existingUser){
   return res.status(409).json({
        success:false,
        message:"user already exist "
    });
 }

 //creating a new entry in the database

 const newUser = await User.create({
    username,
    email,
    password
 });

 const createdUser = await User.findById(newUser._id).select(
    "-password -refreshToken"
 );
 if(!createdUser){
   return res.status(500).json({
        success:false,
        message:"some error occured"
    });
 }

 res.status(201).json({
    success:true,
    message:"registered succesfully",
    user:createdUser
 });
}
catch(error){
 return res.status(500).json({
    success:false,
    message:"internal server error"
})
}
}

//Login Api

export const loginUser = async(req,res)=>{

   try{
const email=req.body.email;
const password=req.body.password;

//if all req fields are not entered then req fails
if(!email || !password){
  return res.status(400).json({
      success:false,
      message:"enter all required field"
   });
}

//find if username exist in databse or not
const checkUser = await User.findOne({email});

if(!checkUser){
 return res.status(404).json({
   success:false,
   message:"user does not exist"
});
}

//if user exist then we check password
const comparePassword = await checkUser.comparePassword(password);

if(!comparePassword){
  return res.status(401).json({
      success:false,
      message:"password invalid"
   });
}

const accessToken = await checkUser.generateAccessToken();
const refreshToken= await checkUser.generateRefreshToken();

//save refreshstoken into database
checkUser.refreshToken = refreshToken;
await checkUser.save();

//removing sensitive field
const loggedinUser = await User.findById(checkUser._id).select(
   "-refreshToken -password"
);
if(!loggedinUser){
  return res.status(500).json({
      success:false,
      message:"internal server error"
   });
}

//cookies

const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
};

res.status(200)
 .cookie("accessToken",accessToken,options)
 .cookie("refreshToken",refreshToken,options)
 .json({
   success:true,
   message:"login succesfull",
   user:loggedinUser
});
}
catch(error){
return res.status(500).json({
   success:false,
   message:"internal server error"
});
}
}

//Get current user Api
export const currentUser = async (req,res)=>{
return res.status(200).json({
    success:true,
    currentUser : req.user
});
}

//RefreshToken Api
export const generaterefreshToken = async(req,res)=>{

try{

const incomingrefreshtoken = req.cookies.refreshToken;
if(!incomingrefreshtoken){
   res.status(401).json({
      success:false,
      message:"unauthorized request"
   });
}

const decodedtoken = jwt.verify(
   incomingrefreshtoken,
   process.env.REFRESH_TOKEN_SECRET
)

const user = await User.findById(decodedtoken._id);
if(!user){
   return res.status(401).json({
      success:false,
      message:"invalid refresh token"
   })
}

if(incomingrefreshtoken!=user.refreshToken){
   return res.status(401).json({
      success:false,
      message:"refresh token is expired or user already exist"
   });
}

const accessToken = await user.generateAccessToken();
const refreshToken = await user.generateRefreshToken();

user.refreshToken=refreshToken;
await user.save();

//cookies
const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax"
};

res.status(200)
 .cookie("accessToken",accessToken,options)
 .cookie("refreshToken",refreshToken,options)
 .json({
   success:true,
   message:"accesstoken refreshed succesfully",
});
}
catch(error){
return res.status(500).json({
   success:false,
   message:"internal server error"
});
}
}

//Logout Api
export const logOutUser = async (req,res)=>{

try{
  await User.findByIdAndUpdate(req.user._id,{
$unset:{ refreshToken:1
}
},
{
   new :true
}
)
//cookies
const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax"
};

return res.status(200)
 .clearCookie("accessToken",options)
 .clearCookie("refreshToken",options)
 .json({
   success:true,
   message:"logout succesfully",
});
}
catch(error){
return res.status(500).json({
   success:false,
   message:"internal server error"
});
}
}
