import { useState, useCallback } from "react";
import { toast } from "sonner";
import {
  Package,
  Truck,
  MapPin,
  Clock,
  ChefHat,
  Heart,
  Calendar,
  LayoutGrid,
  List as ListIcon,
  Navigation,
  User,
  CheckCircle2,
  Phone,
} from "lucide-react";
import ResuableButton from "../../../../global/components/resuable-components/button";
import ReusableTable, {
  type ColumnDef,
} from "../../../../global/components/resuable-components/table";
import ResuableDrawer from "../../../../global/components/resuable-components/drawer";
import ResuableModal from "../../../../global/components/resuable-components/modal";

interface Task {
  id: string;
  title: string;
  routeNumber: string;
  stops: number;
  duration: string;
  load: string;
  status: "IN PROGRESS" | "AVAILABLE" | "COMPLETED";
  type: "delivery" | "kitchen" | "shelter";
  description?: string;
  location?: string;
  contactPerson?: string;
  contactPhone?: string;
  partnerOrg?: string;
  destinations?: string[];
  baseAddress?: string;
  isPickupReached?: boolean;
  completedDestinations?: number[];
}

// Helper to get status styles
const getStatusStyle = (status: string) => {
  switch (status) {
    case "IN PROGRESS":
      return "text-amber-600 bg-amber-500/10 border-amber-500/20";
    case "AVAILABLE":
      return "text-[#22c55e] bg-green-500/10 border-green-500/20";
    case "COMPLETED":
      return "text-[#22c55e] bg-green-500/10 border-green-500/20";
    default:
      return "text-slate-500 bg-slate-500/10 border-slate-500/20";
  }
};

const getCategoryIcon = (type: string) => {
  switch (type) {
    case "delivery":
      return <Truck className="w-4 h-4" />;
    case "kitchen":
      return <ChefHat className="w-4 h-4" />;
    case "shelter":
      return <Heart className="w-4 h-4" />;
    default:
      return <Package className="w-4 h-4" />;
  }
};

