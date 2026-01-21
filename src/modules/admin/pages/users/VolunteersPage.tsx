import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  DrawerContent,
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
  Shield,
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
const SectionHeader = ({ icon: Icon, title, color, bgColor }: any) => (
  <div className="flex items-center gap-4 py-4 px-1 rounded-sm border-b border-slate-100">
    <div className={`p-2 ${bgColor} ${color} rounded-lg`}>
      <Icon size={18} />
    </div>
    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-800 flex-1">
      {title}
    </h3>
  </div>
);

const InfoCluster = ({ icon: Icon, title, children, color, bgColor }: any) => (
  <div className="space-y-4">
    <div className="flex items-center gap-3 mb-1">
      <div className={`p-2 ${bgColor} ${color} rounded-lg`}>
        <Icon size={16} />
      </div>
      <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-700">
        {title}
      </h3>
    </div>
    <div className="space-y-4 px-1">{children}</div>
  </div>
);

const InfoRow = ({ label, value, variant, isEditMode }: any) => (
  <div
    className={`flex items-center justify-between text-left group ${isEditMode ? "opacity-40" : ""}`}
  >
    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
      {label}
    </span>
    <span
      className={`text-xs font-bold px-2 py-0.5 rounded ${
        variant === "success"
          ? "bg-emerald-50 text-[#22c55e]"
          : variant === "warning"
            ? "bg-amber-50 text-amber-600"
            : variant === "danger"
              ? "bg-rose-50 text-rose-600"
              : "text-slate-600"
      }`}
    >
      {value}
    </span>
  </div>
);

const StatBox = ({ label, value, showStars, variant }: any) => (
  <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col items-center flex-1">
    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 text-center leading-none">
      {label}
    </span>
    <div className="flex items-center gap-1">
      <span
        className={`text-xl font-black ${
          variant === "danger" ? "text-rose-500" : "text-slate-800"
        }`}
      >
        {value}
      </span>
      {showStars && (
        <Star className="text-amber-400 fill-amber-400" size={14} />
      )}
    </div>
  </div>
);

