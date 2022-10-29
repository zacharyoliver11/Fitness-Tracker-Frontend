import React from "react";

const Routines = ({ routines }) => {
  return (
    <div>
      <h1 className="mt-3 d-flex justify-content-center">Routines</h1>
      {routines.map(
        (routine) =>
          routine.isPublic && (
            <div key={routine.id}>
              <div className="card m-3">
                <div className="card-body">
                  <h4 className="card-title">{routine.name}</h4>
                  <h6 className="card-subtitle mb-2 mt-2 text-muted">
                    Creator Name: {routine.creatorName}
                  </h6>
                  <p className="card-text">Goal: {routine.goal}</p>
                  {routine.activities.length > 0 && <h4>Activities:</h4>}
                  {routine.activities.map((activity) => (
                    <div key={activity.id}>
                      <h6>Name: {activity.name}</h6>
                      <p>Duration: {activity.duration}</p>
                      <p>Count: {activity.count}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default Routines;
