import { useState } from "react";
import { Package } from "lucide-react";

interface Task {
  id: string;
  title: string;
  routeNumber: string;
  stops: number;
  duration: string;
  load: string;
  status: string;
}

// Task Row Component - Precise Match to Reference Image
const TaskRow: React.FC<{ task: Task }> = ({ task }) => (
  <div className="bg-white rounded-xl border border-slate-100 p-6 flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:shadow-sm">
    <div className="flex items-center gap-5 flex-1 min-w-0">
      {/* Icon Container */}
      <div className="w-14 h-14 bg-[#f8fafc] rounded-xl flex items-center justify-center shrink-0 border border-slate-50">
        <span className="text-2xl">🚚</span>
      </div>
      {/* Task Info */}
      <div className="space-y-1">
        <h4 className="text-[17px] font-black text-[#0f172a] tracking-tight">
          {task.title} - Route #{task.routeNumber}
        </h4>
        <p className="text-[13px] font-bold text-slate-400">
          {task.stops} Stop Points • Estimated {task.duration} • {task.load}{" "}
          Total Load
        </p>
      </div>
    </div>

    <div className="flex flex-col items-end gap-5 shrink-0">
      {/* Status Badge */}
      <span className="text-[10px] font-black text-[#f97316] uppercase tracking-widest bg-[#fff7ed] px-2.5 py-1 rounded-md">
        {task.status}
      </span>
      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <button className="px-6 py-2.5 bg-white border border-slate-200 text-[#0f172a] rounded-lg text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 transition-colors">
          View Details
        </button>
        <button className="px-6 py-2.5 bg-[#0f172a] text-white rounded-lg text-[11px] font-black uppercase tracking-widest hover:bg-[#1e293b] transition-all shadow-md active:scale-95">
          Update Status
        </button>
      </div>
    </div>
  </div>
);

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
      duration: "2.5 hours",
      load: "50kg",
      status: "IN PROGRESS",
    },
    {
      id: "t2",
      title: "Food Redistribution",
      routeNumber: "202",
      stops: 3,
      duration: "2.5 hours",
      load: "50kg",
      status: "IN PROGRESS",
    },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-black text-start">
          My Tasks
        </h1>
        <p className="text-gray-600 mt-2 text-start">
          Manage your delivery assignments and track progress
        </p>
      </div>

      {/* Task Section - Based on provided image */}
      <section className="space-y-8">
        <div className="flex items-center gap-12">
          <button
            onClick={() => setActiveTab("active")}
            className={`text-[13px] font-black uppercase tracking-widest transition-all ${
              activeTab === "active"
                ? "text-[#0f172a]"
                : "text-slate-300 hover:text-slate-400"
            }`}
          >
            Active Tasks (2)
          </button>
          <button
            onClick={() => setActiveTab("opps")}
            className={`text-[13px] font-black uppercase tracking-widest transition-all ${
              activeTab === "opps"
                ? "text-[#0f172a]"
                : "text-slate-300 hover:text-slate-400"
            }`}
          >
            Opportunities (12)
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`text-[13px] font-black uppercase tracking-widest transition-all ${
              activeTab === "past"
                ? "text-[#0f172a]"
                : "text-slate-300 hover:text-slate-400"
            }`}
          >
            Past Tasks
          </button>
        </div>

        <div className="space-y-4">
          {activeTab === "active" ? (
            activeTasks.map((task) => <TaskRow key={task.id} task={task} />)
          ) : (
            <div className="py-20 bg-white rounded-xl border border-slate-100 flex flex-col items-center justify-center text-slate-300 gap-3 border-dashed">
              <Package className="w-12 h-12 opacity-10" />
              <p className="font-black text-xs uppercase tracking-[0.2em]">
                List Empty
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default VolunteerTasks;
