import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Toast from "../utils/toastService";
import apiCall from "#lib/axios";

export default function Signup() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const hasToken = localStorage.getItem("token");
    if (hasToken) navigate("/user/dashboard");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { email, password, confirmPassword } = inputs;
    if (!email || !password || !confirmPassword)
      return Toast.error("Please fill all fields");

    if (password != confirmPassword)
      return Toast.error(`Password & Confirm password doesn't match`);

    // localStorage.setItem("token", "123456");
    const body = {
      deviceId: "null",
      deviceType: "android",
      deviceToken: "null",
      email,
      password,
      fullName: Date.now(),
    };

    try {
      const { data } = await apiCall.post(`/register`, body);
      localStorage.setItem("token", data?.data?.accessToken);
      navigate("/user/dashboard");
    } catch (error) {
      // console.log({ error });
      // return Toast.error(error.message);
      return Toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          className="form-control mb-2"
          type="email"
          name="email"
          placeholder="Email"
          value={inputs.email}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          type="password"
          name="password"
          placeholder="Password"
          value={inputs.password}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={inputs.confirmPassword}
          onChange={handleChange}
        />
        <button className="btn btn-primary">Signup</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
