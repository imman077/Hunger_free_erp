import { useState, useEffect } from "react";
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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import ReusableTable from "../../../../global/components/resuable-components/table";
import ReusableButton from "../../../../global/components/resuable-components/button";
import ReusableInput from "../../../../global/components/resuable-components/input";
import MultiSelectDropdown from "../../../../global/components/resuable-components/multi_select_dropdown";
import {
  Plus,
  Filter,
  ChevronDown,
  X,
  Phone,
  Car,
  Star,
  ShieldCheck,
  User,
  Activity,
  Settings,
  AlertTriangle,
  BarChart,
  ClipboardList,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  Save,
  RotateCcw,
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

// --- Helper Components ---

// Suspension Timer Component
const SuspensionTimer: React.FC<{ endTime: number }> = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const diff = endTime - now;

      if (diff <= 0) {
        setTimeLeft("EXPIRED");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      } else if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft(`${minutes}m ${seconds}s`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return <span>{timeLeft}</span>;
};

const VolunteersPage: React.FC = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
  const [editablePrimaryZone, setEditablePrimaryZone] = useState("");
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
    setEditablePrimaryZone(vol.zone);
    setEditablePhone(vol.phone);
    setEditableAddress(vol.address);
    setEditableEmergencyPhone(vol.emergencyPhone);
    setEditableVehicle(vol.vehicle);
    setEditableVehicleNumber(vol.license);
    onOpen();
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
        placement="right"
        size="md"
        classNames={{
          base: "sm:max-w-[440px] shadow-[0_0_50px_rgba(0,0,0,0.1)]",
          wrapper: "shadow-none",
          backdrop: "bg-slate-900/40 backdrop-blur-sm",
        }}
      >
        <DrawerContent className="bg-slate-50 h-full max-h-screen flex flex-col shadow-2xl overflow-hidden">
          {/* Premium Sticky Header */}
          <DrawerHeader className="flex items-center justify-between px-8 py-5 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-30">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">
                  Volunteer Intelligence
                </h2>
                <div className="px-2 py-0.5 rounded-sm bg-[#22c55e]/10 border border-[#22c55e]/20">
                  <p className="text-[8px] font-black text-[#22c55e] uppercase">
                    Verified
                  </p>
                </div>
              </div>
            </div>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              className="text-slate-400 hover:text-slate-900 hover:bg-white border border-slate-100 rounded-sm transition-all"
              onPress={onClose}
            >
              <X size={20} strokeWidth={3} />
            </Button>
          </DrawerHeader>

          {/* Body */}
          <DrawerBody className="p-0 overflow-y-auto no-scrollbar relative bg-slate-50/80">
            {/* Immersive Background Decorations */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#22c55e]/5 blur-[120px] rounded-sm -mr-48 -mt-48" />
              <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-emerald-500/5 blur-[100px] rounded-sm -ml-32" />
              <div
                className="absolute inset-0 opacity-[0.015] [mask-image:linear-gradient(to_bottom,white,transparent)]"
                style={{
                  backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
            </div>
            {activeVolunteer && (
              <div className="flex flex-col relative z-10">
                {/* Elite Hero Section */}
                <div className="pt-4 pb-1 px-6 flex flex-col items-center">
                  <div className="relative mb-4 group">
                    {/* Elite Glow Effect */}
                    <div className="absolute inset-[-12px] bg-[#22c55e]/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                    <div className="relative w-24 h-24 p-1 rounded-sm bg-white border border-slate-100 shadow-xl shadow-slate-200/50 transform transition-transform duration-700 group-hover:scale-105">
                      <div className="w-full h-full rounded-sm bg-[#22c55e] flex items-center justify-center relative overflow-hidden ring-1 ring-[#22c55e]/30">
                        <span className="text-4xl font-black text-white italic drop-shadow-sm">
                          {activeVolunteer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                    </div>

                    {/* Elite Status Badge - LIVE PORTAL Style */}
                    <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-sm border border-slate-100 ring-4 ring-white/50 shadow-lg z-20 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                            activeVolunteer.status === "available"
                              ? "bg-[#22c55e]"
                              : activeVolunteer.status === "busy"
                                ? "bg-amber-500"
                                : "bg-rose-500"
                          }`}
                        />
                        <span className="text-[8px] font-black uppercase tracking-[0.1em] text-slate-600">
                          {activeVolunteer.status === "available"
                            ? "LIVE PORTAL"
                            : activeVolunteer.status === "busy"
                              ? "BUSY STATUS"
                              : "OFFLINE"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center space-y-3 max-w-sm w-full mt-1">
                    <div className="space-y-0.5 w-full flex flex-col items-center">
                      <h3 className="text-[28px] font-black text-slate-900 leading-none tracking-tight">
                        {activeVolunteer.name}
                      </h3>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.22em] pt-0.5">
                        GLOBAL IDENTIFIER: #{2025000 + activeVolunteer.id}
                      </p>
                    </div>

                    {/* Metadata Badge Row - Elite Alignment */}
                    <div className="flex items-center justify-center gap-1.5 pt-0.5">
                      <div className="px-2.5 py-1 bg-white border border-slate-100 rounded-sm shadow-sm flex items-center gap-1.5 ring-1 ring-slate-50">
                        <span className="text-[8px] font-black text-indigo-500 uppercase">
                          REG.
                        </span>
                        <div className="w-[1px] h-2.5 bg-slate-200" />
                        <span className="text-[8px] font-black text-slate-700 uppercase tracking-tight">
                          VOL-TN-2024-{100 + activeVolunteer.id}
                        </span>
                      </div>
                      <div className="px-3 py-1 bg-emerald-50 border border-emerald-100/50 rounded-sm shadow-sm flex items-center justify-center ring-1 ring-emerald-50">
                        <span className="text-[8px] font-black text-[#22c55e] uppercase tracking-widest">
                          {activeVolunteer.verificationStatus === "Verified"
                            ? "ACTIVE"
                            : "PENDING"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4 relative z-10">
                  {/* Identity & Timeline Card */}
                  <section className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-sm bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 shadow-sm shrink-0">
                          <User size={16} strokeWidth={2.5} />
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest leading-none">
                            Identity & Account
                          </h4>
                          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tight mt-1 leading-none">
                            Verification & Timeline
                          </p>
                        </div>
                      </div>
                      <div className="px-2.5 py-1 rounded-sm bg-white border border-slate-100 flex items-center gap-1.5 shadow-sm ring-2 ring-slate-50/50">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-tighter">
                          PROFILE STATUS
                        </span>
                      </div>
                    </div>

                    <div className="bg-white px-4 py-1.5 rounded-sm border border-slate-200 transition-all duration-300 border-b-2 border-b-transparent hover:border-b-[#22c55e] shadow-sm space-y-0">
                      <div className="flex justify-between items-center py-1.5 border-b border-slate-50/50">
                        <span className="text-[8px] font-black uppercase tracking-[0.15em] text-slate-400">
                          Verification
                        </span>
                        <div
                          className={`px-1.5 py-0.5 rounded-sm text-[8px] font-black uppercase tracking-wider ${activeVolunteer.verificationStatus === "Verified" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}
                        >
                          {activeVolunteer.verificationStatus}
                        </div>
                      </div>
                      <div className="flex justify-between items-center py-1.5">
                        <span className="text-[8px] font-black uppercase tracking-[0.15em] text-slate-400">
                          Onboarded On
                        </span>
                        <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">
                          {activeVolunteer.createdDate}
                        </span>
                      </div>
                    </div>
                  </section>

                  {/* Operational Metrics Grid */}
                  {!isEditMode && (
                    <section className="space-y-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-sm bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm shrink-0">
                          <BarChart size={16} strokeWidth={2.5} />
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest leading-none">
                            Performance Metrics
                          </h4>
                          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tight mt-1 leading-none">
                            Efficiency & Reliability
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5">
                        <div className="bg-white p-2.5 rounded-sm border border-slate-200 transition-all duration-300 border-b-2 border-b-transparent hover:border-b-[#22c55e] hover:bg-slate-50/30 shadow-sm">
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">
                            Success Rate
                          </p>
                          <p className="text-[11px] font-black text-slate-900 leading-tight uppercase tracking-tight mt-1">
                            92%
                          </p>
                        </div>
                        <div className="bg-white p-2 rounded-sm border border-slate-200 transition-all duration-300 border-b-2 border-b-transparent hover:border-b-indigo-500 hover:bg-slate-50/30 shadow-sm">
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">
                            Total Tasks
                          </p>
                          <p className="text-[11px] font-black text-slate-900 leading-tight uppercase tracking-tight mt-1">
                            {activeVolunteer.totalTasks}
                          </p>
                        </div>
                        <div className="bg-white p-2.5 rounded-sm border border-slate-200 transition-all duration-300 border-b-2 border-b-transparent hover:border-b-amber-500 hover:bg-slate-50/30 shadow-sm">
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">
                            Avg Rating
                          </p>
                          <p className="text-[11px] font-black text-slate-900 leading-tight uppercase tracking-tight mt-1 flex items-center gap-1">
                            {activeVolunteer.rating}{" "}
                            <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                          </p>
                        </div>
                        <div className="bg-white p-2.5 rounded-sm border border-slate-200 transition-all duration-300 border-b-2 border-b-transparent hover:border-b-rose-500 hover:bg-slate-50/30 shadow-sm">
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">
                            Missed Focus
                          </p>
                          <p className="text-[11px] font-black text-rose-600 leading-tight uppercase tracking-tight">
                            {activeVolunteer.missedTasks}
                          </p>
                        </div>
                      </div>
                    </section>
                  )}

                  {/* Activity & History Card */}
                  <section className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-sm bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shadow-sm shrink-0">
                          <ClipboardList size={16} strokeWidth={2.5} />
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest leading-none">
                            Assignments & Activity
                          </h4>
                          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tight mt-1 leading-none">
                            Task Lifecycle Overview
                          </p>
                        </div>
                      </div>
                      <div className="px-2.5 py-1 rounded-sm bg-emerald-500 border border-emerald-600/20 flex items-center gap-1.5 shadow-sm ring-1 ring-emerald-500/10">
                        <span className="text-[8px] font-black text-white uppercase tracking-tighter px-0.5">
                          2 ACTIVE
                        </span>
                      </div>
                    </div>

                    <div className="bg-white px-4 py-1.5 rounded-sm border border-slate-200 shadow-sm divide-y divide-slate-50/50">
                      <div className="flex justify-between items-center py-2">
                        <span className="text-[8px] font-black uppercase tracking-[0.15em] text-slate-400">
                          Current Load
                        </span>
                        <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">
                          2 Ongoing Tasks
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-[8px] font-black uppercase tracking-[0.15em] text-slate-400">
                          Lifetime Total
                        </span>
                        <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">
                          {activeVolunteer.tasksCompleted} Tasks
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-[8px] font-black uppercase tracking-[0.15em] text-slate-400">
                          Last Active
                        </span>
                        <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">
                          {activeVolunteer.lastActive || "Never"}
                        </span>
                      </div>
                      <div className="py-2">
                        <button className="text-[8px] font-black text-purple-600 hover:underline uppercase tracking-widest flex items-center gap-1">
                          View Full History <Plus size={10} />
                        </button>
                      </div>
                    </div>
                  </section>

                  {/* System Metadata Card */}
                  {!isEditMode && (
                    <section className="space-y-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-sm bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 shadow-sm shrink-0">
                          <Settings size={16} strokeWidth={2.5} />
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest leading-none">
                            System Metadata
                          </h4>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight mt-1 leading-none">
                            Backend Configuration & Logs
                          </p>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-sm space-y-3">
                        <div className="flex justify-between items-center py-1">
                          <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">
                            Availability
                          </span>
                          <span className="text-[11px] font-black text-slate-800 uppercase tracking-widest">
                            GLOBAL PERMISSIONED
                          </span>
                        </div>

                        <div className="mt-3">
                          <button
                            onClick={onSuspenseOpen}
                            className={`w-full px-4 py-3 ${activeVolunteer.isSuspended ? "bg-rose-500 hover:bg-rose-600 shadow-rose-200" : "bg-[#22c55e] hover:bg-[#1ea34a] shadow-emerald-200"} text-white rounded-sm text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2`}
                          >
                            {activeVolunteer.isSuspended ? (
                              <>
                                <RotateCcw size={14} />
                                REACTIVATE VOLUNTEER
                                {activeVolunteer.suspensionEndTime && (
                                  <span className="ml-2 opacity-80 font-bold border-l border-white/30 pl-2">
                                    <SuspensionTimer
                                      endTime={
                                        activeVolunteer.suspensionEndTime
                                      }
                                    />
                                  </span>
                                )}
                              </>
                            ) : (
                              <>
                                <AlertTriangle size={14} />
                                SUSPEND VOLUNTEER
                              </>
                            )}
                          </button>
                        </div>
                        {onLeaveToggle && !activeVolunteer.isSuspended && (
                          <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 text-amber-600 rounded-sm border border-amber-100 mt-2">
                            <AlertCircle size={14} className="shrink-0" />
                            <span className="text-[9px] font-black uppercase">
                              On Leave – Assignments Locked
                            </span>
                          </div>
                        )}
                      </div>
                    </section>
                  )}

                  {/* Operational Control Section */}
                  <section className="space-y-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-sm bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm shrink-0">
                        <Activity size={16} strokeWidth={2.5} />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest leading-none">
                          Operational Control
                        </h4>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight mt-1 leading-none">
                          Duty Management & Scope
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5">
                      {isEditMode ? (
                        <div className="col-span-2 bg-white p-4 rounded-sm border border-slate-200 shadow-sm space-y-4">
                          <div className="space-y-3">
                            <label className="text-[8px] font-black uppercase text-slate-400 tracking-[0.2em]">
                              Weekly Capacity
                            </label>
                            <div className="flex items-center gap-4">
                              <input
                                type="range"
                                min={0}
                                max={60}
                                value={weeklyHours}
                                onChange={handleHoursChange}
                                className="flex-1 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#22c55e]"
                              />
                              <span className="text-[10px] font-black text-[#22c55e] min-w-[60px] uppercase">
                                {weeklyHours}h/wk
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-sm border border-slate-100">
                            <div>
                              <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em]">
                                Duty Status
                              </p>
                              <p className="text-xs font-bold text-slate-700 mt-0.5">
                                {onLeaveToggle ? "Active Duty" : "On Leave"}
                              </p>
                            </div>
                            <button
                              onClick={toggleOnLeave}
                              className={`p-1 rounded-sm transition-all ${onLeaveToggle ? "bg-emerald-100 text-[#22c55e]" : "bg-rose-100 text-rose-600"}`}
                            >
                              {onLeaveToggle ? (
                                <ToggleRight size={20} />
                              ) : (
                                <ToggleLeft size={20} />
                              )}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="bg-white p-2.5 rounded-sm border border-slate-200 transition-all duration-300 border-b-2 border-b-transparent hover:border-b-indigo-500 hover:bg-slate-50/30 shadow-sm">
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">
                              Weekly Capacity
                            </p>
                            <p className="text-[11px] font-black text-slate-900 leading-tight uppercase tracking-tight">
                              {weeklyHours}h/wk
                            </p>
                          </div>
                          <div className="bg-white p-2.5 rounded-sm border border-slate-200 transition-all duration-300 border-b-2 border-b-transparent hover:border-b-[#22c55e] hover:bg-slate-50/30 shadow-sm">
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">
                              Duty Status
                            </p>
                            <p
                              className={`text-[11px] font-black leading-tight uppercase tracking-tight ${onLeaveToggle ? "text-[#22c55e]" : "text-rose-500"}`}
                            >
                              {onLeaveToggle ? "Active Duty" : "On Leave"}
                            </p>
                          </div>
                        </>
                      )}
                      <div className="col-span-2">
                        {isEditMode ? (
                          <MultiSelectDropdown
                            label="Areas"
                            value={selectedVolunteerAreas}
                            onChange={setSelectedVolunteerAreas}
                            options={VOLUNTEER_AREAS_OPTIONS}
                            placeholder="Select volunteer areas"
                          />
                        ) : (
                          <div className="bg-white p-2.5 rounded-sm border border-slate-200 transition-all duration-300 border-b-2 border-b-transparent hover:border-b-indigo-500 hover:bg-slate-50/30 shadow-sm">
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">
                              Active Volunteer Zones
                            </p>
                            <p className="text-[11px] font-black text-slate-900 leading-tight uppercase tracking-tight truncate">
                              {activeVolunteer.volunteerAreas.length} Registered
                              Zones
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="col-span-2">
                        {isEditMode ? (
                          <MultiSelectDropdown
                            label="Allowed Task Types"
                            value={selectedTaskTypes}
                            onChange={setSelectedTaskTypes}
                            options={TASK_TYPES_OPTIONS}
                            placeholder="Select task types"
                          />
                        ) : (
                          <div className="bg-white p-2.5 rounded-sm border border-slate-200 transition-all duration-300 border-b-2 border-b-transparent hover:border-b-[#22c55e] hover:bg-slate-50/30 shadow-sm">
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">
                              Authorized Operations
                            </p>
                            <p className="text-[11px] font-black text-slate-900 leading-tight uppercase tracking-tight truncate">
                              {activeVolunteer.allowedTaskTypes.join(", ")}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </section>

                  {/* Connectivity Section (Contact & Location) */}
                  <section className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-sm bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#22c55e] shadow-sm shrink-0">
                          <Phone size={16} strokeWidth={2.5} />
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest leading-none">
                            Connectivity
                          </h4>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight mt-1 leading-none">
                            Communication Channels
                          </p>
                        </div>
                      </div>
                      <div className="px-2.5 py-1 rounded-sm bg-white border border-slate-100 flex items-center gap-1.5 shadow-sm ring-2 ring-slate-50/50">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">
                          VERIFIED DATA
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-1.5">
                      {isEditMode ? (
                        <div className="bg-white p-2.5 rounded-sm border border-slate-200 shadow-sm space-y-2.5">
                          <ReusableInput
                            label="Contact Number"
                            value={editablePhone}
                            onChange={setEditablePhone}
                            placeholder="+91-XXXXX-XXXXX"
                          />
                          <ReusableInput
                            label="Res. Address"
                            value={editableAddress}
                            onChange={setEditableAddress}
                            placeholder="Enter residential address"
                          />
                          <ReusableInput
                            label="Emergency Contact"
                            value={editableEmergencyPhone}
                            onChange={setEditableEmergencyPhone}
                            placeholder="+91-XXXXX-XXXXX"
                          />
                        </div>
                      ) : (
                        <>
                          {[
                            {
                              Icon: Phone,
                              label: "VERIFIED CONTACT LINE",
                              value: activeVolunteer.phone,
                              color: "emerald",
                              bg: "bg-emerald-50/50",
                            },
                            {
                              Icon: User,
                              label: "EMERGENCY LINE",
                              value: activeVolunteer.emergencyPhone,
                              color: "amber",
                              bg: "bg-amber-50/50",
                            },
                            {
                              Icon: Car,
                              label: "RESIDENTIAL ADDRESS",
                              value: activeVolunteer.address,
                              color: "indigo",
                              bg: "bg-indigo-50/50",
                            },
                          ].map((item, i) => (
                            <div
                              key={i}
                              className="group bg-white p-2 rounded-sm border border-slate-200 transition-all duration-300 border-b-2 border-b-transparent hover:border-b-[#22c55e] hover:bg-slate-50/30 shadow-sm"
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-8 h-8 rounded-sm ${item.bg} flex items-center justify-center text-${item.color}-600 shrink-0 group-hover:scale-105 transition-transform duration-500`}
                                >
                                  <item.Icon size={16} strokeWidth={2.5} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1 leading-none">
                                    {item.label}
                                  </p>
                                  <p className="text-[11px] font-black text-slate-800 leading-tight truncate uppercase tracking-tight mt-1">
                                    {item.value}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </section>

                  {/* Logistics Section */}
                  <section className="space-y-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-sm bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shadow-sm shrink-0">
                        <Car size={16} strokeWidth={2.5} />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest leading-none">
                          Vehicle & Logistics
                        </h4>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight mt-1 leading-none">
                          Transport Infrastructure
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5">
                      {isEditMode ? (
                        <div className="col-span-2 bg-white p-2.5 rounded-sm border border-slate-200 shadow-sm space-y-2.5">
                          <ReusableInput
                            label="Vehicle Type"
                            value={editableVehicle}
                            onChange={setEditableVehicle}
                            placeholder="e.g. Swift (Car)"
                          />
                          <ReusableInput
                            label="Vehicle Number"
                            value={editableVehicleNumber}
                            onChange={setEditableVehicleNumber}
                            placeholder="e.g. TN 01 AB 1234"
                          />
                          <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-sm border border-slate-100">
                            <span className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em]">
                              Fuel Eligibility
                            </span>
                            <button
                              onClick={() => {}}
                              className={`px-3 py-1 rounded-sm text-[9px] font-black uppercase tracking-widest transition-all ${activeVolunteer.fuelEligibility ? "bg-[#22c55e]/10 text-[#22c55e]" : "bg-slate-100 text-slate-400"}`}
                            >
                              {activeVolunteer.fuelEligibility
                                ? "Approved"
                                : "Authorize"}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="bg-white p-2.5 rounded-sm border border-slate-200 transition-all duration-300 border-b-2 border-b-transparent hover:border-b-[#22c55e] hover:bg-slate-50/30 shadow-sm">
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">
                              Vehicle Class
                            </p>
                            <p className="text-[11px] font-black text-slate-900 leading-tight truncate uppercase tracking-tight">
                              {activeVolunteer.vehicle}
                            </p>
                          </div>
                          <div className="bg-white p-2.5 rounded-sm border border-slate-200 transition-all duration-300 border-b-2 border-b-transparent hover:border-b-indigo-500 hover:bg-slate-50/30 shadow-sm">
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">
                              Plate Number
                            </p>
                            <p className="text-[11px] font-black text-slate-900 leading-tight truncate uppercase tracking-tight">
                              {activeVolunteer.license}
                            </p>
                          </div>
                          <div className="col-span-2 flex items-center justify-between p-2.5 bg-white rounded-sm border border-slate-200 transition-all duration-300 border-b-2 border-b-transparent hover:border-b-[#22c55e] shadow-sm">
                            <span className="text-[8px] font-black uppercase text-slate-400 tracking-[0.2em]">
                              Fuel Refill Eligibility
                            </span>
                            <span
                              className={`text-[9px] font-black ${activeVolunteer.fuelEligibility ? "text-[#22c55e]" : "text-slate-400"} uppercase tracking-widest`}
                            >
                              {activeVolunteer.fuelEligibility
                                ? "Corporate Verified"
                                : "Restricted Access"}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </section>
                </div>
              </div>
            )}
          </DrawerBody>

          {/* Footer Actions */}
          <div className="p-4 bg-white border-t border-slate-200 sticky bottom-0 z-30 flex items-center gap-3 shrink-0">
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
                  className="flex-1 !bg-[#22c55e] hover:!bg-[#1ea34a] px-8 py-3 !rounded-sm text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[#22c55e]/20"
                  onClick={() => {
                    console.log("Save Changes", {
                      ...activeVolunteer,
                      zone: editablePrimaryZone,
                      volunteerAreas: selectedVolunteerAreas,
                      allowedTaskTypes: selectedTaskTypes,
                      phone: editablePhone,
                      address: editableAddress,
                      emergencyPhone: editableEmergencyPhone,
                      vehicle: editableVehicle,
                      license: editableVehicleNumber,
                      weeklyHours,
                      onLeave: onLeaveToggle,
                    });
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
                  onClick={onClose}
                  className="flex-1 px-6 py-4 text-[11px] font-black text-slate-400 hover:text-slate-600 uppercase tracking-[0.2em] transition-colors"
                >
                  Dismiss
                </button>
                <div className="flex-[2] relative">
                  <ReusableButton
                    variant="primary"
                    className="w-full !bg-[#22c55e] hover:!bg-[#1ea34a] px-8 py-4 !rounded-sm text-[10px] font-black uppercase tracking-[0.15em] shadow-xl shadow-emerald-200/50 transition-all active:scale-95 flex items-center justify-center gap-2"
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
        </DrawerContent>
      </Drawer>

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
