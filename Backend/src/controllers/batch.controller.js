import Batch from "../model/batch.model.js";

export const getAllBatches = async (req, res) => {
  try {
    const batches = await Batch.find().select("_id name"); // Only return _id and name
    res.status(200).json(batches);
  } catch (error) {
    res.status(500).json({ message: "Error fetching batches", error });
  }
};
