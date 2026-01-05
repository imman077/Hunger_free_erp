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
      className={`group/item relative flex items-center transition-all duration-300 overflow-hidden border font-sans rounded-none
        ${
          compact
            ? "gap-4 p-4 hover:bg-emerald-50/10"
            : "gap-5 p-5 hover:border-emerald-100/50 hover:bg-emerald-50/10"
        }
      `}
      style={{
        backgroundColor: "var(--bg-primary)",
        borderColor: "var(--border-color)",
      }}
    >
      {/* Slim Vertical Status Bar */}
      <div
        className={`absolute left-0 w-1 transition-all duration-300
          ${compact ? "top-3 bottom-3" : "top-4 bottom-4"}
          ${isCollected ? "bg-emerald-500" : "bg-blue-500"}
        `}
      />

      {/* Icon Container */}
      <div
        className={`flex items-center justify-center transition-all duration-300 border border-transparent rounded-none
          ${compact ? "w-10 h-10" : "w-16 h-16"}
          ${
            isCollected
              ? "bg-emerald-50 text-emerald-600 border-emerald-100/30"
              : "bg-blue-50 text-blue-600 border-blue-100/30"
          }
        `}
      >
        <div className={compact ? "scale-75" : "opacity-80"}>{icon}</div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col items-start mb-1.5">
          <h3
            className={`font-bold tracking-tight truncate w-full text-start leading-none mb-2
            ${compact ? "text-xs" : "text-base"}
          `}
            style={{ color: "var(--text-primary)" }}
          >
            {title}
          </h3>
          <p
            className={`font-black uppercase tracking-[0.2em]
            ${compact ? "text-[9px]" : "text-[11px]"}
          `}
            style={{ color: "var(--text-muted)" }}
          >
            {subtitle}
          </p>
        </div>

        {/* Footer info (Status & Date) */}
        <div
          className={`flex items-center justify-between ${
            compact ? "mt-1.5" : "mt-4"
          }`}
        >
          <div className="flex items-center gap-2">
            <span
              className={`font-black uppercase tracking-widest rounded-none
                ${
                  compact ? "text-[8px] px-2 py-0.5" : "text-[10px] px-4 py-1.5"
                }
                ${
                  isCollected
                    ? "bg-emerald-100/50 text-emerald-600"
                    : "bg-blue-100/50 text-blue-600"
                }
              `}
            >
              {status}
            </span>
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "var(--border-color)" }}
            />
            <p
              className={`font-bold tracking-tight
              ${compact ? "text-[9px]" : "text-[11px]"}
            `}
              style={{ color: "var(--text-muted)" }}
            >
              {date}
            </p>
          </div>

          {!compact && actionLabel && (
            <button
              onClick={onActionClick}
              className="text-[10px] font-black uppercase tracking-widest hover:text-emerald-500 transition-all border-b border-transparent hover:border-emerald-500/20"
              style={{ color: "var(--text-muted)" }}
            >
              {actionLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationActivityCard;
