import { useEffect, useState } from "react";
import { Package, ArrowRight, Heart, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ngoNeedsService } from "../api/needs.api";
import { toast } from "sonner";

interface NGONeed {
  id: number;
  ngo: number;
  ngo_name: string;
  title: string;
  description: string;
  category: string;
  quantity_required: string;
  urgency: "Low" | "Medium" | "High";
  status: string;
  created_at: string;
}

const NGONeedsFeed = () => {
  const [needs, setNeeds] = useState<NGONeed[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNeeds();
  }, []);

  const fetchNeeds = async () => {
    try {
      setLoading(true);
      const data = await ngoNeedsService.getNeeds();
      setNeeds(data);
    } catch (error) {
      toast.error("Failed to load community needs");
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyStyles = (urgency: string) => {
    switch (urgency) {
      case "High":
        return {
          bg: "bg-red-500/10",
          text: "text-red-500",
          border: "border-red-500/20",
          dot: "bg-red-500",
        };
      case "Medium":
        return {
          bg: "bg-orange-500/10",
          text: "text-orange-500",
          border: "border-orange-500/20",
          dot: "bg-orange-500",
        };
      default:
        return {
          bg: "bg-blue-500/10",
          text: "text-blue-500",
          border: "border-blue-500/20",
          dot: "bg-blue-500",
        };
    }
  };

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-32 rounded-md bg-slate-200/50 dark:bg-slate-800/50 border border-transparent"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
            <Heart size={16} className="text-red-500 fill-red-500/10" />
          </div>
          <h2 className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-800">
            Urgent NGO Requests
          </h2>
        </div>
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {needs.length} Active Needs
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {needs.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-xl border-slate-100 bg-slate-50/30">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <Users size={32} className="text-slate-300" />
            </div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
              No active requests found
            </h3>
            <p className="text-[12px] font-medium text-slate-400 max-w-[320px] text-center leading-relaxed">
              Great news! There are no urgent requests right now. <br />
              Check back later to help more communities.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {needs.map((need) => {
              const styles = getUrgencyStyles(need.urgency);
              return (
                <div
                  key={need.id}
                  className="group relative overflow-hidden transition-all duration-500 hover:scale-[1.01]"
                >
                  <div className="p-5 md:p-6 rounded-md border bg-[var(--bg-primary)] border-[var(--border-color)] shadow-sm hover:shadow-xl hover:shadow-green-500/5 transition-all duration-500">
                    <div className="flex flex-col md:flex-row gap-6 md:items-center">
                      {/* Status & Category Column */}
                      <div className="flex md:flex-col items-center md:items-start justify-between md:justify-center gap-3 shrink-0 md:w-32 border-b md:border-b-0 md:border-r pb-4 md:pb-0 md:pr-6 border-[var(--border-color)]">
                        <div
                          className={`px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider flex items-center gap-1.5 ${styles.bg} ${styles.text} border ${styles.border}`}
                        >
                          <span
                            className={`w-1 h-1 rounded-full animate-pulse ${styles.dot}`}
                          />
                          {need.urgency} Priority
                        </div>
                        <div className="text-start">
                          <p className="text-[7px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em] mb-1">
                            REQ CATEGORY
                          </p>
                          <h4 className="text-[11px] font-black text-[var(--text-primary)] uppercase tracking-tight">
                            {need.category}
                          </h4>
                        </div>
                      </div>

                      {/* Content Column */}
                      <div className="flex-1 space-y-2 min-w-0">
                        <div className="flex items-center gap-3">
                          <h3 className="text-sm md:text-base font-black text-[var(--text-primary)] tracking-tight truncate group-hover:text-green-600 transition-colors">
                            {need.title}
                          </h3>
                        </div>
                        <p className="text-xs font-medium text-[var(--text-muted)] leading-relaxed line-clamp-2">
                          {need.description}
                        </p>

                        <div className="flex items-center gap-6 pt-2">
                          <div className="flex items-center gap-2">
                            <Users size={12} className="text-green-500" />
                            <span className="text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)]">
                              Posted by{" "}
                              <span className="text-[var(--text-primary)]">
                                {need.ngo_name}
                              </span>
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Package size={12} className="text-green-500" />
                            <span className="text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)]">
                              Goal:{" "}
                              <span className="text-[var(--text-primary)]">
                                {need.quantity_required}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Column */}
                      <div className="shrink-0">
                        <button
                          onClick={() =>
                            navigate(
                              `/donor/donations/create?need_id=${need.id}&ngo_id=${need.ngo}`,
                            )
                          }
                          className="w-full md:w-auto h-12 px-6 rounded-md bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-3 transition-all duration-300 group/btn shadow-lg shadow-green-600/20 active:scale-95"
                        >
                          <span className="text-[10px] font-black uppercase tracking-widest">
                            Respond Now
                          </span>
                          <ArrowRight
                            size={14}
                            className="transition-transform group-hover/btn:translate-x-1"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default NGONeedsFeed;
