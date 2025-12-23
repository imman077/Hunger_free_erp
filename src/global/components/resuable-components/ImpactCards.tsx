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
      className={`bg-white p-7 rounded-sm border border-gray-200 transition-all flex flex-col items-center justify-center min-h-[160px] relative overflow-hidden ${
        orientation === "horizontal" ? "flex-1 min-w-[240px]" : "w-full"
      }`}
    >
      <div className="mb-4 relative z-10 text-center">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
          {label}
        </p>
        <h4 className="text-4xl font-black text-slate-900 tracking-tighter tabular-nums leading-none">
          {val}
        </h4>
      </div>

      <div className="flex flex-col items-center mt-auto relative z-10 text-center">
        <p
          className={`text-[10px] font-black leading-none ${
            color === "bg-emerald-500" ? "text-emerald-500" : "text-slate-500"
          }`}
        >
          {trend}
        </p>
        <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest mt-1">
          Live Statistics
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
