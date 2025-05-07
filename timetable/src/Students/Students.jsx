import React, { useState,useEffect } from "react";
import Sidebar from "../Home/Sidebar";
import Header from "../Home/Header";
import { Box } from "@mui/material";
import Swal from 'sweetalert2';
import "../Home/AdminDashboard.css";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"; // Required for modal functionality
import Modal from 'bootstrap/js/dist/modal';
import { FaTrash } from "react-icons/fa"; // fror icons
import {  FaPen } from "react-icons/fa";
// import { Modal } from "bootstrap";
import axios from "axios";



const Students = () => {

	const [isSidebarOpen, setSidebarOpen] = useState(true);
	const [selectedRow, setSelectedRow] = useState(null);

	const [batchList, setBatchList] = useState([]);
	const [students, setStudents] = useState([]);
	const [selectedStudent, setSelectedStudent] = useState(null);


	
	useEffect(() => {
		const fetchData = async () => {
			try {
				const [batchRes, studentRes] = await Promise.all([
					axios.get('http://localhost:8000/api/batches'),
					axios.get('http://localhost:8000/api/Students'),
				]);

				console.log("Student Response:", studentRes.data);
				console.log("Batch Response:", batchRes.data);

				const batchList = Array.isArray(batchRes.data) ? batchRes.data : batchRes.data.batches || [];
        		const studentList = Array.isArray(studentRes.data.data) ? studentRes.data.data : [];
			
				console.log("studentList:",studentList);
				console.log("BatchList: ",batchList);
				const batchMap = {};
				batchList.forEach(batch => {
					batchMap[batch._id] = batch.name;
				});

				const enrichedStudents = studentList.map(student => ({
					...student,
					batchName: batchMap[student.batch] || "Unknown"
				}));

				setStudents(enrichedStudents);
				setBatchList(batchList);
				// console.log(students);
				// console.log(batchList);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []); // Empty dependency array to run once on mount


	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		year: "",
		rollNumber:"",
		batch: "",
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	// open the modal and set the selected row
	const handleEdit = (student) => {
		setSelectedStudent(student);
		setFormData({
			name: student.name || "",
			email: student.email || "",
			rollNumber: student.rollNumber || "",
			year: student.year || "",
			batch: student.batch || "",
			phone:student.phone || ""
		  });
		// console.log(selectedStudent);

		const modalElement = document.getElementById("editModal");
		
		const modal  = new Modal(modalElement);

		modal.show();
		
	  };

	  const handleAdd = async (e) => {
		e.preventDefault();
	
		try {
			const response = await axios.post("http://localhost:8000/api/students/Add", formData);
			
			// console.log("Student added:", response.data);
			if(response.data.success)
			{
				// Close the modal
				const modalElement = document.getElementById("myModal");
				const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
				modal.hide();

				// Reset the form
				setFormData({
					name: "",
					email: "",
					phone: "",
					year: "",
					rollNumber:"",
					batch: ""
				});
				setStudents([...students, response.data.Record]); // for add


				await Swal.fire({
					title: 'Success!',
					text: (response.data.msg),
					icon: 'success',
					confirmButtonText: 'OK'
				});
				// console.log(response.data.records,response.data.msg);

				
				window.location.reload();
				

			}
			else if(!(response.data.success))
			{
				await Swal.fire({
					title: 'Error!',
					text: (response.data.msg),
					icon: 'error',
					confirmButtonText: 'OK'
				});
			}
			
	
			
	
			// Refresh data if needed
		} catch (error) {
			Swal.fire({
				title: 'Error!',
				text: 'Insertion Failed.',
				icon: 'error',
				confirmButtonText: 'OK'
			});
		}
	};

	const handleEditForm = async (e) => {
		e.preventDefault();
	
		if (selectedStudent) {
		  try {
			const res = await axios.put(
			  `http://localhost:8000/api/Students/Edit/${selectedStudent._id}`,
			  formData
			);
			const updated = res.data.data;

			if(res.data.success)
			{
				setStudents((prev) =>
					prev.map((student) =>
					  student._id === selectedStudent._id ? { ...student, ...updated } : student
					)
				  );
				  setSelectedStudent(null);
				  setFormData({
					name: "",
					email: "",
					rollNumber: "",
					year: "",
					batch: "",
				  });

				const modalElement = document.getElementById("editModal");
				const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
				modal.hide();

				await Swal.fire({
					title: 'Success!',
					text: (res.data.msg),
					icon: 'success',
					confirmButtonText: 'OK'
				});
				// window.location.reload();
			}
			else
			{
				await Swal.fire({
					title: 'Error!',
					text: (res.data.msg),
					icon: 'error',
					confirmButtonText: 'OK'
				});
			}
		  } catch (error) {
			// console.log(error)
			Swal.fire({
				title: 'Error!',
				text: 'Edit Error.',
				icon: 'error',
				confirmButtonText: 'OK'
			});
		  }
		}
	  };

	  const handleDelete = async(id,name) => {
		try {
			// Optional: Add confirmation dialog
			
			const confirmResult = await Swal.fire({
				title: 'Are you sure?',
				text: `You want to delete ${name}'s record?`,
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it!'
			  });
		  
			  if (!confirmResult.isConfirmed) return;
		
			const response = await axios.delete(`http://localhost:8000/api/Students/Delete/${id}`);
		
			if (response.data.success) {
				setStudents((prev) => prev.filter(student => student._id !== id));

				await Swal.fire({
					title: 'Success!',
					text: (response.data.msg),
					icon: 'success',
					confirmButtonText: 'OK'
				});

				// window.location.reload();
			} 
			else {
				await Swal.fire({
					title: 'Error!',
					text: (response.data.msg),
					icon: 'error',
					confirmButtonText: 'OK'
				});
			}
		  } catch (error) {
			
			Swal.fire({
				title: 'Error!',
				text: (error),
				icon: 'error',
				confirmButtonText: 'OK'
			});
		  }
	};
	
	
	
	const clearForm=()=>{
		setSelectedStudent(null);
		setFormData(
			{
				name: "",
				email: "",
				phone: "",
				year: "",
				rollNumber:"",
				batch: "",
			}
		)
	}

	const columns = [
		
		{ name: "Name", selector: row => row.name, sortable: true },
		{ name: "Roll Number", selector: row => row.rollNumber, sortable: true },
		{ name: "Year", selector: row => row.year, sortable: true },
		{ name: "Batch", selector: row => row.batchName, sortable: true },
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
				onClick={() => handleDelete(row._id,row.name)}
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
						<h2 className="m-0">Students</h2>
						<button 
							className="btn"
							style={{backgroundColor:'#08415C',color:'#fff'}} 
							data-bs-toggle="modal"
							data-bs-target="#myModal"
							onClick={clearForm}
						>
							Add Students
						</button>
					</div>
					</div>
					
					{/* Data Table Card */}
					<div className="card shadow-sm p-3">
					<DataTable columns={columns} data={students} pagination customStyles={customStyles} />
					</div>
				</div>
				</div>
			</div>

			{/* Add Student Modal */}
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
						Add Students
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
						<form onSubmit={handleAdd} method="POST">
						<div className="row">
							{/* First Row - Two Inputs */}
							<div className="col-md-6 mb-3">
							<label htmlFor="name" className="form-label">
								Name
							</label>
							<input
								type="text"
								className="form-control"
								name="name"
								placeholder="Student Name"
								id="username"
								value={formData.name}
								onChange={handleChange}
							/>
							</div>

							<div className="col-md-6 mb-3">
							<label htmlFor="email" className="form-label">
								Email
							</label>
							<input
								type="email"
								className="form-control"
								name="email"
								placeholder="Student Email"
								id="email"
								value={formData.email}
								onChange={handleChange}
							/>
							</div>
						</div>

						<div className="row">
							{/* Second Row - Two More Inputs */}
							<div className="col-md-6 mb-3">
								<label htmlFor="rollNumber" className="form-label">Roll Number</label>
								<input
									type="text"
									className="form-control"
									name="rollNumber"
									placeholder="Student Roll Number"
									id="rollNumber"
									value={formData.rollNumber}
									onChange={handleChange}
								/>
							</div>

							<div className="col-md-6 mb-3">
							<label htmlFor="batch" className="form-label">Batch</label>
								<select
								name="batch"
								className="form-control"
								id="batch"
								value={formData.batch}
								onChange={handleChange}
								>
								<option value="">Select Batch</option>
								{batchList.map(batch => (
									<option key={batch._id} value={batch._id}>
									{batch.name}
									</option>
								))}
								</select>
							</div>
						</div>
						<div className="row">
							{/* Second Row - Two More Inputs */}
							<div className="col-md-6 mb-3">
							<label htmlFor="phone" className="form-label">
								Year
							</label>
							<input
								type="number"
								className="form-control"
								name="year"
								placeholder="Student Year"
								id="year"
								value={formData.year}
								onChange={handleChange}
							/>
							</div>
							<div className="col-md-6 mb-3">
							<label htmlFor="phone" className="form-label">
								Phone
							</label>
							<input
								type="text"
								className="form-control"
								name="phone"
								placeholder="Student Phone"
								id="phone"
								value={formData.phone}
								onChange={handleChange}
							/>
							</div>
						</div>

						{/* <div className="row">
							<div className="col-md-6 mb-3">
								<label htmlFor="appliedFor">Position Applied For </label>
								<select name="appliedFor" id="appliedFor" className="form-control">
									<option value="" >Select an option</option>
									<option value="Software Engineer">Software Engineer</option>
									<option value="Data Scientist">Data Scientist</option>
									<option value="Product Manager">Product Manager</option>
									<option value="DevOps Engineer">DevOps Engineer</option>
									<option value="Cloud Engineer">Cloud Engineer</option>
									<option value="Cyber Security Engineer">Cyber Security Engineer</option>
									<option value="Full Stack Developer">Full Stack Developer</option>
									<option value="Web Developer">Web Developer</option>
									<option value="Other">Other</option>
								</select>
							</div>
						</div> */}
						

					{/* Modal Footer with Buttons Aligned to End */}
					<div className="modal-footer d-flex justify-content-end">
						<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
						Close
						</button>
						<button type="submit" className="btn btn-primary">
						Submit
						</button>
						
					</div>
					</form>
					</div>
					
					</div>
					
				</div>
				
				</div>
				
			
				{/* Edit candidate Modal */}
				<div
				className="modal fade"
				id="editModal"
				tabIndex="-1"
				aria-labelledby="editModalLabel"
				aria-hidden="true"
				>
				<div className="modal-dialog modal-lg modal-dialog-centered">
					{/* Centered and Large Modal */}
					<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="editModal">
						Edit Candidate
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
						<form onSubmit={handleEditForm} method="POST">
						<div className="row">
							{/* First Row - Two Inputs */}
							<div className="col-md-6 mb-3">
							<label htmlFor="name" className="form-label">
								Name
							</label>
							<input
								type="text"
								className="form-control"
								name="name"
								placeholder="Student Name"
								id="username"
								value={formData.name}
								onChange={handleChange}
      						/>
							</div>

							<div className="col-md-6 mb-3">
							<label htmlFor="email" className="form-label">
								Email
							</label>
							<input
								type="email"
								className="form-control"
								name="email"
								placeholder="Student Email"
								id="email"
								value={formData.email}
								onChange={handleChange}/>
							</div>
						</div>

						<div className="row">
							{/* Second Row - Two More Inputs */}
							<div className="col-md-6 mb-3">
								<label htmlFor="rollNumber" className="form-label">Roll Number</label>
								<input
									type="text"
									className="form-control"
									name="rollNumber"
									placeholder="Student Roll Number"
									id="rollNumber"
									value={formData.rollNumber}
									onChange={handleChange}/>
							</div>

							<div className="col-md-6 mb-3">
							<label htmlFor="batch" className="form-label">Batch</label>
								<select
								name="batch"
								className="form-control"
								id="batch"
								value={formData.batch}
								onChange={handleChange}
								>
								<option value="">Select Batch</option>
								{batchList.map(batch => (
									<option key={batch._id} value={batch._id}>
									{batch.name}
									</option>
								))}
								</select>
							</div>
						</div>
						<div className="row">
							{/* Second Row - Two More Inputs */}
							<div className="col-md-6 mb-3">
							<label htmlFor="phone" className="form-label">
								Year
							</label>
							<input
								type="number"
								className="form-control"
								name="year"
								placeholder="Student Year"
								id="year"
								value={formData.year}
								onChange={handleChange}/>
							</div>
							<div className="col-md-6 mb-3">
							<label htmlFor="phone" className="form-label">
								Phone
							</label>
							<input
								type="text"
								className="form-control"
								name="phone"
								placeholder="Student Phone"
								id="phone"
								value={formData.phone}
								onChange={handleChange}/>
							</div>
						</div>
						

					{/* Modal Footer with Buttons Aligned to End */}
					<div className="modal-footer d-flex justify-content-end">
						<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
						Close
						</button>
						<button type="submit" className="btn btn-primary">
						Submit
						</button>
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
	};

	export default Students;