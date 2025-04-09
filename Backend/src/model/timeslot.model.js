import mongoose from "mongoose";


const timeslotSchema = new mongoose.Schema({
    start: String, // e.g., '09:00'
    end: String    // e.g., '10:00'
  });
  const Timeslot = mongoose.model('Timeslot', timeslotSchema);
  export default Timeslot;