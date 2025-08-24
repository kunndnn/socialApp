import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false); // desktop toggle
  const [showMobile, setShowMobile] = useState(false); // mobile offcanvas toggle

  const handleToggleSidebar = () => {
    if (window.innerWidth < 768) {
      // Mobile → open offcanvas
      setShowMobile(true);
    } else {
      // Desktop → collapse/expand
      setCollapsed(!collapsed);
    }
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        showMobile={showMobile}
        onClose={() => setShowMobile(false)}
      />

      {/* Main content area */}
      <div className="flex-grow-1 d-flex flex-column">
        <Header onToggleSidebar={handleToggleSidebar} />
        <main className="p-3 flex-grow-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
