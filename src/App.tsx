import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./global/layouts/AdminLayout";
import AdminDashboard from "./modules/admin/pages/Dashboard";

function App() {
  return (
    <>
      <div>
        <Routes>
          {/* Redirect root to /admin */}
          <Route path="/" element={<Navigate to="/admin" />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
