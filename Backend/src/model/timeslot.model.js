import mongoose from "mongoose";


const timeslotSchema = new mongoose.Schema({
    startTime: String, // e.g., '09:00'
    endTime: String    // e.g., '10:00'
  });
  const Timeslot = mongoose.model('Timeslot', timeslotSchema);
  export default Timeslot;