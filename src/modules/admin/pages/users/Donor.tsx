import { useState } from "react";
import Tabs, {
  type Tab,
} from "../../../../global/components/resuable-components/tabs";
import ResuableModal from "../../../../global/components/resuable-components/modal";
import { ImpactCards } from "../../../../global/components/resuable-components/ImpactCards";
import ResuableTable from "../../../../global/components/resuable-components/table";

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
        return "bg-emerald-50 text-hf-green border border-emerald-100";
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
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              Donor Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your donors and their contributions
            </p>
          </div>

          {/* Stats Summary */}
          <ImpactCards
            data={[
              {
                label: "Total Donors",
                val: donors.length.toString(),
                trend: "All registered donors",
                color: "bg-[#22c55e]",
              },
              {
                label: "Total Donations",
                val: formatCurrency(
                  donors.reduce((sum, donor) => sum + donor.totalDonations, 0)
                ),
                trend: "Cumulative contributions",
                color: "bg-[#22c55e]",
              },
              {
                label: "Total Points",
                val: donors
                  .reduce((sum, donor) => sum + donor.points, 0)
                  .toLocaleString(),
                trend: "Reward points earned",
                color: "bg-[#22c55e]",
              },
              {
                label: "Active Donors",
                val: donors
                  .filter((donor) => donor.status === "Active")
                  .length.toString(),
                trend: "Currently active",
                color: "bg-[#22c55e]",
              },
            ]}
          />

          {/* Tabs */}
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            className="mb-6"
          />

          {/* Table */}
          <ResuableTable
            data={filteredDonors}
            columns={[
              { name: "Business Name", uid: "businessName", sortable: true },
              { name: "Type", uid: "type", sortable: true },
              {
                name: "Total Donations",
                uid: "totalDonations",
                sortable: true,
              },
              { name: "Points", uid: "points", sortable: true },
              { name: "Status", uid: "status", sortable: true },
              { name: "Actions", uid: "actions", sortable: false },
            ]}
            renderCell={(donor: Donor, columnKey: React.Key) => {
              switch (columnKey) {
                case "businessName":
                  return (
                    <div
                      className="font-medium text-gray-900 cursor-pointer"
                      onClick={() => handleViewProfile(donor)}
                    >
                      {donor.businessName}
                    </div>
                  );
                case "type":
                  return (
                    <span className="text-sm text-gray-600">{donor.type}</span>
                  );
                case "totalDonations":
                  return (
                    <div className="text-sm font-semibold text-gray-900">
                      {formatCurrency(donor.totalDonations)}
                    </div>
                  );
                case "points":
                  return (
                    <div className="text-sm text-gray-900 font-medium">
                      {donor.points.toLocaleString()}
                    </div>
                  );
                case "status":
                  return (
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        donor.status
                      )}`}
                    >
                      {donor.status}
                    </span>
                  );
                default:
                  return <span>{String(donor[columnKey as keyof Donor])}</span>;
              }
            }}
            // title="Donor List"
            // description="Manage your donors and their contributions"
            actionConfig={{
              showView: true,
              showMessage: true,
              showApprove: true,
              showDeactivate: true,
              onView: handleViewProfile,
              onMessage: (donor) => console.log("Message", donor),
              onApprove: (donor) => console.log("Approve", donor),
              onDeactivate: (donor) => console.log("Deactivate", donor),
            }}
          />
        </div>
      </div>

      {/* Profile Modal */}
      <ResuableModal
        isOpen={!!selectedDonor}
        onOpenChange={(open) => !open && closeModal()}
        showTrendingLayout={true}
        backdrop="blur"
        data={
          selectedDonor
            ? {
                partner: selectedDonor.businessName,
                id: `DON-${selectedDonor.id.toString().padStart(5, "0")}`,
                date: new Date().toLocaleDateString(),
                email: selectedDonor.email,
                phone: selectedDonor.contactPerson,
                activeLedgers: 7, // Sample count for donor
                logEvents: [
                  { title: "Partner Verified", date: "Jan 2025" },
                  { title: "Donation Cycle Started", date: "Feb 2025" },
                  { title: "Active Status Confirmed", date: "Present" },
                ],
                history: [
                  {
                    id: "DON-1001",
                    date: "Oct 20, 2024",
                    amount: formatCurrency(12400),
                    type: "Food Bulk",
                    status: "Verified",
                  },
                  {
                    id: "DON-1002",
                    date: "Sep 12, 2024",
                    amount: formatCurrency(8200),
                    type: "Groceries",
                    status: "Verified",
                  },
                  {
                    id: "DON-1003",
                    date: "Aug 05, 2024",
                    amount: formatCurrency(15000),
                    type: "Dry Goods",
                    status: "Verified",
                  },
                ],
              }
            : undefined
        }
      />
    </>
  );
};

export default DonorPage;
