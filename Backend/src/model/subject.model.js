import mongoose from "mongoose";


const subjectSchema = new mongoose.Schema({
    code: String,
    name: String,
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    lectureHours: Number,
    practicalHours: Number
  });
  
  const Subject=mongoose.model('Subject', subjectSchema);
  export default Subject;