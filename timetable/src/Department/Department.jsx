import React, { useState } from "react";
import Sidebar from "../Home/Sidebar";
import Header from "../Home/Header";
import { Box } from "@mui/material";
import "../Home/AdminDashboard.css";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { FaTrash, FaPen } from "react-icons/fa";
import { Modal } from "bootstrap";
import Swal from 'sweetalert2';
import axios  from "axios";

const Department = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [selectedRow, setSelectedRow] = useState(null);

    const [departmentName, setDepartmentName] = useState("");
    const [departmentCode, setDepartmentCode] = useState("");

    const [departments, setDepartments] = useState([
        { id: 1, name: "Computer Science", code: "CSE" },
        { id: 2, name: "Electrical Engineering", code: "EEE" },
        { id: 3, name: "Mechanical Engineering", code: "ME" },
        { id: 4, name: "Civil Engineering", code: "CE" },
        { id: 5, name: "Business Administration", code: "BA" }
    ]);

    const handleEdit = (row) => {
        setSelectedRow(row);
        const modalElement = document.getElementById("editModal");
        const modal = new Modal(modalElement);
        modal.show();
    };

    const handleDelete = (id) => {
        alert(`Deleting department with ID ${id}`);
    };

    const handleAdd = async (e) => {
            e.preventDefault();
        
            if (!departmentName.trim() || !departmentCode.trim()) {
                // alert();
                await Swal.fire({
                    title: 'Error!',
                    text: ("Please enter both department name and code."),
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                return;
            }
    
            try {
                const response = await axios.post("http://localhost:8000/api/Products/add", {
                    name: departmentName,
                    code: departmentCode,
                });
    
                if (response.data.success) {
                    await Swal.fire({
                        title: 'Success!',
                        text: (response.data.msg),
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    setDepartmentName("");
                    setDepartmentCode("");
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
                console.error("Error adding department:", error);
                await Swal.fire({
                    title: 'Error!',
                    text: ("Failed to add department."),
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        };



    const columns = [
        { name: "Id", selector: (row) => row.id, sortable: true },
        { name: "Department Name", selector: (row) => row.name, sortable: true },
        { name: "Department Code", selector: (row) => row.code, sortable: true },
        {
            name: "Actions",
            cell: (row) => (
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
                        }}
                    >
                        <FaPen color="green" />
                    </button>
                    <button
                        onClick={() => handleDelete(row.id)}
                        style={{
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
                                        <h2 className="m-0">Departments</h2>
                                        <button
                                            className="btn"
                                            style={{ backgroundColor: '#08415C', color: '#fff' }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#myModal"
                                        >
                                            Add Department
                                        </button>
                                    </div>
                                </div>

                                <div className="card shadow-sm p-3">
                                    <DataTable columns={columns} data={departments} pagination customStyles={customStyles} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Add Department Modal */}
                    <div className="modal fade" id="myModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Add Department</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>

                                <div className="modal-body">
                                    <form method="POST" onSubmit={handleAdd}>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="departmentName" className="form-label">Department Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="departmentName"
                                                    name="name"
                                                    placeholder="Enter Department Name"
                                                    value={departmentName}
                                                    onChange={(e)=>{setDepartmentName(e.target.value)}}
                                                    required
                                                />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="departmentCode" className="form-label">Department Code</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="departmentCode"
                                                    name="code"
                                                    placeholder="Enter Department Code"
                                                    value={departmentCode}
                                                    onChange={(e)=>{setDepartmentCode(e.target.value)}}
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

                    {/* Edit Department Modal */}
                    <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="editModalLabel">Edit Department</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>

                                <div className="modal-body">
                                    <form>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="editDepartmentName" className="form-label">Department Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="editDepartmentName"
                                                    name="name"
                                                    defaultValue={selectedRow?.name || ''}
                                                    required
                                                />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="editDepartmentCode" className="form-label">Department Code</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="editDepartmentCode"
                                                    name="code"
                                                    defaultValue={selectedRow?.code || ''}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                <div className="modal-footer d-flex justify-content-end">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary">Save Changes</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </Box>
            </Box>
        </Box>
    );
}

export default Department;
