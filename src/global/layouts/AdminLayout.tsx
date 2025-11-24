"use client";

import React from "react";
import Header from "../components/Header";
import SidebarIcons from "../components/Sidebar";
import { SidebarProvider, useSidebar } from "../contexts/SidebarContext";
import { Outlet } from "react-router-dom";

const AdminLayoutContent: React.FC = () => {
  const { expanded } = useSidebar();

  return (
    <>
      <Header />
      <SidebarIcons />

      <main
        className={
          "pt-20 px-6 transition-all duration-300 " +
          (expanded ? "md:ml-56" : "md:ml-20") +
          " ml-0"
        }
      >
        {/* This is where Dashboard, Users, Donations pages will appear */}
        <Outlet />
      </main>
    </>
  );
};

const AdminLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <AdminLayoutContent />
    </SidebarProvider>
  );
};

export default AdminLayout;
