import mongoose from "mongoose";


const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    rollNumber: String,
    year: Number,
    rollNumber: { type: String, unique: true, required: true },
    batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' }
  });
  
  const Student = mongoose.model('Student', studentSchema);
  export default Student;
  