const EditableField = ({ label, value, isMulti, isEditMode }: any) => (
  <div
    className={`group relative flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl transition-all ${isEditMode ? "hover:border-[#22c55e]/30 cursor-pointer shadow-sm" : "cursor-default"}`}
  >
    <div className="flex flex-col text-left">
      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
        {label}
      </span>
      <span className="text-xs font-bold text-slate-700 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
        {value}
      </span>
    </div>
    {isEditMode && (
      <div className="p-1.5 bg-slate-50 text-slate-400 group-hover:text-[#22c55e] group-hover:bg-[#ecfdf5] rounded-lg transition-all">
        <Plus size={14} />
      </div>
    )}
    {isMulti && (
      <div className="absolute -top-1.5 -left-1.5 bg-indigo-50 text-indigo-500 text-[8px] font-black px-1.5 py-0.5 rounded border border-indigo-100 uppercase">
        Multi
      </div>
    )}
  </div>
);

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
    isOpen: isGuardrailOpen,
    onOpen: onGuardrailOpen,
    onClose: onGuardrailClose,
  } = useDisclosure();
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
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
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
  const [editableStatus, setEditableStatus] =
    useState<VolunteerStatus>("available");
  const [editableCapacity, setEditableCapacity] = useState(40);

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

  const handleSensitiveAction = (actionLabel: string, actionFn: () => void) => {
    if (onLeaveToggle) {
      setPendingAction(() => actionFn);
      onGuardrailOpen();
      console.log(`Action blocked by guardrail: ${actionLabel}`);
    } else {
      actionFn();
    }
  };

  const confirmPendingAction = () => {
    if (pendingAction) pendingAction();
    onGuardrailClose();
    setPendingAction(null);
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
        hideCloseButton={true}
        placement="right"
        classNames={{
          base: "w-[450px] !max-w-[450px] overflow-hidden rounded-none",
          backdrop: "bg-black/60 backdrop-blur-sm",
        }}
      >
        <DrawerContent
          className={`no-scrollbar transition-all duration-300 ${isSuspenseOpen ? "blur-md scale-[0.98] pointer-events-none" : ""}`}
          style={{ backgroundColor: "var(--bg-primary)" }}
        >
          {activeVolunteer && (
            <div className="flex flex-col h-full overflow-hidden">
              {/* Premium Header */}
              <div className="relative h-32 flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500" />
                <div className="absolute inset-0 bg-slate-900/10" />
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-md transition-all z-20"
                >
                  <X size={18} />
                </button>
                <div className="absolute -bottom-10 left-8 flex items-end gap-6 z-10">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-2xl border border-white/50">
                      <div className="w-full h-full rounded-xl bg-gradient-to-br from-[#22c55e] to-teal-500 flex items-center justify-center text-white text-3xl font-black">
                        {activeVolunteer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full p-0.5 shadow-lg border-2 border-white">
                      <div
                        className={`w-full h-full rounded-full ${
                          activeVolunteer.status === "available"
                            ? "bg-[#22c55e]"
                            : activeVolunteer.status === "busy"
                              ? "bg-amber-500"
                              : "bg-rose-500"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar pt-14 px-8 pb-8 space-y-12">
                {/* Header Details */}
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-2xl font-black tracking-tight text-slate-800">
                      {activeVolunteer.name}
                    </h2>
                    {activeVolunteer.verificationStatus === "Verified" ? (
                      <ShieldCheck className="text-[#22c55e] w-5 h-5" />
                    ) : (
                      <ShieldCheck className="text-amber-400 w-5 h-5" />
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      ID: VOL-{2025000 + activeVolunteer.id}
                    </span>
                    <div className="h-3 w-px bg-slate-200" />
                    {getStatusBadge(activeVolunteer.status)}
                  </div>
                </div>

                {/* Content Sections */}
                <div className="space-y-8">
                  {/* Identity & Account */}
                  <InfoCluster
                    icon={User}
                    title="Identity & Account"
                    color="text-blue-500"
                    bgColor="bg-blue-50"
                  >
                    <InfoRow
                      label="Verification Status"
                      value={activeVolunteer.verificationStatus}
                      variant={
                        activeVolunteer.verificationStatus === "Verified"
                          ? "success"
                          : "warning"
                      }
                    />
                    <InfoRow
                      label="Account Created"
                      value={activeVolunteer.createdDate}
                    />
                  </InfoCluster>

                  {/* Performance - Hidden in Edit Mode */}
                  {!isEditMode && (
                    <InfoCluster
                      icon={BarChart}
                      title="Performance Metrics"
                      color="text-emerald-600"
                      bgColor="bg-emerald-50"
                    >
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <StatBox label="Tasks Done %" value="92%" />
                        <StatBox
                          label="Total Completed"
                          value={activeVolunteer.totalTasks}
                        />
                        <StatBox
                          label="Rating"
                          value={activeVolunteer.rating}
                          showStars
                        />
                        <StatBox
                          label="Missed/Cancelled"
                          value={activeVolunteer.missedTasks}
                          variant="danger"
                        />
                      </div>
                    </InfoCluster>
                  )}

                  {/* Activity */}
                  <InfoCluster
                    icon={ClipboardList}
                    title="Assignments & Activity"
                    color="text-purple-600"
                    bgColor="bg-purple-50"
                  >
                    <InfoRow
                      label="Active Assignments"
                      value="2 Ongoing Tasks"
                    />
                    <InfoRow
                      label="Completed Assignments"
                      value={activeVolunteer.tasksCompleted}
                    />
                    <InfoRow
                      label="Last Active"
                      value={activeVolunteer.lastActive}
                    />
                    <InfoRow
                      label="Last Assignment"
                      value={activeVolunteer.lastAssignment}
                    />
                    <div className="pt-2">
                      <button className="text-[10px] font-black text-purple-600 hover:underline uppercase">
                        View Full History →
                      </button>
                    </div>
                  </InfoCluster>

                  {/* System Info - Hidden in Edit Mode */}
                  {!isEditMode && (
                    <InfoCluster
                      icon={Settings}
                      title="System Metadata"
                      color="text-slate-600"
                      bgColor="bg-slate-100"
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black uppercase text-slate-400">
                            Availability
                          </span>
                          <span className="text-[11px] font-bold text-slate-700 uppercase">
                            {activeVolunteer.isSuspended
                              ? "Suspended"
                              : onLeaveToggle
                                ? "Unavailable (On Leave)"
                                : activeVolunteer.status}
                          </span>
                        </div>
                        {activeVolunteer.isSuspended &&
                          activeVolunteer.suspensionEndTime && (
                            <div className="flex items-center gap-2 px-3 py-2 bg-rose-50 text-rose-600 rounded-xl border border-rose-100 shadow-sm">
                              <AlertTriangle size={14} className="shrink-0" />
                              <div className="flex flex-col flex-1">
                                <span className="text-[9px] font-black uppercase opacity-70">
                                  Suspension Active
                                </span>
                                <span className="text-[11px] font-black">
                                  <SuspensionTimer
                                    endTime={activeVolunteer.suspensionEndTime}
                                  />
                                </span>
                              </div>
                            </div>
                          )}
                        {onLeaveToggle && !activeVolunteer.isSuspended && (
                          <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 text-amber-600 rounded-xl border border-amber-100">
                            <AlertCircle size={14} className="shrink-0" />
                            <span className="text-[10px] font-black uppercase">
                              On Leave – Assignments Locked
                            </span>
                          </div>
                        )}
                      </div>
                    </InfoCluster>
                  )}
                </div>

                {/* Operational Control */}
                <InfoCluster
                  icon={Activity}
                  title="Operational Control"
                  color="text-indigo-600"
                  bgColor="bg-indigo-50"
                >
                  <div className="space-y-6">
                    {isEditMode ? (
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase text-slate-400">
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
                            <span className="text-xs font-black text-[#22c55e] min-w-[60px]">
                              {weeklyHours}h/wk
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <div>
                            <p className="text-[10px] font-black uppercase text-slate-400">
                              Duty Status
                            </p>
                            <p className="text-xs font-bold text-slate-700 mt-0.5">
                              {onLeaveToggle ? "On Leave" : "Active Duty"}
                            </p>
                          </div>
                          <button
                            onClick={toggleOnLeave}
                            className={`p-1 rounded-lg transition-all ${
                              onLeaveToggle
                                ? "bg-rose-100 text-rose-600"
                                : "bg-emerald-100 text-[#22c55e]"
                            }`}
                          >
                            {onLeaveToggle ? (
                              <ToggleRight size={24} />
                            ) : (
                              <ToggleLeft size={24} />
                            )}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <InfoRow
                          label="Weekly Capacity"
                          value={`${weeklyHours}h/wk`}
                        />
                        <InfoRow
                          label="Duty Status"
                          value={onLeaveToggle ? "On Leave" : "Active Duty"}
                          variant={onLeaveToggle ? "danger" : "success"}
                        />
                      </div>
                    )}

                    <div className="gap-3">
                      {isEditMode ? (
                        <MultiSelectDropdown
                          label="Areas"
                          value={selectedVolunteerAreas}
                          onChange={setSelectedVolunteerAreas}
                          options={VOLUNTEER_AREAS_OPTIONS}
                          placeholder="Select volunteer areas"
                        />
                      ) : (
                        <EditableField
                          label="Areas"
                          value={
                            activeVolunteer.volunteerAreas.length + " Zones"
                          }
                          isMulti
                          isEditMode={isEditMode}
                        />
                      )}
                    </div>
                    {isEditMode ? (
                      <MultiSelectDropdown
                        label="Allowed Task Types"
                        value={selectedTaskTypes}
                        onChange={setSelectedTaskTypes}
                        options={TASK_TYPES_OPTIONS}
                        placeholder="Select task types"
                      />
                    ) : (
                      <EditableField
                        label="Allowed Task Types"
                        value={activeVolunteer.allowedTaskTypes.join(", ")}
                        isEditMode={isEditMode}
                      />
                    )}
                  </div>
                </InfoCluster>

                {/* Contact & Location */}
                <InfoCluster
                  icon={Phone}
                  title="Contact & Location"
                  color="text-[#22c55e]"
                  bgColor="bg-emerald-50"
                >
                  <div className="space-y-4">
                    {isEditMode ? (
                      <ReusableInput
                        label="Contact Number"
                        value={editablePhone}
                        onChange={setEditablePhone}
                        placeholder="+91-XXXXX-XXXXX"
                      />
                    ) : (
                      <EditableField
                        label="Contact Number"
                        value={activeVolunteer.phone}
                        isEditMode={isEditMode}
                      />
                    )}
                    {isEditMode ? (
                      <ReusableInput
                        label="Res. Address"
                        value={editableAddress}
                        onChange={setEditableAddress}
                        placeholder="Enter residential address"
                      />
                    ) : (
                      <EditableField
                        label="Res. Address"
                        value={activeVolunteer.address}
                        isEditMode={isEditMode}
                      />
                    )}
                    {isEditMode ? (
                      <ReusableInput
                        label="Emergency Contact"
                        value={editableEmergencyPhone}
                        onChange={setEditableEmergencyPhone}
                        placeholder="+91-XXXXX-XXXXX"
                      />
                    ) : (
                      <EditableField
                        label="Emergency Contact"
                        value={activeVolunteer.emergencyPhone}
                        isEditMode={isEditMode}
                      />
                    )}
                  </div>
                </InfoCluster>

                {/* Logistics */}
                <InfoCluster
                  icon={Car}
                  title="Vehicle & Logistics"
                  color="text-amber-600"
                  bgColor="bg-amber-50"
                >
                  <div className="space-y-4">
                    {isEditMode ? (
                      <ReusableInput
                        label="Vehicle Type"
                        value={editableVehicle}
                        onChange={setEditableVehicle}
                        placeholder="e.g. Swift (Car)"
                      />
                    ) : (
                      <EditableField
                        label="Vehicle Type"
                        value={activeVolunteer.vehicle}
                        isEditMode={isEditMode}
                      />
                    )}
                    {isEditMode ? (
                      <ReusableInput
                        label="Vehicle Number"
                        value={editableVehicleNumber}
                        onChange={setEditableVehicleNumber}
                        placeholder="e.g. TN 01 AB 1234"
                      />
                    ) : (
                      <EditableField
                        label="Vehicle Number"
                        value={activeVolunteer.license}
                        isEditMode={isEditMode}
                      />
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-slate-400">
                        Fuel Eligibility
                      </span>
                      {isEditMode ? (
                        <button
                          onClick={() => {}}
                          className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeVolunteer.fuelEligibility ? "bg-emerald-100 text-[#22c55e]" : "bg-slate-100 text-slate-400"}`}
                        >
                          {activeVolunteer.fuelEligibility
                            ? "Eligible"
                            : "Mark Eligible"}
                        </button>
                      ) : (
                        <span className="text-xs font-bold text-[#22c55e]">
                          {activeVolunteer.fuelEligibility
                            ? "ELIGIBLE"
                            : "NOT ELIGIBLE"}
                        </span>
                      )}
                    </div>
                  </div>
                </InfoCluster>

                <div className="space-y-3">
                  <button
                    onClick={onSuspenseOpen}
                    className="w-full px-4 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-slate-200"
                  >
                    {activeVolunteer.isSuspended
                      ? "Reactivate Volunteer"
                      : "Suspend Volunteer"}
                  </button>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-6 bg-white border-t border-slate-100 flex items-center gap-3 shrink-0">
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
                      className="flex-1 !bg-[#22c55e] hover:!bg-[#1ea34a] px-8 py-3 !rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[#22c55e]/20"
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
                      className="flex-1 px-6 py-3 text-[10px] font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest transition-colors"
                    >
                      Dismiss
                    </button>
                    <ReusableButton
                      variant="primary"
                      className="flex-1 !bg-slate-900 hover:!bg-black px-8 py-3 !rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-slate-200"
                      onClick={() => setIsEditMode(true)}
                    >
                      Update Profile
                    </ReusableButton>
                  </>
                )}
              </div>
            </div>
          )}
        </DrawerContent>
      </Drawer>

      {/* Guardrail Modal */}
      <Modal
        isOpen={isGuardrailOpen}
        onClose={onGuardrailClose}
        placement="center"
        classNames={{
          base: "rounded-3xl p-4",
          backdrop: "bg-black/60 backdrop-blur-md",
          closeButton:
            "hover:bg-slate-100 dark:hover:bg-slate-800 absolute right-4 left-auto top-4",
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-center items-center">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mb-4">
              <AlertTriangle size={32} />
            </div>
            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">
              Assignment Guardrail
            </h3>
          </ModalHeader>
          <ModalBody className="text-center pb-6">
            <p className="text-sm text-slate-500 font-medium">
              This volunteer is currently{" "}
              <span className="text-rose-600 font-bold">ON LEAVE</span>.
              Assigning tasks or updating operational status may conflict with
              their leave period.
            </p>
            <p className="text-xs text-slate-400 mt-2 font-black uppercase">
              Continue anyway?
            </p>
          </ModalBody>
          <ModalFooter className="flex gap-3">
            <Button
              variant="light"
              className="flex-1 rounded-xl text-[10px] font-black uppercase tracking-widest"
              onPress={onGuardrailClose}
            >
              Cancel Action
            </Button>
            <Button
              className="flex-1 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-200"
              onPress={confirmPendingAction}
            >
              Confirm & Proceed
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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
                  ? "bg-emerald-50 text-[#22c55e]"
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
                activeVolunteer?.isSuspended
                  ? "text-[var(--text-primary)]"
                  : "text-rose-600"
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
                    ? "text-[#22c55e] font-bold"
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
                  ? "bg-[#22c55e] shadow-emerald-200 hover:bg-emerald-600"
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
