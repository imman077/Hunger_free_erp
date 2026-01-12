import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  DrawerContent,
  DrawerBody,
  useDisclosure,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import ReusableTable from "../../../../global/components/resuable-components/table";
import ReusableButton from "../../../../global/components/resuable-components/button";
import { Plus, Filter, ChevronDown, X } from "lucide-react";

type VolunteerStatus = "available" | "on-leave" | "busy";

const STATUS_OPTIONS: VolunteerStatus[] = ["available", "on-leave", "busy"];
const ZONE_OPTIONS = ["North", "East", "South", "West", "Central"];

interface Volunteer {
  id: number;
  name: string;
  zone: string;
  volunteerAreas: string[];
  tasksCompleted: number;
  rating: string;
  status: VolunteerStatus;
  email: string;
  phone: string;
  address: string;
  vehicle: string;
  license: string;
}

const volunteersData: Volunteer[] = [
  {
    id: 0,
    name: "Arun Vijay",
    zone: "North",
    volunteerAreas: ["Anna Nagar", "Ambattur"],
    tasksCompleted: 45,
    rating: "4.8",
    status: "available",
    email: "arun.v@example.in",
    phone: "+91-98765-43210",
    address: "West Main Road, Anna Nagar, Chennai, TN, 600040",
    vehicle: "Swift (Car)",
    license: "TN 01 AB 1234",
  },
  {
    id: 1,
    name: "Sowmya Rajan",
    zone: "East",
    volunteerAreas: ["Besant Nagar", "Adyar"],
    tasksCompleted: 30,
    rating: "4.5",
    status: "on-leave",
    email: "sowmya.r@example.in",
    phone: "+91-98765-43211",
    address: "Elliot's Beach Road, Besant Nagar, Chennai, TN, 600090",
    vehicle: "Jupiter (Two-wheeler)",
    license: "TN 02 CD 5678",
  },
  {
    id: 2,
    name: "Manikandan",
    zone: "South",
    volunteerAreas: ["S.S. Colony", "K.Pudur"],
    tasksCompleted: 60,
    rating: "4.9",
    status: "available",
    email: "mani.k@example.in",
    phone: "+91-98765-43212",
    address: "Talaikulam, Madurai, TN, 625002",
    vehicle: "Xpulse (Two-wheeler)",
    license: "TN 59 XY 9012",
  },
  {
    id: 3,
    name: "Siddarth",
    zone: "West",
    volunteerAreas: ["RS Puram", "Gandhipuram"],
    tasksCompleted: 22,
    rating: "4.2",
    status: "available",
    email: "sid.v@example.in",
    phone: "+91-98765-43213",
    address: "DB Road, RS Puram, Coimbatore, TN, 641002",
    vehicle: "Thar (SUV)",
    license: "TN 37 AB 3456",
  },
  {
    id: 4,
    name: "Janani Iyer",
    zone: "Central",
    volunteerAreas: ["Thillai Nagar", "Woraiyur"],
    tasksCompleted: 50,
    rating: "4.7",
    status: "busy",
    email: "janani.i@example.in",
    phone: "+91-98765-43214",
    address: "Main Road, Thillai Nagar, Trichy, TN, 620018",
    vehicle: "Baleno (Car)",
    license: "TN 45 AB 7890",
  },
];

