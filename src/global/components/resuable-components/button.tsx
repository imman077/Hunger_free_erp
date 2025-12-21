import React from "react";

// --- Types ---
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "success"
  | "link"
  | "dark"
  | "soft-success"
  | "soft-danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ResuableButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  loading?: boolean;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[#22c55e] text-white hover:bg-[#1eb054] active:bg-[#198e44] shadow-sm",
  secondary:
    "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 active:bg-gray-300 shadow-sm",
  outline:
    "bg-transparent text-hf-green border border-hf-green hover:bg-green-50 active:bg-green-100",
  ghost:
    "bg-transparent text-gray-600 border border-transparent hover:bg-gray-100 active:bg-gray-200",
  danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm",
  success:
    "bg-hf-green text-white hover:bg-emerald-600 active:bg-emerald-700 shadow-sm",
  link: "bg-blue-50 text-blue-600 hover:bg-blue-100 active:bg-blue-200",
  dark: "bg-hf-dark text-white hover:bg-black active:scale-95 shadow-md",
  "soft-success":
    "bg-emerald-50 text-hf-green hover:bg-emerald-100 active:bg-emerald-200",
  "soft-danger": "bg-red-50 text-red-600 hover:bg-red-100 active:bg-red-200",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

// --- ResuableButton Component ---
const ResuableButton: React.FC<ResuableButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  loading = false,
  startContent,
  endContent,
  fullWidth = false,
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? "w-full" : ""}
        rounded-sm
        font-medium
        transition-all
        duration-200
        inline-flex
        items-center
        justify-center
        gap-2
        disabled:opacity-50
        disabled:cursor-not-allowed
        focus:outline-none
        focus:ring-2
        focus:ring-hf-green
        focus:ring-offset-2
        ${className}
      `
        .replace(/\s+/g, " ")
        .trim()}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {!loading && startContent}
      {children}
      {!loading && endContent}
    </button>
  );
};

export default ResuableButton;
