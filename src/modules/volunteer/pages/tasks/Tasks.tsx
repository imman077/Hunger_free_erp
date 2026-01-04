import { useState } from "react";
import {
  Package,
  Truck,
  ChevronRight,
  Info,
  MapPin,
  Clock,
  Weight,
  Filter,
  ChefHat,
  Heart,
} from "lucide-react";

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
        return <Truck className="w-6 h-6 text-blue-600" />;
      case "kitchen":
        return <ChefHat className="w-6 h-6 text-orange-500" />;
      case "shelter":
        return <Heart className="w-6 h-6 text-rose-500" />;
      default:
        return <Package className="w-6 h-6 text-blue-600" />;
    }
  };

  const getIconBg = () => {
    switch (task.type) {
      case "delivery":
        return "bg-blue-50";
      case "kitchen":
        return "bg-orange-50";
      case "shelter":
        return "bg-rose-50";
      default:
        return "bg-blue-50";
    }
  };

  const getStatusStyle = () => {
    switch (task.status) {
      case "IN PROGRESS":
        return "text-amber-600 bg-amber-50 border-amber-100";
      case "AVAILABLE":
        return "text-blue-600 bg-blue-50 border-blue-100";
      case "COMPLETED":
        return "text-emerald-600 bg-emerald-50 border-emerald-100";
    }
  };

  return (
    <div className="bg-white rounded-sm border border-gray-100 p-6 flex flex-col md:flex-row items-center justify-between gap-6 transition-all">
      <div className="flex items-center gap-5 flex-1 min-w-0">
        {/* Icon Container */}
        <div
          className={`w-14 h-14 ${getIconBg()} rounded-sm flex items-center justify-center shrink-0 border border-white`}
        >
          {getIcon()}
        </div>

        {/* Task Info */}
        <div className="space-y-1.5">
          <div className="flex items-baseline gap-2">
            <h4 className="text-[17px] font-black text-gray-900 tracking-tight">
              {task.title}
            </h4>
            <span className="text-gray-400 font-medium text-sm">
              — Route #{task.routeNumber}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5 text-gray-400 text-[13px] font-bold">
              <MapPin size={14} className="text-gray-300" />
              <span>{task.stops} Stop Points</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-400 text-[13px] font-bold">
              <Clock size={14} className="text-gray-300" />
              <span>{task.duration} Est.</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-400 text-[13px] font-bold">
              <Weight size={14} className="text-gray-300" />
              <span>{task.load} Load</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-4 shrink-0">
        {/* Status Badge */}
        <span
          className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border ${getStatusStyle()}`}
        >
          {task.status}
        </span>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-100 text-gray-700 rounded-sm text-[13px] font-black hover:bg-gray-50 transition-colors">
            <Info size={16} />
            Details
          </button>
          <button
            className={`flex items-center gap-2 px-6 py-2.5 rounded-sm text-[13px] font-black text-white transition-all active:scale-95 ${
              task.status === "AVAILABLE"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-[#0f172a] hover:bg-[#1e293b]"
            }`}
          >
            {task.status === "AVAILABLE" ? "Claim Task" : "Update Status"}
            <ChevronRight size={16} />
          </button>
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
    <div className="p-8 bg-gray-50/50">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Page Heading */}
        <div className="text-start">
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter mb-2">
            MY TASKS
          </h1>
          <p className="text-gray-600 font-medium">
            Manage your delivery assignments and track progress
          </p>
        </div>

        {/* Header Section with Tabs and Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 pb-1">
          <div className="flex items-center gap-10">
            {[
              {
                id: "active",
                label: "Active Tasks",
                count: activeTasks.length,
              },
              {
                id: "opps",
                label: "Opportunities",
                count: opportunityTasks.length,
              },
              { id: "past", label: "Past Tasks", count: pastTasks.length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative pb-4 flex items-center gap-2 group transition-all`}
              >
                <span
                  className={`text-[14px] font-black uppercase tracking-tight ${
                    activeTab === tab.id
                      ? "text-blue-600"
                      : "text-gray-400 group-hover:text-gray-600"
                  }`}
                >
                  {tab.label}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-md text-[11px] font-black ${
                    activeTab === tab.id
                      ? "bg-blue-50 text-blue-600"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {tab.count}
                </span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 self-end md:self-auto pb-4">
            <div className="flex items-center gap-2 text-gray-300">
              <Filter size={18} />
              <span className="text-[12px] font-black uppercase tracking-[0.15em]">
                Sort: Recent
              </span>
            </div>
          </div>
        </div>

        {/* Task List Container */}
        <div className="space-y-4">
          {getCurrentTasks().length > 0 ? (
            getCurrentTasks().map((task) => (
              <TaskRow key={task.id} task={task} />
            ))
          ) : (
            <div className="py-20 bg-white rounded-sm border border-gray-100 border-dashed flex flex-col items-center justify-center text-gray-300 gap-3">
              <Package className="w-12 h-12 opacity-10" />
              <p className="font-black text-xs uppercase tracking-[0.2em]">
                No tasks available
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VolunteerTasks;
