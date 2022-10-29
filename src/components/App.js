import React, { useState, useEffect } from "react";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Home";
import Activities from "./Activities";
import Login from "./Login";
import MyRoutines from "./MyRoutines";
import Routines from "./Routines";
import Register from "./Register";
import CreateRoutine from "./CreateRoutine";
import CreateActivity from "./CreateActivity";

const baseUrl = "https://safe-mountain-44229.herokuapp.com/api";

const App = () => {
  const [username, setUsername] = useState("");
  const [routines, setRoutines] = useState([]);
  const [myRoutines, setMyRoutines] = useState([]);
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState("");

  const [token, setToken] = useState(
    window.localStorage.getItem("token") || ""
  );
  const navigate = useNavigate();

  const getUsername = async () => {
    const response = await fetch(baseUrl + "/users/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    setUsername(data.username);
  };

  const getRoutines = async () => {
    const response = await fetch(baseUrl + "/routines", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    setRoutines(data);
  };

  const getActivities = async () => {
    const response = await fetch(baseUrl + "/activities", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    setActivities(data);
  };

  useEffect(() => {
    getActivities();
  }, [token]);

  useEffect(() => {
    getRoutines();
  }, [token]);

  useEffect(() => {
    getActivities()
  }, [token])

  useEffect(() => {
    token && getUsername();
    window.localStorage.setItem("token", token);
  }, [token]);

  const handleLogout = () => {
    setToken("");
    setUsername("");

    navigate("/Routines");
  };

  const handleDelete = async (routineId) => {
    try {
      const response = await fetch(baseUrl + `/routines/${routineId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      await response.json();

      setMyRoutines((prev) =>
        prev.filter((r) => {
          return r.id !== routineId;
        })
      );

      setRoutines((prev) =>
        prev.filter((r) => {
          return r.id !== routineId;
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-light">
      <nav className="navbar navbar-expand-lg navbar-light bg-primary sticky-top">
        <div className="container-fluid">
          <h1 className="navbar-brand fs-1 text-light">Fitness Trac.kr</h1>
          <div className="collapse navbar-collapse show">
            <div className="navbar-nav">
              <NavLink to="/" className="nav-link text-light">
                Home
              </NavLink>
              <NavLink to="/Routines" className="nav-link text-light">
                Routines
              </NavLink>
              <NavLink to="/Activities" className="nav-link text-light">
                Activities
              </NavLink>
              {token && (
                <NavLink to="/MyRoutines" className="nav-link text-light">
                  My Routines
                </NavLink>
              )}
              {!token && (
                <NavLink to="/Login" className="nav-link text-light">
                  Login
                </NavLink>
              )}
              {!token && (
                <NavLink to="/Register" className="nav-link text-light">
                  Register
                </NavLink>
              )}
            </div>
          </div>
        </div>
        {token && (
          <button
            type="button"
            className="btn btn-dark me-3"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </nav>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Routines" element={<Routines routines={routines} />} />
          <Route
            path="/Activities"
            element={<Activities activities={activities} token={token} />}
          />
          <Route
            path="/MyRoutines"
            element={
              <MyRoutines
                username={username}
                token={token}
                baseUrl={baseUrl}
                handleDelete={handleDelete}
                myRoutines={myRoutines}
                setMyRoutines={setMyRoutines}
              />
            }
          />
          <Route
            path="/Login"
            element={<Login setToken={setToken} baseUrl={baseUrl} error={error} setError={setError} />}
          />
          <Route
            path="/Register"
            element={<Register setToken={setToken} baseUrl={baseUrl} error={error} setError={setError} />}
          />
          <Route
            path="/CreateRoutine"
            element={
              <CreateRoutine
                baseUrl={baseUrl}
                token={token}
                setRoutines={setRoutines}
              />
            }
          ></Route>
          <Route
            path="/CreateActivity"
            element={
              <CreateActivity
                baseUrl={baseUrl}
                token={token}
                setActivities={setActivities}
                activities={activities}
                error={error}
                setError={setError}
              />
            }
          ></Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
