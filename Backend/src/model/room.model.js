import mongoose from "mongoose";


const classroomSchema = new mongoose.Schema({
    roomNumber: String,
    capacity: Number,
    type: { type: String, enum: ['theory', 'lab'], default: 'theory' }
  });
  const Classroom=mongoose.model('Classroom', classroomSchema);
  export default Classroom;