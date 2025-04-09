import mongoose from "mongoose";


const facultySchema = new mongoose.Schema({
    name: String,
    email: String,
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
    availability: [{
      day: { type: String, enum: ['Mon','Tue','Wed','Thu','Fri','Sat'] },
      times: [String] // e.g., ['09:00-10:00', '11:00-12:00']
    }]
  });
  
const Faculty=mongoose.model("Faculty",facultySchema);
export default Faculty;

