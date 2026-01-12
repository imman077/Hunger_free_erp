import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { ImpactCards } from "../../../../global/components/resuable-components/ImpactCards";
import ReusableTable from "../../../../global/components/resuable-components/table";
import { Plus, Filter, ChevronDown, X } from "lucide-react";

const STATUS_OPTIONS: NgoStatus[] = ["Active", "Pending", "Deactivated"];
const BENEFICIARY_OPTIONS = [
  "Children & Youth",
  "Local Communities",
  "Senior Citizens",
  "Stray Animals",
  "Low-Income Communities",
];

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
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedNgo, setSelectedNgo] = useState<Ngo | null>(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterBeneficiaries, setFilterBeneficiaries] = useState("All");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const ngoData: Ngo[] = [
    {
      id: 1,
      name: "Agaram Foundation",
      registrationNo: "REG-TN-2006-112",
      serviceAreas: ["Education", "Youth Development"],
      beneficiaries: "Children & Youth",
      status: "Active",
      email: "info@agaram.foundation",
      phone: "+91-44-2431-1515",
      address: "T. Nagar, Chennai, Tamil Nadu",
      volunteers: ["Suriya Sivakumar", "Jyothika"],
    },
    {
      id: 2,
      name: "Siruthuli",
      registrationNo: "NGO-TN-2003-045",
      serviceAreas: ["Water Conservation", "Afforestation"],
      beneficiaries: "Local Communities",
      status: "Pending",
      email: "contact@siruthuli.com",
      phone: "+91-422-230-1122",
      address: "Ettimadai, Coimbatore, Tamil Nadu",
      volunteers: ["Vanitha Mohan", "Ravi Sam"],
    },
    {
      id: 3,
      name: "Udhavum Ullangal",
      registrationNo: "REG-TN-2000-882",
      serviceAreas: ["Cancer Care", "Education Support"],
      beneficiaries: "Low-Income Communities",
      status: "Active",
      email: "care@udhavumullangal.org",
      phone: "+91-44-2222-3333",
      address: "Purasawalkam, Chennai, Tamil Nadu",
      volunteers: ["Bankar Sankar", "Kavitha"],
    },
    {
      id: 4,
      name: "Blue Cross of India",
      registrationNo: "AWB-TN-1964-001",
      serviceAreas: ["Animal Welfare", "Shelter"],
      beneficiaries: "Stray Animals",
      status: "Active",
      email: "rescue@bluecross.org.in",
      phone: "+91-44-2235-4959",
      address: "Velachery, Chennai, Tamil Nadu",
      volunteers: ["Chinny Krishna", "Amala Akkineni"],
    },
    {
      id: 5,
      name: "Madurai Seed",
      registrationNo: "REG-TN-2010-441",
      serviceAreas: ["After-school Education", "Arts"],
      beneficiaries: "Children & Youth",
      status: "Active",
      email: "seed@maduraiseed.org",
      phone: "+91-452-251-1111",
      address: "Karumbalai, Madurai, Tamil Nadu",
      volunteers: ["Karthik", "Sangeetha"],
    },
  ];

  const handleViewNgo = (ngo: Ngo): void => {
    setSelectedNgo(ngo);
    onOpen();
  };

  const toggleFilter = (filterType: string) => {
    setActiveFilters((prev) =>
      prev.includes(filterType)
        ? prev.filter((f) => f !== filterType)
        : [...prev, filterType]
    );
    if (filterType === "status") setFilterStatus("All");
    if (filterType === "beneficiaries") setFilterBeneficiaries("All");
  };

  const filteredNgos = ngoData.filter((ngo) => {
    const matchStatus =
      !activeFilters.includes("status") ||
      filterStatus === "All" ||
      ngo.status === filterStatus;
    const matchBeneficiaries =
      !activeFilters.includes("beneficiaries") ||
      filterBeneficiaries === "All" ||
      ngo.beneficiaries === filterBeneficiaries;
    return matchStatus && matchBeneficiaries;
  });

  const getStatusBadge = (status: NgoStatus): React.ReactElement => {
    const statusStyles: Record<
      NgoStatus,
      { backgroundColor: string; color: string; border: string }
    > = {
      Active: {
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        color: "#22c55e",
        border: "1px solid rgba(34, 197, 94, 0.2)",
      },
      Pending: {
        backgroundColor: "rgba(234, 179, 8, 0.1)",
        color: "#ca8a04",
        border: "1px solid rgba(234, 179, 8, 0.2)",
      },
      Deactivated: {
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        color: "#ef4444",
        border: "1px solid rgba(239, 68, 68, 0.2)",
      },
    };

    const style = statusStyles[status];

    return (
      <span
        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
        style={{
          backgroundColor: style.backgroundColor,
          color: style.color,
          border: style.border,
        }}
      >
        {status}
      </span>
    );
  };

  return (
    <div
      className="p-6 space-y-6 min-h-screen"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div className="text-left">
          <h1
            className="text-xl font-bold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            NGO Management
          </h1>
          <p className="mt-2" style={{ color: "var(--text-muted)" }}>
            Monitor and manage NGO registrations
          </p>
        </div>
        <Button
          color="primary"
          className="bg-hf-green text-white rounded-sm h-10 px-6 font-bold hover:bg-emerald-600 transition-all active:scale-95"
          style={{ backgroundColor: "#22c55e", color: "white" }}
          endContent={<Plus size={18} />}
          onPress={() => navigate("/admin/users/ngos/create")}
        >
          Add New NGO
        </Button>
      </div>

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
            val: filteredNgos.length.toString(),
            trend: "Current view results",
            color: "bg-purple-500",
          },
        ]}
      />

      {/* NGO Table */}
      <ReusableTable
        data={filteredNgos}
        enableFilters={false}
        additionalFilters={
          <div className="flex items-center gap-2 flex-wrap">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button
                  variant="flat"
                  className="border border-slate-200 bg-white rounded-sm h-10 px-4 text-[11px] font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-none"
                  style={{ backgroundColor: "white" }}
                  startContent={<Filter size={14} className="text-slate-400" />}
                  endContent={<Plus size={14} className="text-slate-400" />}
                >
                  ADD FILTER
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Add Filter Options"
                onAction={(key) => toggleFilter(key as string)}
                classNames={{
                  base: "bg-white border border-slate-200 rounded-sm min-w-[180px] p-1",
                }}
                itemClasses={{
                  base: [
                    "text-slate-600 text-[11px] font-bold uppercase tracking-tight",
                    "data-[hover=true]:bg-slate-50 data-[hover=true]:text-[#22c55e]",
                    "rounded-sm",
                    "px-3",
                    "py-2.5",
                    "transition-colors duration-200",
                  ].join(" "),
                }}
              >
                <DropdownItem
                  key="status"
                  isDisabled={activeFilters.includes("status")}
                  startContent={<Filter size={14} />}
                >
                  STATUS
                </DropdownItem>
                <DropdownItem
                  key="beneficiaries"
                  isDisabled={activeFilters.includes("beneficiaries")}
                  startContent={<Filter size={14} />}
                >
                  BENEFICIARIES
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

            {activeFilters.includes("status") && (
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    variant="flat"
                    className="border border-emerald-100 bg-emerald-50/50 rounded-sm h-10 px-3 text-[11px] font-bold text-[#22c55e] hover:bg-emerald-100 transition-all shadow-none"
                    endContent={<ChevronDown size={14} />}
                  >
                    STATUS: {filterStatus.toUpperCase()}
                    <div
                      className="ml-2 hover:bg-emerald-200 rounded-full p-0.5 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFilter("status");
                      }}
                    >
                      <X size={12} />
                    </div>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Filter by Status"
                  selectionMode="single"
                  selectedKeys={[filterStatus]}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] as string;
                    setFilterStatus(selected || "All");
                  }}
                  items={[
                    { key: "All", label: "All Status" },
                    ...STATUS_OPTIONS.map((status) => ({
                      key: status,
                      label: status,
                    })),
                  ]}
                  classNames={{
                    base: "bg-white border border-slate-200 rounded-sm min-w-[160px] p-1",
                  }}
                  itemClasses={{
                    base: [
                      "text-slate-600 text-[11px] font-bold uppercase tracking-tight",
                      "data-[hover=true]:bg-slate-50 data-[hover=true]:text-[#22c55e]",
                      "data-[selected=true]:bg-emerald-50 data-[selected=true]:text-[#22c55e]",
                      "rounded-sm",
                      "px-3",
                      "py-2.5",
                      "transition-colors duration-200",
                    ].join(" "),
                    selectedIcon: "text-[#22c55e] w-4 h-4 ml-auto",
                  }}
                >
                  {(item: any) => (
                    <DropdownItem key={item.key}>{item.label}</DropdownItem>
                  )}
                </DropdownMenu>
              </Dropdown>
            )}

            {activeFilters.includes("beneficiaries") && (
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    variant="flat"
                    className="border border-blue-100 bg-blue-50/50 rounded-sm h-10 px-3 text-[11px] font-bold text-blue-600 hover:bg-blue-100 transition-all shadow-none"
                    endContent={<ChevronDown size={14} />}
                  >
                    BENEFICIARIES: {filterBeneficiaries.toUpperCase()}
                    <div
                      className="ml-2 hover:bg-blue-200 rounded-full p-0.5 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFilter("beneficiaries");
                      }}
                    >
                      <X size={12} />
                    </div>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Filter by Beneficiaries"
                  selectionMode="single"
                  selectedKeys={[filterBeneficiaries]}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] as string;
                    setFilterBeneficiaries(selected || "All");
                  }}
                  items={[
                    { key: "All", label: "All Beneficiaries" },
                    ...BENEFICIARY_OPTIONS.map((opt) => ({
                      key: opt,
                      label: opt,
                    })),
                  ]}
                  classNames={{
                    base: "bg-white border border-slate-200 rounded-sm min-w-[200px] p-1",
                  }}
                  itemClasses={{
                    base: [
                      "text-slate-600 text-[11px] font-bold uppercase tracking-tight",
                      "data-[hover=true]:bg-slate-50 data-[hover=true]:text-[#22c55e]",
                      "data-[selected=true]:bg-emerald-50 data-[selected=true]:text-[#22c55e]",
                      "rounded-sm",
                      "px-3",
                      "py-2.5",
                      "transition-colors duration-200",
                    ].join(" "),
                    selectedIcon: "text-[#22c55e] w-4 h-4 ml-auto",
                  }}
                >
                  {(item: any) => (
                    <DropdownItem key={item.key}>{item.label}</DropdownItem>
                  )}
                </DropdownMenu>
              </Dropdown>
            )}
          </div>
        }
        columns={[
          { name: "Organization", uid: "name", sortable: true, align: "start" },
          { name: "Registration No", uid: "registrationNo", sortable: true },
          {
            name: "Service Areas",
            uid: "serviceAreas",
            sortable: false,
            align: "center",
          },
          { name: "Beneficiaries", uid: "beneficiaries", sortable: true },
          { name: "Status", uid: "status", sortable: false, align: "center" },
          { name: "Actions", uid: "actions", sortable: false },
        ]}
        renderCell={(ngo: Ngo, columnKey: React.Key) => {
          switch (columnKey) {
            case "name":
              return (
                <div
                  className="flex items-center gap-2 px-2 py-1 rounded-full bg-slate-50 border border-slate-200 hover:border-hf-green/50 hover:bg-white transition-all cursor-pointer group w-fit min-w-0"
                  onClick={() => handleViewNgo(ngo)}
                >
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white bg-gradient-to-br from-indigo-400 to-blue-600 shadow-sm shrink-0">
                    {ngo.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <span
                    className="font-bold text-xs whitespace-nowrap truncate max-w-[140px] pr-1 group-hover:text-hf-green transition-colors"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {ngo.name}
                  </span>
                </div>
              );
            case "registrationNo":
              return (
                <div
                  className="text-xs font-mono whitespace-nowrap"
                  style={{ color: "var(--text-muted)" }}
                >
                  {ngo.registrationNo}
                </div>
              );
            case "status":
              return (
                <div className="flex justify-center w-full">
                  {getStatusBadge(ngo.status)}
                </div>
              );
            case "serviceAreas":
              return (
                <div className="flex flex-wrap gap-1 justify-center">
                  {ngo.serviceAreas.slice(0, 2).map((area, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-100"
                    >
                      {area.toUpperCase()}
                    </span>
                  ))}
                  {ngo.serviceAreas.length > 2 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-50 text-gray-400 border border-gray-100">
                      +{ngo.serviceAreas.length - 2}
                    </span>
                  )}
                </div>
              );
            case "beneficiaries":
              return (
                <span
                  className="text-xs font-medium whitespace-nowrap"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {ngo.beneficiaries}
                </span>
              );

            default:
              return (
                <span
                  className="text-xs font-medium"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {String(ngo[columnKey as keyof Ngo])}
                </span>
              );
          }
        }}
        // title="NGO Directory"
        // description={`${ngoData.length} registered organizations`}
        actionConfig={{
          showView: true,
          showApprove: true,
          showDeactivate: true,
          onView: handleViewNgo,
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
        <DrawerContent
          className="no-scrollbar"
          style={{ backgroundColor: "var(--bg-primary)" }}
        >
          {(_onClose) => (
            <>
              <DrawerHeader
                className="flex flex-col gap-1 no-scrollbar border-b px-6 py-4"
                style={{ borderBottomColor: "var(--border-color)" }}
              >
                <div className="flex items-center justify-between">
                  <h2
                    className="text-xl font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    NGO Details
                  </h2>
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className="text-sm"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Registration Details
                  </span>
                  {selectedNgo && getStatusBadge(selectedNgo.status)}
                </div>
              </DrawerHeader>

              <DrawerBody className="px-6 py-4 space-y-6 overflow-y-auto no-scrollbar">
                {selectedNgo && (
                  <>
                    {/* Organization Overview */}
                    <div
                      className="p-3 rounded-lg border"
                      style={{
                        background:
                          "linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(99, 102, 241, 0.1))",
                        borderColor: "rgba(59, 130, 246, 0.2)",
                      }}
                    >
                      <h3
                        className="font-semibold text-md mb-2"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {selectedNgo.name}
                      </h3>
                      <div className="text-sm">
                        <div
                          className="font-mono text-xs px-2 py-1 rounded border inline-block"
                          style={{
                            backgroundColor: "var(--bg-secondary)",
                            borderColor: "var(--border-color)",
                            color: "var(--text-primary)",
                          }}
                        >
                          {selectedNgo.registrationNo}
                        </div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div>
                      <h3
                        className="text-sm font-semibold uppercase tracking-wider mb-2"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Contact Information
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-start space-x-2">
                          <div
                            className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{
                              backgroundColor: "rgba(59, 130, 246, 0.1)",
                            }}
                          >
                            <span className="text-blue-600 text-xs">📧</span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div
                              className="text-xs font-medium uppercase"
                              style={{ color: "var(--text-muted)" }}
                            >
                              Email
                            </div>
                            <div
                              className="text-sm break-words"
                              style={{ color: "var(--text-secondary)" }}
                            >
                              {selectedNgo.email}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <div
                            className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{
                              backgroundColor: "rgba(34, 197, 94, 0.1)",
                            }}
                          >
                            <span className="text-hf-green text-xs">📞</span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div
                              className="text-xs font-medium uppercase"
                              style={{ color: "var(--text-muted)" }}
                            >
                              Phone
                            </div>
                            <div
                              className="text-sm"
                              style={{ color: "var(--text-secondary)" }}
                            >
                              {selectedNgo.phone}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <div
                            className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{
                              backgroundColor: "rgba(168, 85, 247, 0.1)",
                            }}
                          >
                            <span className="text-purple-600 text-xs">📍</span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div
                              className="text-xs font-medium uppercase"
                              style={{ color: "var(--text-muted)" }}
                            >
                              Address
                            </div>
                            <div
                              className="text-sm"
                              style={{ color: "var(--text-secondary)" }}
                            >
                              {selectedNgo.address}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Service Areas */}
                    <div>
                      <h3
                        className="text-sm font-semibold uppercase tracking-wider mb-2"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Service Areas
                      </h3>
                      <div className="flex flex-wrap gap-1">
                        {selectedNgo.serviceAreas.map((area, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded text-xs font-medium border"
                            style={{
                              backgroundColor: "rgba(34, 197, 94, 0.1)",
                              color: "#22c55e",
                              borderColor: "rgba(34, 197, 94, 0.2)",
                            }}
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Beneficiaries */}
                    <div>
                      <h3
                        className="text-sm font-semibold uppercase tracking-wider mb-2"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Beneficiaries
                      </h3>
                      <div
                        className="text-sm px-3 py-2 rounded border"
                        style={{
                          backgroundColor: "rgba(249, 115, 22, 0.1)",
                          borderColor: "rgba(249, 115, 22, 0.2)",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {selectedNgo.beneficiaries}
                      </div>
                    </div>

                    {/* Volunteers */}
                    <div>
                      <h3
                        className="text-sm font-semibold uppercase tracking-wider mb-2"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Volunteers ({selectedNgo.volunteers.length})
                      </h3>
                      <div className="space-y-1">
                        {selectedNgo.volunteers.map((volunteer, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 text-sm px-3 py-2 rounded border"
                            style={{
                              backgroundColor: "var(--bg-secondary)",
                              borderColor: "var(--border-color)",
                              color: "var(--text-secondary)",
                            }}
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
