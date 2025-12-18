import React from "react";

export interface Tab {
  label: string;
  value: string;
  count?: number;
  showCount?: boolean;
}

export interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (value: string) => void;
  className?: string;
  variant?: "default" | "outlined" | "pills";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  activeColor?: string;
  activeHoverColor?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className = "",
  variant = "default",
  size = "md",
  fullWidth = false,
  activeColor = "#22c55e",
}) => {
  // Size classes
  const sizeClasses = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3 text-base",
  };

  // Variant classes
  const getTabClasses = (isActive: boolean) => {
    const baseClasses = `font-medium transition-all duration-200 ${sizeClasses[size]}`;

    switch (variant) {
      case "outlined":
        return isActive
          ? `${baseClasses} border-2 rounded-md shadow-sm`
          : `${baseClasses} border border-gray-200 rounded-md bg-white text-gray-600 hover:bg-white hover:border-[#22c55e] hover:text-black`;

      case "pills":
        return isActive
          ? `${baseClasses} rounded-full shadow-sm`
          : `${baseClasses} rounded-full bg-gray-100 text-gray-600 hover:bg-white hover:text-black`;

      case "default":
      default:
        return isActive
          ? `${baseClasses} rounded-md shadow-sm`
          : `${baseClasses} bg-white text-gray-600 border border-gray-200 rounded-md hover:bg-white hover:border-[#22c55e] hover:text-black`;
    }
  };

  const getActiveStyles = (isActive: boolean): React.CSSProperties => {
    if (isActive) {
      return {
        backgroundColor: activeColor,
        color: "white",
        borderColor: activeColor,
      };
    }
    // Inactive tabs - ensure white background and gray text
    return {
      backgroundColor: "white",
      color: "#4b5563", // gray-600
      borderColor: "#e5e7eb", // gray-200
    };
  };

  return (
    <div
      className={`flex gap-3 ${fullWidth ? "w-full" : ""} ${className}`}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;
        return (
          <button
            key={tab.value}
            onClick={() => onTabChange(tab.value)}
            className={`${getTabClasses(isActive)} ${
              fullWidth ? "flex-1" : ""
            }`}
            style={getActiveStyles(isActive)}
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${tab.value}`}
          >
            {tab.label}
            {tab.showCount && tab.count !== undefined && (
              <span className="ml-2 text-xs opacity-90">{tab.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
