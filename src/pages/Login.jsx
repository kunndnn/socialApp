import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Toast from "../utils/toastService";
import apiCall from "#lib/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hasToken = localStorage.getItem("token");
    if (hasToken) navigate("/user/dashboard");
  }, []);

  const toggleDisable = () => setDisable(!disable);
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email) {
      return Toast.error("Please enter email");
    }

    if (!password) {
      return Toast.error("Please enter email");
    }
    toggleDisable();

    try {
      const body = {
        deviceId: "null",
        deviceType: "android",
        deviceToken: "null",
        email,
        password,
      };
      const { data } = await apiCall.post(`/login`, body);
      localStorage.setItem("token", data?.data?.accessToken);
      navigate("/user/dashboard");
    } catch (error) {
      // console.log({ error });
      return Toast.error(error?.response?.data?.message);
    }
    toggleDisable();
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <h2 className="m-2">Login</h2>
        <form className="p-4" onSubmit={handleLogin}>
          <div data-mdb-input-init className="form-outline mb-4">
            <input
              type="email"
              id="form2Example1"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="form-label" htmlFor="form2Example1">
              Email address
            </label>
          </div>

          <div data-mdb-input-init className="form-outline mb-4">
            <input
              type="password"
              id="form2Example2"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
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
            type="submit"
            data-mdb-button-init
            data-mdb-ripple-init
            className="btn btn-primary btn-block mb-4"
            disabled={disable}
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
    </div>
  );
}
