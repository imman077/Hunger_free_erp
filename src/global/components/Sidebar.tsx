import React, { useState } from "react";
import { Icon } from "./resuable-components/Icon";
import { useSidebar } from "../contexts/SidebarContext";
import { Link, useLocation } from "react-router-dom";

type SubItem = {
  label: string;
  to: string;
  icon: React.ReactNode;
};

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  to?: string;
  expanded: boolean;
  subItems?: SubItem[];
};

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  to,
  expanded,
  subItems,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isActive = to ? location.pathname === to : false;
  const isSubItemActive = subItems?.some(
    (item) => location.pathname === item.to
  );

  const handleClick = () => {
    if (subItems) {
      setIsOpen(!isOpen);
    }
  };

  React.useEffect(() => {
    if (isSubItemActive) {
      setIsOpen(true);
    }
  }, [isSubItemActive]);

  const content = (
    <div
      className={`group relative w-full flex items-center px-4 py-2 border border-slate-100 transition-all duration-300 cursor-pointer mb-0.5
        ${
          isActive || isSubItemActive
            ? "text-emerald-700 bg-emerald-50/40"
            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50/50"
        }
        ${
          !expanded
            ? "justify-center rounded-xl"
            : "rounded-xl mx-2 w-[calc(100%-16px)]"
        }
      `}
      onClick={handleClick}
    >
      {/* Premium Active Indicator - Floating Pill */}
      <div
        className={`absolute left-0 w-1 h-5 bg-emerald-500 rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          ${
            isActive || isSubItemActive
              ? "translate-x-1 opacity-100 scale-100"
              : "-translate-x-2 opacity-0 scale-50"
          }
        `}
        style={{ backgroundColor: "#22c55e" }}
      />
      <div className="w-8 h-8 flex items-center justify-center shrink-0">
        <Icon
          name={
            typeof icon === "string"
              ? icon
              : (icon as any).props.name || label.toLowerCase()
          }
          className={`w-6 h-6 transition-colors duration-300 ${
            isActive || isSubItemActive
              ? "text-emerald-500"
              : "opacity-70 group-hover:opacity-100"
          }`}
        />
      </div>
      {expanded && (
        <div className="flex items-center flex-1 ml-3 animate-in fade-in slide-in-from-left-2 duration-300">
          <span className="flex-1 text-left truncate text-md font-bold tracking-tight">
            {label}
          </span>
          {subItems && (
            <Icon
              name="chevron-down"
              className={`w-3 h-3 transition-transform duration-300 ${
                isOpen ? "rotate-180" : "opacity-30"
              }`}
            />
          )}
        </div>
      )}
      {!expanded && (isActive || isSubItemActive) && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-emerald-500 rounded-l-full" />
      )}
    </div>
  );

  return (
    <div className="w-full">
      {to && !subItems ? <Link to={to}>{content}</Link> : content}

      {subItems && expanded && (
        <div
          className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
            isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="ml-9 pl-4 border-l border-slate-100 space-y-0.5 py-1 mb-2">
            {subItems.map((item) => {
              const isSubActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`w-full text-left px-3 py-1.5 rounded-lg transition-all flex items-center group/sub ${
                    isSubActive
                      ? "text-emerald-600 bg-emerald-50/50 font-semibold"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50/50 font-medium"
                  }`}
                >
                  <span className="truncate text-sm flex-1">{item.label}</span>
                  {isSubActive && (
                    <div
                      className="w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"
                      style={{ backgroundColor: "#22c55e" }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const SidebarIcons: React.FC = () => {
  const { expanded, setExpanded } = useSidebar();

  // Submenu configurations
  const usersSubItems: SubItem[] = [
    {
      label: "All Users",
      to: "/admin/users",
      icon: <Icon name="users" className="h-4 w-4" />,
    },
    {
      label: "Donors",
      to: "/admin/users/donors",
      icon: <Icon name="users" className="h-4 w-4" />,
    },
    {
      label: "NGOs",
      to: "/admin/users/ngos",
      icon: <Icon name="office" className="h-4 w-4" />,
    },
    {
      label: "Volunteers",
      to: "/admin/users/volunteers",
      icon: <Icon name="users" className="h-4 w-4" />,
    },
  ];

  const donationsSubItems: SubItem[] = [
    {
      label: "All Donations",
      to: "/admin/donations",
      icon: <Icon name="donations" className="h-4 w-4" />,
    },
    {
      label: "Live Tracking",
      to: "/admin/donations/tracking",
      icon: <Icon name="warehouse" className="h-4 w-4" />,
    },
    {
      label: "Pending",
      to: "/admin/donations/pending",
      icon: <Icon name="bell" className="h-4 w-4" />,
    },
  ];

  const alertsSubItems: SubItem[] = [
    {
      label: "All Alerts",
      to: "/admin/alerts",
      icon: <Icon name="bell" className="h-4 w-4" />,
    },
    {
      label: "Urgent",
      to: "/admin/alerts/urgent",
      icon: <Icon name="bell" className="h-4 w-4" />,
    },
  ];

  const analyticsSubItems: SubItem[] = [
    {
      label: "Overview",
      to: "/admin/analytics",
      icon: <Icon name="analytics" className="h-4 w-4" />,
    },
    {
      label: "Reports",
      to: "/admin/analytics/reports",
      icon: <Icon name="stack" className="h-4 w-4" />,
    },
  ];

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen
        bg-white border-r border-slate-100
        transition-[width] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]
        flex flex-col z-[50]
        ${expanded ? "md:w-[260px]" : "md:w-[70px]"}
        hidden md:flex shadow-[2px_0_12px_rgba(0,0,0,0.02)]
      `}
    >
      {/* Sidebar Header - Adjusted for better spacing */}
      {/* Sidebar Header */}
      <div className="h-16 flex items-center px-4 flex-shrink-0 w-full overflow-hidden mb-2">
        <div
          className="cursor-pointer active:scale-95 transition-all duration-300 w-full flex items-center justify-center overflow-hidden"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <div className="flex items-center gap-2 w-full px-2">
              <div className="h-px bg-slate-100 flex-1" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">
                Navigation
              </span>
              <div className="h-px bg-slate-100 flex-1" />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-xl bg-slate-50/50 flex items-center justify-center border border-slate-100/50">
              <Icon
                name="menu"
                className="w-5 h-5 text-slate-400 hover:text-emerald-500 transition-colors duration-300"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Subtle separator */}
        {/* <div className="px-6 pb-2">
          <div className="h-[2px] bg-slate-50 w-full" />
        </div> */}
        <nav className="flex-1 overflow-y-auto no-scrollbar px-0 py-2 space-y-0.5">
          <div className="space-y-1">
            {/* {expanded && (
              <div className="px-4 py-1">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                  Navigation
                </span>
              </div>
            )} */}

            <div className="space-y-0.5 w-full">
              <Link to="/admin/dashboard">
                <SidebarItem
                  icon={<Icon name="dashboard" />}
                  label="Dashboard"
                  to="/admin/dashboard"
                  expanded={expanded}
                />
              </Link>

              <SidebarItem
                icon={<Icon name="users" />}
                label="Users"
                expanded={expanded}
                subItems={usersSubItems}
              />

              <SidebarItem
                icon={<Icon name="donations" />}
                label="Donations"
                expanded={expanded}
                subItems={donationsSubItems}
              />

              <SidebarItem
                icon={<Icon name="bell" />}
                label="Alerts"
                expanded={expanded}
                subItems={alertsSubItems}
              />

              <SidebarItem
                icon={<Icon name="analytics" />}
                label="Analytics"
                expanded={expanded}
                subItems={analyticsSubItems}
              />

              <Link to="/admin/settings">
                <SidebarItem
                  icon={<Icon name="settings" />}
                  label="Settings"
                  to="/admin/settings"
                  expanded={expanded}
                />
              </Link>
            </div>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-50 bg-slate-50/20 flex flex-col items-center gap-3 transition-all duration-500">
          {expanded && (
            <div className="w-full p-2.5 rounded-2xl bg-white border border-slate-100 transition-all duration-500 group/profile cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <img
                    src="https://mui.com/static/images/avatar/1.jpg"
                    className="w-10 h-10 rounded-xl border border-slate-100 shadow-sm object-cover"
                    alt="Admin"
                  />
                  <div
                    className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full shadow-sm"
                    style={{ backgroundColor: "#22c55e" }}
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-slate-900 text-sm font-bold leading-tight truncate">
                    Admin Hub
                  </span>
                  <span
                    className="text-emerald-500 text-[9px] font-black tracking-widest uppercase mt-0.5"
                    style={{ color: "#22c55e" }}
                  >
                    Operational
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="w-full flex justify-center px-2">
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-10 h-1.5 rounded-full bg-slate-200/50 hover:bg-emerald-500/30 transition-all duration-300 group/toggle relative"
              title={expanded ? "Collapse" : "Expand"}
            >
              <div
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-1 bg-slate-300 rounded-full transition-all duration-500 group-hover/toggle:bg-emerald-500 ${
                  !expanded && "rotate-90"
                }`}
                style={!expanded ? {} : { backgroundColor: "#22c55e" }}
              />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarIcons;
