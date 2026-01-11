import { useState } from "react";
import {
  Package,
  Truck,
  ChevronRight,
  Info,
  MapPin,
  Clock,
  Weight,
  ChefHat,
  Heart,
  Calendar,
} from "lucide-react";
import ResuableButton from "../../../../global/components/resuable-components/button";

interface Task {
  id: string;
  title: string;
  routeNumber: string;
  stops: number;
  duration: string;
  load: string;
  status: "IN PROGRESS" | "AVAILABLE" | "COMPLETED";
  type: "delivery" | "kitchen" | "shelter";
}

// Task Row Component - Precise Match to Reference Image
const TaskRow: React.FC<{ task: Task }> = ({ task }) => {
  const getIcon = () => {
    switch (task.type) {
      case "delivery":
        return <Truck className="w-6 h-6 text-[#22c55e]" />;
      case "kitchen":
        return <ChefHat className="w-6 h-6 text-orange-500" />;
      case "shelter":
        return <Heart className="w-6 h-6 text-rose-500" />;
      default:
        return <Package className="w-6 h-6 text-[#22c55e]" />;
    }
  };

  const getIconBg = () => {
    switch (task.type) {
      case "delivery":
        return "bg-emerald-50 border-emerald-100";
      case "kitchen":
        return "bg-orange-50 border-orange-100";
      case "shelter":
        return "bg-rose-50 border-rose-100";
      default:
        return "bg-emerald-50 border-emerald-100";
    }
  };

  const getStatusStyle = () => {
    switch (task.status) {
      case "IN PROGRESS":
        return "text-amber-600 bg-amber-50 border-amber-100";
      case "AVAILABLE":
        return "text-[#22c55e] bg-emerald-50 border-[#22c55e]/10";
      case "COMPLETED":
        return "text-[#22c55e] bg-emerald-50 border-[#22c55e]/10";
    }
  };

  return (
    <div
      className="border p-6 flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:bg-white group rounded-sm shadow-sm"
      style={{
        backgroundColor: "var(--bg-primary)",
        borderColor: "var(--border-color)",
      }}
    >
      <div className="flex items-center gap-6 flex-1 min-w-0">
        <div
          className={`w-16 h-16 ${getIconBg()} rounded-sm flex items-center justify-center shrink-0 border shadow-sm group-hover:scale-105 transition-transform duration-300`}
        >
          {getIcon()}
        </div>

        <div className="space-y-2 text-left">
          <div className="flex items-center gap-3">
            <h4 className="text-xl font-black tracking-tight text-slate-800">
              {task.title}
            </h4>
            <span className="text-[10px] font-black uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded-sm border">
              Route #{task.routeNumber}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-600 transition-colors">
              <MapPin size={14} className="text-[#22c55e]" />
              <span>{task.stops} Stop Points</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-600 transition-colors">
              <Clock size={14} className="text-[#22c55e]" />
              <span>{task.duration} Est.</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-600 transition-colors">
              <Weight size={14} className="text-[#22c55e]" />
              <span>{task.load} Load</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6 shrink-0 w-full md:w-auto">
        <span
          className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-sm border shadow-sm ${getStatusStyle()}`}
        >
          {task.status}
        </span>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <ResuableButton
            variant="secondary"
            className="flex-1 md:flex-none px-6 py-3 !rounded-sm text-[11px] font-black uppercase tracking-widest border-slate-200"
          >
            <Info size={16} />
            Details
          </ResuableButton>
          <ResuableButton
            variant="primary"
            className={`flex-1 md:flex-none px-8 py-3 !rounded-sm text-[11px] font-black uppercase tracking-widest text-white shadow-lg shadow-[#22c55e]/20`}
          >
            {task.status === "AVAILABLE" ? "Claim Task" : "Update Status"}
            <ChevronRight size={16} />
          </ResuableButton>
        </div>
      </div>
    </div>
  );
};

const VolunteerTasks = () => {
  const [activeTab, setActiveTab] = useState<"active" | "opps" | "past">(
    "active"
  );

  const activeTasks: Task[] = [
    {
      id: "t1",
      title: "Food Redistribution",
      routeNumber: "201",
      stops: 3,
      duration: "2.5h",
      load: "50kg",
      status: "IN PROGRESS",
      type: "delivery",
    },
    {
      id: "t2",
      title: "Food Redistribution",
      routeNumber: "202",
      stops: 4,
      duration: "3.0h",
      load: "45kg",
      status: "IN PROGRESS",
      type: "delivery",
    },
  ];

  const opportunityTasks: Task[] = [
    {
      id: "o1",
      title: "Central Kitchen Prep",
      routeNumber: "K-92",
      stops: 1,
      duration: "4.0h",
      load: "120 meals",
      status: "AVAILABLE",
      type: "kitchen",
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
    },
  ];

  const pastTasks: Task[] = [
    {
      id: "p1",
      title: "Morning Route",
      routeNumber: "198",
      stops: 5,
      duration: "3.5h",
      load: "75kg",
      status: "COMPLETED",
      type: "delivery",
    },
  ];

  const getCurrentTasks = () => {
    switch (activeTab) {
      case "active":
        return activeTasks;
      case "opps":
        return opportunityTasks;
      case "past":
        return pastTasks;
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      {/* Header Section */}
      <div
        className="bg-white border-b sticky top-0 z-20"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-center md:text-left">
              <h1
                className="text-4xl font-black tracking-tighter uppercase mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Volunteer Missions
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-sm border border-slate-200">
                  <Package className="w-4 h-4 text-[#22c55e]" />
                  <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">
                    Manage Assignments
                  </span>
                </div>
                <p
                  className="text-xs font-bold flex items-center gap-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <Calendar className="w-4 h-4 text-[#22c55e]" />
                  Jan 10, 2026
                </p>
              </div>
            </div>

            {/* Tabs Integrated into Header */}
            <div className="flex items-center gap-8 self-end">
              {[
                {
                  id: "active",
                  label: "Active",
                  count: activeTasks.length,
                },
                {
                  id: "opps",
                  label: "Available",
                  count: opportunityTasks.length,
                },
                { id: "past", label: "History", count: pastTasks.length },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`relative pb-2 flex items-center gap-2 group transition-all`}
                >
                  <span
                    className={`text-[12px] font-black uppercase tracking-[0.2em] ${
                      activeTab === tab.id
                        ? "text-[#22c55e]"
                        : "text-slate-400 group-hover:text-slate-600"
                    }`}
                  >
                    {tab.label}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-sm text-[10px] font-black ${
                      activeTab === tab.id
                        ? "bg-emerald-50 text-[#22c55e] border border-emerald-100"
                        : "bg-slate-50 text-slate-400 border border-slate-100"
                    }`}
                  >
                    {tab.count}
                  </span>
                  {activeTab === tab.id && (
                    <div className="absolute -bottom-0 left-0 w-full h-1 bg-[#22c55e] rounded-t-full" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 mt-10 pb-16">
        {/* Task List Container */}
        <div className="grid grid-cols-1 gap-4">
          {getCurrentTasks().length > 0 ? (
            getCurrentTasks().map((task) => (
              <TaskRow key={task.id} task={task} />
            ))
          ) : (
            <div
              className="py-32 rounded-sm border border-dashed flex flex-col items-center justify-center gap-4 bg-white"
              style={{
                borderColor: "var(--border-color)",
                color: "var(--text-muted)",
              }}
            >
              <div className="w-16 h-16 bg-slate-50 rounded-sm flex items-center justify-center border border-slate-100">
                <Package className="w-8 h-8 opacity-20" />
              </div>
              <p className="font-black text-xs uppercase tracking-[0.3em] text-slate-400">
                No missions found in this category
              </p>
              <ResuableButton
                variant="secondary"
                className="px-6 py-2.5 !rounded-sm text-[10px] font-black uppercase tracking-widest"
                onClick={() => setActiveTab("opps")}
              >
                Browse Available Tasks
              </ResuableButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VolunteerTasks;
