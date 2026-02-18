import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./global/contexts/ThemeContext";
import { Toaster } from "sonner";
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
import RewardsConfig from "./modules/admin/pages/rewards/components/RewardsConfig";
import MilestonesConfig from "./modules/admin/pages/rewards/components/MilestonesConfig";
import RewardsPage from "./modules/admin/pages/rewards/RewardsPage";
import CreateDonor from "./modules/admin/pages/users/CreateDonor";
import CreateNgo from "./modules/admin/pages/users/CreateNgo";
import CreateVolunteer from "./modules/admin/pages/users/CreateVolunteer";
import ConfigurationPage from "./modules/admin/pages/settings/ConfigurationPage";
import NGOEnquiryPage from "./modules/admin/pages/enquiries/NGOEnquiryPage";
import VolunteerEnquiryPage from "./modules/admin/pages/enquiries/VolunteerEnquiryPage";
import RewardEnquiryPage from "./modules/admin/pages/enquiries/RewardEnquiryPage";
import DonorEnquiryPage from "./modules/admin/pages/enquiries/DonorEnquiryPage";
import EnquiriesHub from "./modules/admin/pages/enquiries/EnquiriesHub";

// Donor Imports
import DonorDashboard from "./modules/donor/pages/dashboard/Dashboard";
import DonorMyDonations from "./modules/donor/pages/donations/MyDonations";
import DonorCreateDonation from "./modules/donor/pages/donations/CreateDonation";
import DonorProfile from "./modules/donor/pages/profile/Profile";
import DonorPaymentMethods from "./modules/donor/pages/profile/PaymentMethods";
import DonorRewards from "./modules/donor/pages/rewards/Rewards";
import DonorBenefits from "./modules/donor/pages/rewards/Benefits";

// NGO Imports
import NGODashboard from "./modules/ngo/pages/dashboard/Dashboard";
import NGODonationRequests from "./modules/ngo/pages/donations/DonationRequests";
import NGOInventory from "./modules/ngo/pages/inventory/Inventory";
import NGOAddItem from "./modules/ngo/pages/inventory/AddItem";
import NGOProfile from "./modules/ngo/pages/profile/Profile";
import NGOPaymentMethods from "./modules/ngo/pages/profile/PaymentMethods";
import PostNewNeed from "./modules/ngo/pages/needs/PostNewNeed";
import NGORewards from "./modules/ngo/pages/rewards/Rewards";
import NGOBenefits from "./modules/ngo/pages/rewards/Benefits";

// Volunteer Imports
import VolunteerDashboard from "./modules/volunteer/pages/dashboard/Dashboard";
import VolunteerTasks from "./modules/volunteer/pages/tasks/Tasks";
import VolunteerProfile from "./modules/volunteer/pages/profile/Profile";
import VolunteerPaymentMethods from "./modules/volunteer/pages/profile/PaymentMethods";
import VolunteerRewards from "./modules/volunteer/pages/rewards/Rewards";
import VolunteerBenefits from "./modules/volunteer/pages/rewards/Benefits";

function App() {
  return (
    <ThemeProvider>
      <Toaster
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          style: {
            fontFamily: "inherit",
            fontSize: "12px",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 16px",
            paddingRight: "36px",
            lineHeight: "1.4",
          },
        }}
      />
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
            <Route path="users/donors/create" element={<CreateDonor />} />
            <Route path="users/ngos" element={<NGOsPage />} />
            <Route path="users/ngos/create" element={<CreateNgo />} />
            <Route path="users/volunteers" element={<VolunteersPage />} />
            <Route
              path="users/volunteers/create"
              element={<CreateVolunteer />}
            />

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
              <Route path="catalog" element={<RewardsConfig />} />
              <Route path="milestones" element={<MilestonesConfig />} />
            </Route>

            {/* Settings Section */}
            <Route
              path="settings/configuration"
              element={<ConfigurationPage />}
            />

            {/* Enquiry Section */}
            <Route path="enquiries" element={<EnquiriesHub />} />
            <Route path="enquiries/donors" element={<DonorEnquiryPage />} />
            <Route path="enquiries/ngos" element={<NGOEnquiryPage />} />
            <Route
              path="enquiries/volunteers"
              element={<VolunteerEnquiryPage />}
            />
            <Route path="enquiries/rewards" element={<RewardEnquiryPage />} />
          </Route>

          {/* Donor Section */}
          <Route path="/donor" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<DonorDashboard />} />
            <Route path="donations" element={<DonorMyDonations />} />
            <Route path="donations/create" element={<DonorCreateDonation />} />
            <Route path="rewards" element={<DonorRewards />} />
            <Route path="rewards/benefits" element={<DonorBenefits />} />
            <Route path="profile" element={<DonorProfile />} />
            <Route path="profile/payments" element={<DonorPaymentMethods />} />
          </Route>

          {/* NGO Section */}
          <Route path="/ngo" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<NGODashboard />} />
            <Route path="requests" element={<NGODonationRequests />} />
            <Route path="inventory" element={<NGOInventory />} />
            <Route path="inventory/add" element={<NGOAddItem />} />
            <Route path="rewards" element={<NGORewards />} />
            <Route path="rewards/benefits" element={<NGOBenefits />} />
            <Route path="profile" element={<NGOProfile />} />
            <Route path="profile/payments" element={<NGOPaymentMethods />} />
            <Route path="needs/post" element={<PostNewNeed />} />
          </Route>

          {/* Volunteer Section */}
          <Route path="/volunteer" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<VolunteerDashboard />} />
            <Route path="tasks" element={<VolunteerTasks />} />
            <Route path="rewards" element={<VolunteerRewards />} />
            <Route path="rewards/benefits" element={<VolunteerBenefits />} />
            <Route path="profile" element={<VolunteerProfile />} />
            <Route path="payments" element={<VolunteerPaymentMethods />} />
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
