import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Fake login → store token
    if (email && password) {
      localStorage.setItem("token", "123456");
      navigate("/dashboard");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <h2 className="m-2">Login</h2>
        <form className="p-4">
          <div data-mdb-input-init className="form-outline mb-4">
            <input type="email" id="form2Example1" className="form-control" />
            <label className="form-label" htmlFor="form2Example1">
              Email address
            </label>
          </div>

          <div data-mdb-input-init className="form-outline mb-4">
            <input
              type="password"
              id="form2Example2"
              className="form-control"
            />
            <label className="form-label" htmlFor="form2Example2">
              Password
            </label>
          </div>

          <div className="row mb-4">
            <div className="col d-flex justify-content-center"></div>

            <div className="col">
              <a href="#!">Forgot password?</a>
            </div>
          </div>

          <button
            type="button"
            data-mdb-button-init
            data-mdb-ripple-init
            className="btn btn-primary btn-block mb-4"
          >
            Sign in
          </button>

          <div className="text-center">
            <p>
              Don't have an account? <Link to="/signup">Sign up here</Link>
            </p>
          </div>
        </form>
      </div>

      {/* <form onSubmit={handleLogin}>
        <input
          className="form-control mb-2"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="form-control mb-2"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary">Login</button>
      </form> */}
    </div>
  );
}
