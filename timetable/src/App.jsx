import logo from './assets/logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/js/bootstrap.bundle.min"; 
import './App.css';
import Login  from './Login/login';
import RegistrationForm from './Register/Register';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import Home from './Home/Dashboard';
import Students from './Students/Students';
import Teachers from './Teachers/Teachers';
import Courses from './Courses/Courses';
import Timeslot from './Timeslot/Timeslot';
import UserHome from './User/Home';
import Product from './Sample/ProductManagement';
import Department from './Department/Department';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<UserHome/>} />
        <Route path="/ForgotPassword" element={<ForgotPassword/>} />
        <Route path="/Register" element={<RegistrationForm/>} />
        <Route path="/Home" element={<Home/>} />
        <Route path="/Students" element={<Students/>} />
        <Route path="/Teachers" element={<Teachers/>}/>
        <Route path="/Courses" element={<Courses/>}/>
        <Route path="/Timeslots" element={<Timeslot/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Product" element={<Product/>}/>
        <Route path="/Department" element={<Department/>}/>
      </Routes>
        
        {/* Add more routes as needed */}
    </Router>
  );
}

export default App;
