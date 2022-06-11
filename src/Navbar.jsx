import React from "react";
import { Link } from "react-router-dom";

function Navbar({isSignedIn, isAdmin}) {
  const handleSubmit = (e) => {
    localStorage.setItem('token', '');
   // setIsSignedIn(false);
    window.location = '/SignIn';
  };
  if(isAdmin){
    return (
      <nav className="Header">
        <ul className="HeaderContainer">
          <li>
            <button className="btn" type="submit">
              <Link to="/UserManagement">User Management</Link>
            </button>
          </li>
          <li>
            <button className="btn" type="submit">
              <Link to="/QuoteManagement">Quote Management</Link>
            </button>
          </li>
          <li>
            <button onClick={handleSubmit} className="btn" type="submit">
            Log Out
            </button>
          </li>
        </ul>
      </nav>
    );
  }
  else if(isSignedIn){
    return (
      <nav className="Header">
        <ul className="HeaderContainer">
          <li>
             <button className="btn" type="submit">
                <Link to="/Settings">Settings</Link>
              </button>
          </li>
          <li>
             <button className="btn" type="submit">
                <Link to="/Quiz">Quiz</Link>
              </button>
          </li>
          <li>
            <button onClick={handleSubmit} className="btn" type="submit">
            Log Out
            </button>
          </li>
        </ul>
      </nav>
    );
  }
  else{
    return (
      <nav className="Header">
        <ul className="HeaderContainer">
          <li>
            <button className="btn" type="submit">
                <Link to="/SignUp">Sign Up</Link>
            </button>
          </li>
          <li>
            <button className="btn" type="submit">
              <Link to="/SignIn">Sign In</Link>
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;