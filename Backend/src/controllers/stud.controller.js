// Import the models
import { generateTokens } from "../lib/util.js";
import Student from "../model/student.model.js";
import jwt from "jsonwebtoken"

// Import the required packages
import bcrypt from "bcryptjs" // for password hashing


export const addStudent= async (req,res) => {
    try {
        const { name, email, phone, course, year, rollNumber, batch } = req.body;
    
        const newStudent = new Student({
          name,
          email,
          phone,
          course,
          year,
          rollNumber,
          batch
        });
    
        const savedStudent = await newStudent.save();
        res.status(201).json({Record:savedStudent,msg:"Inserted Successfully",success:true});
      } catch (error) {
        if (error.code === 11000 && error.keyPattern?.rollNumber) {
          return res.json({ msg: "Roll Number already exists.",success:false });
        }
        console.error("Error adding student:", error);
        res.status(500).json({ error: "Internal server error" });
      }
}

export const getStudent= async (req,res) => {
    try {
        const students = await Student.find(); // This fetches all students from the database
        res.status(200).json({
          success: true,
          data: students
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: 'Error fetching students'
        });
      }
}


export const editStudent= async (req,res)=>{
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      updatedData,
      { new: true } // returns the updated document
    );

    if (!updatedStudent) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.json({ success: true, data: updatedStudent });
  } 
  catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }


}