import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
// import createError from "http-errors";
// import { createToken } from "../helpers/jsonwebtoken.js";
// import { errorResponse, successResponse } from "./response.controller.js";
// import { adminEmail, adminPassword, jwtSecret } from "../secret.js";
import jwt from "jsonwebtoken";

const createToken =(id) =>{
  return jwt.sign({id},process.env.JWT_SECRET)
}

//route for user register
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    //check user already exists
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res.json({success:false, message:"User already Registered"})
    }

    //validating email and strong password
    if (!validator.isEmail(email)) {
      return res.json({success:false, message:"Please enter a valid email"})
    }
    
    if (password.length < 8) {
      return res.json({success:false, message:"Password must be 8char+ "})
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      name,
      email,
      password: hashPassword,
    });

    const user = await newUser.save()
    
    //create token
    const token = createToken(user._id);
    res.json({success:true,token})
  } catch (error) {
    console.log(error);
    res.json({success:false, message: error.message})
    
  }
   
}

//route for user login
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({success:false, message:"User does not exist"})
    }

    const isMatch = await  bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      res.json({success:true, token})
    }
    else{
      res.json({success:false, message:"Invalid Credentials"})
    }

  } catch (error) {
    res.json({success:false,message : error.message})
  }
};

////route for admin login
const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({success:true,token})
    }
    else{
      res.json({success:false,message:"invalid Credentials"})
    }
  } catch (error) {
    res.json({success:false,message : error.message})
  }
};

export { registerUser, loginUser, adminLogin };
