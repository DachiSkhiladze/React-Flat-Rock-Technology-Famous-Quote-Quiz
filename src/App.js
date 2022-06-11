import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import Signup from "./SignUp";
import SignIn from "./SignIn"
import Quiz from "./Quiz"
import Settings from "./Settings"
import React, { useEffect, useState } from 'react';
import UserManagement from "./UserManagement.js"
import History from "./History.js"
import QuoteManagement from "./QuoteManagement.js"
import InsertBinaryQuestion from "./InsertBinaryQuestion.js"
import InsertMultipleChoiceQuestion from "./InsertMultipleChoiceQuestion.js"

function App() {
  const [type, setType] = useState('BinaryQuestions');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const checkConnection = async () => {
    var jwd = localStorage.getItem('token');
    if(jwd === ''){
      setIsSignedIn(false);
      return;
    }
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwd}`}
    };
    var url = `https://localhost:7120/User/CheckIfUserAuthorized`;
    const response = await fetch(url, requestOptions);
    console.log(response);
    if(response.status === 200){
      setIsSignedIn(true);
    }
    else{
      setIsSignedIn(false);
    }
    return true;
  }

  const checkAdminConnection = async () => {
    var jwd = localStorage.getItem('token');
    if(jwd === ''){
      setAdmin(false);
      return;
    }
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwd}`}
    };
    var url = 'https://localhost:7120/User/CheckIfAdminAuthorized';
    const response = await fetch(url, requestOptions);
    console.log(response);
    if(response.status === 200){
      setAdmin(true);
    }
    else{
      setAdmin(false);
    }
    return true;
  }

  useEffect(() => {
    checkConnection();
    checkAdminConnection();
  }, []);
  if(isAdmin == true){
    return (
      <BrowserRouter>
        <Routes> 
          <Route path="/" element={<Layout isSignedIn = {isSignedIn} isAdmin = {isAdmin}/>}>
            <Route index element={<Home />} />
            <Route path="History/:id" element={<History/>} />
            <Route path="InsertBinaryQuestion" element={<InsertBinaryQuestion/>} />
            <Route path="InsertMultipleChoiceQuestion" element={<InsertMultipleChoiceQuestion/>} />
            <Route path="UserManagement" element={<UserManagement />} />
            <Route path="QuoteManagement" element={<QuoteManagement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
  else if(isSignedIn){
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout isSignedIn = {isSignedIn} setIsSignedIn = {setIsSignedIn}/>}>
          <Route index element={<Home />} />
          <Route path="Settings" element={<Settings type = {type} 
                                            setType = {setType}/>} />
            <Route path="quiz" element={<Quiz type = {type}/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
  else{
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout isSignedIn = {isSignedIn} setIsSignedIn = {setIsSignedIn}/>}>
            <Route index element={<Home />} />
            <Route path="signup" element={<Signup />} />
            <Route path="signin" element={<SignIn checkAdminConnection = {checkAdminConnection} setAdmin = {setAdmin} setIsSignedIn = {setIsSignedIn}/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}


export default App;