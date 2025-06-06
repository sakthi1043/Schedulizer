import 'bootstrap/dist/css/bootstrap.min.css';
import React,{useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import timeImage from '../Images/pngtree-time-clock-schedule-vector-png-image_15861573.png'; // Make sure to import your logo image
import styles from './login.module.css';
import 'animate.css'; // Import Animate.css
import WOW from 'wow.js'; // Import Wow.js
import axios from "axios";

function Login() {

  

  const[username,setUsername]=React.useState('');
  const[password,setPassword]=React.useState('');
  const navigate=useNavigate();

  const handleLogin= async (e)=>{
    e.preventDefault();
      try
      {
        const response=await axios.post("http://localhost:8000/api/auth/login",{name:username,password:password});

        if(response.data.success)
        {
          Swal.fire({
            title: 'Success!',
            text: (response.data.message),
            icon: 'success',
            confirmButtonText: 'OK'
          });
          navigate('/Home');
        }
        else if(!(response.data.success))
        {
          Swal.fire({
            title: 'Error!',
            text: (response.data.message),
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      }
      catch(error)
      {
        Swal.fire({
          title: 'Error!',
          text: 'Login failed.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }

      // if(username=='sakthi' && password=='sakthi@1043'){
      //     Swal.fire({
      //       title: 'Success!',
      //       text: 'Login Successfully',
      //       icon: 'success',
      //       confirmButtonText: 'OK'
      //     });
      //     navigate('/Home');
      //   }
      // else
      // {
      //   Swal.fire({
      //     title: 'Error!',
      //     text: 'User name or password is incorrect.',
      //     icon: 'error',
      //     confirmButtonText: 'OK'
      //   });
      // }
    }


    useEffect(() => {
      const wow = new WOW({
        live: false, // Prevents live DOM elements from triggering animations
      });
      wow.sync(); // Manually trigger the animation
      wow.init(); // Initialize WOW.js
    }, []);
    
    

  return (

    
    <div className={styles.loginHome}>
    <div className="container d-flex justify-content-center align-items-center vh-100"  data-wow-offset="200" data-wow-duration="3s">
      
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
    </div>
    // End of container
  );
}

export default Login;
