import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

const MyRoutines = ({
  username,
  token,
  baseUrl,
  handleDelete,
  myRoutines,
  setMyRoutines,
  activities,
  setRoutines,
  error,
  setError,
}) => {
  if (!token) {
    return <Navigate to="/Login" replace />;
  }

  const [count, setCount] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activityId, setActivityId] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedGoal, setUpdatedGoal] = useState("");
  const [updateFormActivity, setUpdateFormActivity] = useState(false);
  const [updatedCount, setUpdatedCount] = useState("");
  const [updatedDuration, setUpdatedDuration] = useState("");

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

  const addActivityToRoutine = async (routineId) => {
    const response = await fetch(
      baseUrl + `/routines/${routineId}/activities`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          activityId: activityId,
          count: count,
          duration: duration,
        }),
      }
    );

    const data = await response.json();

    // FIX routineId, API sending null
    data.routineId = routineId;

    const activity = activities.find(
      (activity) => activity.id.toString() === activityId
    );

    activity.duration = duration;
    activity.count = count;

    console.log("myRoutines", myRoutines);

    if (activity.id === activityId) {
      setError("Activity already exists on routine.");
    } else {
      setMyRoutines((prev) =>
        prev.map((routine) => {
          if (routineId === routine.id) {
            routine.activities = [...routine.activities, activity];
          }
          return routine;
        })
      );

      setRoutines((prev) =>
        prev.map((routine) => {
          if (routineId === routine.id) {
            routine.activities = [...routine.activities, activity];
          }
          return routine;
        })
      );

      getMyRoutines();
    }
  };

  const removeActivityFromRoutine = async (routineActivityId) => {
    try {
      const response = await fetch(
        baseUrl + `/routine_activities/${routineActivityId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await response.json();

      getMyRoutines();
      myRoutines.filter(
        (routine) => routine.activities.routineActivityId !== routineActivityId
      );
    } catch (error) {
      console.error(error);
    }
  };

  const updateRoutine = async (routineId) => {
    const response = await fetch(baseUrl + `/routines/${routineId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: updatedName,
        goal: updatedGoal,
      }),
    });

    await response.json();

    getMyRoutines();
  };

  const updateActivity = async (updateActivityId) => {
    const response = await fetch(baseUrl + `/routine_activities/${updateActivityId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        count: updatedCount,
        duration: updatedDuration,
      }),
    });

    await response.json();

    getMyRoutines();
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
                  <button
                    type="submit"
                    className="btn btn-danger mb-2"
                    onClick={() => {
                      removeActivityFromRoutine(activity.routineActivityId);
                    }}
                  >
                    Remove Activity
                  </button>
                  <button
                    className="btn btn-warning mb-2 ms-2"
                    onClick={() => setUpdateFormActivity(true)}
                  >
                    Update Activity
                  </button>
                  {updateFormActivity && (
                    <div>
                      <input
                        placeholder="count"
                        className="me-2"
                        type="text"
                        name="updatedCount"
                        value={updatedCount}
                        onChange={(event) =>
                          setUpdatedCount(event.target.value)
                        }
                      />
                      <input
                        placeholder="duration"
                        className="me-2"
                        type="text"
                        name="updatedDuration"
                        value={updatedDuration}
                        onChange={(event) =>
                          setUpdatedDuration(event.target.value)
                        }
                      />
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => {
                          updateActivity(activity.routineActivityId)
                          setUpdateFormActivity(false);
                        }}
                      >
                        Submit Changes
                      </button>
                    </div>
                  )}
                </div>
              ))}
              <h4 className="mt-2">Add Activity To Routine:</h4>
              <label className="me-4">Activity Name:</label>
              <select
                value={activityId}
                onChange={(event) => setActivityId(event.target.value)}
              >
                {activities.map((activity) => (
                  <option value={activity.id} key={activity.id}>
                    {activity.name}
                  </option>
                ))}
              </select>
              <div className="mt-3">
                <label className="me-4">Count</label>
                <input
                  type="text"
                  name="count"
                  value={count}
                  onChange={(event) => setCount(event.target.value)}
                />
              </div>
              <div className="mt-3 mb-3">
                <label className="me-2">Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={duration}
                  onChange={(event) => setDuration(event.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary ms-2"
                onClick={() => addActivityToRoutine(routine.id)}
              >
                Add
              </button>
            </div>
            <div className="text-center mb-3">
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(routine.id)}
              >
                Delete Routine
              </button>
              <button
                className="btn btn-warning ms-2"
                onClick={() => setUpdateForm(true)}
              >
                Update Routine
              </button>
            </div>
            {updateForm === true && (
              <div className="text-center mb-3">
                <input
                  placeholder="name"
                  type="text"
                  className="me-2"
                  name="updatedName"
                  value={updatedName}
                  onChange={(event) => setUpdatedName(event.target.value)}
                />
                <input
                  placeholder="goal"
                  type="text"
                  className="me-2"
                  name="updatedGoal"
                  value={updatedGoal}
                  onChange={(event) => setUpdatedGoal(event.target.value)}
                />
                <button
                  className="btn btn-primary me-2"
                  onClick={() => {
                    updateRoutine(routine.id);
                    setUpdateForm(false);
                  }}
                >
                  Submit Changes
                </button>
              </div>
            )}
            {error && (
              <div
                className="alert alert-primary col-sm-4 text-center mt-2"
                role="alert"
              >
                {error}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyRoutines;
