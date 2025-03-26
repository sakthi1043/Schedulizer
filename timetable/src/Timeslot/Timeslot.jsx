import React, { useState,useEffect } from "react";
import Sidebar from "../Home/Sidebar";
import Header from "../Home/Header";
import { Box, duration } from "@mui/material";
import "../Home/AdminDashboard.css";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"; // Required for modal functionality
import { FaTrash } from "react-icons/fa"; // fror icons
import {  FaPen } from "react-icons/fa";
import { Modal } from "bootstrap";
import { TimePicker } from 'react-time-picker';


const Timeslot = () => {
    const currentDate = new Date(); // or some appropriate value
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [selectedRow, setSelectedRow] = useState(null);

    const [StartTime, setStartTime] = useState();
    const [EndTime, setEndTime] = useState();

    const handleTimeChange = (time) => {
        if (time) setStartTime(time);
    };
    

    
    

// useEffect(() => {
//         setStartTime(currentDate);
//         setEndTime(currentDate);
//     }, []);

    // open the modal and set the selected row
    const handleEdit = (row) => {
        setSelectedRow(row);
        // console.log(row);

        const modalElement = document.getElementById("editModal");
        
        const modal  = new Modal(modalElement);

        modal.show();

      };

    const columns = [
        { name: "Id", selector: (row) => row.id, sortable: true },
        { name: "Course Id", selector: (row) => row.courseId, sortable: true },
        { name: "Day", selector: (row) => row.day, sortable: true },
        { name: "Start Time", selector: (row) => row.start, sortable: true },
        { name: "End Time", selector: (row) => row.end, sortable: true },
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
                    borderRadius: "50%", // Makes it round
                    boxShadow:"0 4px 10px rgb(123, 199, 61)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "box-shadow 0.3s ease-in-out",
                    }}
                >
                <FaPen color="green" />
                </button>
                <button
                onClick={() => handleDelete(row.id)}
                style={{
                    marginRight: "10px",
                    cursor: "pointer",
                    border: "none",
                    background: "transparent",
                    padding: "8px",
                    borderRadius: "50%", // Makes it round
                    boxShadow: "0 4px 10px rgb(197, 80, 80)", // Shadow effect
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                >
                <FaTrash  color="red"/>
                </button>
            </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
        
    ];


    const data = [
        { id: 1, courseId:"c01", day: "Monday",start: "9:50 AM",end:"10:40 AM"},
        { id: 2, courseId:"c01", day: "Monday",start: "11:00 AM",end:"11:50 AM"},
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


    
    
    const handleDelete = (id) => {
        alert(`Deleting record with ID ${id}`);
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
                    {/* Title Card */}
                    <div className="card shadow-sm mb-3 p-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <h2 className="m-0">Timeslots</h2>
                        <button 
                            className="btn"
                            style={{backgroundColor:'#08415C',color:'#fff'}} 
                            data-bs-toggle="modal"
                            data-bs-target="#myModal"
                        >
                            Add Timeslots
                        </button>
                    </div>
                    </div>

                    {/* Data Table Card */}
                    <div className="card shadow-sm p-3">
                    <DataTable columns={columns} data={data} pagination customStyles={customStyles} />
                    </div>
                </div>
                </div>
            </div>

            {/* Add candidate Modal */}
            <div
                className="modal fade"
                id="myModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                >
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    {/* Centered and Large Modal */}
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                        Add Courses
                        </h5>
                        <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        ></button>
                    </div>

                    {/* Modal Body */}
                    <div className="modal-body">
                        <form>
                        <div className="row">
                        {/* First Row - Course ID */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="courseid" className="form-label">
                            Course ID
                            </label>
                            <input
                            type="text"
                            className="form-control"
                            name="courseid"
                            placeholder="Course ID"
                            id="courseid"
                            />
                        </div>

                        {/* Second Row - Day Select */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="day" className="form-label">
                            Day
                            </label>
                            <select
                            className="form-control"
                            name="day"
                            id="day"
                            >
                            <option value="">Select Day</option>
                            <option value="monday">Monday</option>
                            <option value="tuesday">Tuesday</option>
                            <option value="wednesday">Wednesday</option>
                            <option value="thursday">Thursday</option>
                            <option value="friday">Friday</option>
                            </select>
                        </div>
                        </div>

                        <div className="row">
                        {/* First Row - Start Time Picker */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="startTime" >Start Time (e.g., 10:00 am)</label><br />
                            <input
                                type="text"
                                id="startTime"
                                value={StartTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                placeholder="e.g., 10:00 am"
                                className="form-control"
                                style={{ width: '100%', height: '35px' }}
                            />
                        </div>

                        {/* End Time Text Box */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="endTime" >End Time (e.g., 10:00 am)</label><br />
                            <input
                                type="text"
                                id="endTime"
                                value={EndTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                placeholder="e.g., 10:00 am"
                                className="form-control"
                                style={{ width: '100%', height: '35px' }}
                            />
                        </div>


                        </div>
                        </form>
                    </div>

                    {/* Modal Footer with Buttons Aligned to End */}
                    <div className="modal-footer d-flex justify-content-end">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                        Close
                        </button>
                        <button type="button" className="btn btn-primary">
                        Submit
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            
                {/* Edit candidate Modal */}
                <div
                className="modal fade"
                id="editModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                >
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    {/* Centered and Large Modal */}
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="editModal">
                        Edit Timeslot
                        </h5>
                        <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        ></button>
                    </div>

                    {/* Modal Body */}
                    {/* Modal Body */}
                    <div className="modal-body">
                        <form>
                        <div className="row">
                            {/* First Row - Two Inputs */}
                            <div className="col-md-6 mb-3">
                            <label htmlFor="coursename" className="form-label">
                                Course Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="coursename"
                                placeholder="Course Name"
                                id="coursename"
                            />
                            </div>

                            <div className="col-md-6 mb-3">
                            <label htmlFor="email" className="form-label">
                                Course Duration
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="duration"
                                placeholder="Course Duration"
                                id="duration"
                            />
                            </div>
                        </div>
                        </form>
                    </div>

                    {/* Modal Footer with Buttons Aligned to End */}
                    <div className="modal-footer d-flex justify-content-end">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                        Close
                        </button>
                        <button type="button" className="btn btn-primary">
                        Submit
                        </button>
                    </div>
                    </div>
                </div>
                </div>


            </Box>
        </Box>
        </Box>
    );
}

export default Timeslot;
