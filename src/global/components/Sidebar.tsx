"use client";

import React from "react";
import {
  HomeIcon,
  UserGroupIcon,
  HeartIcon,
  BellIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useSidebar } from "../contexts/SidebarContext";
import { Link } from "react-router-dom";

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  expanded: boolean;
};

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, expanded }) => {
  return (
    <div className="flex items-center gap-4 px-4 py-2 cursor-pointer text-gray-900 hover:text-green-600">
      <span className="flex items-center justify-center h-10 w-10">{icon}</span>
      {expanded && <span className="text-base font-medium">{label}</span>}
    </div>
  );
};

const SidebarIcons: React.FC = () => {
  const { expanded, setExpanded } = useSidebar();

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen
        bg-white shadow-md border-r
        transition-all duration-300 overflow-hidden
        ${expanded ? "w-50" : "w-20"}
        hidden md:flex flex-col
        z-50
      `}
    >
      {/* Logo in sidebar (optional, remove if you only want header logo) */}
      <div className="flex items-center justify-center py-3">
        <img
          alt="Hunger Free"
          src={expanded ? "public/HungerFree.svg" : "public/Icon2.svg"}
          className={`h-16 transition-all duration-300 ${
            expanded ? "w-40" : "w-16"
          }`}
        />
      </div>

      {/* Sidebar Menu Items */}
      <nav className="flex flex-col space-y-2 w-full">
        <Link to="/admin/dashboard">
          <SidebarItem
            icon={<HomeIcon className="h-6 w-6" />}
            label="Dashboard"
            expanded={expanded}
          />
        </Link>
        <SidebarItem
          icon={<UserGroupIcon className="h-6 w-6" />}
          label="Users"
          expanded={expanded}
        />
        <SidebarItem
          icon={<HeartIcon className="h-6 w-6" />}
          label="Donations"
          expanded={expanded}
        />
        <SidebarItem
          icon={<BellIcon className="h-6 w-6" />}
          label="Alerts"
          expanded={expanded}
        />
        <SidebarItem
          icon={<ChartBarIcon className="h-6 w-6" />}
          label="Analytics"
          expanded={expanded}
        />
        <SidebarItem
          icon={<Cog6ToothIcon className="h-6 w-6" />}
          label="Settings"
          expanded={expanded}
        />
      </nav>

      {/* Expand/Collapse Arrow */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="absolute bottom-3 right-6 bg-green-500 text-white p-1.5 rounded-full shadow"
      >
        <ChevronRightIcon
          className={`h-5 w-5 transition-transform duration-300 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>
    </aside>
  );
};

export default SidebarIcons;
