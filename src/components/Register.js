import React from "react";

const Register = ({
  username,
  setUsername,
  password,
  setPassword,
  token,
  setToken,
  baseUrl,
}) => {
  const handleRegister = async () => {
    const response = await fetch(baseUrl + "/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await response.json()

    console.log('data', data)
  };

  return (
    <form className="d-flex mt-5 flex-column vh-100">
      <div className="row mb-3 d-flex justify-content-center">
        <div className="col-sm-4">
          <label className="sr-only">Username</label>
          <input
            type="text"
            className="form-control"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </div>

        <div className="col-sm-4">
          <label className="sr-only">Password</label>
          <input
            type="password"
            className="form-control"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-primary mb-2 mt-3"
            onClick={(event) => {
              event.preventDefault();
              handleRegister();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default Register;