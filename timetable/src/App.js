import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import './App.css';
import Login  from './Login/login';
import RegistrationForm from './Register/Register';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import Home from './Home/Dashboard';
import Students from './Students/Students';
import Teachers from './Teachers/Teachers';
import Courses from './Courses/Courses';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route path="/ForgotPassword" element={<ForgotPassword/>} />
        <Route path="/Register" element={<RegistrationForm/>} />
        <Route path="/Home" element={<Home/>} />
        <Route path="/Students" element={<Students/>} />
        <Route path="/Teachers" element={<Teachers/>}/>
        <Route path="/Courses" element={<Courses/>}/>
      </Routes>
        
        {/* Add more routes as needed */}
    </Router>
  );
}

export default App;
