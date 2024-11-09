"use client";
import React, { useState } from "react";
import { assets } from "@/Assets/assets";
import Sidebar from "@/Components/AdminComponents/Sidebar";
import Image from "next/image";
import { Menu, ChevronDown, Bell } from "lucide-react";

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Main Layout Container */}
      <div className="flex relative">
        {/* Sidebar - hidden on mobile by default */}
        <div
          className={`
          fixed inset-y-0 left-0 z-30 transform lg:relative lg:translate-x-0
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300 ease-in-out
        `}
        >
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0 flex flex-col min-h-screen">
          {/* Top Navigation Bar */}
          <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
            <div className="flex items-center justify-between px-4 py-3 lg:px-6">
              {/* Left side - Menu button and Title */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2 rounded-md hover:bg-gray-100"
                >
                  <Menu size={24} />
                </button>
                <h1 className="text-xl font-semibold text-gray-900">
                  Admin Panel
                </h1>
              </div>

              {/* Right side - Profile and notifications */}
              <div className="flex items-center gap-4">
                {/* Notifications */}
                <button className="p-2 rounded-full hover:bg-gray-100 relative">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Profile Menu */}
                <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-full p-1">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={assets.profile_icon}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <ChevronDown size={16} className="text-gray-600" />
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">
            {/* Content Container with max width */}
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 py-4 px-6">
            <div className="text-center text-sm text-gray-600">
              © {new Date().getFullYear()} Admin Dashboard. All rights reserved.
            </div>
          </footer>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
