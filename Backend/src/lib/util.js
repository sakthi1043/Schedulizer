import jwt from "jsonwebtoken"

export const generateTokens = (userId, res) =>{

    //  Generating the token using the JWT Secret key and it will be expired after 7 days (7d)
    const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"7d"})

    // send the generated jwt token to cookies
    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000, // maximum 7 days ( time in milli seconds so that i add 1000 in last )
        httpOnly:true,          // Prevent XSS attacks cross-site scripting language
        sameSite:"strict",       // CSRF attacks cross-site requests forgery attack
        secure: process.env.NODE_ENV !== "development"
    });

    return token;

};