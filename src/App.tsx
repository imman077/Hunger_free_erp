import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./global/layouts/AdminLayout";
import DonorPage from "./modules/admin/pages/users/Donor";
import NGOsPage from "./modules/admin/pages/users/NGOsPage";
import VolunteersPage from "./modules/admin/pages/users/VolunteersPage";
import DonationsPage from "./modules/admin/pages/donations/DonationsPage";
import DonationTrackingPage from "./modules/admin/pages/donations/DonationTrackingPage";
import PendingDonationsPage from "./modules/admin/pages/donations/PendingDonationsPage";
import AnalyticsPage from "./modules/admin/pages/analytics/AnalyticsPage";
import AnalyticsReportsPage from "./modules/admin/pages/analytics/AnalyticsReportsPage";
import UsersPage from "./modules/admin/pages/users/UsersPage";
import AdminDashboard from "./modules/admin/pages/dashboard/Dashboard";

function App() {
  return (
    <>
      <div>
        <Routes>
          {/* Redirect root to /admin */}
          <Route path="/" element={<Navigate to="/admin" />} />

          <Route path="/admin" element={<AdminLayout />}>
            {/* Dashboard */}
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />

            {/* Users Section */}
            <Route path="users" element={<UsersPage />} />
            <Route path="users/donors" element={<DonorPage />} />
            <Route path="users/ngos" element={<NGOsPage />} />
            <Route path="users/volunteers" element={<VolunteersPage />} />

            {/* Donations Section */}
            <Route path="donations" element={<DonationsPage />} />
            <Route
              path="donations/tracking"
              element={<DonationTrackingPage />}
            />
            <Route
              path="donations/pending"
              element={<PendingDonationsPage />}
            />

            {/* Alerts Section */}
            {/* <Route path="alerts" element={<AlertsPage />} />
            <Route path="alerts/urgent" element={<UrgentAlertsPage />} /> */}

            {/* Analytics Section */}
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route
              path="analytics/reports"
              element={<AnalyticsReportsPage />}
            />

            {/* Settings */}
            {/* <Route path="settings" element={<SettingsPage />} /> */}
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
