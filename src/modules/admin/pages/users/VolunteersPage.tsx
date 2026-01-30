import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import ResuableDrawer from "../../../../global/components/resuable-components/drawer";
import ReusableTable from "../../../../global/components/resuable-components/table";
import { ImpactCards } from "../../../../global/components/resuable-components/ImpactCards";
import ReusableButton from "../../../../global/components/resuable-components/button";
import ReusableInput from "../../../../global/components/resuable-components/input";
import MultiSelectDropdown from "../../../../global/components/resuable-components/multi_select_dropdown";
import {
  Plus,
  Filter,
  X,
  Eye,
  Phone,
  Settings,
  AlertTriangle,
  BarChart,
  RotateCcw,
  Save,
  User,
  Activity,
  ToggleLeft,
  ToggleRight,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";

type VolunteerStatus = "available" | "on-leave" | "busy";

const STATUS_OPTIONS: VolunteerStatus[] = ["available", "on-leave", "busy"];
const ZONE_OPTIONS = ["North", "East", "South", "West", "Central"];

const VOLUNTEER_AREAS_OPTIONS = [
  { value: "Anna Nagar", label: "Anna Nagar" },
  { value: "Ambattur", label: "Ambattur" },
  { value: "T Nagar", label: "T Nagar" },
  { value: "Velachery", label: "Velachery" },
  { value: "Adyar", label: "Adyar" },
  { value: "Mylapore", label: "Mylapore" },
  { value: "Nungambakkam", label: "Nungambakkam" },
  { value: "Porur", label: "Porur" },
];

const TASK_TYPES_OPTIONS = [
  { value: "Food Delivery", label: "Food Delivery" },
  { value: "Bulk Pickup", label: "Bulk Pickup" },
  { value: "Event Support", label: "Event Support" },
  { value: "Distribution", label: "Distribution" },
  { value: "Packaging", label: "Packaging" },
  { value: "Transport", label: "Transport" },
];

interface Volunteer {
  id: number;
  name: string;
  zone: string;
  volunteerAreas: string[];
  tasksCompleted: number;
  totalTasks: number;
  missedTasks: number;
  rating: string;
  status: VolunteerStatus;
  onLeave: boolean;
  email: string;
  phone: string;
  emergencyPhone: string;
  address: string;
  vehicle: string;
  license: string;
  createdDate: string;
  verificationStatus: "Verified" | "Pending" | "Rejected";
  lastActive: string;
  lastAssignment: string;
  allowedTaskTypes: string[];
  fuelEligibility: boolean;
  isSuspended: boolean;
  suspensionValue?: number;
  suspensionUnit?: string;
  suspensionEndTime?: number; // Unix timestamp in milliseconds
}

const volunteersData: Volunteer[] = [
  {
    id: 0,
    name: "Arun Vijay",
    zone: "North",
    volunteerAreas: ["Anna Nagar", "Ambattur"],
    tasksCompleted: 45,
    totalTasks: 50,
    missedTasks: 2,
    rating: "4.8",
    status: "available",
    onLeave: false,
    email: "arun.v@example.in",
    phone: "+91-98765-43210",
    emergencyPhone: "+91-98765-43999",
    address: "West Main Road, Anna Nagar, Chennai, TN, 600040",
    vehicle: "Swift (Car)",
    license: "TN 01 AB 1234",
    createdDate: "2023-11-12",
    verificationStatus: "Verified",
    lastActive: "2024-01-19 14:30",
    lastAssignment: "2024-01-18 10:00",
    allowedTaskTypes: ["Food Delivery", "Bulk Pickup"],
    fuelEligibility: true,
    isSuspended: false,
  },
  {
    id: 1,
    name: "Sowmya Rajan",
    zone: "East",
    volunteerAreas: ["Besant Nagar", "Adyar"],
    tasksCompleted: 30,
    totalTasks: 40,
    missedTasks: 5,
    rating: "4.5",
    status: "on-leave",
    onLeave: true,
    email: "sowmya.r@example.in",
    phone: "+91-98765-43211",
    emergencyPhone: "+91-98765-43888",
    address: "Elliot's Beach Road, Besant Nagar, Chennai, TN, 600090",
    vehicle: "Jupiter (Two-wheeler)",
    license: "TN 02 CD 5678",
    createdDate: "2023-08-20",
    verificationStatus: "Verified",
    lastActive: "2024-01-15 09:00",
    lastAssignment: "2024-01-14 16:00",
    allowedTaskTypes: ["Food Delivery"],
    fuelEligibility: false,
    isSuspended: false,
  },
  {
    id: 2,
    name: "Manikandan",
    zone: "South",
    volunteerAreas: ["S.S. Colony", "K.Pudur"],
    tasksCompleted: 60,
    totalTasks: 62,
    missedTasks: 0,
    rating: "4.9",
    status: "available",
    onLeave: false,
    email: "mani.k@example.in",
    phone: "+91-98765-43212",
    emergencyPhone: "+91-98765-43777",
    address: "Talaikulam, Madurai, TN, 625002",
    vehicle: "Xpulse (Two-wheeler)",
    license: "TN 59 XY 9012",
    createdDate: "2023-05-10",
    verificationStatus: "Verified",
    lastActive: "2024-01-19 20:00",
    lastAssignment: "2024-01-19 18:00",
    allowedTaskTypes: ["Emergency Support", "Food Delivery"],
    fuelEligibility: true,
    isSuspended: false,
  },
  {
    id: 3,
    name: "Siddarth",
    zone: "West",
    volunteerAreas: ["RS Puram", "Gandhipuram"],
    tasksCompleted: 22,
    totalTasks: 35,
    missedTasks: 8,
    rating: "4.2",
    status: "available",
    onLeave: false,
    email: "sid.v@example.in",
    phone: "+91-98765-43213",
    emergencyPhone: "+91-98765-43666",
    address: "DB Road, RS Puram, Coimbatore, TN, 641002",
    vehicle: "Thar (SUV)",
    license: "TN 37 AB 3456",
    createdDate: "2023-12-01",
    verificationStatus: "Pending",
    lastActive: "2024-01-10 12:00",
    lastAssignment: "2024-01-09 11:00",
    allowedTaskTypes: ["Bulk Pickup"],
    fuelEligibility: true,
    isSuspended: false,
  },
  {
    id: 4,
    name: "Janani Iyer",
    zone: "Central",
    volunteerAreas: ["Thillai Nagar", "Woraiyur"],
    tasksCompleted: 50,
    totalTasks: 55,
    missedTasks: 1,
    rating: "4.7",
    status: "busy",
    onLeave: false,
    email: "janani.i@example.in",
    phone: "+91-98765-43214",
    emergencyPhone: "+91-98765-43555",
    address: "Main Road, Thillai Nagar, Trichy, TN, 620018",
    vehicle: "Baleno (Car)",
    license: "TN 45 AB 7890",
    createdDate: "2023-01-30",
    verificationStatus: "Verified",
    lastActive: "2024-01-19 14:00",
    lastAssignment: "2024-01-19 11:00",
    allowedTaskTypes: ["Food Delivery", "Bulk Pickup"],
    fuelEligibility: true,
    isSuspended: true,
  },
];

const VolunteersPage: React.FC = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const {
    isOpen: isSuspenseOpen,
    onOpen: onSuspenseOpen,
    onClose: onSuspenseClose,
  } = useDisclosure();

  const [volunteers, setVolunteers] = useState<Volunteer[]>(volunteersData);
  const [activeVolunteer, setActiveVolunteer] = useState<Volunteer | null>(
    volunteers[0],
  );
  const [weeklyHours, setWeeklyHours] = useState(
    activeVolunteer?.tasksCompleted || 45,
  );
  const [onLeaveToggle, setOnLeaveToggle] = useState(
    activeVolunteer?.onLeave || false,
  );
  const [isEditMode, setIsEditMode] = useState(false);

  // Editable fields state
  const [selectedVolunteerAreas, setSelectedVolunteerAreas] = useState<
    string[]
  >([]);
  const [selectedTaskTypes, setSelectedTaskTypes] = useState<string[]>([]);
  const [editablePhone, setEditablePhone] = useState("");
  const [editableAddress, setEditableAddress] = useState("");
  const [editableEmergencyPhone, setEditableEmergencyPhone] = useState("");
  const [editableVehicle, setEditableVehicle] = useState("");
  const [editableVehicleNumber, setEditableVehicleNumber] = useState("");

  // Suspension Duration State
  const [suspensionValue, setSuspensionValue] = useState(1);
  const [suspensionUnit, setSuspensionUnit] = useState("DAYS");

  // Filter States
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterZone, setFilterZone] = useState("All");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (filterType: string) => {
    setActiveFilters((prev) =>
      prev.includes(filterType)
        ? prev.filter((f) => f !== filterType)
        : [...prev, filterType],
    );
    if (filterType === "status") setFilterStatus("All");
    if (filterType === "zone") setFilterZone("All");
  };

  const filteredVolunteers = volunteers.filter((vol) => {
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
    setWeeklyHours(40); // Reset or use vol data
    setOnLeaveToggle(vol.onLeave);
    setIsEditMode(false); // Always start in view mode
    setSelectedVolunteerAreas(vol.volunteerAreas);
    setSelectedTaskTypes(vol.allowedTaskTypes);
    setEditablePhone(vol.phone);
    setEditableAddress(vol.address);
    setEditableEmergencyPhone(vol.emergencyPhone);
    setEditableVehicle(vol.vehicle);
    setEditableVehicleNumber(vol.license);
    setIsDrawerOpen(true);
  };

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeeklyHours(Number(e.target.value));
  };

  const toggleOnLeave = () => {
    setOnLeaveToggle((prev: boolean) => !prev);
  };

  const handleToggleSuspension = () => {
    if (!activeVolunteer) return;

    const isCurrentlySuspended = activeVolunteer.isSuspended;
    const newSuspendedState = !isCurrentlySuspended;

    let suspensionEndTime: number | undefined = undefined;

    if (newSuspendedState) {
      // Calculate the end time based on suspension duration
      const now = Date.now();
      let durationInMs = 0;

      switch (suspensionUnit) {
        case "HRS":
          durationInMs = suspensionValue * 60 * 60 * 1000;
          break;
        case "DAYS":
          durationInMs = suspensionValue * 24 * 60 * 60 * 1000;
          break;
        case "MONTHS":
          durationInMs = suspensionValue * 30 * 24 * 60 * 60 * 1000;
          break;
      }

      suspensionEndTime = now + durationInMs;
    }

    // Update the list of volunteers
    const updatedVolunteers = volunteers.map((v) =>
      v.id === activeVolunteer.id
        ? {
            ...v,
            isSuspended: newSuspendedState,
            suspensionValue: newSuspendedState ? suspensionValue : undefined,
            suspensionUnit: newSuspendedState ? suspensionUnit : undefined,
            suspensionEndTime: newSuspendedState
              ? suspensionEndTime
              : undefined,
          }
        : v,
    );
    setVolunteers(updatedVolunteers);

    // Update the active volunteer
    setActiveVolunteer({
      ...activeVolunteer,
      isSuspended: newSuspendedState,
      suspensionValue: newSuspendedState ? suspensionValue : undefined,
      suspensionUnit: newSuspendedState ? suspensionUnit : undefined,
      suspensionEndTime: newSuspendedState ? suspensionEndTime : undefined,
    });

    onSuspenseClose();
  };

  // Auto-reactivation effect
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      let hasChanges = false;

      const updatedVolunteers = volunteers.map((v) => {
        if (
          v.isSuspended &&
          v.suspensionEndTime &&
          now >= v.suspensionEndTime
        ) {
          hasChanges = true;
          return {
            ...v,
            isSuspended: false,
            suspensionValue: undefined,
            suspensionUnit: undefined,
            suspensionEndTime: undefined,
          };
        }
        return v;
      });

      if (hasChanges) {
        setVolunteers(updatedVolunteers);

        // Update active volunteer if they were auto-reactivated
        if (
          activeVolunteer?.isSuspended &&
          activeVolunteer.suspensionEndTime &&
          now >= activeVolunteer.suspensionEndTime
        ) {
          setActiveVolunteer({
            ...activeVolunteer,
            isSuspended: false,
            suspensionValue: undefined,
            suspensionUnit: undefined,
            suspensionEndTime: undefined,
          });
        }
      }
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [volunteers, activeVolunteer]);

  const getStatusBadge = (status: VolunteerStatus): React.ReactElement => {
    const statusStyles: Record<
      VolunteerStatus,
      { backgroundColor: string; color: string; border: string }
    > = {
      available: {
        backgroundColor: "rgba(34, 197, 197, 0.1)", // Teal/Green
        color: "#22c55e",
        border: "1px solid rgba(34, 197, 197, 0.2)",
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

  const volunteerStats = useMemo(() => {
    const totalVolunteers = volunteers.length;
    const activeVolunteers = volunteers.filter(
      (v) => v.status === "available",
    ).length;
    const totalImpact = volunteers.reduce(
      (acc, v) => acc + v.tasksCompleted,
      0,
    );

    return [
      {
        label: "Total Force",
        val: totalVolunteers.toLocaleString(),
        trend: "Total registered members",
        color: "bg-hf-green",
      },
      {
        label: "Duty Ready",
        val: activeVolunteers.toLocaleString(),
        trend: "Currently available for tasks",
        color: "bg-hf-green",
      },
      {
        label: "Global Impact",
        val: totalImpact.toLocaleString(),
        trend: "Total tasks completed to date",
        color: "bg-hf-green",
      },
    ];
  }, [volunteers]);

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

      {/* Stats Cards */}
      <ImpactCards data={volunteerStats} />

      {/* Volunteer Table */}
      <ReusableTable
        data={filteredVolunteers}
        enableFilters={false}
        additionalFilters={
          <div className="flex items-center gap-2 flex-wrap">
            <Dropdown placement="bottom">
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
            case "actions":
              return (
                <div className="flex items-center justify-center gap-2">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    onPress={() => openDrawer(vol)}
                    className="!bg-transparent !text-slate-600 hover:!text-[#22c55e] transition-all min-w-0 h-8 w-8"
                  >
                    <Eye size={14} />
                  </Button>
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
        actionConfig={undefined}
      />

      <ResuableDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Volunteer Intelligence"
        subtitle={`Global Identifier: #VOL-${activeVolunteer?.id?.toString().padStart(4, "0") || "0000"}`}
        size="md"
        footer={
          activeVolunteer && (
            <div className="flex items-center gap-3 w-full">
              {isEditMode ? (
                <>
                  <button
                    onClick={() => setIsEditMode(false)}
                    className="flex-1 px-6 py-3 text-[10px] font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={14} />
                    Cancel
                  </button>
                  <ReusableButton
                    variant="primary"
                    className="flex-1 !bg-hf-green hover:!bg-emerald-600 px-8 py-3 !rounded-sm text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-200/50"
                    onClick={() => {
                      setIsEditMode(false);
                    }}
                    startContent={<Save size={14} />}
                  >
                    Save Changes
                  </ReusableButton>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="flex-1 px-6 py-4 text-[11px] font-black text-slate-400 hover:text-slate-600 uppercase tracking-[0.2em] transition-colors"
                  >
                    Dismiss
                  </button>
                  <div className="flex-[2] relative">
                    <ReusableButton
                      variant="primary"
                      className="w-full !bg-hf-green hover:!bg-emerald-600 px-8 py-4 !rounded-sm text-[10px] font-black uppercase tracking-[0.15em] shadow-xl shadow-emerald-200/50 transition-all active:scale-95 flex items-center justify-center gap-2"
                      onClick={() => setIsEditMode(true)}
                    >
                      <div className="p-1 rounded-full bg-white/20">
                        <Settings size={12} className="text-white" />
                      </div>
                      EDIT PROFILE
                    </ReusableButton>
                  </div>
                </>
              )}
            </div>
          )
        }
      >
        {activeVolunteer && (
          <div className="flex flex-col relative z-10 text-start pb-8 px-3 sm:px-6">
            {/* Immersive Background Decorations */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-hf-green/5 blur-[120px] rounded-sm -mr-48 -mt-48" />
              <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-emerald-500/5 blur-[100px] rounded-sm -ml-32" />
            </div>

            {/* Elite Hero Section */}
            <div className="pt-4 pb-1.5 flex flex-col items-center">
              <div className="relative mb-4 group">
                <div className="absolute inset-[-10px] bg-hf-green/5 blur-2xl rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative w-24 h-24 p-1.5 rounded-sm bg-emerald-50 transform transition-transform duration-500 group-hover:scale-105">
                  <div className="w-full h-full rounded-sm bg-hf-green flex items-center justify-center relative overflow-hidden">
                    <span className="text-4xl font-black text-white italic">
                      {activeVolunteer.name.charAt(0)}
                    </span>
                  </div>
                </div>
                {/* Status Float */}
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-white p-1 rounded-sm border border-slate-100 ring-2 ring-slate-50 shadow-sm z-20 whitespace-nowrap">
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-hf-green/10 rounded-sm">
                    <div className="w-1.5 h-1.5 rounded-sm bg-hf-green animate-pulse" />
                    <span className="text-[9px] font-black text-hf-green uppercase tracking-tighter">
                      Live Portal
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-3 max-w-sm">
                <div className="space-y-0.5 w-full flex flex-col items-center">
                  <h3 className="text-2xl font-black text-slate-900 leading-[1.05] tracking-tight">
                    {activeVolunteer.name}
                  </h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                    Global Identifier: #VOL-
                    {activeVolunteer.id.toString().padStart(4, "0")}
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2">
                  {getStatusBadge(activeVolunteer.status)}
                </div>
              </div>
            </div>

            <div className="p-0 space-y-8 relative z-10">
              {/* Identity & Timeline Block */}
              <section className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-sm bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 shadow-sm shrink-0">
                    <User size={16} strokeWidth={2.5} />
                  </div>
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">
                    Identity & Account
                  </h4>
                </div>
                <div className="bg-white px-4 py-1.5 rounded-sm border border-slate-200 shadow-sm divide-y divide-slate-50/50">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-[8px] font-black uppercase text-slate-400">
                      Verification
                    </span>
                    <span
                      className={`text-[10px] font-black ${activeVolunteer.verificationStatus === "Verified" ? "text-emerald-600" : "text-amber-600"} uppercase`}
                    >
                      {activeVolunteer.verificationStatus}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-[8px] font-black uppercase text-slate-400">
                      Onboarded
                    </span>
                    <span className="text-[10px] font-black text-slate-800 uppercase">
                      {activeVolunteer.createdDate}
                    </span>
                  </div>
                </div>
              </section>

              {/* Performance Metrics Section */}
              {!isEditMode && (
                <section className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-sm bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm shrink-0">
                      <BarChart size={16} strokeWidth={2.5} />
                    </div>
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">
                      Performance Metrics
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 min-[450px]:grid-cols-2 gap-1.5">
                    <div className="bg-white p-3 rounded-sm border border-slate-200 shadow-sm">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">
                        Success Rate
                      </p>
                      <p className="text-[11px] font-black text-slate-900 uppercase">
                        92%
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded-sm border border-slate-200 shadow-sm">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">
                        Total Tasks
                      </p>
                      <p className="text-[11px] font-black text-slate-900 uppercase">
                        {activeVolunteer.totalTasks}
                      </p>
                    </div>
                  </div>
                </section>
              )}

              {/* Operational Control block */}
              <section className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-sm bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shadow-sm shrink-0">
                    <Activity size={16} strokeWidth={2.5} />
                  </div>
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">
                    Operational Control
                  </h4>
                </div>
                <div className="grid grid-cols-1 min-[450px]:grid-cols-2 gap-1.5">
                  {isEditMode ? (
                    <div className="col-span-2 space-y-4 bg-white p-4 rounded-sm border border-slate-200 shadow-sm">
                      <div className="space-y-3">
                        <label className="text-[8px] font-black uppercase text-slate-400 tracking-widest">
                          Weekly Capacity
                        </label>
                        <div className="flex items-center gap-4">
                          <input
                            type="range"
                            min={0}
                            max={60}
                            value={weeklyHours}
                            onChange={handleHoursChange}
                            className="flex-1 h-1.5 bg-slate-100 rounded-sm appearance-none accent-hf-green"
                          />
                          <span className="text-[10px] font-black text-hf-green min-w-[50px]">
                            {weeklyHours}h/wk
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-sm">
                        <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest">
                          Duty Status
                        </span>
                        <button
                          onClick={toggleOnLeave}
                          className={`p-1 transition-all ${onLeaveToggle ? "text-hf-green" : "text-rose-500"}`}
                        >
                          {onLeaveToggle ? (
                            <ToggleRight size={24} />
                          ) : (
                            <ToggleLeft size={24} />
                          )}
                        </button>
                      </div>
                      <MultiSelectDropdown
                        label="Active Areas"
                        value={selectedVolunteerAreas}
                        onChange={setSelectedVolunteerAreas}
                        options={VOLUNTEER_AREAS_OPTIONS}
                      />
                      <MultiSelectDropdown
                        label="Task Authority"
                        value={selectedTaskTypes}
                        onChange={setSelectedTaskTypes}
                        options={TASK_TYPES_OPTIONS}
                      />
                    </div>
                  ) : (
                    <>
                      <div className="bg-white p-3 rounded-sm border border-slate-200 shadow-sm">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">
                          Weekly Load
                        </p>
                        <p className="text-[11px] font-black text-slate-900 uppercase">
                          {weeklyHours}h/wk
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded-sm border border-slate-200 shadow-sm">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">
                          Status
                        </p>
                        <p
                          className={`text-[11px] font-black uppercase ${onLeaveToggle ? "text-hf-green" : "text-rose-500"}`}
                        >
                          {onLeaveToggle ? "Active" : "On Leave"}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </section>

              {/* Connectivity and Logistics */}
              <section className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-sm bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shadow-sm shrink-0">
                    <Phone size={16} strokeWidth={2.5} />
                  </div>
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">
                    Connectivity & Logistics
                  </h4>
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  {isEditMode ? (
                    <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-sm space-y-4">
                      <ReusableInput
                        label="Phone Number"
                        value={editablePhone}
                        onChange={setEditablePhone}
                      />
                      <ReusableInput
                        label="Address"
                        value={editableAddress}
                        onChange={setEditableAddress}
                      />
                      <ReusableInput
                        label="Emergency Contact"
                        value={editableEmergencyPhone}
                        onChange={setEditableEmergencyPhone}
                      />
                      <ReusableInput
                        label="Vehicle Model"
                        value={editableVehicle}
                        onChange={setEditableVehicle}
                      />
                      <ReusableInput
                        label="Vehicle Number"
                        value={editableVehicleNumber}
                        onChange={setEditableVehicleNumber}
                      />
                    </div>
                  ) : (
                    <div className="bg-white p-1 rounded-sm border border-slate-200 shadow-sm divide-y divide-slate-100">
                      <div className="p-3">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">
                          Contact Details
                        </p>
                        <p className="text-[11px] font-black text-slate-800 uppercase">
                          {activeVolunteer.phone}
                        </p>
                        <p className="text-[11px] font-black text-slate-500 uppercase mt-1">
                          {activeVolunteer.address}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* Action - Suspension */}
              {!isEditMode && (
                <section className="pb-6">
                  <button
                    onClick={onSuspenseOpen}
                    className={`w-full px-4 py-3 ${activeVolunteer.isSuspended ? "bg-rose-500 hover:bg-rose-600" : "bg-hf-green hover:bg-emerald-600"} text-white rounded-sm text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2`}
                  >
                    {activeVolunteer.isSuspended ? (
                      <RotateCcw size={14} />
                    ) : (
                      <AlertTriangle size={14} />
                    )}
                    {activeVolunteer.isSuspended
                      ? "REACTIVATE VOLUNTEER"
                      : "SUSPEND VOLUNTEER"}
                  </button>
                </section>
              )}
            </div>
          </div>
        )}
      </ResuableDrawer>

      {/* Suspension Confirmation Modal */}
      <Modal
        isOpen={isSuspenseOpen}
        onClose={onSuspenseClose}
        placement="center"
        hideCloseButton={false}
        classNames={{
          base: "w-full max-w-[420px] rounded-3xl p-4 bg-[var(--bg-primary)] shadow-2xl border border-[var(--border-color)]",
          backdrop: "bg-black/60 backdrop-blur-md",
          closeButton:
            "hover:bg-slate-100 dark:hover:bg-slate-800 absolute right-4 left-auto top-4",
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-center items-center">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
                activeVolunteer?.isSuspended
                  ? "bg-rose-50 text-rose-500 shadow-sm"
                  : "bg-rose-50 text-rose-500"
              }`}
            >
              {activeVolunteer?.isSuspended ? (
                <ShieldCheck size={28} />
              ) : (
                <AlertTriangle size={28} />
              )}
            </div>
            <h3
              className={`text-lg font-black uppercase tracking-tight ${
                activeVolunteer?.isSuspended ? "text-rose-600" : "text-rose-600"
              }`}
            >
              {activeVolunteer?.isSuspended
                ? "Reactivate Volunteer"
                : "Suspend Volunteer"}
            </h3>
          </ModalHeader>
          <ModalBody className="text-center pb-6 space-y-4">
            <p className="text-sm text-[var(--text-secondary)] font-medium px-2">
              Are you sure you want to{" "}
              <span
                className={
                  activeVolunteer?.isSuspended
                    ? "text-rose-600 font-bold"
                    : "text-rose-600 font-bold"
                }
              >
                {activeVolunteer?.isSuspended ? "REACTIVATE" : "SUSPEND"}
              </span>{" "}
              <span className="font-bold text-[var(--text-primary)]">
                {activeVolunteer?.name}
              </span>
              ?
            </p>

            {!activeVolunteer?.isSuspended && (
              <div className="bg-[var(--bg-secondary)] p-4 rounded-2xl border border-[var(--border-color)] space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] text-left">
                  Suspension Duration
                </p>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min={1}
                    value={suspensionValue}
                    onChange={(e) => setSuspensionValue(Number(e.target.value))}
                    className="w-20 px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl text-sm font-bold text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                  />
                  <div className="flex-1 flex bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl p-1 gap-1">
                    {["HRS", "DAYS", "MONTHS"].map((unit) => (
                      <button
                        key={unit}
                        onClick={() => setSuspensionUnit(unit)}
                        className={`flex-1 py-1.5 text-[10px] font-black rounded-lg transition-all ${
                          suspensionUnit === unit
                            ? "bg-rose-500 text-white shadow-md shadow-rose-200"
                            : "text-[var(--text-muted)] hover:bg-[var(--bg-hover)]"
                        }`}
                      >
                        {unit}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <p className="text-xs text-[var(--text-muted)] font-black uppercase">
              {activeVolunteer?.isSuspended
                ? "This will allow them to be assigned to new tasks again."
                : `THIS WILL PREVENT THEM FROM BEING ASSIGNED TO ANY NEW TASKS FOR ${suspensionValue} ${suspensionUnit}.`}
            </p>
          </ModalBody>
          <ModalFooter className="flex gap-3 pt-4 border-t border-[var(--border-color)]">
            <Button
              variant="flat"
              className="flex-1 rounded-xl text-[10px] font-black uppercase tracking-tight bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-all"
              onPress={onSuspenseClose}
            >
              Cancel
            </Button>
            <Button
              className={`flex-1 text-white rounded-xl text-[10px] font-black uppercase tracking-tight shadow-xl transition-all active:scale-95 ${
                activeVolunteer?.isSuspended
                  ? "bg-rose-500 shadow-rose-200 hover:bg-rose-600"
                  : "bg-rose-500 shadow-rose-200 hover:bg-rose-600"
              }`}
              onPress={handleToggleSuspension}
            >
              Confirm &{" "}
              {activeVolunteer?.isSuspended ? "Reactivate" : "Suspend"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default VolunteersPage;
