import { useState } from "react";
import { Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import Chat from "./Chat";
import './index.css';
function App() {
  
  const [accessToken, setAccessToken] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [user, setUser] = useState();

  return (
    <div className="App" style={{color:'black'}}>
      <Header accessToken = {accessToken} setAccessToken={setAccessToken}/>
      <Routes>
          <Route path="/" element ={<Home accessToken={accessToken}/>}/>
          <Route path="login" element={<LogIn accessToken = {accessToken} setAccessToken={setAccessToken} setCurrentUser={setCurrentUser} setUser={setUser}/>}/>
          <Route path="signup" element={<SignUp/>}/>
          <Route path="chat" element={<Chat accessToken={accessToken} currentUser={currentUser} setCurrentUser={setCurrentUser} user={user} setAccessToken={setAccessToken}/>}/>
      </Routes>
    </div>
  );
}

export default App;
