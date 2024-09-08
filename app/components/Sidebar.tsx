'use client'
import { LayoutDashboard, PieChartIcon, Calculator } from "lucide-react";
import HeaderSidebar from "./HeaderSidebar";
import { useTheme } from '../contexts/ThemeContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { theme } = useTheme();
  
  const navItems = [
    {
      section: "Simulators",
      icon: Calculator,
      items: [
        { name: "Compound Interest", href: "/compound-interest" },
        { name: "Debt Ratio Calculator", href: "/debt-ratio" },
      ],
    },
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
        w-64 bg-white dark:bg-gray-800 min-h-screen flex flex-col z-30
        md:border-r border-gray-200 dark:border-gray-700
      `}>
        <HeaderSidebar onClose={onClose} />
        <ul className="space-y-6 p-4 flex-grow overflow-y-auto">
          {navItems.map((section) => (
            <li key={section.section}>
              <h3 className="mb-2 px-4 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase flex items-center">
                <section.icon className="w-5 h-5 mr-2" />
                {section.section}
              </h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="flex items-center py-2 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}