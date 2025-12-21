import { useState } from "react";
import Tabs, {
  type Tab,
} from "../../../../global/components/resuable-components/tabs";
import ResuableButton from "../../../../global/components/resuable-components/button";
import ResuableModal from "../../../../global/components/resuable-components/modal";

interface DonationHistory {
  event: string;
  date: string;
  amount: number;
}

interface Donor {
  id: number;
  businessName: string;
  type: string;
  totalDonations: number;
  points: number;
  status: string;
  contactPerson: string;
  email: string;
  address: string;
  donationHistory: DonationHistory[];
}

const DonorPage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);
  const [donors] = useState<Donor[]>([
    {
      id: 1,
      businessName: "Gourmet Bistro",
      type: "Restaurant",
      totalDonations: 7500,
      points: 1500,
      status: "Active",
      contactPerson: "Chef Antoine",
      email: "contact@gourmetbistro.com",
      address: "123 Main St, City, State, 12345",
      donationHistory: [
        { event: "Food for Homeless", date: "2023-11-01", amount: 2000 },
        { event: "Culinary Workshop", date: "2023-08-20", amount: 1500 },
        { event: "Local Charity Gala", date: "2023-05-10", amount: 4000 },
      ],
    },
    {
      id: 2,
      businessName: "Grand Lux Hotel",
      type: "Hotel",
      totalDonations: 12000,
      points: 2400,
      status: "Active",
      contactPerson: "Sarah Johnson",
      email: "sarah.johnson@grandlux.com",
      address: "456 Oak Avenue, Metropolis, State, 67890",
      donationHistory: [
        { event: "Annual Gala", date: "2023-10-15", amount: 5000 },
        { event: "Winter Shelter", date: "2023-01-20", amount: 4000 },
        { event: "Community Kitchen", date: "2022-11-05", amount: 3000 },
      ],
    },
    {
      id: 3,
      businessName: "Smith Family",
      type: "Household",
      totalDonations: 800,
      points: 160,
      status: "Pending",
      contactPerson: "John Smith",
      email: "john.smith@email.com",
      address: "789 Pine Road, Suburbia, State, 45678",
      donationHistory: [
        { event: "Initial Donation", date: "2023-09-10", amount: 800 },
      ],
    },
    {
      id: 4,
      businessName: "Annual Charity Ball",
      type: "Event",
      totalDonations: 25000,
      points: 5000,
      status: "Active",
      contactPerson: "Emily Chen",
      email: "emily@charityball.org",
      address: "321 Event Plaza, Downtown, State, 98765",
      donationHistory: [
        { event: "2023 Gala Proceeds", date: "2023-12-01", amount: 15000 },
        { event: "2022 Gala Proceeds", date: "2022-12-01", amount: 10000 },
      ],
    },
    {
      id: 5,
      businessName: "Tech Innovations Inc.",
      type: "Corporate",
      totalDonations: 3000,
      points: 600,
      status: "Inactive",
      contactPerson: "Michael Rodriguez",
      email: "m.rodriguez@techinnovations.com",
      address: "159 Tech Park, Innovation District, State, 75319",
      donationHistory: [
        { event: "STEM Education Fund", date: "2023-02-14", amount: 3000 },
      ],
    },
  ]);

  const tabs: Tab[] = [
    { label: "All", value: "All", count: donors.length, showCount: true },
    { label: "Restaurant", value: "Restaurant" },
    { label: "Hotel", value: "Hotel" },
    { label: "Household", value: "Household" },
    { label: "Event", value: "Event" },
  ];

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleViewProfile = (donor: Donor): void => {
    setSelectedDonor(donor);
  };

  const closeModal = () => {
    setSelectedDonor(null);
  };

  const filteredDonors =
    activeTab === "All"
      ? donors
      : donors.filter((donor) => donor.type === activeTab);

  return (
    <>
      <div className="min-h-screen p-6">
        <div className="w-full">
          {/* Header */}
          <div className="mb-5 flex flex-col items-start">
            <h1 className="text-3xl font-bold text-gray-900">
              Donor Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your donors and their contributions
            </p>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Total Donors
                  </h3>
                  <p className="text-2xl font-semibold text-gray-900">
                    {donors.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Total Donations
                  </h3>
                  <p className="text-2xl font-semibold text-gray-900">
                    {formatCurrency(
                      donors.reduce(
                        (sum, donor) => sum + donor.totalDonations,
                        0
                      )
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Total Points
                  </h3>
                  <p className="text-2xl font-semibold text-gray-900">
                    {donors
                      .reduce((sum, donor) => sum + donor.points, 0)
                      .toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Active Donors
                  </h3>
                  <p className="text-2xl font-semibold text-gray-900">
                    {donors.filter((donor) => donor.status === "Active").length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs and Table */}
          <div className="bg-white shadow-sm rounded-xl mt-6 p-5">
            {/* Custom Tabs */}
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              className="mb-6"
            />

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Business Name
                    </th>
                    <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Donations
                    </th>
                    <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Points
                    </th>
                    <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDonors.map((donor) => (
                    <tr
                      key={donor.id}
                      onClick={() => handleViewProfile(donor)}
                      className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                    >
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {donor.businessName}
                        </div>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className="text-sm text-gray-600">
                          {donor.type}
                        </span>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          {formatCurrency(donor.totalDonations)}
                        </div>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-medium">
                          {donor.points.toLocaleString()}
                        </div>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            donor.status
                          )}`}
                        >
                          {donor.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="flex items-center justify-center gap-6">
                          <ResuableButton
                            variant="success"
                            size="md"
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log("Message clicked");
                            }}
                          >
                            Message
                          </ResuableButton>
                          <ResuableButton
                            variant="danger"
                            size="md"
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log("Deactivate clicked");
                            }}
                          >
                            Deactivate
                          </ResuableButton>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      <ResuableModal
        isOpen={!!selectedDonor}
        onOpenChange={(open: boolean) => !open && closeModal()}
        size="4xl"
        title={
          selectedDonor && (
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedDonor.businessName}
              </h2>
              <p className="text-sm text-gray-500 font-normal">
                {selectedDonor.type}
              </p>
            </div>
          )
        }
        footer={
          <div className="flex justify-end gap-3 w-full">
            <ResuableButton variant="success" onClick={() => {}}>
              Share Profile
            </ResuableButton>
          </div>
        }
      >
        {selectedDonor && (
          <div className="space-y-8">
            {/* Header Stats */}
            <div className="flex items-center gap-6 pb-6 border-b border-gray-100">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  selectedDonor.status === "Active"
                    ? "bg-green-100 text-green-800"
                    : selectedDonor.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {selectedDonor.status}
              </span>
              <div className="text-gray-600">
                <span className="font-semibold text-gray-900">
                  {formatCurrency(selectedDonor.totalDonations)}
                </span>{" "}
                total donations
              </div>
              <div className="text-gray-600">
                <span className="font-semibold text-gray-900">
                  {selectedDonor.points.toLocaleString()}
                </span>{" "}
                points
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Profile Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Profile Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Contact Person
                    </label>
                    <p className="text-gray-900 font-medium">
                      {selectedDonor.contactPerson}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Email
                    </label>
                    <p className="text-gray-900">{selectedDonor.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Address
                    </label>
                    <p className="text-gray-900">{selectedDonor.address}</p>
                  </div>
                </div>
              </div>

              {/* Donation History */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  Donation History
                </h3>
                <div className="space-y-3">
                  {selectedDonor.donationHistory?.map((donation, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-150"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {donation.event}
                        </p>
                        <p className="text-sm text-gray-500">
                          on {formatDate(donation.date)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">
                          {formatCurrency(donation.amount)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </ResuableModal>
    </>
  );
};

export default DonorPage;