const VolunteersPage: React.FC = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeVolunteer, setActiveVolunteer] = useState<Volunteer | null>(
    volunteersData[0]
  );
  const [weeklyHours, setWeeklyHours] = useState(45);
  const [onLeaveToggle, setOnLeaveToggle] = useState(false);

  // Filter States
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterZone, setFilterZone] = useState("All");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (filterType: string) => {
    setActiveFilters((prev) =>
      prev.includes(filterType)
        ? prev.filter((f) => f !== filterType)
        : [...prev, filterType]
    );
    if (filterType === "status") setFilterStatus("All");
    if (filterType === "zone") setFilterZone("All");
  };

  const filteredVolunteers = volunteersData.filter((vol) => {
    const matchStatus =
      !activeFilters.includes("status") ||
      filterStatus === "All" ||
      vol.status === filterStatus.toLowerCase();
    const matchZone =
      !activeFilters.includes("zone") ||
      filterZone === "All" ||
      vol.zone === filterZone;
    return matchStatus && matchZone;
  });

  const openDrawer = (vol: Volunteer) => {
    setActiveVolunteer(vol);
    onOpen();
  };

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeeklyHours(Number(e.target.value));
  };

  const toggleOnLeave = () => {
    setOnLeaveToggle((prev: boolean) => !prev);
  };

  const getStatusBadge = (status: VolunteerStatus): React.ReactElement => {
    const statusStyles: Record<
      VolunteerStatus,
      { backgroundColor: string; color: string; border: string }
    > = {
      available: {
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        color: "#22c55e",
        border: "1px solid rgba(34, 197, 94, 0.2)",
      },
      "on-leave": {
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        color: "#ef4444",
        border: "1px solid rgba(239, 68, 68, 0.2)",
      },
      busy: {
        backgroundColor: "rgba(245, 158, 11, 0.1)",
        color: "#f59e0b",
        border: "1px solid rgba(245, 158, 11, 0.2)",
      },
    };

    const statusLabels: Record<VolunteerStatus, string> = {
      available: "Available",
      "on-leave": "On Leave",
      busy: "Busy",
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
        {statusLabels[status]}
      </span>
    );
  };

  const renderStars = (rating: string) => {
    return (
      <div className="flex items-center">
        <div className="inline-flex gap-1">
          <span className="text-amber-400 text-sm">★</span>
          <span className="text-amber-400 text-sm">★</span>
          <span className="text-amber-400 text-sm">★</span>
          <span className="text-amber-400 text-sm">★</span>
          <span className="text-sm" style={{ color: "var(--border-color)" }}>
            ★
          </span>
        </div>
        <span className="text-xs ml-1" style={{ color: "var(--text-muted)" }}>
          {rating}
        </span>
      </div>
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
            Volunteer Management
          </h1>
          <p className="mt-2" style={{ color: "var(--text-muted)" }}>
            Manage and track volunteer profiles
          </p>
        </div>
        <Button
          color="primary"
          className="bg-hf-green text-white rounded-sm h-10 px-6 font-bold hover:bg-emerald-600 transition-all active:scale-95"
          style={{ backgroundColor: "#22c55e", color: "white" }}
          endContent={<Plus size={18} />}
          onPress={() => navigate("/admin/users/volunteers/create")}
        >
          Add New Volunteer
        </Button>
      </div>

      {/* Volunteer Table */}
      <ReusableTable
        data={filteredVolunteers}
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
                  key="zone"
                  isDisabled={activeFilters.includes("zone")}
                  startContent={<Filter size={14} />}
                >
                  ZONE
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
                      label: status.toUpperCase(),
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

            {activeFilters.includes("zone") && (
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    variant="flat"
                    className="border border-blue-100 bg-blue-50/50 rounded-sm h-10 px-3 text-[11px] font-bold text-blue-600 hover:bg-blue-100 transition-all shadow-none"
                    endContent={<ChevronDown size={14} />}
                  >
                    ZONE: {filterZone.toUpperCase()}
                    <div
                      className="ml-2 hover:bg-blue-200 rounded-full p-0.5 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFilter("zone");
                      }}
                    >
                      <X size={12} />
                    </div>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Filter by Zone"
                  selectionMode="single"
                  selectedKeys={[filterZone]}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] as string;
                    setFilterZone(selected || "All");
                  }}
                  items={[
                    { key: "All", label: "All Zones" },
                    ...ZONE_OPTIONS.map((zone) => ({
                      key: zone,
                      label: zone.toUpperCase(),
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
          </div>
        }
        columns={[
          { name: "Volunteer", uid: "name", sortable: true, align: "start" },
          {
            name: "Volunteer Areas",
            uid: "volunteerAreas",
            sortable: false,
            align: "center",
          },
          {
            name: "Availability",
            uid: "status",
            sortable: false,
            align: "center",
          },
          { name: "Email", uid: "email", sortable: true },
          { name: "Phone", uid: "phone" },
          { name: "Actions", uid: "actions", sortable: false },
        ]}
        renderCell={(vol: Volunteer, columnKey: React.Key) => {
          switch (columnKey) {
            case "name":
              return (
                <div
                  className="flex items-center gap-2 px-2 py-1 rounded-full bg-slate-50 border border-slate-200 hover:border-hf-green/50 hover:bg-white transition-all cursor-pointer group w-fit min-w-0"
                  onClick={() => openDrawer(vol)}
                >
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white bg-gradient-to-br from-emerald-400 to-teal-600 shadow-sm shrink-0">
                    {vol.name
                      .split(" ")
                      .map((p) => p[0])
                      .join("")}
                  </div>
                  <span
                    className="font-bold text-xs whitespace-nowrap truncate max-w-[140px] pr-1 group-hover:text-hf-green transition-colors"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {vol.name}
                  </span>
                </div>
              );
            case "volunteerAreas":
              return (
                <div className="flex flex-wrap gap-1 justify-center">
                  {vol.volunteerAreas.map((area, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-[#22c55e] border border-emerald-100"
                    >
                      {area.toUpperCase()}
                    </span>
                  ))}
                </div>
              );
            case "zone":
              return (
                <span
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {vol.zone}
                </span>
              );
            case "tasksCompleted":
              return (
                <span
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {vol.tasksCompleted}
                </span>
              );
            case "rating":
              return renderStars(vol.rating);
            case "status":
              return (
                <div className="flex justify-center w-full">
                  {getStatusBadge(vol.status)}
                </div>
              );
            case "email":
            case "phone":
              return (
                <span
                  className="text-xs whitespace-nowrap"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {String(vol[columnKey as keyof Volunteer])}
                </span>
              );
            default:
              return (
                <span
                  className="text-xs font-medium"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {String(vol[columnKey as keyof Volunteer])}
                </span>
              );
          }
        }}
        actionConfig={{
          showView: true,
          showApprove: true,
          showDeactivate: true,
          onView: openDrawer,
          onApprove: (vol) => console.log("Approve", vol),
          onDeactivate: (vol) => console.log("Deactivate", vol),
        }}
      />

      {/* HeroUI Drawer */}
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        hideCloseButton={true}
        placement="right"
        classNames={{
          base: "w-[350px] !max-w-[350px]",
          backdrop: "bg-black/50",
        }}
      >
        <DrawerContent
          className="no-scrollbar"
          style={{ backgroundColor: "var(--bg-primary)" }}
        >
          {() => (
            <>
              <DrawerBody className="px-6 py-4 space-y-6 overflow-y-auto no-scrollbar">
                {activeVolunteer && (
                  <>
                    {/* Stats */}
                    <div
                      className="mb-3 pb-3 border-b flex flex-row justify-between px-2"
                      style={{ borderBottomColor: "var(--border-color)" }}
                    >
                      <div className="mb-4">
                        <h3
                          className="text-sm font-semibold mb-1"
                          style={{ color: "var(--text-muted)" }}
                        >
                          Completion Rate
                        </h3>
                        <div className="text-2xl font-black text-blue-500">
                          92%
                        </div>
                      </div>
                      <div>
                        <h3
                          className="text-sm font-semibold mb-1"
                          style={{ color: "var(--text-muted)" }}
                        >
                          Average Rating
                        </h3>
                        <div className="flex items-center gap-2 justify-center">
                          <div className="text-2xl font-black text-blue-500">
                            {activeVolunteer.rating}
                          </div>
                          <div className="inline-flex gap-1">
                            <span className="text-amber-400 text-sm">★</span>
                            <span className="text-amber-400 text-sm">★</span>
                            <span className="text-amber-400 text-sm">★</span>
                            <span className="text-amber-400 text-sm">★</span>
                            <span className="text-gray-300 text-sm">★</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Availability Management */}
                    <div
                      className="mb-2 pb-6 border-b"
                      style={{ borderBottomColor: "var(--border-color)" }}
                    >
                      <h3
                        className="font-semibold mb-3"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Availability Management
                      </h3>
                      <p
                        className="text-sm mb-4"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Adjust volunteer&apos;s working hours and status.
                      </p>

                      <div className="mb-4">
                        <div className="flex flex-row justify-between">
                          <label
                            className="text-sm font-medium block mb-2"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            Weekly Hours
                          </label>
                          <div
                            className="text-right text-sm font-semibold mt-1"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {weeklyHours} hours
                          </div>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={60}
                          value={weeklyHours}
                          onChange={handleHoursChange}
                          className="w-full"
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          className="text-sm font-medium flex justify-between mb-2"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          <span>On Leave</span>
                          <button
                            type="button"
                            onClick={toggleOnLeave}
                            className={`inline-flex items-center h-[10px] w-[40px] rounded-full px-[2px] transition-colors ${
                              onLeaveToggle
                                ? "bg-blue-500 justify-end hover:bg-blue-500"
                                : "bg-gray-300 justify-start hover:bg-gray-300"
                            }`}
                          >
                            <span className="h-[18px] w-[18px] rounded-full bg-white shadow-sm" />
                          </button>
                        </label>
                      </div>

                      <ReusableButton
                        variant="primary"
                        size="md"
                        onClick={() => console.log("Update Availability")}
                      >
                        Update Availability
                      </ReusableButton>
                    </div>

                    {/* Volunteer Details */}
                    <div className="text-left">
                      <h3
                        className="font-bold text-xl mb-2"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Volunteer Details
                      </h3>
                      <p
                        className="text-sm mb-4"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Comprehensive profile information for{" "}
                        {activeVolunteer.name}.
                      </p>

                      <div className="space-y-6 text-sm">
                        {/* Personal Info */}
                        <div className="space-y-1">
                          <h4
                            className="text-sm font-semibold mb-2"
                            style={{ color: "var(--text-primary)" }}
                          >
                            Personal Information
                          </h4>
                          <p style={{ color: "var(--text-secondary)" }}>
                            {activeVolunteer.email}
                          </p>
                          <p style={{ color: "var(--text-secondary)" }}>
                            {activeVolunteer.phone}
                          </p>
                          <p style={{ color: "var(--text-secondary)" }}>
                            {activeVolunteer.address}
                          </p>
                        </div>

                        {/* Vehicle Info */}
                        <div className="space-y-1">
                          <h4
                            className="text-sm font-semibold mb-2"
                            style={{ color: "var(--text-primary)" }}
                          >
                            Vehicle Details
                          </h4>
                          <p style={{ color: "var(--text-secondary)" }}>
                            Type: {activeVolunteer.vehicle}
                          </p>
                          <p style={{ color: "var(--text-secondary)" }}>
                            License Plate: {activeVolunteer.license}
                          </p>
                        </div>

                        {/* Assigned Tasks */}
                        <div>
                          <h4
                            className="text-sm font-semibold mb-2"
                            style={{ color: "var(--text-primary)" }}
                          >
                            Assigned Tasks
                          </h4>
                          <ul
                            className="space-y-1"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            <li>• Food Distribution - Elm Street Shelter</li>
                            <li>• Community Cleanup – Central Park</li>
                          </ul>
                        </div>
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

export default VolunteersPage;
