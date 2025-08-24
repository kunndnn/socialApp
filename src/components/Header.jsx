import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiCall from "#lib/axios";

export default function Header({ onToggleSidebar }) {
  const [name, setName] = useState(null);
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      const { data } = await apiCall.get(`/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log({ data });
      setName(data?.data?.fullName);
      setProfile(data?.data?.image);
    })();
  }, []);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      {/* Sidebar toggle only visible on mobile */}
      <button className="btn btn-outline-light  me-2" onClick={onToggleSidebar}>
        ☰
      </button>

      {/* Brand / Logo */}
      <a className="navbar-brand fw-bold" href="/">
        User's Dashboard
      </a>

      {/* Right-side items */}
      <div className="ms-auto d-flex align-items-center">
        <form className="d-none d-md-block me-3">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Search..."
          />
        </form>

        <div className="dropdown">
          <button
            className="btn btn-outline-light dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img src={profile} className="profileImg" /> {name}
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <Link className="dropdown-item" to="/user/profile">
                <i className="bi bi-person-circle"></i> Profile
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/user/settings">
                <i class="bi bi-gear"></i> Settings
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item text-danger" href="/logout">
                <i className="bi-box-arrow-right"></i> Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
