import React, { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

const MyRoutines = ({
  username,
  token,
  baseUrl,
  handleDelete,
  myRoutines,
  setMyRoutines,
}) => {
  if (!token) {
    return <Navigate to="/Login" replace />;
  }

  const getMyRoutines = async () => {
    try {
      const response = await fetch(baseUrl + `/users/${username}/routines`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      setMyRoutines(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    username && getMyRoutines();
  }, [username]);

  return (
    <div>
      <Link
        to="/CreateRoutine"
        className="d-flex justify-content-end me-3 mt-3"
      >
        Create Routine
      </Link>
      <h1 className="mt-3 d-flex justify-content-center">My Routines</h1>
      {myRoutines.map((routine) => (
        <div key={routine.id}>
          <div className="card m-3">
            <div className="card-body">
              <h4 className="card-title">{routine.name}</h4>
              <h6 className="card-subtitle mb-2 mt-2 text-muted">
                Creator Name: {routine.creatorName}
              </h6>
              <p className="card-text">Goal: {routine.goal}</p>
              {routine.isPublic ? (
                <p className="card-text">Public: True</p>
              ) : (
                <p className="card-text">Public: False</p>
              )}
              {routine.activities.length > 0 && <h4>Activities:</h4>}
              {routine.activities.map((activity) => (
                <div key={activity.id}>
                  <h6>Name: {activity.name}</h6>
                  <p>Duration: {activity.duration}</p>
                  <p>Count: {activity.count}</p>
                </div>
              ))}
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(routine.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyRoutines;
