
// Import the models
import { generateTokens } from "../lib/util.js";
import User from "../model/user.model.js";
import jwt from "jsonwebtoken"

// Import the required packages
import bcrypt from "bcryptjs" // for password hashing


export const register = async (req,res)=>{

    const { name, email, phoneno, password,dob, type, role } = req.body;

    try {
    
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "Email already exists",success:false });

        user = await User.findOne({ phoneno });
        if (user) return res.status(400).json({ msg: "Phone number already exists",success:false });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        user = new User({ name, email, phoneno, password: hashedPassword,dob, type, role });
        await user.save();

        // Generate JWT Token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ 
            token, 
            user: { id: user.id, name, email, phoneno,dob, type, role },
            msg: "User created successfully",
            success:true
        });

    } catch (error) {

        console.log("Error in signup controller : ",error.message);
        res.status(500).json({message:"Internal server error",success:false});
        
    }
};

export const login = async (req, res) => {

    const { name, password } = req.body;
    try {
        // Find user by email
        const user = await User.findOne({ name });
        if (!user) {
          return res.json({ message: 'Invalid credentials',success:false });
        }
    
        // Compare password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.json({ message: 'Invalid credentials',success:false });
        }
    
        // Create JWT token
        const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
    
        res.json({
          message: 'Login successful',
          success:true,
          token,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }
};

