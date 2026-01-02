import React from "react";

interface ResuableInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  align?: "left" | "center" | "right";
}

const ResuableInput: React.FC<ResuableInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
  disabled = false,
  required = false,
  align = "center",
}) => {
  const alignClass =
    align === "left"
      ? "text-left"
      : align === "right"
      ? "text-right"
      : "text-center";

  return (
    <div className={`space-y-1.5 ${alignClass} ${className}`}>
      {label && (
        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block px-1">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required={required}
        className={`w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-none text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#22c55e]/50 focus:border-[#22c55e] transition-all placeholder:text-slate-300 ${alignClass}`}
      />
    </div>
  );
};

export default ResuableInput;
