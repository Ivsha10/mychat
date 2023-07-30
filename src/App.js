import { useState } from "react";
import { Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import './index.css';
function App() {
  
  const [message, setMessage] = useState('');
  const fetchData = async () => {
  
  }
  fetchData();
  return (
    <div className="App" style={{color:'black'}}>
      <Header/>
      <Routes>
          <Route path="/" element ={<Home/>}/>
          <Route path="login" element={<LogIn/>}/>
          <Route path="signup" element={<SignUp/>}/>
      </Routes>
    </div>
  );
}

export default App;
