"use client";
import React, { useState } from "react";
import Image from "next/image";
import { assets } from "@/Assets/assets";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      href: "/admin/addBlogs",
      icon: assets.add_icon,
      text: "Add Blogs",
    },
    {
      href: "/admin/blogList",
      icon: assets.blog_icon,
      text: "Blog List",
    },
  ];

  return (
    <div className="relative">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-md border border-gray-200"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Container */}
      <div
        className={`
        fixed top-0 left-0 h-full bg-slate-100 transition-all duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:relative
      `}
      >
        {/* Logo Section */}
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="max-w-[120px]">
            <Image
              src={assets.logo}
              width={120}
              height={40}
              alt="Logo"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="p-4 w-64">
          <nav className="space-y-4">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex items-center gap-3 px-4 py-2 
                         bg-white border border-black rounded-md
                         hover:bg-slate-50 transition-colors
                         shadow-[-3px_3px_0px_#000000]
                         hover:shadow-[-4px_4px_0px_#000000]
                         transform hover:-translate-y-0.5
                         duration-200"
              >
                <Image
                  src={item.icon}
                  width={24}
                  height={24}
                  alt=""
                  className="w-6 h-6"
                />
                <span className="font-medium">{item.text}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;
