import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    // Fake Signup → store token
    if (email && password) {
      // call api
      localStorage.setItem("token", "123456");
      navigate("/dashboard");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
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

        <input
          className="form-control mb-2"
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary">Signup</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
