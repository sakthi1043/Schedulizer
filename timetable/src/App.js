import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import './App.css';
import Login  from './Login/login';
import RegistrationForm from './Register/Register';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import Home from './Home/Dashboard';
import Students from './Students/Students';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route path="/ForgotPassword" element={<ForgotPassword/>} />
        <Route path="/Register" element={<RegistrationForm/>} />
        <Route path="/Home" element={<Home/>} />
        <Route path="/Students" element={<Students/>} />
      </Routes>
        
        {/* Add more routes as needed */}
    </Router>
  );
}

export default App;
