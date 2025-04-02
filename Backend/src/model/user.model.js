import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneno: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dob: { type: Date, required: true },
    type: { type: String, enum: ["admin", "user", "guest"], required: true },
    role: { type: String, enum: ["student", "teacher", "staff"], required: true }
}, { timestamps: true });

const User=mongoose.model("User",UserSchema);
export default User;