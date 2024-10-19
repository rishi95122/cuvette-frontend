"use client";

import React, { useState } from "react";

import { Link, useLocation } from "react-router-dom";
import { Home, X, Calendar, Menu } from "lucide-react";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navItems = [
    { icon: Home, path: "/", label: "Home" },
    { icon: Calendar, path: "/jobs", label: "Your Jobs" },
  ];

  return (
    <div className="flex ">
      <button
        className="md:hidden fixed top-3 left-4 z-20 p-2 rounded-md bg-gray-100 text-gray-600"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      <aside
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition duration-200 ease-in-out z-10 w-64 md:w-20 bg-white border-r overflow-y-auto`}
      >
        <nav className="p-4 space-y-4 max-md:mt-14">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center p-2 rounded-md transition-colors duration-200 ${
                pathname === item.path
                  ? "bg-blue-400 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => {
                if (isSidebarOpen) {
                  setIsSidebarOpen(false);
                }
              }}
            >
              <item.icon className="w-6 h-6" />
              <span className="ml-3 md:hidden">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex-1 p-8 ">
        <main>{children}</main>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Layout;
