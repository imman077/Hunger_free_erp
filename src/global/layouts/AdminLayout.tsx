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
          "fixed top-17 bottom-0 right-0 bg-white no-scrollbar transition-all duration-300 overflow-auto " +
          (expanded ? "md:left-64" : "md:left-20") + // Changed from left-50 to left-64
          " left-0"
        }
      >
        <section className="">
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
