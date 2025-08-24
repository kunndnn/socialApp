import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import { ToastContainer, Zoom } from "react-toastify";
import DashboardLayout from "./layouts/DashboardLayout";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes (all prefixed with /user) */}
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* /user/dashboard */}
          <Route path="dashboard" element={<Dashboard />} />
          {/* /user/profile */}
          <Route path="profile" element={<Profile />} />
          {/* /user/settings */}
          <Route path="settings" element={<Settings />} />
          {/* Redirect /user → /user/dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* Default redirect */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        limit={1}
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Zoom}
      />
    </>
  );
}

export default App;
