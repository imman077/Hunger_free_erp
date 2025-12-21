import React, { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
} from "@heroui/react";
import ResuableDropdown from "../../../../global/components/resuable-components/dropdown";

type NgoStatus = "Active" | "Pending" | "Deactivated";

interface Ngo {
  id: number;
  name: string;
  registrationNo: string;
  serviceAreas: string[];
  beneficiaries: string;
  status: NgoStatus;
  email: string;
  phone: string;
  address: string;
  volunteers: string[];
}

const NgoPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedNgo, setSelectedNgo] = useState<Ngo | null>(null);

  const ngoData: Ngo[] = [
    {
      id: 1,
      name: "Hope Foundation",
      registrationNo: "REG-1001-XYZ",
      serviceAreas: ["Education", "Health"],
      beneficiaries: "Children & Youth",
      status: "Active",
      email: "contact@hopefoundation.org",
      phone: "+1-555-123-4567",
      address: "123 Charity Lane, Metropole, County",
      volunteers: ["Sarah Connor", "John Do"],
    },
    {
      id: 2,
      name: "Green Future Initiative",
      registrationNo: "REG-1002-ABC",
      serviceAreas: ["Environment", "Sustainability"],
      beneficiaries: "Local Communities",
      status: "Pending",
      email: "info@greenfuture.org",
      phone: "+1-555-234-5678",
      address: "456 Eco Street, Greenville, County",
      volunteers: ["Michael Green", "Lisa Brown"],
    },
    {
      id: 3,
      name: "Community Care Alliance",
      registrationNo: "REG-1003-DEF",
      serviceAreas: ["Elderly Care", "Social Welfare"],
      beneficiaries: "Senior Citizens",
      status: "Active",
      email: "care@communityalliance.org",
      phone: "+1-555-345-6789",
      address: "789 Care Avenue, Community Town, County",
      volunteers: ["Robert Wilson", "Maria Garcia"],
    },
    {
      id: 4,
      name: "Animal Rescue Squad",
      registrationNo: "REG-1004-GHI",
      serviceAreas: ["Animal Welfare"],
      beneficiaries: "Stray Animals",
      status: "Deactivated",
      email: "rescue@animalsquad.org",
      phone: "+1-555-456-7890",
      address: "321 Rescue Road, Animal City, County",
      volunteers: ["David Thompson", "Emma Davis"],
    },
    {
      id: 5,
      name: "Global Aid Initiative",
      registrationNo: "REG-1005-JKL",
      serviceAreas: ["Poverty Alleviation", "Disaster Relief"],
      beneficiaries: "Impoverished Regions",
      status: "Active",
      email: "aid@globalinitiative.org",
      phone: "+1-555-567-8901",
      address: "654 Global Lane, Worldwide City, County",
      volunteers: ["James Miller", "Sophia Chen"],
    },
  ];

  const handleViewNgo = (ngo: Ngo): void => {
    setSelectedNgo(ngo);
    onOpen();
  };

  const [status, setStatus] = useState("");
  const [serviceArea, setServiceArea] = useState("");

  const getStatusBadge = (status: NgoStatus): React.ReactElement => {
    const statusClasses: Record<NgoStatus, string> = {
      Active: "bg-emerald-50 text-hf-green border border-emerald-100",
      Pending: "bg-yellow-100 text-yellow-800 border border-yellow-300",
      Deactivated: "bg-red-100 text-red-800 border border-red-300",
    };

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusClasses[status]}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="font-sans">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          {/* Row 1: Title and Inline Filters */}
          <div className="pb-6 border-b border-gray-200 flex flex-row justify-between">
            <div className="flex items-center gap-6">
              {/* Left: Title */}
              <div className="flex flex-col items-start">
                <h1 className="text-2xl font-bold text-gray-900">
                  NGO Management
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Monitor and manage NGO registrations
                </p>
              </div>
            </div>

            {/* Inline Filters - Below Title */}
            <div className="flex items-center gap-4 mt-4">
              <span className="text-sm font-medium text-gray-700">
                Filter by:
              </span>

              {/* Status Filter */}
              <ResuableDropdown
                value={status}
                onChange={setStatus}
                placeholder="Status"
                options={[
                  { value: "All", label: "All" },
                  { value: "Active", label: "Active" },
                  { value: "Pending", label: "Pending" },
                  { value: "Deactivated", label: "Deactivated" },
                ]}
              />

              {/* Service Area Filter */}
              <ResuableDropdown
                value={serviceArea}
                onChange={setServiceArea}
                placeholder="Service Area"
                minWidth={160}
                options={[
                  { value: "All", label: "All" },
                  { value: "Education", label: "Education" },
                  { value: "Health", label: "Health" },
                  { value: "Environment", label: "Environment" },
                  { value: "Elderly Care", label: "Elderly Care" },
                  { value: "Animal Welfare", label: "Animal Welfare" },
                  {
                    value: "Poverty Alleviation",
                    label: "Poverty Alleviation",
                  },
                ]}
              />
            </div>
          </div>

          {/* Row 2: Pending Status and Action Buttons */}
          <div className="pt-6 flex items-center justify-between">
            {/* Left: Pending Status Badge */}
            <div className="flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">
                  1 Pending Registrations
                </div>
                <div className="text-xs text-gray-600">
                  NGOs awaiting approval
                </div>
              </div>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                Review Applications
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Bulk Approve
              </button>
            </div>
          </div>
        </div>

        <div className="h-px bg-gray-200 my-8"></div>

        {/* Performance Metrics */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-left">
            Performance Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">92.5%</div>
                  <div className="text-sm font-medium text-gray-600 mt-1">
                    Completion Rate
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-lg">📊</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">18 hrs</div>
                  <div className="text-sm font-medium text-gray-600 mt-1">
                    Avg. Response Time
                  </div>
                </div>
                <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <span className="text-hf-green text-lg">⏱️</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {ngoData.length}
                  </div>
                  <div className="text-sm font-medium text-gray-600 mt-1">
                    Total NGOs
                  </div>
                </div>
                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 text-lg">🏢</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NGO List */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              NGO Directory
            </h2>
            <div className="text-sm text-gray-500">
              {ngoData.length} organizations
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-center font-semibold text-gray-700 text-sm uppercase tracking-wider">
                      Organization
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-700 text-sm uppercase tracking-wider">
                      Service Areas
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-700 text-sm uppercase tracking-wider">
                      Beneficiaries
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-700 text-sm uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {ngoData.map((ngo) => (
                    <tr
                      key={ngo.id}
                      onClick={() => handleViewNgo(ngo)}
                      className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                        ngo.status === "Deactivated"
                          ? "bg-red-50 opacity-70"
                          : ""
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold text-gray-900">
                            {ngo.name}
                          </div>
                          <div className="text-sm text-gray-500 font-mono mt-1">
                            {ngo.registrationNo}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {ngo.serviceAreas.slice(0, 2).map((area, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {area}
                            </span>
                          ))}
                          {ngo.serviceAreas.length > 2 && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                              +{ngo.serviceAreas.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-700">
                          {ngo.beneficiaries}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(ngo.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* HeroUI Drawer as Right Sidebar */}
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        hideCloseButton={true}
        placement="right"
        classNames={{
          base: "w-[400px] !max-w-[400px] overflow-y-scroll scrollbar-hide",
          backdrop: "bg-black/50",
        }}
      >
        <DrawerContent className="bg-white no-scrollbar">
          {(_onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1 no-scrollbar border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">
                    NGO Details
                  </h2>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Registration Details
                  </span>
                  {selectedNgo && getStatusBadge(selectedNgo.status)}
                </div>
              </DrawerHeader>

              <DrawerBody className="px-6 py-4 space-y-6 overflow-y-auto no-scrollbar">
                {selectedNgo && (
                  <>
                    {/* Organization Overview */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border border-blue-100">
                      <h3 className="font-semibold text-gray-900 text-md mb-2">
                        {selectedNgo.name}
                      </h3>
                      <div className="text-sm text-gray-600">
                        <div className="font-mono text-xs bg-white px-2 py-1 rounded border inline-block">
                          {selectedNgo.registrationNo}
                        </div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
                        Contact Information
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-start space-x-2">
                          <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-blue-600 text-xs">📧</span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-medium text-gray-500 uppercase">
                              Email
                            </div>
                            <div className="text-sm text-gray-900 break-words">
                              {selectedNgo.email}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <div className="w-6 h-6 bg-emerald-50 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-hf-green text-xs">📞</span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-medium text-gray-500 uppercase">
                              Phone
                            </div>
                            <div className="text-sm text-gray-900">
                              {selectedNgo.phone}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-purple-600 text-xs">📍</span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-medium text-gray-500 uppercase">
                              Address
                            </div>
                            <div className="text-sm text-gray-900">
                              {selectedNgo.address}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Service Areas */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
                        Service Areas
                      </h3>
                      <div className="flex flex-wrap gap-1">
                        {selectedNgo.serviceAreas.map((area, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-emerald-50 text-hf-green border border-emerald-100"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Beneficiaries */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
                        Beneficiaries
                      </h3>
                      <div className="text-sm text-gray-900 bg-orange-50 px-3 py-2 rounded border border-orange-200">
                        {selectedNgo.beneficiaries}
                      </div>
                    </div>

                    {/* Volunteers */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
                        Volunteers ({selectedNgo.volunteers.length})
                      </h3>
                      <div className="space-y-1">
                        {selectedNgo.volunteers.map((volunteer, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded border border-gray-200"
                          >
                            <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                              {volunteer
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <span className="font-medium text-sm">
                              {volunteer}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default NgoPage;