// --- CARD VIEW COMPONENT ---
const TaskCard: React.FC<{
  task: Task;
  onDetails: (task: Task) => void;
}> = ({ task, onDetails }) => {
  return (
    <div
      className="border rounded-sm p-4 space-y-4 group hover:border-[#22c55e]/40 hover:shadow-lg hover:shadow-[#22c55e]/5 transition-all duration-300 h-full flex flex-col cursor-pointer relative overflow-hidden"
      onClick={() => onDetails(task)}
      style={{
        backgroundColor: "var(--bg-primary)",
        borderColor: "var(--border-color)",
      }}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#22c55e]/0 to-[#22c55e]/0 group-hover:from-[#22c55e]/[0.02] group-hover:to-transparent transition-all duration-300 pointer-events-none" />

      {/* Header Section */}
      <div className="relative flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-sm flex items-center justify-center border shadow-sm transition-all duration-300 ${
              task.type === "delivery"
                ? "bg-green-500/10 text-[#22c55e] border-green-500/20 group-hover:shadow-[#22c55e]/20"
                : task.type === "kitchen"
                  ? "bg-orange-500/10 text-orange-600 border-orange-500/20 group-hover:shadow-orange-500/20"
                  : "bg-rose-500/10 text-rose-600 border-rose-500/20 group-hover:shadow-rose-500/20"
            }`}
          >
            {getCategoryIcon(task.type)}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className="text-[9px] font-black uppercase tracking-[0.1em] text-[#22c55e] px-2 py-0.5 rounded-sm border"
                style={{
                  backgroundColor: "rgba(34, 197, 94, 0.05)",
                  borderColor: "rgba(34, 197, 94, 0.1)",
                }}
              >
                #{task.routeNumber}
              </span>
            </div>
            <h4
              className="text-sm font-black tracking-tight group-hover:text-[#22c55e] transition-colors line-clamp-1 leading-tight"
              style={{ color: "var(--text-primary)" }}
            >
              {task.title}
            </h4>
            {task.partnerOrg && (
              <p
                className="text-[9px] font-bold uppercase tracking-wider truncate"
                style={{ color: "var(--text-muted)" }}
              >
                {task.partnerOrg}
              </p>
            )}
          </div>
        </div>

        <span
          className={`text-[8px] font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded-sm border shadow-sm whitespace-nowrap ${getStatusStyle(task.status)}`}
        >
          {task.status}
        </span>
      </div>

      {/* Metrics Section */}
      <div
        className="relative flex items-center gap-4 px-3 py-2 rounded-sm border"
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--border-color)",
        }}
      >
        <div
          className="flex items-center gap-1.5 text-[10px] font-bold"
          style={{ color: "var(--text-secondary)" }}
        >
          <MapPin size={13} className="text-[#22c55e]" />
          <span>{task.stops} stops</span>
        </div>
        <div
          className="w-px h-3"
          style={{ backgroundColor: "var(--border-color)" }}
        />
        <div
          className="flex items-center gap-1.5 text-[10px] font-bold"
          style={{ color: "var(--text-secondary)" }}
        >
          <Clock size={13} className="text-[#22c55e]" />
          <span>{task.duration}</span>
        </div>
      </div>

      {/* Footer Section */}
      <div
        className="relative pt-3 border-t mt-auto flex items-center justify-between gap-3"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div className="flex flex-col">
          <span
            className="text-[8px] font-black uppercase tracking-[0.15em] mb-0.5"
            style={{ color: "var(--text-muted)" }}
          >
            Load Capacity
          </span>
          <span
            className="text-xs font-black uppercase tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            {task.load}
          </span>
        </div>

        <ResuableButton
          variant="primary"
          className="h-9 px-5 !rounded-sm text-[9px] font-black uppercase tracking-[0.12em] bg-[#22c55e] hover:bg-[#1ea34d] shadow-md shadow-[#22c55e]/25 hover:shadow-[#22c55e]/40 transition-all duration-300"
          onClick={(e) => {
            e.stopPropagation();
            onDetails(task);
          }}
        >
          {task.status === "AVAILABLE"
            ? "Claim"
            : task.status === "IN PROGRESS"
              ? "Update"
              : "Details"}
        </ResuableButton>
      </div>
    </div>
  );
};

const VolunteerTasks = () => {
  const [activeTab, setActiveTab] = useState<"active" | "opps" | "past">(
    "active",
  );
  const [viewMode, setViewMode] = useState<"table" | "grid">("grid");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [verifyingPoint, setVerifyingPoint] = useState<{
    index: number;
    type: "pickup" | "delivery";
  } | null>(null);
  const [tasks, setTasks] = useState<{
    active: Task[];
    opps: Task[];
    past: Task[];
  }>({
    active: [
      {
        id: "t1",
        title: "Food Redistribution",
        routeNumber: "201",
        stops: 3,
        duration: "2.5h",
        load: "50kg",
        status: "IN PROGRESS",
        type: "delivery",
        partnerOrg: "Food Bank India",
        destinations: [
          "White Town Center",
          "Sacred Heart Church",
          "Rock Beach Hub",
        ],
        baseAddress: "12, Mission Street, Near Aurobindo Ashram, Pondicherry",
        isPickupReached: false,
        completedDestinations: [],
      },
      {
        id: "t2",
        title: "Evening Logistics",
        routeNumber: "202",
        stops: 4,
        duration: "3.0h",
        load: "45kg",
        status: "IN PROGRESS",
        type: "delivery",
        partnerOrg: "City Relief NGO",
        destinations: [
          "Puducherry Station",
          "Goubert Market",
          "General Hospital",
          "Bharathi Park",
        ],
        baseAddress: "Plot 4, Marine Drive, Goubert Avenue, Pondicherry",
        isPickupReached: true,
        completedDestinations: [0],
      },
    ],
    opps: [
      {
        id: "o1",
        title: "Central Kitchen Prep",
        routeNumber: "K-92",
        stops: 1,
        duration: "4.0h",
        load: "120 meals",
        status: "AVAILABLE",
        type: "kitchen",
        description:
          "Assist with massive food preparation for the upcoming community dinner. No heavy lifting required, just precision and speed.",
        location: "Central Kitchen, Heritage Town",
        contactPerson: "Chef Maria",
        contactPhone: "+91 98765 43210",
        partnerOrg: "Global Help NGO",
        destinations: ["Heritage Town Hub"],
        baseAddress: "88, MG Road, Near Grand Bazaar, Puducherry",
      },
      {
        id: "o2",
        title: "Shelter Outreach",
        routeNumber: "O-15",
        stops: 6,
        duration: "2.0h",
        load: "N/A",
        status: "AVAILABLE",
        type: "shelter",
        partnerOrg: "Hope Shelter Home",
        destinations: [
          "Lawspet Shelter",
          "Rainbow Nagar Hub",
          "Ariankuppam Depot",
          "Collector Office",
          "Odiansalai Station",
          "Public Library",
        ],
        baseAddress: "Building 5, ECR Road, Near Lawspet, Puducherry",
      },
      {
        id: "o3",
        title: "Neighborhood Delivery",
        routeNumber: "D-44",
        stops: 8,
        duration: "1.5h",
        load: "20kg",
        status: "AVAILABLE",
        type: "delivery",
        partnerOrg: "Community Kitchen",
        destinations: [
          "Botanical Garden",
          "Nellitope Circle",
          "Anna Salai Market",
          "Indira Gandhi Statue",
          "Bussy Street",
          "Villianur Road",
          "Mudhaliarpet",
          "Murungapakkam",
        ],
        baseAddress: "Shop 44, JIPMER Campus Road, Gorimedu, Puducherry",
      },
    ],
    past: [
      {
        id: "p1",
        title: "Morning Route",
        routeNumber: "198",
        stops: 5,
        duration: "3.5h",
        load: "75kg",
        status: "COMPLETED",
        type: "delivery",
        partnerOrg: "Relief Group",
        destinations: [
          "Manakula Vinayagar",
          "French Quarter",
          "Kalamandapam",
          "Chunambar",
          "Paradise Beach",
        ],
        baseAddress: "Beach Road Dispatch, Near Lighthouse, Puducherry",
        isPickupReached: true,
        completedDestinations: [0, 1, 2, 3, 4],
      },
    ],
  });

  const handleDetailsClick = (task: Task) => {
    setSelectedTask(task);
    setIsDrawerOpen(true);
  };

  const handleReachClick = (index: number, type: "pickup" | "delivery") => {
    setVerifyingPoint({ index, type });
    setIsOtpModalOpen(true);
  };

  const handleVerifyOtp = () => {
    if (!selectedTask || !verifyingPoint || otpValue !== "1234") {
      toast.error("Invalid security code. Please check with the coordinator.");
      return;
    }

    toast.success("Location verified successfully!");

    const updatedActive = tasks.active.map((t) => {
      if (t.id === selectedTask.id) {
        let updatedTask = { ...t };
        if (verifyingPoint.type === "pickup") {
          updatedTask.isPickupReached = true;
        } else {
          updatedTask.completedDestinations = [
            ...(updatedTask.completedDestinations || []),
            verifyingPoint.index,
          ];
        }

        // Check if all finished
        const allDestinationsDone =
          updatedTask.completedDestinations?.length ===
          (updatedTask.destinations?.length || 0);

        if (updatedTask.isPickupReached && allDestinationsDone) {
          updatedTask.status = "COMPLETED";
        }

        return updatedTask;
      }
      return t;
    });

    const completedTask = updatedActive.find(
      (t) => t.id === selectedTask.id && t.status === "COMPLETED",
    );

    setTasks((prev) => {
      let newActive = updatedActive;
      let newPast = prev.past;
      if (completedTask) {
        newActive = updatedActive.filter((t) => t.id !== completedTask.id);
        newPast = [completedTask, ...prev.past];
      }
      return { ...prev, active: newActive, past: newPast };
    });

    if (completedTask) {
      setIsDrawerOpen(false);
    } else {
      setSelectedTask(
        updatedActive.find((t) => t.id === selectedTask.id) || null,
      );
    }

    setIsOtpModalOpen(false);
    setOtpValue("");
    setVerifyingPoint(null);
  };

  const handleConfirmClaim = () => {
    setIsClaiming(true);
    setTimeout(() => {
      if (selectedTask) {
        const claimedTask: Task = {
          ...selectedTask,
          status: "IN PROGRESS",
          isPickupReached: false,
          completedDestinations: [],
        };
        setTasks((prev) => ({
          ...prev,
          opps: prev.opps.filter((t) => t.id !== selectedTask.id),
          active: [claimedTask, ...prev.active],
        }));
      }
      toast.success("Task claimed and added to your dispatch!");
      setIsClaiming(false);
      setIsClaimModalOpen(false);
    }, 1500);
  };

  const getCurrentTasks = () => {
    switch (activeTab) {
      case "active":
        return tasks.active;
      case "opps":
        return tasks.opps;
      case "past":
        return tasks.past;
      default:
        return [];
    }
  };

  const tableColumns: ColumnDef[] = [
    { uid: "title", name: "Task Details", align: "start" },
    { uid: "metrics", name: "Metrics", align: "start" },
    { uid: "load", name: "Inventory", align: "start" },
    { uid: "status", name: "Status", align: "start" },
    { uid: "actions", name: "Actions", align: "end" },
  ];

  const renderCell = useCallback((task: Task, columnKey: React.Key) => {
    switch (columnKey) {
      case "title":
        return (
          <div className="flex items-center gap-3 text-start">
            <div
              className={`w-10 h-10 rounded-md border flex items-center justify-center shrink-0 ${
                task.type === "delivery"
                  ? "bg-emerald-500/10 text-[#22c55e] border-emerald-500/20"
                  : task.type === "kitchen"
                    ? "bg-orange-500/10 text-orange-500 border-orange-500/20"
                    : "bg-rose-500/10 text-rose-500 border-rose-500/20"
              }`}
            >
              {getCategoryIcon(task.type)}
            </div>
            <div>
              <p
                className="text-sm font-black tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                {task.title}
              </p>
              <div className="flex items-center gap-2">
                <p
                  className="text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: "var(--text-muted)" }}
                >
                  Route #{task.routeNumber}
                </p>
                {task.partnerOrg && (
                  <span className="text-[10px] font-black text-[#22c55e] uppercase tracking-widest">
                    • {task.partnerOrg}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      case "metrics":
        return (
          <div className="flex items-center gap-4 text-start">
            <div className="flex flex-col">
              <span
                className="text-[9px] font-black uppercase tracking-widest"
                style={{ color: "var(--text-muted)" }}
              >
                Stops
              </span>
              <span
                className="text-[11px] font-bold uppercase"
                style={{ color: "var(--text-secondary)" }}
              >
                {task.stops} pts
              </span>
            </div>
            <div className="flex flex-col">
              <span
                className="text-[9px] font-black uppercase tracking-widest"
                style={{ color: "var(--text-muted)" }}
              >
                Est.
              </span>
              <span
                className="text-[11px] font-bold uppercase"
                style={{ color: "var(--text-secondary)" }}
              >
                {task.duration}
              </span>
            </div>
          </div>
        );
      case "load":
        return (
          <div className="text-start">
            <span
              className="px-2.5 py-1 border rounded-md text-[10px] font-black uppercase tracking-widest"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-color)",
                color: "var(--text-secondary)",
              }}
            >
              {task.load}
            </span>
          </div>
        );
      case "status":
        return (
          <div className="text-start">
            <span
              className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-sm border ${getStatusStyle(task.status)}`}
            >
              {task.status}
            </span>
          </div>
        );
      case "actions":
        return (
          <div className="flex items-center justify-end gap-2 pr-4">
            <ResuableButton
              variant="primary"
              className="h-8 px-6 !rounded-sm text-[10px] font-black tracking-widest uppercase shadow-sm bg-[#22c55e] hover:bg-green-600"
              onClick={(e) => {
                e.stopPropagation();
                handleDetailsClick(task);
              }}
            >
              {task.status === "AVAILABLE"
                ? "Claim"
                : task.status === "IN PROGRESS"
                  ? "Update"
                  : "Details"}
            </ResuableButton>
          </div>
        );
      default:
        return null;
    }
  }, []);

  return (
    <div
      className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      {/* Header Section */}
      <div
        className="sticky top-0 z-20 shadow-sm/5 border-b"
        style={{
          backgroundColor: "var(--bg-primary)",
          borderColor: "var(--border-color)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex flex-col items-start text-left">
              <h1
                className="text-2xl sm:text-3xl font-black tracking-tighter uppercase leading-none mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Volunteer <span className="text-[#22c55e]">Tasks</span>
              </h1>
              <div className="flex flex-wrap items-center justify-start gap-3 sm:gap-4">
                <div
                  className="flex items-center gap-2 px-2.5 py-1 rounded-md border"
                  style={{
                    backgroundColor: "rgba(34, 197, 94, 0.05)",
                    borderColor: "rgba(34, 197, 94, 0.1)",
                  }}
                >
                  <Navigation className="w-3 h-3 text-[#22c55e]" />
                  <span className="text-[8px] sm:text-[9px] font-black text-[#22c55e] uppercase tracking-widest leading-none">
                    Active Dispatch
                  </span>
                </div>
                <div
                  className="flex items-center gap-2 text-[9px] sm:text-[10px] font-bold"
                  style={{ color: "var(--text-muted)" }}
                >
                  <Calendar size={14} style={{ color: "var(--text-muted)" }} />{" "}
                  Jan 10, 2026
                </div>
              </div>
            </div>

            {/* Controls Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full lg:w-auto">
              {/* Tabs Switcher - Left Aligned */}
              <div
                className="flex items-center gap-1 p-1 rounded-lg w-full sm:w-auto overflow-x-auto no-scrollbar"
                style={{ backgroundColor: "var(--bg-secondary)" }}
              >
                {[
                  { id: "active", label: "Active", count: tasks.active.length },
                  {
                    id: "opps",
                    label: "Available",
                    count: tasks.opps.length,
                  },
                  { id: "past", label: "History", count: tasks.past.length },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-3 sm:px-4 py-2 rounded-md transition-all flex items-center gap-2 whitespace-nowrap flex-1 sm:flex-none justify-center ${
                      activeTab === tab.id ? "shadow-sm border" : ""
                    }`}
                    style={{
                      backgroundColor:
                        activeTab === tab.id
                          ? "var(--bg-primary)"
                          : "transparent",
                      borderColor:
                        activeTab === tab.id
                          ? "var(--border-color)"
                          : "transparent",
                      color:
                        activeTab === tab.id ? "#22c55e" : "var(--text-muted)",
                    }}
                  >
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest">
                      {tab.label}
                    </span>
                    <span
                      className="text-[8px] sm:text-[9px] font-black px-1.5 rounded-full"
                      style={{
                        backgroundColor:
                          activeTab === tab.id
                            ? "rgba(34, 197, 94, 0.1)"
                            : "rgba(148, 163, 184, 0.1)",
                        color:
                          activeTab === tab.id
                            ? "#22c55e"
                            : "var(--text-muted)",
                      }}
                    >
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* View Switcher */}
              <div
                className="flex items-center gap-1 p-1 rounded-lg shrink-0"
                style={{ backgroundColor: "var(--bg-secondary)" }}
              >
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-2 rounded-md transition-all ${viewMode === "table" ? "shadow-sm" : ""}`}
                  style={{
                    backgroundColor:
                      viewMode === "table"
                        ? "var(--bg-primary)"
                        : "transparent",
                    color:
                      viewMode === "table" ? "#22c55e" : "var(--text-muted)",
                  }}
                >
                  <ListIcon size={16} />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-all ${viewMode === "grid" ? "shadow-sm" : ""}`}
                  style={{
                    backgroundColor:
                      viewMode === "grid" ? "var(--bg-primary)" : "transparent",
                    color:
                      viewMode === "grid" ? "#22c55e" : "var(--text-muted)",
                  }}
                >
                  <LayoutGrid size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 pb-16">
        {getCurrentTasks().length > 0 ? (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            {viewMode === "table" ? (
              <div className="w-full">
                <ReusableTable
                  data={getCurrentTasks()}
                  columns={tableColumns}
                  renderCell={renderCell}
                  onRowClick={(task: Task) => handleDetailsClick(task)}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {getCurrentTasks().map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onDetails={handleDetailsClick}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div
            className="py-20 sm:py-32 rounded-lg border border-dashed flex flex-col items-center justify-center gap-4 px-4 text-center"
            style={{
              backgroundColor: "var(--bg-primary)",
              borderColor: "var(--border-color)",
            }}
          >
            <div
              className="w-12 h-12 sm:w-16 sm:h-16 border rounded-sm flex items-center justify-center"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-color)",
              }}
            >
              <Package size={32} style={{ color: "var(--text-muted)" }} />
            </div>
            <p
              className="font-black text-[10px] sm:text-xs uppercase tracking-[0.3em]"
              style={{ color: "var(--text-muted)" }}
            >
              No relevant tasks found
            </p>
            <ResuableButton
              variant="secondary"
              className="px-6 py-2.5 !rounded-sm text-[9px] sm:text-[10px] font-black uppercase tracking-widest"
              onClick={() => setActiveTab("opps")}
            >
              Browse Available
            </ResuableButton>
          </div>
        )}
      </div>

      <ResuableDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Task Details"
        subtitle={`Route #${selectedTask?.routeNumber} • Information`}
        size="md"
        footer={
          selectedTask &&
          selectedTask.status === "AVAILABLE" && (
            <ResuableButton
              variant="primary"
              className="w-full bg-[#22c55e] h-11 !rounded-sm text-xs font-black uppercase tracking-widest"
              onClick={() => setIsClaimModalOpen(true)}
            >
              Claim Task
            </ResuableButton>
          )
        }
      >
        {selectedTask && (
          <div className="space-y-6 p-6">
            <div
              className="flex items-start gap-5 p-5 rounded-md border"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-color)",
              }}
            >
              <div
                className={`w-12 h-12 rounded-sm flex items-center justify-center text-2xl border ${
                  selectedTask.type === "delivery"
                    ? "bg-emerald-500/10 text-[#22c55e] border-emerald-500/20"
                    : "bg-orange-500/10 text-orange-500 border-orange-500/20"
                }`}
              >
                {getCategoryIcon(selectedTask.type)}
              </div>
              <div className="space-y-1">
                <div className="space-y-0.5">
                  <h3
                    className="text-lg font-black leading-tight"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {selectedTask.title}
                  </h3>
                  {selectedTask.partnerOrg && (
                    <p className="text-[10px] font-black text-[#22c55e] uppercase tracking-widest">
                      {selectedTask.partnerOrg}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sm border ${getStatusStyle(selectedTask.status)}`}
                  >
                    {selectedTask.status}
                  </span>
                  <span
                    className="text-[10px] font-bold"
                    style={{ color: "var(--text-muted)" }}
                  >
                    ID: {selectedTask.id}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div
                className="border p-4 rounded-md space-y-1 shadow-sm"
                style={{
                  backgroundColor: "var(--bg-primary)",
                  borderColor: "var(--border-color)",
                }}
              >
                <span
                  className="text-[8px] font-black uppercase tracking-widest"
                  style={{ color: "var(--text-muted)" }}
                >
                  Load Metrics
                </span>
                <p
                  className="text-sm font-black"
                  style={{ color: "var(--text-primary)" }}
                >
                  {selectedTask.load}
                </p>
              </div>
              <div
                className="border p-4 rounded-md space-y-1 shadow-sm"
                style={{
                  backgroundColor: "var(--bg-primary)",
                  borderColor: "var(--border-color)",
                }}
              >
                <span
                  className="text-[8px] font-black uppercase tracking-widest"
                  style={{ color: "var(--text-muted)" }}
                >
                  Est. Duration
                </span>
                <p
                  className="text-sm font-black"
                  style={{ color: "var(--text-primary)" }}
                >
                  {selectedTask.duration}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h4
                className="text-[10px] font-black uppercase tracking-widest border-b pb-2"
                style={{
                  color: "var(--text-muted)",
                  borderColor: "var(--border-color)",
                }}
              >
                Task Requirements
              </h4>
              <div className="space-y-6">
                {/* Pickup / Starting Point */}
                <div className="relative pl-8 pb-4">
                  <div
                    className="absolute left-0 top-0 bottom-0 w-0.5"
                    style={{ backgroundColor: "var(--border-color)" }}
                  />
                  <div
                    className={`absolute -left-[7px] top-0 w-3.5 h-3.5 rounded-full border-2 z-10 transition-all duration-500 ${selectedTask.isPickupReached ? "bg-green-500 border-green-200 ring-4" : "bg-white border-slate-300 ring-4"}`}
                    style={{ boxShadow: "0 0 0 4px var(--bg-secondary)" }}
                  />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className="p-1 rounded-sm border"
                          style={{
                            backgroundColor: "rgba(34, 197, 94, 0.05)",
                            borderColor: "rgba(34, 197, 94, 0.1)",
                          }}
                        >
                          <Truck size={12} className="text-[#22c55e]" />
                        </span>
                        <p
                          className="text-[11px] font-black uppercase tracking-tight"
                          style={{ color: "var(--text-primary)" }}
                        >
                          Bulk Pick-up Point
                        </p>
                      </div>
                      {selectedTask.status === "IN PROGRESS" &&
                        !selectedTask.isPickupReached && (
                          <button
                            onClick={() => handleReachClick(0, "pickup")}
                            className="h-7 px-4 rounded-full text-[9px] font-black uppercase tracking-wider bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/20 active:scale-95 transition-all"
                          >
                            Verify Arrival
                          </button>
                        )}
                      {selectedTask.isPickupReached && (
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-100 dark:bg-green-500/10 dark:border-green-500/20">
                          <CheckCircle2
                            size={12}
                            className="text-green-600 dark:text-[#22c55e]"
                          />
                          <span className="text-[9px] font-black text-green-600 dark:text-[#22c55e] uppercase">
                            Confirmed
                          </span>
                        </div>
                      )}
                    </div>

                    <div
                      className="p-4 rounded-xl border transition-all duration-300"
                      style={{
                        backgroundColor: "var(--bg-primary)",
                        borderColor: "var(--border-color)",
                      }}
                    >
                      <h5
                        className="text-xs font-black mb-1 flex items-center gap-2"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {selectedTask.location || "Central NGO Hub"}
                      </h5>
                      <p
                        className="text-[10px] font-bold leading-relaxed italic"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {selectedTask.baseAddress ||
                          "Full address details will be shared once you start the route."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Destinations / Stops */}
                <div className="relative pl-8">
                  <div
                    className="absolute left-0 top-0 bottom-0 w-0.5"
                    style={{ backgroundColor: "var(--border-color)" }}
                  />
                  <div
                    className="absolute -left-[7px] top-0 w-3.5 h-3.5 rounded-full border-2 ring-4 z-10"
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      borderColor: "var(--border-color)",
                      boxShadow: "0 0 0 4px var(--bg-secondary)",
                    }}
                  />

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span
                        className="p-1 rounded-sm border"
                        style={{
                          backgroundColor: "rgba(59, 130, 246, 0.05)",
                          borderColor: "rgba(59, 130, 246, 0.1)",
                        }}
                      >
                        <Navigation size={12} className="text-blue-500" />
                      </span>
                      <p
                        className="text-[11px] font-black uppercase tracking-tight"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Community Distribution ({selectedTask.stops} Stops)
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      {selectedTask.destinations ? (
                        selectedTask.destinations.map((loc, i) => {
                          const isDone =
                            selectedTask.completedDestinations?.includes(i);
                          const isActive =
                            selectedTask.isPickupReached &&
                            (i === 0 ||
                              selectedTask.completedDestinations?.includes(
                                i - 1,
                              )) &&
                            !isDone;

                          return (
                            <div
                              key={i}
                              className={`group relative flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${isDone ? "opacity-30" : isActive ? "shadow-md ring-2 ring-green-500/5" : ""}`}
                              style={{
                                backgroundColor: isActive
                                  ? "var(--bg-primary)"
                                  : "var(--bg-secondary)",
                                borderColor: isActive
                                  ? "#22c55e"
                                  : "var(--border-color)",
                              }}
                            >
                              <div className="flex items-center gap-4">
                                <div
                                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black border transition-all ${isDone ? "bg-[#22c55e] border-green-600 text-white" : isActive ? "border-[#22c55e] text-[#22c55e]" : "text-slate-400"}`}
                                  style={{
                                    backgroundColor: isDone
                                      ? ""
                                      : isActive
                                        ? "rgba(34, 197, 94, 0.05)"
                                        : "var(--bg-primary)",
                                    borderColor: isDone
                                      ? ""
                                      : isActive
                                        ? ""
                                        : "var(--border-color)",
                                  }}
                                >
                                  {isDone ? <CheckCircle2 size={12} /> : i + 1}
                                </div>
                                <div className="text-start">
                                  <p
                                    className={`text-[11px] font-black uppercase tracking-tight ${isDone ? "line-through" : ""}`}
                                    style={{
                                      color: isDone
                                        ? "var(--text-muted)"
                                        : "var(--text-primary)",
                                    }}
                                  >
                                    {loc}
                                  </p>
                                  <p
                                    className="text-[9px] font-bold uppercase tracking-widest"
                                    style={{ color: "var(--text-muted)" }}
                                  >
                                    Drop-off Point
                                  </p>
                                </div>
                              </div>

                              {selectedTask.status === "IN PROGRESS" &&
                                isActive && (
                                  <button
                                    onClick={() =>
                                      handleReachClick(i, "delivery")
                                    }
                                    className="px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-[#22c55e] hover:bg-[#1ea34d] text-white shadow-lg shadow-[#22c55e]/10 active:scale-95 transition-all"
                                  >
                                    Verify Drop
                                  </button>
                                )}
                            </div>
                          );
                        })
                      ) : (
                        <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-xl text-center">
                          <p className="text-[10px] font-bold text-slate-400 italic">
                            Route data loading...
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {selectedTask.status === "COMPLETED" && (
                  <div
                    className="p-4 rounded-xl border flex items-center gap-4"
                    style={{
                      backgroundColor: "rgba(34, 197, 94, 0.05)",
                      borderColor: "rgba(34, 197, 94, 0.1)",
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center border shadow-sm text-[#22c55e]"
                      style={{
                        backgroundColor: "var(--bg-primary)",
                        borderColor: "rgba(34, 197, 94, 0.2)",
                      }}
                    >
                      <CheckCircle2 size={24} />
                    </div>
                    <div className="text-start">
                      <p className="text-[11px] font-black text-green-700 uppercase tracking-tight dark:text-green-500">
                        Route Successfully Completed
                      </p>
                      <p className="text-[9px] font-bold text-green-600/80 uppercase tracking-widest">
                        Logged: Jan 10, 2026 • 11:45 AM
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2 text-start">
              <h4
                className="text-[10px] font-black uppercase tracking-widest"
                style={{ color: "var(--text-muted)" }}
              >
                Instructions
              </h4>
              <div
                className="p-4 rounded-sm border"
                style={{
                  backgroundColor: "rgba(245, 158, 11, 0.05)",
                  borderColor: "rgba(245, 158, 11, 0.1)",
                }}
              >
                <p className="text-xs font-bold text-amber-600 leading-relaxed italic">
                  "
                  {selectedTask.description ||
                    "Follow standard procedure. Please update the task status as you complete each step."}
                  "
                </p>
              </div>
            </div>

            {selectedTask.contactPerson && (
              <div
                className="p-4 rounded-sm border flex items-center justify-between"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "var(--border-color)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center border shadow-inner overflow-hidden"
                    style={{
                      backgroundColor: "var(--bg-primary)",
                      borderColor: "var(--border-color)",
                    }}
                  >
                    <User size={16} style={{ color: "var(--text-muted)" }} />
                  </div>
                  <div className="text-start">
                    <p
                      className="text-[11px] font-black uppercase leading-none mb-1"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {selectedTask.contactPerson}
                    </p>
                    <p
                      className="text-[9px] font-bold tracking-wider"
                      style={{ color: "var(--text-muted)" }}
                    >
                      ON-SITE COORDINATOR
                    </p>
                  </div>
                </div>
                {selectedTask.contactPhone && (
                  <ResuableButton
                    variant="secondary"
                    className="h-8 w-8 !p-0 !rounded-full"
                  >
                    <Phone size={14} className="text-[#22c55e]" />
                  </ResuableButton>
                )}
              </div>
            )}
          </div>
        )}
      </ResuableDrawer>

      {/* Claim Confirmation Modal */}
      <ResuableModal
        isOpen={isClaimModalOpen}
        onOpenChange={setIsClaimModalOpen}
        title="Task Assignment"
        subtitle="Confirm Claim"
        size="sm"
        footer={
          <div className="flex gap-2 w-full">
            <ResuableButton
              variant="secondary"
              className="flex-1"
              onClick={() => setIsClaimModalOpen(false)}
            >
              Abort
            </ResuableButton>
            <ResuableButton
              variant="primary"
              className="flex-1 bg-[#22c55e]"
              onClick={handleConfirmClaim}
              disabled={isClaiming}
            >
              {isClaiming ? "Saving..." : "Confirm"}
            </ResuableButton>
          </div>
        }
      >
        {selectedTask && (
          <div className="p-6 text-center space-y-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto border"
              style={{
                backgroundColor: "rgba(34, 197, 94, 0.05)",
                borderColor: "rgba(34, 197, 94, 0.1)",
                color: "#22c55e",
              }}
            >
              <CheckCircle2 size={32} />
            </div>
            <div className="space-y-2">
              <h3
                className="text-lg font-black uppercase tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                Claim Task?
              </h3>
              <p
                className="text-xs font-bold leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                You are about to accept{" "}
                <span style={{ color: "var(--text-primary)" }}>
                  "{selectedTask.title}"
                </span>
                . This task will be added to your active list.
              </p>
            </div>
            <div
              className="flex items-center justify-center gap-4 pt-2 border-t"
              style={{ borderColor: "var(--border-color)" }}
            >
              <div className="flex flex-col">
                <span
                  className="text-[8px] font-black uppercase"
                  style={{ color: "var(--text-muted)" }}
                >
                  Load
                </span>
                <span
                  className="text-xs font-black"
                  style={{ color: "var(--text-primary)" }}
                >
                  {selectedTask.load}
                </span>
              </div>
              <div className="flex flex-col">
                <span
                  className="text-[8px] font-black uppercase"
                  style={{ color: "var(--text-muted)" }}
                >
                  Est. Time
                </span>
                <span
                  className="text-xs font-black"
                  style={{ color: "var(--text-primary)" }}
                >
                  {selectedTask.duration}
                </span>
              </div>
            </div>
          </div>
        )}
      </ResuableModal>

      {/* OTP Verification Modal */}
      <ResuableModal
        isOpen={isOtpModalOpen}
        onOpenChange={setIsOtpModalOpen}
        title="Point Verification"
        subtitle="Security Protocols Active"
        size="sm"
        footer={
          <div className="flex gap-2 w-full p-2">
            <ResuableButton
              variant="primary"
              className="flex-1 h-12 bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/20 text-[11px] font-black uppercase tracking-widest"
              onClick={handleVerifyOtp}
            >
              Verify & Log Status
            </ResuableButton>
          </div>
        }
      >
        <div className="p-5 text-center space-y-4">
          <div className="relative mx-auto w-14 h-14">
            <div className="absolute inset-0 bg-blue-500/10 rounded-full animate-ping" />
            <div className="relative w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20 text-white">
              <Navigation size={24} className="rotate-45" />
            </div>
          </div>

          <div className="space-y-1">
            <h3
              className="text-sm font-black uppercase tracking-widest leading-none"
              style={{ color: "var(--text-primary)" }}
            >
              Verify{" "}
              {verifyingPoint?.type === "pickup"
                ? "Bulk Pickup"
                : "Community Delivery"}
            </h3>
            <p
              className="text-[9px] font-bold uppercase tracking-widest"
              style={{ color: "var(--text-muted)" }}
            >
              Enter secure 4-digit code
            </p>
          </div>

          <div className="flex justify-center">
            <input
              type="text"
              maxLength={4}
              value={otpValue}
              onChange={(e) => setOtpValue(e.target.value)}
              placeholder="0000"
              className="w-full max-w-[140px] h-10 border-2 rounded-lg text-center text-xl font-black tracking-[0.3em] transition-all duration-300 outline-none shadow-inner"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-color)",
                color: "var(--text-primary)",
              }}
            />
          </div>

          <div
            className="p-3 rounded-xl border space-y-1.5"
            style={{
              backgroundColor: "rgba(245, 158, 11, 0.05)",
              borderColor: "rgba(245, 158, 11, 0.1)",
            }}
          >
            <p className="text-[9px] font-bold text-amber-600 leading-relaxed uppercase tracking-wider">
              The on-site coordinator has the unique code for this location.
            </p>
            <div
              className="h-px w-10 mx-auto"
              style={{ backgroundColor: "rgba(245, 158, 11, 0.2)" }}
            />
            <p
              className="text-[9px] font-black uppercase tracking-[0.2em]"
              style={{ color: "var(--text-muted)" }}
            >
              Demo Access: <span className="text-[#22c55e]">1234</span>
            </p>
          </div>
        </div>
      </ResuableModal>
    </div>
  );
};

export default VolunteerTasks;
