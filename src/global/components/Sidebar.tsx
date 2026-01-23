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
  const { setExpanded } = useSidebar();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isActive = to ? location.pathname === to : false;
  const isSubItemActive = subItems?.some(
    (item) => location.pathname === item.to,
  );

  const handleClick = () => {
    if (subItems) {
      if (!expanded) {
        setExpanded(true);
        setIsOpen(true);
      } else {
        setIsOpen(!isOpen);
      }
    }
  };

  React.useEffect(() => {
    if (isSubItemActive) {
      setIsOpen(true);
    }
  }, [isSubItemActive]);

  const content = (
    <div
      className={`group relative flex items-center transition-all duration-200 cursor-pointer mb-1 mx-auto
        ${
          isActive || isSubItemActive
            ? expanded
              ? "w-full p-2.5 bg-emerald-50 text-emerald-700 font-semibold border-l-4 border-[#22c55e] shadow-sm rounded-xl"
              : "w-11 h-11 bg-emerald-50 text-emerald-700 font-semibold shadow-sm rounded-xl justify-center"
            : expanded
              ? "w-full p-2.5 text-slate-500 hover:bg-slate-50 hover:text-slate-800 rounded-xl"
              : "w-11 h-11 text-slate-500 hover:bg-slate-50 hover:text-slate-800 rounded-xl justify-center"
        }
      `}
      onClick={handleClick}
    >
      <div
        className={`flex items-center justify-center shrink-0 ${
          expanded ? "w-7 h-7" : ""
        }`}
      >
        <Icon
          name={
            typeof icon === "string"
              ? icon
              : (icon as any).props.name || label.toLowerCase()
          }
          className={`w-5 h-5 transition-all duration-300 ${
            isActive || isSubItemActive
              ? "text-emerald-600 opacity-100"
              : "opacity-25 group-hover:opacity-60"
          }`}
        />
      </div>
      {expanded && (
        <div className="flex items-center flex-1 ml-2.5 animate-in fade-in slide-in-from-left-2 duration-300 min-w-0">
          <span className="text-[15px]">{label}</span>
          {subItems && (
            <Icon
              name="chevron-down"
              className={`w-4 h-4 transition-transform duration-300 ml-auto ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          )}
        </div>
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
          <div className="ml-8 border-l border-slate-100 space-y-0.5 mt-0.5">
            {subItems.map((item) => {
              const isSubActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`w-full flex items-center justify-between px-3 py-1.5 text-sm rounded-lg transition-all duration-200 ${
                    isSubActive
                      ? "text-emerald-600 font-semibold bg-emerald-50/50"
                      : "text-slate-500 hover:text-[#22c55e] hover:translate-x-1"
                  }`}
                >
                  <span className="truncate">{item.label}</span>
                  {isSubActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
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

  const rewardsSubItems: SubItem[] = [
    {
      label: "Points & Tiers",
      to: "/admin/rewards/points",
      icon: <Icon name="gem" className="h-4 w-4" />,
    },
    {
      label: "Redemptions",
      to: "/admin/rewards/redemptions",
      icon: <Icon name="wallet" className="h-4 w-4" />,
    },
    {
      label: "Reward Catalog",
      to: "/admin/rewards/catalog",
      icon: <Icon name="stack" className="h-4 w-4" />,
    },
  ];

  const settingsSubItems: SubItem[] = [
    {
      label: "Configuration",
      to: "/admin/settings/configuration",
      icon: <Icon name="settings" className="h-4 w-4" />,
    },
  ];

  const donorSubItems: SubItem[] = [
    {
      label: "Dashboard",
      to: "/donor/dashboard",
      icon: <Icon name="dashboard" className="h-4 w-4" />,
    },
    {
      label: "My Donations",
      to: "/donor/donations",
      icon: <Icon name="donations" className="h-4 w-4" />,
    },
    {
      label: "Rewards",
      to: "/donor/rewards",
      icon: <Icon name="rewards" className="h-4 w-4" />,
    },
    {
      label: "Profile",
      to: "/donor/profile",
      icon: <Icon name="users" className="h-4 w-4" />,
    },
  ];

  const ngoSubItems: SubItem[] = [
    {
      label: "Dashboard",
      to: "/ngo/dashboard",
      icon: <Icon name="dashboard" className="h-4 w-4" />,
    },
    {
      label: "Requests",
      to: "/ngo/requests",
      icon: <Icon name="bell" className="h-4 w-4" />,
    },
    {
      label: "Inventory",
      to: "/ngo/inventory",
      icon: <Icon name="warehouse" className="h-4 w-4" />,
    },
    {
      label: "Rewards",
      to: "/ngo/rewards",
      icon: <Icon name="rewards" className="h-4 w-4" />,
    },
    {
      label: "Profile",
      to: "/ngo/profile",
      icon: <Icon name="office" className="h-4 w-4" />,
    },
  ];

  const volunteerSubItems: SubItem[] = [
    {
      label: "Dashboard",
      to: "/volunteer/dashboard",
      icon: <Icon name="dashboard" className="h-4 w-4" />,
    },
    {
      label: "Tasks",
      to: "/volunteer/tasks",
      icon: <Icon name="stack" className="h-4 w-4" />,
    },
    {
      label: "Rewards",
      to: "/volunteer/rewards",
      icon: <Icon name="rewards" className="h-4 w-4" />,
    },
    {
      label: "Profile",
      to: "/volunteer/profile",
      icon: <Icon name="users" className="h-4 w-4" />,
    },
  ];

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen
        transition-[width] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]
        flex flex-col z-[50]
        ${expanded ? "md:w-[260px]" : "md:w-[70px]"}
        hidden md:flex shadow-[2px_0_12px_rgba(0,0,0,0.02)]
      `}
      style={{
        backgroundColor: "var(--bg-primary)",
        borderRight: "1px solid var(--border-color)",
      }}
    >
      {/* Sidebar Header */}
      <div className="h-20 flex items-center flex-shrink-0 w-full overflow-hidden mb-4">
        <div className="w-full flex items-center justify-center">
          {expanded ? (
            <div
              className="w-full cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setExpanded(!expanded)}
            >
              <img
                src="/HungerFree.svg"
                className="h-15 w-auto object-contain mx-auto"
                alt="HungerFree Logo"
              />
            </div>
          ) : (
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-11 h-11 rounded-xl flex items-center justify-center border border-slate-200 hover:bg-slate-50 transition-all shadow-sm active:scale-95"
            >
              <Icon name="menu" className="w-5 h-5 text-slate-500" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Nav Section */}
        <nav
          className={`flex-1 overflow-y-auto no-scrollbar space-y-1 ${
            expanded ? "px-4" : "px-2"
          }`}
        >
          <div className="space-y-1">
            <SidebarItem
              icon={<Icon name="dashboard" />}
              label="Dashboard"
              to="/admin/dashboard"
              expanded={expanded}
            />

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
              icon={<Icon name="analytics" />}
              label="Analytics"
              expanded={expanded}
              subItems={analyticsSubItems}
            />

            <SidebarItem
              icon={<Icon name="rewards" />}
              label="Rewards"
              expanded={expanded}
              subItems={rewardsSubItems}
            />

            <SidebarItem
              icon={<Icon name="settings" />}
              label="Settings"
              expanded={expanded}
              subItems={settingsSubItems}
            />

            <div className="px-4 py-3 mt-2">
              <div className="h-px bg-slate-100 w-full" />
            </div>

            <SidebarItem
              icon={<Icon name="users" />}
              label="Donor"
              expanded={expanded}
              subItems={donorSubItems}
            />

            <SidebarItem
              icon={<Icon name="office" />}
              label="NGO"
              expanded={expanded}
              subItems={ngoSubItems}
            />

            <SidebarItem
              icon={<Icon name="users" />}
              label="Volunteer"
              expanded={expanded}
              subItems={volunteerSubItems}
            />
          </div>
        </nav>

        <div
          className="p-4 bg-slate-50/20 flex flex-col items-center gap-3 transition-all duration-500"
          style={{ borderTop: "1px solid var(--border-color)" }}
        >
          {expanded && (
            <div
              className="w-full p-2.5 rounded-2xl border transition-all duration-500 group/profile cursor-pointer"
              style={{
                backgroundColor: "var(--bg-primary)",
                borderColor: "var(--border-color)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <img
                    src="https://mui.com/static/images/avatar/1.jpg"
                    className="w-10 h-10 rounded-xl border object-cover"
                    style={{ borderColor: "var(--border-color)" }}
                    alt="Admin"
                  />
                  <div
                    className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#22c55e] border-2 border-white rounded-full shadow-sm"
                    style={{ backgroundColor: "#22c55e" }}
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span
                    className="text-sm font-bold leading-tight truncate"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Admin Hub
                  </span>
                  <span
                    className="text-[9px] font-black tracking-widest uppercase mt-0.5"
                    style={{ color: "#22c55e" }}
                  >
                    Operational
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-center gap-3 px-2">
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
