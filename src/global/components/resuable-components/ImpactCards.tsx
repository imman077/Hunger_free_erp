import React from "react";

export interface ImpactCardData {
  label: string;
  val: string;
  trend: string;
  color: string;
}

export interface ImpactCardsProps {
  data: ImpactCardData[];
  orientation?: "horizontal" | "vertical";
  className?: string;
}

const ImpactCard: React.FC<
  ImpactCardData & { orientation: "horizontal" | "vertical" }
> = ({ label, val, trend, color }) => {
  return (
    <div
      className="group/impact p-4 md:p-6 rounded-xl border transition-all duration-500 flex flex-col items-center justify-center min-h-[150px] relative overflow-hidden"
      style={{
        backgroundColor: "var(--bg-primary)",
        borderColor: "var(--border-color)",
      }}
    >
      {/* Dynamic Ambient Background */}
      <div
        className={`absolute -top-12 -right-12 w-32 h-32 blur-[60px] rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-700
          ${color === "bg-emerald-500" ? "bg-emerald-500" : "bg-slate-400"}`}
      />

      <div className="mb-3 relative z-10 text-center transition-transform duration-500 group-hover/impact:-translate-y-1 w-full px-1">
        <p
          className="text-[9px] font-black uppercase tracking-wider mb-2 opacity-80 leading-tight"
          style={{ color: "var(--text-secondary)" }}
        >
          {label}
        </p>
        <h4
          className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight tabular-nums leading-none transition-colors duration-500 group-hover/impact:text-[#22c55e] break-words"
          style={{ color: "var(--text-primary)" }}
        >
          {val}
        </h4>
      </div>

      <div className="relative z-10 mt-1 max-w-full">
        <div
          className={`flex items-start justify-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all duration-500 w-fit mx-auto
            ${color === "bg-emerald-500" ? "bg-emerald-500/5 border-emerald-500/20" : "bg-slate-500/5 border-slate-500/10"}`}
        >
          {/* <div
            className={`w-1 h-1 mt-[3px] rounded-full flex-shrink-0 ${color === "bg-emerald-500" ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`}
          /> */}
          <span
            className={`text-[8px] md:text-[9px] font-black uppercase tracking-wider text-center leading-tight whitespace-normal break-words
              ${color === "bg-emerald-500" ? "text-emerald-500" : "text-slate-400"}`}
          >
            {trend}
          </span>
        </div>
      </div>
    </div>
  );
};

export const ImpactCards: React.FC<ImpactCardsProps> = ({
  data,
  orientation = "horizontal",
  className = "",
}) => {
  return (
    <div
      className={`${
        orientation === "horizontal"
          ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6"
          : "flex flex-col gap-4"
      } ${className}`}
    >
      {data.map((stat, i) => (
        <ImpactCard key={i} {...stat} orientation={orientation} />
      ))}
    </div>
  );
};

export default ImpactCards;
