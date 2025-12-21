"use client";

import React, { useState } from "react";
import {
  HomeIcon,
  UserGroupIcon,
  HeartIcon,
  BellIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  UserIcon,
  BuildingLibraryIcon,
  UsersIcon,
  GiftIcon,
  MapPinIcon,
  ExclamationTriangleIcon,
  ChartPieIcon,
} from "@heroicons/react/24/outline";
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
      className={`flex items-center gap-4 px-4 py-1 cursor-pointer transition-all duration-200 group
        ${
          isActive || isSubItemActive
            ? "text-green-600"
            : "text-gray-900 hover:text-green-600"
        }
      `}
      onClick={handleClick}
    >
      <span className="flex items-center justify-center h-10 w-10">{icon}</span>
      {expanded && (
        <div className="flex items-center justify-between flex-1">
          <span className="text-base font-medium">{label}</span>
          {subItems && (
            <ChevronDownIcon
              className={`h-4 w-4 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              } ${
                isActive || isSubItemActive
                  ? "text-green-600"
                  : "text-gray-400 group-hover:text-green-600"
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

      {/* Modern Submenu */}
      {subItems && expanded && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col pl-14 pr-2 py-2 space-y-1">
            {subItems.map((item) => {
              const isSubActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 px-3 py-2.5 text-sm transition-all duration-200 rounded-lg group
                    ${
                      isSubActive
                        ? "bg-green-50 text-green-700 font-medium border border-green-100 shadow-sm"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }
                  `}
                >
                  <span
                    className={`flex items-center justify-center h-4 w-4 transition-colors ${
                      isSubActive
                        ? "text-green-600"
                        : "text-gray-400 group-hover:text-green-500"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="whitespace-nowrap">{item.label}</span>
                  {isSubActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 ml-auto" />
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
      icon: <UserGroupIcon className="h-4 w-4" />,
    },
    {
      label: "Donors",
      to: "/admin/users/donors",
      icon: <UserIcon className="h-4 w-4" />,
    },
    {
      label: "NGOs",
      to: "/admin/users/ngos",
      icon: <BuildingLibraryIcon className="h-4 w-4" />,
    },
    {
      label: "Volunteers",
      to: "/admin/users/volunteers",
      icon: <UsersIcon className="h-4 w-4" />,
    },
  ];

  const donationsSubItems: SubItem[] = [
    {
      label: "All Donations",
      to: "/admin/donations",
      icon: <GiftIcon className="h-4 w-4" />,
    },
    {
      label: "Live Tracking",
      to: "/admin/donations/tracking",
      icon: <MapPinIcon className="h-4 w-4" />,
    },
    {
      label: "Pending",
      to: "/admin/donations/pending",
      icon: <HeartIcon className="h-4 w-4" />,
    },
  ];

  const alertsSubItems: SubItem[] = [
    {
      label: "All Alerts",
      to: "/admin/alerts",
      icon: <BellIcon className="h-4 w-4" />,
    },
    {
      label: "Urgent",
      to: "/admin/alerts/urgent",
      icon: <ExclamationTriangleIcon className="h-4 w-4" />,
    },
  ];

  const analyticsSubItems: SubItem[] = [
    {
      label: "Overview",
      to: "/admin/analytics",
      icon: <ChartBarIcon className="h-4 w-4" />,
    },
    {
      label: "Reports",
      to: "/admin/analytics/reports",
      icon: <ChartPieIcon className="h-4 w-4" />,
    },
  ];

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen
        bg-white shadow-md border-r
        transition-all duration-300 overflow-hidden
        ${expanded ? "w-64" : "w-20"}
        hidden md:flex flex-col
        z-50
      `}
    >
      {/* Logo in sidebar */}
      <div className="flex-shrink-0 flex items-center justify-center py-3">
        <img
          alt="Hunger Free"
          src={expanded ? "/HungerFree.svg" : "/Icon2.svg"}
          className={`h-16 transition-all duration-300 ${
            expanded ? "w-40" : "w-16"
          }`}
        />
      </div>

      {/* Scrollable navigation area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <nav className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar px-2 py-4">
          <div className="space-y-2 w-full">
            <Link to="/admin/dashboard">
              <SidebarItem
                icon={<HomeIcon className="h-6 w-6" />}
                label="Dashboard"
                to="/admin/dashboard"
                expanded={expanded}
              />
            </Link>

            <SidebarItem
              icon={<UserGroupIcon className="h-6 w-6" />}
              label="Users"
              expanded={expanded}
              subItems={usersSubItems}
            />

            <SidebarItem
              icon={<HeartIcon className="h-6 w-6" />}
              label="Donations"
              expanded={expanded}
              subItems={donationsSubItems}
            />

            <SidebarItem
              icon={<BellIcon className="h-6 w-6" />}
              label="Alerts"
              expanded={expanded}
              subItems={alertsSubItems}
            />

            <SidebarItem
              icon={<ChartBarIcon className="h-6 w-6" />}
              label="Analytics"
              expanded={expanded}
              subItems={analyticsSubItems}
            />

            <Link to="/admin/settings">
              <SidebarItem
                icon={<Cog6ToothIcon className="h-6 w-6" />}
                label="Settings"
                to="/admin/settings"
                expanded={expanded}
              />
            </Link>
          </div>
        </nav>

        {/* Expand/Collapse Arrow */}
        <div className="flex-shrink-0 relative">
          <button
            onClick={() => setExpanded(!expanded)}
            className="absolute bottom-3 right-6 bg-green-500 text-white p-1.5 rounded-full shadow hover:bg-green-600 transition-colors duration-200"
          >
            <ChevronRightIcon
              className={`h-5 w-5 transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SidebarIcons;
