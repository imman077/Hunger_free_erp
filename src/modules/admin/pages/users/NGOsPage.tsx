import React, { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
} from "@heroui/react";
import { ImpactCards } from "../../../../global/components/resuable-components/ImpactCards";
import ReusableTable from "../../../../global/components/resuable-components/table";
import ReusableButton from "../../../../global/components/resuable-components/button";

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

  const pendingCount = ngoData.filter((ngo) => ngo.status === "Pending").length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-left">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">
          NGO Management
        </h1>
        <p className="text-gray-600 mt-2">
          Monitor and manage NGO registrations
        </p>
      </div>

      {/* Pending Status Banner */}
      {pendingCount > 0 && (
        <div className="flex items-center justify-between bg-blue-50 px-4 py-3 rounded-lg border border-blue-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-white"
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
                {pendingCount} Pending Registration
                {pendingCount !== 1 ? "s" : ""}
              </div>
              <div className="text-xs text-gray-600">
                NGOs awaiting approval
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ReusableButton
              variant="ghost"
              size="md"
              onClick={() => console.log("Review Applications")}
            >
              Review Applications
            </ReusableButton>
            <ReusableButton
              variant="primary"
              size="md"
              onClick={() => console.log("Bulk Approve")}
            >
              Bulk Approve
            </ReusableButton>
          </div>
        </div>
      )}

      {/* Performance Metrics */}
      <ImpactCards
        data={[
          {
            label: "Completion Rate",
            val: "92.5%",
            trend: "Program success rate",
            color: "bg-blue-500",
          },
          {
            label: "Avg. Response Time",
            val: "18 hrs",
            trend: "Application processing",
            color: "bg-[#22c55e]",
          },
          {
            label: "Total NGOs",
            val: ngoData.length.toString(),
            trend: "Registered organizations",
            color: "bg-purple-500",
          },
        ]}
      />

      {/* NGO Table */}
      <ReusableTable
        data={ngoData}
        columns={[
          { name: "Organization", uid: "name", sortable: true },
          { name: "Registration No", uid: "registrationNo", sortable: true },
          { name: "Service Areas", uid: "serviceAreas", sortable: false },
          { name: "Beneficiaries", uid: "beneficiaries", sortable: true },
          { name: "Status", uid: "status", sortable: true },
          { name: "Actions", uid: "actions", sortable: false },
        ]}
        renderCell={(ngo: Ngo, columnKey: React.Key) => {
          switch (columnKey) {
            case "name":
              return (
                <div className="font-semibold text-gray-900">{ngo.name}</div>
              );
            case "registrationNo":
              return (
                <div className="text-sm text-gray-500 font-mono">
                  {ngo.registrationNo}
                </div>
              );
            case "serviceAreas":
              return (
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
              );
            case "beneficiaries":
              return (
                <span className="text-sm text-gray-700">
                  {ngo.beneficiaries}
                </span>
              );
            case "status":
              return getStatusBadge(ngo.status);
            default:
              return <span>{String(ngo[columnKey as keyof Ngo])}</span>;
          }
        }}
        // title="NGO Directory"
        // description={`${ngoData.length} registered organizations`}
        actionConfig={{
          showView: true,
          showMessage: true,
          showApprove: true,
          showDeactivate: true,
          onView: handleViewNgo,
          onMessage: (ngo) => console.log("Message", ngo),
          onApprove: (ngo) => console.log("Approve", ngo),
          onDeactivate: (ngo) => console.log("Deactivate", ngo),
        }}
      />

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
