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
> = ({ label, val, trend, color, orientation }) => {
  return (
    <div
      className={`group/impact p-7 rounded-md border transition-all duration-300 flex flex-col items-center justify-center min-h-[150px] relative overflow-hidden hover:border-[#22c55e]/30
        ${orientation === "horizontal" ? "flex-1 min-w-[260px]" : "w-full"}
      `}
      style={{
        backgroundColor: "var(--bg-primary)",
        borderColor: "var(--border-color)",
      }}
    >
      <div className="mb-4 relative z-10 text-center transition-transform duration-300 group-hover/impact:-translate-y-1">
        <p
          className="text-[10px] font-black uppercase tracking-[0.25em] mb-2.5"
          style={{ color: "var(--text-muted)" }}
        >
          {label}
        </p>
        <h4
          className="text-4xl font-black tracking-tighter tabular-nums leading-none transition-colors duration-300 group-hover/impact:text-[#22c55e]"
          style={{ color: "var(--text-primary)" }}
        >
          {val}
        </h4>
      </div>

      <div className="flex flex-col items-center mt-auto relative z-10 text-center">
        <p
          className={`text-[11px] font-black leading-none px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:ring-offset-2 ${
            color === "bg-[#22c55e]" || color === "bg-emerald-500"
              ? "text-[#22c55e]"
              : "text-slate-500"
          }`}
          style={{
            color:
              color === "bg-[#22c55e]" || color === "bg-emerald-500"
                ? "#22c55e"
                : "var(--text-muted)",
          }}
        >
          {trend}
        </p>
      </div>

      {/* Subtle Background Accent */}
      <div
        className="absolute -top-10 -right-10 w-24 h-24 opacity-[0.02] blur-2xl rounded-full"
        style={{
          backgroundColor:
            color === "bg-[#22c55e]" || color === "bg-emerald-500"
              ? "#22c55e"
              : "transparent",
        }}
      />
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
          ? "flex gap-6 overflow-x-auto no-scrollbar pb-2"
          : "flex flex-col gap-6"
      } ${className}`}
    >
      {data.map((stat, i) => (
        <ImpactCard key={i} {...stat} orientation={orientation} />
      ))}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default ImpactCards;
