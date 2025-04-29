import Department from "../model/department.model.js";

export const addDepartment=async(req,res)=>{
    const { name, code } = req.body;

    if (!name || !code) {
        return res.json({ msg: "Name and code are required" ,success:false});
    }

    try {
        const newDept = new Department({ name, code });
        await newDept.save();
        res.json({ msg: "Department added", department: newDept,success:true });
    } catch (error) {
        console.error("Error saving department:", error);
        res.status(500).json({ message: "Server error" });
    }


}