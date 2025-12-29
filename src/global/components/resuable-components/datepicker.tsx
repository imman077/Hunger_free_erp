import React, { useState, useRef, useEffect } from "react";
import { Icon } from "./Icon";

interface ResuableDatePickerProps {
  label?: string;
  value: string | null;
  onChange: (value: string) => void;
  className?: string;
  align?: "left" | "center" | "right";
}

export const ResuableDatePicker: React.FC<ResuableDatePickerProps> = ({
  label,
  value,
  onChange,
  className = "",
  align = "center",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const date = value ? new Date(value) : new Date();
  const [viewDate, setViewDate] = useState(
    new Date(date.getFullYear(), date.getMonth(), 1)
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Check if dropdown should open upward
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const dropdownHeight = 400; // Approximate height of the calendar dropdown
      const spaceBelow = window.innerHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;

      // Open upward if there's not enough space below but enough space above
      setOpenUpward(spaceBelow < dropdownHeight && spaceAbove > dropdownHeight);
    }
  }, [isOpen]);

  const daysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) =>
    new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const handleSelectDay = (day: number) => {
    const selected = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    onChange(selected.toISOString().split("T")[0]);
    setIsOpen(false);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === viewDate.getMonth() &&
      today.getFullYear() === viewDate.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    const current = value ? new Date(value) : null;
    return (
      current &&
      current.getDate() === day &&
      current.getMonth() === viewDate.getMonth() &&
      current.getFullYear() === viewDate.getFullYear()
    );
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = [];
  const startOffset = firstDayOfMonth(
    viewDate.getFullYear(),
    viewDate.getMonth()
  );
  const totalDays = daysInMonth(viewDate.getFullYear(), viewDate.getMonth());

  // Padding for start of month
  for (let i = 0; i < startOffset; i++) {
    days.push(<div key={`pad-${i}`} className="h-8 w-8" />);
  }

  for (let d = 1; d <= totalDays; d++) {
    days.push(
      <button
        key={d}
        type="button"
        onClick={() => handleSelectDay(d)}
        className={`h-8 w-8 text-[11px] font-bold rounded-sm flex items-center justify-center transition-all ${
          isSelected(d)
            ? "bg-[#22c55e] text-white shadow-md"
            : isToday(d)
            ? "text-[#22c55e] bg-emerald-50/50 border border-[#22c55e]/30"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`}
      >
        {d}
      </button>
    );
  }

  const alignClass =
    align === "left"
      ? "text-left"
      : align === "right"
      ? "text-right"
      : "text-center";

  return (
    <div
      className={`space-y-1.5 ${alignClass} ${className}`}
      ref={containerRef}
    >
      {label && (
        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1 px-1">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center gap-3 bg-white border px-3 py-2.5 rounded-sm text-xs font-semibold transition-all ${
            isOpen
              ? "border-[#22c55e] ring-1 ring-[#22c55e] text-slate-900"
              : "border-slate-200 text-slate-800 hover:bg-slate-50"
          } ${alignClass}`}
        >
          <Icon
            name="calendar"
            className={`w-3.5 h-3.5 transition-colors ${
              isOpen ? "text-[#22c55e]" : "text-slate-400"
            }`}
          />
          <span className={`flex-1 ${alignClass}`}>
            {value || "Select Date"}
          </span>
          <Icon
            name="chevron-down"
            className={`w-3 h-3 text-slate-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div
            className={`absolute left-1/2 -translate-x-1/2 bg-white border border-slate-200 rounded-sm shadow-2xl z-[9999] p-4 w-64 animate-in fade-in zoom-in-95 duration-200 ${
              openUpward ? "bottom-full mb-1" : "top-full mt-1"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">
                {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
              </h4>
              <div className="flex gap-1">
                <button
                  onClick={handlePrevMonth}
                  type="button"
                  className="p-1 hover:bg-slate-100 rounded-sm text-slate-400 hover:text-slate-800"
                >
                  <Icon name="chevron-down" className="w-4 h-4 rotate-90" />
                </button>
                <button
                  onClick={handleNextMonth}
                  type="button"
                  className="p-1 hover:bg-slate-100 rounded-sm text-slate-400 hover:text-slate-800"
                >
                  <Icon name="chevron-down" className="w-4 h-4 -rotate-90" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                <div
                  key={d}
                  className="h-8 w-8 flex items-center justify-center text-[9px] font-black text-slate-400 uppercase"
                >
                  {d}
                </div>
              ))}
              {days}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-2">
              <button
                type="button"
                onClick={() => {
                  const today = new Date().toISOString().split("T")[0];
                  onChange(today);
                  setIsOpen(false);
                }}
                className="text-[9px] font-bold text-[#22c55e] uppercase tracking-widest hover:underline"
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-[9px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResuableDatePicker;
