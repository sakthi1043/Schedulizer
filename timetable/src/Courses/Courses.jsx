import React, { useState } from "react";
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

const Courses = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
	const [selectedRow, setSelectedRow] = useState(null);

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
		{ name: "Course Name", selector: (row) => row.course, sortable: true },
		{ name: "Duration", selector: (row) => row.duration, sortable: true },
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
		{ id: 1, course: "Mca",duration: "45 mins"},
		{ id: 2, course: "Be Cs", duration: "45 mins" },
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
						<h2 className="m-0">Courses</h2>
						<button 
							className="btn"
							style={{backgroundColor:'#08415C',color:'#fff'}} 
							data-bs-toggle="modal"
							data-bs-target="#myModal"
						>
							Add Courses
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
						Edit Course
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

export default Courses
