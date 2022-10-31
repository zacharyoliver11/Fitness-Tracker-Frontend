import React, { useState } from "react";
import { useNavigate } from "react-router";

const CreateRoutine = ({
  baseUrl,
  token,
  setRoutines,
  setMyRoutines,
  error,
  setError,
  routines,
}) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const navigate = useNavigate();

  const createNewRoutine = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(baseUrl + "/routines", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
          goal: goal,
          isPublic: isPublic,
        }),
      });

      const data = await response.json();

      data.activities = [];

      if (routines.find((routine) => routine.name === name)) {
        setError("Routine name already exists, please use a different name.");
      } else {
        setRoutines((prev) => [data, ...prev]);

        setMyRoutines((prev) => [data, ...prev]);

        navigate("/MyRoutines");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="mt-3 d-flex justify-content-center">Create Routine</h1>
      <form className="d-flex mt-5 flex-column vh-100">
        <div className="row mb-3 d-flex justify-content-center">
          <div className="col-sm-4">
            <label className="sr-only">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="col-sm-4">
            <label className="sr-only">Goal</label>
            <input
              type="text"
              className="form-control"
              name="goal"
              value={goal}
              onChange={(event) => setGoal(event.target.value)}
            />
          </div>
          <div className="d-flex justify-content-center mt-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="isPublic"
                value={isPublic}
                onChange={() => setIsPublic(!isPublic)}
              />
              <label className="form-check-label" />
              Make this routine public?
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-primary mb-2 mt-3"
              onClick={createNewRoutine}
            >
              Create Routine
            </button>
          </div>
          {error && (
            <div
              className="alert alert-primary col-sm-4 text-center mt-2"
              role="alert"
            >
              {error}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateRoutine;
