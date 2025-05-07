import React, { useState,useEffect } from "react";
import Sidebar from "../Home/Sidebar";
import Header from "../Home/Header";
import { Box } from "@mui/material";
import "../Home/AdminDashboard.css";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { FaTrash } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { Modal } from "bootstrap";
import axios from "axios";
import Swal from 'sweetalert2';

const Courses = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [selectedRow, setSelectedRow] = useState(null);
    const [departments,setDepartments] = useState([]);
    const [courseName, setCourseName] = useState("");
    const [courses,setCourses]=useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [hoursPerWeek, setHoursPerWeek] = useState("");



    const [editCourseName, setEditCourseName] = useState("");
    const [editDepartment, setEditDepartment] = useState("");
    const [editHoursPerWeek, setEditHoursPerWeek] = useState("");


    useEffect(() => {
        const fetchCoursesAndDepartments = async () => {
            try {
                const [courseRes, departmentRes] = await Promise.all([
                    axios.get("http://localhost:8000/api/Subjects"),
                    axios.get("http://localhost:8000/api/Departments")
                ]);

                console.log(courseRes.data.subjects);
                console.log(departmentRes.data.departments);
                
    
                const courseList = Array.isArray(courseRes.data.subjects)
                    ? courseRes.data.subjects
                    : [];
    
                const departmentList = Array.isArray(departmentRes.data.departments)
                    ? departmentRes.data.departments
                    : [];
    
                const departmentMap = {};
                departmentList.forEach(dept => {
                    departmentMap[dept._id] = dept.name;
                });
    
                const enrichedCourses = courseList.map(course => ({
                    ...course,
                    department: departmentMap[course.department] || "Unknown",
                    departmentId: course.department 
                }));
    
                // console.log("enrich:",enrichedCourses)
                // console.log("department:",departmentList);

                setCourses(enrichedCourses);
                // console.log(courses);
                setDepartments(departmentList);
                // console.log(departments);
            } catch (error) {
                console.error("Error fetching courses or departments:", error);
            }
        };
    
        fetchCoursesAndDepartments();
    }, []);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!courseName || !selectedDepartment || !hoursPerWeek) {
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill in all fields.',
            });
            return;
        }
    
        try {
            const response = await axios.post("http://localhost:8000/api/Subjects/Add", {
                name: courseName,
                code: courseName.toLowerCase().replace(/\s+/g, "-"), // Simple code generation
                departmentId: selectedDepartment,
                lectureHours: parseInt(hoursPerWeek),
            });
            if(response.data.success)
            {
                const modalElement = document.getElementById("myModal");
                const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
                modal.hide();

                await Swal.fire({
                    title: 'Success!',
                    text: (response.data.msg),
                    icon: 'success',
                    confirmButtonText: 'OK'
                });


                // Find department name from ID
                // const departmentName = departments.find(dept => dept._id === selectedDepartment)?.name || "Unknown";

                // console.log(departmentName);
                // // Add the new course to the local state
                // const newCourse = {
                //     ...response.data.savedSubject, // assuming your API returns the new course under 'subject'
                //     department: departmentName
                // };
                // console.log(newCourse);

                // setCourses(prevCourses => [...prevCourses, newCourse]);

                // Reset fields
                setCourseName("");
                setSelectedDepartment("");
                setHoursPerWeek("");

                window.location.reload();
            }
            else
            {
                await Swal.fire({
                    title: 'Error!',
                    text: (response.data.msg),
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
    
        } catch (error) {
            console.error("Error adding course:", error);
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to add course.',
            });
        }
    };

    const handleEdit = (row) => {
        setSelectedRow(row);
        setEditCourseName(row.name);
        setEditDepartment(row.department);
        setEditHoursPerWeek(row.lectureHours);
        // alert(editCourseName);

        const modalElement = document.getElementById("editModal");
        const modal = new Modal(modalElement);
        modal.show();
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();
        if (!editCourseName || !editDepartment || !editHoursPerWeek) {
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill in all fields.',
            });
            return;
        }
    
        try {
            const response = await axios.put(`http://localhost:8000/api/Subjects/Edit/${selectedRow._id}`, {
                name: editCourseName,
                code: editCourseName.toLowerCase().replace(/\s+/g, "-"),
                departmentId: editDepartment,
                lectureHours: parseInt(editHoursPerWeek),
            });
    
            if (response.data.success) {
                const updatedCourse = response.data.subject;
    
                setCourses(prevCourses =>
                    prevCourses.map(course =>
                        course._id === selectedRow._id
                            ? { ...updatedCourse, department: departments.find(d => d._id === editDepartment)?.name || "Unknown" }
                            : course
                    )
                );
    
                const modalElement = document.getElementById("editModal");
                const modal = Modal.getInstance(modalElement);
                modal.hide();
    
                await Swal.fire({
                    title: 'Updated!',
                    text: response.data.msg,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } else {
                throw new Error(response.data.msg);
            }
        } catch (error) {
            console.error("Error updating course:", error);
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update course.',
            });
        }
    };
    

    const columns = [
        { name: "Id", cell: (row, index) => index + 1, sortable: true },
        { name: "Course Name", selector: (row) => row.name, sortable: true },
        { name: "Department", selector: (row) => row.department, sortable: true },
        { name: "Hours/Week", selector: (row) => row.lectureHours, sortable: true },
        {
            name: "Actions",
            selector: (row) => (
                <div>
                    <button
                        onClick={() => handleEdit(row)}
                        style={{
                            marginRight: "10px",
                            cursor: "pointer",
                            border: "none",
                            background: "transparent",
                            padding: "8px",
                            borderRadius: "50%",
                            boxShadow: "0 4px 10px rgb(123, 199, 61)",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "box-shadow 0.3s ease-in-out",
                        }}
                    >
                        <FaPen color="green" />
                    </button>
                    <button
                        onClick={() => handleDelete(row._id)}
                        style={{
                            marginRight: "10px",
                            cursor: "pointer",
                            border: "none",
                            background: "transparent",
                            padding: "8px",
                            borderRadius: "50%",
                            boxShadow: "0 4px 10px rgb(197, 80, 80)",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <FaTrash color="red" />
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ];

    const customStyles = {
        table: {
            style: {
                borderRadius: "12px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#fff",
            },
        },
        headRow: {
            style: {
                backgroundColor: "#133C55",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "bold",
                borderBottom: "2px solid #D9D9D9",
            },
        },
        rows: {
            style: {
                fontSize: "14px",
                backgroundColor: "#FAFAFA",
                borderBottom: "1px solid #D9D9D9",
                transition: "background-color 0.3s",
                "&:nth-of-type(even)": {
                    backgroundColor: "#F2F2F2",
                },
                "&:hover": {
                    backgroundColor: "#E8E8E8",
                },
            },
        },
        cells: {
            style: {
                padding: "12px",
                color: "#333333",
            },
        },
        pagination: {
            style: {
                borderRadius: "0px 0px 12px 12px",
                backgroundColor: "#F8F8F8",
                color: "#000",
                fontSize: "14px",
                fontWeight: "bold",
            },
        },
    };

    const handleDelete = async(id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'This will permanently delete the department.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });
    
        if (confirm.isConfirmed) {
            try {
                const response = await axios.delete(`http://localhost:8000/api/Subjects/Delete/${id}`);
    
                if (response.data.success) {
                    Swal.fire({
                        title: 'Deleted!',
                        text: response.data.msg || 'Course deleted successfully.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    // setDepartments(courses.filter(cour => cour.id !== id));
                    setCourses(courses.filter(subject => subject._id !== id));
                    // window.location.reload();
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: response.data.msg || 'Failed to delete the course.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            } catch (error) {
                console.error("Error deleting department:", error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong while deleting.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    };

    return (
        <Box className="dashboard-container">
            <Header setIsSidebarOpen={setSidebarOpen} />
            <Box className="content-wrapper">
                <Sidebar isOpen={isSidebarOpen} />
                <Box className={`dashboard-content ${isSidebarOpen ? "with-sidebar" : "without-sidebar"}`}>

                    <div className="container-fluid d-flex flex-column align-items-center vh-100 pt-3">
                        <div className="row w-100 h-100 d-flex justify-content-center">
                            <div className="col-lg-11 col-md-11 col-sm-12 mx-auto" style={{ maxWidth: "95%" }}>
                                <div className="card shadow-sm mb-3 p-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h2 className="m-0">Courses</h2>
                                        <button
                                            className="btn"
                                            style={{ backgroundColor: '#08415C', color: '#fff' }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#myModal"
                                        >
                                            Add Courses
                                        </button>
                                    </div>
                                </div>

                                <div className="card shadow-sm p-3">
                                    <DataTable columns={columns} data={courses} pagination customStyles={customStyles} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Add Course Modal */}
                    <div className="modal fade" id="myModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Add Course</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>

                                <div className="modal-body">
                                    <form method="POST" onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="coursename" className="form-label">Course Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="coursename"
                                                    placeholder="Course Name"
                                                    id="coursename"
                                                    value={courseName}
                                                    onChange={(e) =>{setCourseName(e.target.value)}}
                                                    required
                                                />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="department" className="form-label">Department</label>
                                                <select
                                                    className="form-select"
                                                    name="department"
                                                    id="department"
                                                    value={selectedDepartment}
                                                    onChange={(e) =>{setSelectedDepartment(e.target.value)}}
                                                    required
                                                >
                                                    <option value="">Select Department</option>
                                                    {departments.map((dept) => (
                                                        <option key={dept._id} value={dept._id}>{dept.name}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="hoursPerWeek" className="form-label">Hours Per Week</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="hoursPerWeek"
                                                    placeholder="Hours per week"
                                                    id="hoursPerWeek"
                                                    min="1"
                                                    max="40"
                                                    value={hoursPerWeek}
                                                    onChange={(e) =>{setHoursPerWeek(e.target.value)}}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    

                                    <div className="modal-footer d-flex justify-content-end">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Edit Course Modal */}
                    <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="editModalLabel">Edit Course</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>

                                <div className="modal-body">
                                    <form method="POST" onSubmit={handleSaveChanges}>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="editCoursename" className="form-label">Course Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="coursename"
                                                    id="editCoursename"
                                                    value={editCourseName}
                                                    onChange={(e)=>{setEditCourseName(e.target.value)}}
                                                    defaultValue={selectedRow?.course || ''}
                                                    required
                                                />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="editDepartment" className="form-label">Department</label>
                                                <select
                                                    className="form-select"
                                                    name="department"
                                                    id="editDepartment"
                                                    
                                                    onChange={(e)=>{setEditDepartment(e.target.value)}}
                                                    required
                                                >
                                                    <option value="">{editDepartment}</option>
                                                    {departments.map((dept) => (
                                                        <option key={dept._id} value={dept._id}>{dept.name}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="editHoursPerWeek" className="form-label">Hours Per Week</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="hoursPerWeek"
                                                    id="editHoursPerWeek"
                                                    Value={editHoursPerWeek}
                                                    onChange={(e)=>{setEditHoursPerWeek(e.target.value)}}
                                                    min="1"
                                                    max="40"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    

                                    <div className="modal-footer d-flex justify-content-end">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-primary">Save Changes</button>
                                    </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </Box>
            </Box>
        </Box>
    );
}

export default Courses;