import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import timeImage from '../Images/pngtree-time-clock-schedule-vector-png-image_15861573.png'; // Make sure to import your logo image
import './login.module.css';

function Login() {
  const[username,setUsername]=React.useState('');
  const[password,setPassword]=React.useState('');
  const navigate=useNavigate();

  const handleLogin=(e)=>{
    e.preventDefault();
      if(username=='sakthi' && password=='sakthi@1043'){
          Swal.fire({
            title: 'Success!',
            text: 'Login Successfully',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          navigate('/Home');
        }
      else
      {
        Swal.fire({
          title: 'Error!',
          text: 'User name or password is incorrect.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }


  return (
    
    <div className="loginHome container d-flex justify-content-center align-items-center vh-100 ">
      
      {/* Card */}
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '400px' }}>
        {/* Site logo */}
        <picture>
          {/* <source srcSet="{timeImage}" type="image/svg+xml" /> */}
          <img
            src={timeImage}
            alt="Site Logo"
            style={{ maxHeight: '200px' }}
            className="img-fluid mx-auto d-block rounded mb-2"
          />
        </picture>
        {/* End of site logo */}
        
        <h1 className="text-center mb-3">
          <strong>Login</strong>
        </h1>
        
        {/* Form */}
        <form onSubmit={handleLogin} method='POST'>
          <div className="row mb-3">
            <div className="col-md-12 mb-3 input-group">
              <input
                className="form-control rounded"
                type="text"
                name="username"
                id="user"
                pattern="[a-zA-Z ]{3,15}"
                value={username}
                onChange={(e)=>{setUsername(e.target.value)}}
                placeholder="Username"
                required
              />
              <br />
            </div>
            <div className="col-md-12 mb-3">
              <input
                className="form-control"
                type="password"
                name="p"
                id="pass"
                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$"
                placeholder="Password"
                onChange={(e)=>{setPassword(e.target.value)}}
                required
              />
              <br />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>

          <div className="row text-center">
            <p>
              Don't have an account?{' '}
              {/* <a href="./Register.html" style={{ textDecoration: 'none' }}>
                Register
              </a> */}
              <Link to="/Register" style={{textDecoration:"none"}}>Register</Link>
            </p>
            <p>
              {/* <a href="./ForgotPassword.html" style={{ textDecoration: 'none' }}>
                Forgot Password
              </a> */}
              <Link to="/ForgotPassword" style={{textDecoration:"none"}}>Forgot Password</Link>
            </p>
          </div>
        </form>
        {/* End of form */}
      </div>
      {/* End of card */}
    </div>
    // End of container
  );
}

export default Login;
