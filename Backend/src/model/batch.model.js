import mongoose from "mongoose";


const batchSchema = new mongoose.Schema({
    name: String,
    semester: Number,
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }]
  });
  
  const Batch=mongoose.model("Batch",batchSchema);
  export default Batch;