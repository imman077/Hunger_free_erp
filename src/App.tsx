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
import PointsTiersView from "./modules/admin/pages/rewards/components/PointsTiersView";
import RedemptionsView from "./modules/admin/pages/rewards/components/RedemptionsView";
import RewardsPage from "./modules/admin/pages/rewards/RewardsPage";

// Donor Imports
import DonorDashboard from "./modules/donor/pages/dashboard/Dashboard";
import DonorMyDonations from "./modules/donor/pages/donations/MyDonations";
import DonorCreateDonation from "./modules/donor/pages/donations/CreateDonation";
import DonorProfile from "./modules/donor/pages/profile/Profile";
import DonorRewards from "./modules/donor/pages/rewards/Rewards";

// NGO Imports
import NGODashboard from "./modules/ngo/pages/dashboard/Dashboard";
import NGODonationRequests from "./modules/ngo/pages/donations/DonationRequests";
import NGOInventory from "./modules/ngo/pages/inventory/Inventory";
import NGOProfile from "./modules/ngo/pages/profile/Profile";
import PostNewNeed from "./modules/ngo/pages/needs/PostNewNeed";

// Volunteer Imports
import VolunteerDashboard from "./modules/volunteer/pages/dashboard/Dashboard";
import VolunteerTasks from "./modules/volunteer/pages/tasks/MyTasks";
import VolunteerProfile from "./modules/volunteer/pages/profile/Profile";
import VolunteerRewards from "./modules/volunteer/pages/rewards/Rewards";

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

            {/* Rewards Section */}
            <Route path="rewards" element={<RewardsPage />}>
              <Route index element={<Navigate to="points" />} />
              <Route path="points" element={<PointsTiersView />} />
              <Route path="redemptions" element={<RedemptionsView />} />
            </Route>

            {/* Settings */}
            {/* <Route path="settings" element={<SettingsPage />} /> */}
          </Route>

          {/* Donor Section */}
          <Route path="/donor" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<DonorDashboard />} />
            <Route path="donations" element={<DonorMyDonations />} />
            <Route path="donations/create" element={<DonorCreateDonation />} />
            <Route path="rewards" element={<DonorRewards />} />
            <Route path="profile" element={<DonorProfile />} />
          </Route>

          {/* NGO Section */}
          <Route path="/ngo" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<NGODashboard />} />
            <Route path="requests" element={<NGODonationRequests />} />
            <Route path="inventory" element={<NGOInventory />} />
            <Route path="profile" element={<NGOProfile />} />
            <Route path="needs/post" element={<PostNewNeed />} />
          </Route>

          {/* Volunteer Section */}
          <Route path="/volunteer" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<VolunteerDashboard />} />
            <Route path="tasks" element={<VolunteerTasks />} />
            <Route path="rewards" element={<VolunteerRewards />} />
            <Route path="profile" element={<VolunteerProfile />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
