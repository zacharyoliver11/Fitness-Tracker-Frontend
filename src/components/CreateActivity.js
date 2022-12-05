import React, { useState } from "react";
import { useNavigate } from "react-router";

const CreateActivity = ({
  baseUrl,
  token,
  activities,
  setActivities,
  error,
  setError,
}) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const createNewActivity = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(baseUrl + "/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
          description: description,
        }),
      });

      const data = await response.json();

      activities.find((activity) => activity.name === name)
        ? setError(`An activity with the name ${name} already exists.`)
        : setActivities((prev) => [data, ...prev]);
      navigate("/Activities");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="mt-3 d-flex justify-content-center">Create Activity</h1>
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
            <label className="sr-only">Description</label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-primary mb-2 mt-3"
              onClick={createNewActivity}
            >
              Create Activity
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

export default CreateActivity;
