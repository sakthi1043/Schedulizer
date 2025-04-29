import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g., 'Computer Science'
  code: { type: String, required: true, unique: true }, // e.g., 'CSE'
}, { timestamps: true });

const Department = mongoose.model('Department', departmentSchema);
export default Department;