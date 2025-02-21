import 'bootstrap/dist/css/bootstrap.min.css';

import './ForgotPassword.module.css';
import React from 'react';
import timeImage from '../Images/pngtree-time-clock-schedule-vector-png-image_15861573.png'; // Make sure to import your logo image


function ForgotPassword(){
    // const [count, setCount] = React.useState(10);
    
    return(
        <>
        {/* <h1>{count}</h1> */}
       <div className="container d-flex justify-content-center align-items-center vh-100 forgotBody">
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
          <strong>Forgot Password</strong>
        </h1>
            {/* <!--Form --> */}
            {/* <form action="" method="POST" id="forgot"> */}
                <div className="row mb-3 ">
                    <div className="col-md-12 mb-3 input-group">
                        
                        <input 
                            className="form-control rounded" 
                            type="text" name="username" 
                            id="user" 
                            placeholder="Username"
                        />
                        <br/>
                    </div>
                    <div className="col-md-12 mb-3">
                        
                        <input 
                            className="form-control" 
                            type="password" 
                            name="p" 
                            id="pass" 
                            placeholder="Password"
                        />
                        <br/>
                    </div>
                    <div className="col-md-12 mb-3">
                        
                        <input 
                            className="form-control" 
                            type="password" 
                            name="cp" 
                            id="cpass" 
                            placeholder="Confirm Password"
                        />
                        <br/>
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary" >Update</button>
                    
                </div>
                <div className="row text-center">
                    <p>Back to <a href="./login.html" style={{textDecoration: 'none'}}>login</a></p>
                </div>
            {/* </form> */}
            {/* <!--Form end--> */}
        </div>
        {/* <!--Card end--> */}
    </div>
        </>
    )
}

export default ForgotPassword;