import React, { type ReactNode } from "react";

interface DonationActivityCardProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  status: string;
  date: string;
  compact?: boolean;
  actionLabel?: string;
  onActionClick?: () => void;
}

const DonationActivityCard: React.FC<DonationActivityCardProps> = ({
  icon,
  title,
  subtitle,
  status,
  date,
  compact = false,
  actionLabel,
  onActionClick,
}) => {
  const isCollected = status === "Collected";

  return (
    <div
      onClick={onActionClick}
      className={`group/item relative flex flex-col items-center text-center transition-all duration-300 border font-sans rounded-md cursor-pointer
        ${
          compact
            ? "p-5 gap-3 aspect-square justify-center hover:bg-slate-50/50"
            : "p-8 gap-5 aspect-square justify-center hover:border-[#22c55e]/40 hover:bg-slate-50/20"
        }
      `}
      style={{
        backgroundColor: "var(--bg-primary)",
        borderColor: "var(--border-color)",
      }}
    >
      {/* Status Badge - Floating */}
      <div className="absolute top-4 right-4">
        <span
          className={`font-black uppercase tracking-widest px-2 py-1 rounded-sm
            ${compact ? "text-[6px]" : "text-[8px]"}
            ${
              isCollected
                ? "text-[#22c55e] bg-emerald-50 border border-emerald-100/50"
                : "text-blue-500 bg-blue-50 border border-blue-100/50"
            }
          `}
        >
          {status}
        </span>
      </div>

      {/* Refined Icon Container */}
      <div
        className={`flex items-center justify-center transition-all duration-500 rounded-md shrink-0 group-hover/item:-translate-y-2
          ${compact ? "w-12 h-12" : "w-16 h-16"}
          ${
            isCollected
              ? "bg-[#22c55e] text-white shadow-lg shadow-emerald-500/10"
              : "bg-blue-500 text-white shadow-lg shadow-blue-500/10"
          }
        `}
      >
        <div className={compact ? "scale-90" : "scale-110"}>{icon}</div>
      </div>

      {/* Content Group */}
      <div className="space-y-2 w-full px-2">
        <h3
          className={`font-black tracking-tighter truncate transition-colors duration-300 group-hover/item:text-[#22c55e] text-slate-900
          ${compact ? "text-sm" : "text-base md:text-lg"}
        `}
        >
          {title}
        </h3>

        <div className="flex flex-col items-center gap-1.5">
          <p
            className={`font-bold uppercase tracking-widest text-slate-400
            ${compact ? "text-[8px]" : "text-[10px]"}
          `}
          >
            {subtitle}
          </p>
          <p
            className={`font-bold uppercase tracking-widest opacity-40 text-slate-400
            ${compact ? "text-[7px]" : "text-[9px]"}
          `}
          >
            {date}
          </p>
        </div>
      </div>

      {actionLabel && (
        <div
          className={`mt-2 flex items-center gap-2 font-black uppercase tracking-[0.2em] transition-all
            text-[#22c55e] opacity-0 group-hover/item:opacity-100 translate-y-2 group-hover/item:translate-y-0
            ${compact ? "text-[8px]" : "text-[10px]"}
          `}
        >
          {actionLabel}
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-0.5"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default DonationActivityCard;
