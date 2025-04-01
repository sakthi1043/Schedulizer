
// Import the models
import { generateTokens } from "../lib/util.js";
import User from "../model/user.model.js";
import jwt from "jsonwebtoken"

// Import the required packages
import bcrypt from "bcryptjs" // for password hashing


export const signup = async (req,res)=>{

    const {fullName,email,password} = req.body;

    try {
        
        // Checking whether the password have minimum length of 6 or not.
        if(password.length < 6)
        {
            return res.status(400).json({message:"Password must be minimum length of 6"});
        }

        //  Checking whether the email is already present in the db or not.
        const user = await User.findOne({email});

        if(user){
            return res.status(400).json({message:"Email already exists"});
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //  Add the new user
        const newUser = new User({

            userName:fullName,
            password:hashedPassword,
            email:email,
        })

        if(newUser)
        {
            //  Generate JWT Tokens
            generateTokens(newUser._id,res)

            // save the new user in the table
            await newUser.save();

            return res.status(201).json({
                _id:newUser._id,
                userName : newUser.fullName,
                email : newUser.email,
                profilePic : newUser.profilePic
            });
        }
        else
        {
            return res.status(400).json({message:" Invalid user data"});
        }

    } catch (error) {

        console.log("Error in signup controller : ",error.message);
        res.status(500).json({message:"Internal server error"});
        
    }

    res.send("Sign up is created");
};

