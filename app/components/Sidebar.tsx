'use client'
import { LayoutDashboard, PieChartIcon } from "lucide-react";
import HeaderSidebar from "./HeaderSidebar";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Allocations", href: "/allocations", icon: PieChartIcon },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" 
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <nav className={`
        fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
        transition duration-200 ease-in-out
        w-64 bg-gray-100 min-h-screen flex flex-col z-30
      `}>
        <HeaderSidebar onClose={onClose} />
        <ul className="space-y-2 p-4 flex-grow overflow-y-auto">
          {navItems.map((item) => (
            <li key={item.name}>
              <a href={item.href} className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">
                <item.icon className="w-5 h-5 mr-2" />
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}