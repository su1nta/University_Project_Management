import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

export const userRegister = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, username, role, gender, password } =
      req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !username ||
      !role ||
      !gender ||
      !password
    ) {
      return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
  
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
      return next(new ErrorHandler("User already Registered!", 400));
    }
  
    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      username,
      role,
      gender,
      password,
      role: "User",
    });
    generateToken(user, "User Registered!", 200, res);
  });

  export const login=catchAsyncErrors(async(req,res,next)=>{
    const {email, password, confPassword, role}=req.body;
    if (!email || !password || !confPassword || !role){
        return next(new ErrorHandler("Please provide all details",400));
    }
    if (password !== confPassword){
        return next(new ErrorHandler("Password and Confirm Password do not match!",400));
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Password or Email!",400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Password or Email!",400));
    }
    generateToken(user, "Login Successfully!", 201, res);
  });






  export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
    res
      .status(201)
      .cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "Admin Logged Out Successfully.",
      });
  });

  export const logoutUser = catchAsyncErrors(async (req, res, next) => {
    res
      .status(201)
      .cookie("userToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "User Logged Out Successfully.",
      });
  });