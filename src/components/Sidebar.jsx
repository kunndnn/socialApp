import { Link, useLocation } from "react-router-dom";

function SidebarLinks({ collapsed, onClick }) {
  const location = useLocation();
  const links = [
    { to: "/user/dashboard", label: "Dashboard", icon: "bi-speedometer2" },
    { to: "/user/profile", label: "Profile", icon: "bi-person-circle" },
    { to: "/user/settings", label: "Settings", icon: "bi-gear" },
    { to: "/user/users", label: "Users", icon: "bi-person" },
    { to: "/user/chats", label: "Chat", icon: "bi-chat" },
    { to: "/logout", label: "Logout", icon: "bi-box-arrow-right" },
  ];

  return (
    <ul className="nav flex-column">
      {links.map(({ to, label, icon }) => (
        <li className="nav-item" key={to}>
          <Link
            className={`nav-link d-flex align-items-center gap-2 ${
              location.pathname === to
                ? "active fw-bold text-warning"
                : "text-white"
            }`}
            to={to}
            onClick={onClick}
          >
            <i className={`bi ${icon} fs-5`}></i>
            {!collapsed && <span>{label}</span>}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Sidebar({ collapsed, showMobile, onClose }) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`bg-dark text-white p-2 d-none d-md-flex flex-column`}
        style={{
          width: collapsed ? "70px" : "220px",
          minHeight: "100vh",
          transition: "width 0.3s",
        }}
      >
        <h5 className={`mb-4 ${collapsed ? "d-none" : "d-block"}`}>Menu</h5>
        <SidebarLinks collapsed={collapsed} />
      </aside>

      {/* Mobile sidebar (offcanvas) */}
      <div
        className={`offcanvas offcanvas-start ${showMobile ? "show" : ""}`}
        tabIndex="-1"
        style={{ visibility: showMobile ? "visible" : "hidden" }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Menu</h5>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
          ></button>
        </div>
        <div className="offcanvas-body bg-dark text-white">
          <SidebarLinks onClick={onClose} />
        </div>
      </div>
      {showMobile && (
        <div className="offcanvas-backdrop fade show" onClick={onClose}></div>
      )}
    </>
  );
}
