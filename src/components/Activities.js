import React from "react";
import { Link } from "react-router-dom";

const Activities = ({ activities, token }) => {

  return (
    <div>
      {token && (
        <Link to="/CreateActivity" className="d-flex justify-content-end me-3 mt-3">Create Activity</Link>
      )}
      <h1 className="mt-3 d-flex justify-content-center">Activities</h1>
        {activities.map((activity) => (
          <div key={activity.id}>
            <div className="card m-3">
              <div className="card-body">
                <h4 className="card-title">{activity.name}</h4>
                <p className="card-text">{activity.description}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Activities;
