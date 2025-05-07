import Subject from "../model/subject.model.js";

export const addSubject= async(req,res)=>{
    const { name, code, departmentId, lectureHours } = req.body;

    // Add validation
    if (!name || !departmentId || !lectureHours) {
        return res.status(400).json({ 
            success: false,
            msg: "Please provide all required fields: name, departmentId, and lectureHours" 
        });
    }

    try {
        // Validate lectureHours is a number
        if (isNaN(lectureHours)) {
            return res.status(400).json({
                success: false,
                msg: "lectureHours must be a number"
            });
        }

        const generateCourseCode = (courseName) => {
            const prefix = courseName.slice(0, 2).toUpperCase();
            const randomDigits = Math.floor(1000 + Math.random() * 9000); // 1000-9999
            return `${prefix}${randomDigits}`;
        };

        const subject = new Subject({
            name,
            code: generateCourseCode(name), // Generate code if not provided
            department: departmentId,
            lectureHours: parseInt(lectureHours),
        });

        const savedSubject = await subject.save();
        
        res.status(201).json({
            success: true,
            msg: "Course added successfully",
            data: savedSubject
        });
        
    } catch (error) {
        console.error("Error adding subject:", error);
        
        // Handle duplicate key errors (like duplicate course code)
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                msg: "Course with this code already exists"
            });
        }
        
        res.status(500).json({ 
            success: false,
            msg: "Error adding course",
            error: error.message 
        });
    }
}


export const getSubject= async (req,res)=>{
    try {
            const subjects = await Subject.find();
            res.json({ success: true, subjects });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, msg: 'Server error' });
        }
}

export const deleteSubject=async(req,res)=>
{
    try {
        const subject = await Subject.findById(req.params.id);
        if (!subject) {
            return res.status(404).json({
                success: false,
                msg: 'Subject not found.'
            });
        }

        await subject.deleteOne();

        res.json({
            success: true,
            msg: 'Subject deleted successfully.'
        });
    } catch (err) {
        console.error('Delete Error:', err);
        res.status(500).json({
            success: false,
            msg: 'Failed to delete subject.',
            error: err.message
        });
    }
}

export const editSubject=async(req,res)=>{

    try {
        const { name, code, departmentId, lectureHours } = req.body;

        const generateCourseCode = (courseName) => {
            const prefix = courseName.slice(0, 2).toUpperCase();
            const randomDigits = Math.floor(1000 + Math.random() * 9000); // 1000-9999
            return `${prefix}${randomDigits}`;
        };

        const updatedSubject = await Subject.findByIdAndUpdate(
            req.params.id,
            {
                name,
                code:generateCourseCode(name),
                department: departmentId,
                lectureHours
            },
            { new: true }
        );

        if (!updatedSubject) {
            return res.status(404).json({ success: false, msg: "Course not found" });
        }

        res.json({ success: true, msg: "Course updated successfully", subject: updatedSubject });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: "Server error" });
    }
}
