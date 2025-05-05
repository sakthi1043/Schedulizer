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

export const getDepartment=async(req,res)=>{
    try {
        const departments = await Department.find();
        res.json({ success: true, departments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: 'Server error' });
    }
}

export const editDepartment= async(req,res)=>{
    const { name, code } = req.body;

    try {
        const updated = await Department.findByIdAndUpdate(
            req.params.id,
            { name, code },
            { new: true }
        );
        if (!updated) {
            return res.status(404).json({ success: false, msg: 'Department not found.' });
        }
        res.json({ success: true, msg: 'Department updated successfully.', department: updated });
    } catch (err) {
        res.status(500).json({ success: false, msg: 'Failed to update department.' });
    }

}


export const deleteDepartment= async(req,res)=>{
    try {
        const deleted = await Department.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, msg: 'Department not found.' });
        }
        res.json({ success: true, msg: 'Department deleted successfully.' });
    } catch (err) {
        res.status(500).json({ success: false, msg: 'Failed to delete department.' });
    }

}