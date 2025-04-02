import 'bootstrap/dist/css/bootstrap.min.css';
import React,{useState} from 'react';
import Swal from 'sweetalert2';
import styles from './Register.module.css'
import { useNavigate,Link } from 'react-router-dom';
import axios from "axios";

import timeImage from '../Images/2.jpg'; // Make sure to import your logo image

const RegistrationForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('Student'); // Default is Student
    const [dob, setDob] = useState(''); // Date of Birth state
    const [phone, setPhone] = useState(''); // Phone Number state
    const [email, setEmail] = useState(''); // Email state
    const [error, setError] = useState(''); // Error message state
    const [type,setType]=useState('User');
    const navigate=useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message

        // Name validation (only alphabetic characters and spaces)
        if (!/^[a-zA-Z\s]+$/.test(username)) {
        setError('Name should only contain letters and spaces.');
        return;
        }

        // Password validation
        if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(password)) {
        setError('Password must be between 8-16 characters and contain at least one letter, one digit, and one special character.');
        return;
        }

        // Confirm password validation
        if (password !== confirmPassword) {
        setError("Passwords don't match!");
        return;
        }

        // Date of Birth validation
        const currentYear = new Date().getFullYear();
        const selectedYear = new Date(dob).getFullYear();
        if (selectedYear >= currentYear) {
        setError('Date of birth cannot be in the current year or later.');
        return;
        }

        // Phone validation
        if (!/^[0-9]{10}$/.test(phone)) {
        setError('Please enter a valid 10-digit phone number.');
        return;
        }

        // Email validation
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        setError('Please enter a valid email address.');
        return;
        }

        try
        {
          const response=await axios.post("http://localhost:8000/api/auth/register",{
            name:username,email:email,phoneno:phone,password:password,dob:dob,type:type,role:role});
          

          if(response.data.success)
          {
            Swal.fire({
              title: 'Success!',
              text: 'Registered Successfully',
              icon: 'success',
              confirmButtonText: 'OK'
            });
            navigate('/');
          }
          else if(!(response.data.success))
          {
            Swal.fire({
              title: 'Error!',
              text: 'Registration Failed',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        }
        catch
        {
          Swal.fire({
            title: 'Error!',
            text: 'Login failed.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
    };
  
    return (
      <div className={styles.RegisterBody}>
      <div className=" container d-flex justify-content-center align-items-center vh-100">
        {/* Card */}
        <div className="card shadow-lg" style={{ maxWidth: '900px' }}>
          <div className="row">
            <div className="col-md-5">
              {/* Site logo */}
              <img 
                style={{ maxWidth: '100%' }}
                src={timeImage}
                className="img-fluid w-100 h-100"
                alt="image desc"
              />
              {/* logo end */}
            </div>
            <div className="col-md-7 p-4">
              <h1 className="text-center mb-4"><strong>Registration</strong></h1>
              {/* Registration form */}
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input 
                      className="form-control rounded" 
                      type="text" 
                      name="username" 
                      id="user" 
                      placeholder="Enter your name" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input 
                      className="form-control rounded" 
                      type="email" 
                      name="email" 
                      id="email" 
                      placeholder="Enter your email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                </div>
  
                {/* Date of Birth Field */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input 
                      className="form-control rounded" 
                      type="date" 
                      name="dob" 
                      id="dob" 
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      required
                    />
                  </div>
                {/* </div> */}
  
                {/* Phone Number Field */}
                {/* <div className="row"> */}
                  <div className="col-md-6 mb-3">
                    <input 
                      className="form-control rounded" 
                      type="text" 
                      name="phone" 
                      id="phone" 
                      placeholder="Enter your phone number" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>
  
                
  
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input 
                      className="form-control rounded" 
                      type="password" 
                      name="p" 
                      id="pass" 
                      placeholder="Enter your password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input 
                      className="form-control" 
                      type="password" 
                      name="cp" 
                      id="cpass" 
                      placeholder="Confirm Password" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <div className="form-check">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            name="role" 
                            id="teacher" 
                            value="Teacher"
                            checked={role === 'Teacher'}
                            onChange={(e) => setRole(e.target.value)}
                        />
                        <label className="form-check-label" htmlFor="teacher">
                            Teacher
                        </label>
                        </div>
                        <div className="form-check">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            name="role" 
                            id="student" 
                            value="Student" 
                            checked={role === 'Student'}
                            onChange={(e) => setRole(e.target.value)}
                        />
                        <label className="form-check-label" htmlFor="student">
                            Student
                        </label>
                        </div>
                    </div>
                </div>
                {/* Error Message */}
                {error && <div className="alert alert-danger">{error}</div>}
                <center>
                  <button type="submit" className="btn btn-primary mb-3">Register</button>
                </center>
              </form>
              {/* End Registration form */}
            </div>
          </div>
        </div>
        {/* Card end */}
      </div>
      </div>
    );
  };
  
  export default RegistrationForm;