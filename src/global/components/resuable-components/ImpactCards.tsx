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
      className={`p-8 rounded-none border transition-all flex flex-col items-center justify-center min-h-[180px] relative overflow-hidden ${
        orientation === "horizontal" ? "flex-1 min-w-[240px]" : "w-full"
      }`}
      style={{
        backgroundColor: "var(--bg-primary)",
        borderColor: "var(--border-color)",
      }}
    >
      <div className="mb-6 relative z-10 text-center">
        <p
          className="text-[10px] font-black uppercase tracking-[0.25em] mb-4"
          style={{ color: "var(--text-muted)" }}
        >
          {label}
        </p>
        <h4
          className="text-5xl font-black tracking-tighter tabular-nums leading-none"
          style={{ color: "var(--text-primary)" }}
        >
          {val}
        </h4>
      </div>

      <div className="flex flex-col items-center mt-auto relative z-10 text-center">
        <p
          className={`text-[11px] font-black leading-none ${
            color === "bg-emerald-500" ? "text-emerald-500" : ""
          }`}
          style={{
            color: color === "bg-emerald-500" ? "#10b981" : "var(--text-muted)",
          }}
        >
          {trend}
        </p>
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
