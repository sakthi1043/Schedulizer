import mongoose from "mongoose";


const timetableSchema = new mongoose.Schema({
    batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
    classroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' },
    timeslot: { type: mongoose.Schema.Types.ObjectId, ref: 'Timeslot' },
    day: { type: String, enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] }
  }, { timestamps: true });
  
  timetableSchema.index({ batch: 1, faculty: 1, timeslot: 1, day: 1 }); // Conflict detection index
  
  const Timetable=mongoose.model('Timetable', timetableSchema);
  export default Timetable
  