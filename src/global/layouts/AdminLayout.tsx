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
          "fixed top-17 bottom-0 right-0 bg-white transition-all duration-300 overflow-auto " +
          (expanded ? "md:left-50" : "md:left-20") +
          " left-0"
        }
      >
        <section className="space-y-2 p-6">
          <Outlet />
        </section>
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
