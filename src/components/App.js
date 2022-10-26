import React, { useState, useEffect } from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Activities from "./Activities";
import Login from "./Login";
import MyRoutines from "./MyRoutines";
import Routines from "./Routines";
import Register from "./Register";

const baseUrl = "https://safe-mountain-44229.herokuapp.com/api";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(
    window.localStorage.getItem("token") || ""
  );

  useEffect(() => {
    window.localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="bg-light">
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
          <div className="container-fluid">
            <h1 className="navbar-brand fs-1">Fitness Trac.kr</h1>
            <div
              className="collapse navbar-collapse show"
              id="navbarNavAltMarkup"
            >
              <div className="navbar-nav">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
                <NavLink to="/Routines" className="nav-link">
                  Routines
                </NavLink>
                <NavLink to="/Activities" className="nav-link">
                  Activities
                </NavLink>
                <NavLink to="/MyRoutines" className="nav-link">
                  My Routines
                </NavLink>
                <NavLink to="/Login" className="nav-link">
                  Login
                </NavLink>
                <NavLink to="/Register" className="nav-link">
                  Register
                </NavLink>
              </div>
            </div>
          </div>
        </nav>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Routines" element={<Routines />} />
            <Route path="/Activities" element={<Activities />} />
            <Route path="/MyRoutines" element={<MyRoutines />} />
            <Route
              path="/Login"
              element={
                <Login
                  username={username}
                  setUsername={setUsername}
                  password={password}
                  setPassword={setPassword}
                  token={token}
                  setToken={setToken}
                  baseUrl={baseUrl}
                />
              }
            />
            <Route
              path="/Register"
              element={
                <Register
                  username={username}
                  setUsername={setUsername}
                  password={password}
                  setPassword={setPassword}
                  token={token}
                  setToken={setToken}
                  baseUrl={baseUrl}
                />
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
