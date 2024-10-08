'use client'
import { Calculator, ChevronDown, Home } from "lucide-react";
import HeaderSidebar from "./HeaderSidebar";
import { useLanguage } from '@/app/contexts/LanguageContext';
import { translations, Language } from '@/app/translations';
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { language } = useLanguage();
  const t = translations[language as Language].sidebar;
  const pathname = usePathname();
  
  const navItems = [
    {
      section: t.dashboard,
      icon: Home,
      items: [
        { name: t.assetAllocation, href: "/asset-allocation" },
      ],
    },
    {
      section: t.simulators,
      icon: Calculator,
      items: [
        { name: t.compoundInterest, href: "/compound-interest" },
        { name: t.debtRatio, href: "/debt-ratio" },
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
        fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0 bg-background' : '-translate-x-full'}
        md:relative md:translate-x-0
        transition duration-200 ease-in-out
        w-64 min-h-screen flex flex-col z-30
        md:border-r border-gray-200 dark:border-gray-700
      `}>
        <HeaderSidebar onClose={onClose} />
        <ul className="space-y-6 p-4 flex-grow overflow-y-auto">
          {navItems.map((section) => (
            <li key={section.section}>
              <details open className="group">
                <summary className="mb-2 px-4 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase flex items-center cursor-pointer">
                  <section.icon className="w-5 h-5 mr-2" />
                  {section.section}
                  <ChevronDown className="ml-auto h-5 w-5 transition-transform group-open:rotate-180" />
                </summary>
                <ul className="space-y-2 mt-2">
                  {section.items.map((item) => (
                    <li key={item.name}>
                      <a 
                        href={item.href} 
                        className={`flex items-center py-2 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded relative ${
                          pathname === item.href ? 'bg-gray-100 dark:bg-gray-700' : ''
                        }`}
                      >
                        <span className="ml-4">{item.name}</span>
                        {pathname === item.href && (
                          <span className="absolute inset-y-0 left-0 w-1 bg-primary rounded-r" aria-hidden="true" />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}