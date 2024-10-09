'use client'
import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface HeaderSidebarProps {
  onClose: () => void;
}

export default function HeaderSidebar({ onClose }: HeaderSidebarProps) {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/dashboard');
    onClose(); // Close the sidebar on mobile after navigation
  };

  return (
    <div className="flex justify-between items-center px-4 border-b border-gray-200 dark:border-gray-700 h-16 relative">
      <div 
        className="flex items-center cursor-pointer"
        onClick={handleLogoClick}
      >
        <Image
          src="/icon-512x512.png"
          alt="Expensify"
          width={56}
          height={56}
          priority
          className="z-10"
        />
        <h2 className="absolute left-1/2 transform -translate-x-1/3 text-lg font-semibold text-gray-900 dark:text-white">
          Expensify
        </h2>
      </div>
      <button
        onClick={onClose}
        className="md:hidden z-10 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
      >
        <X className="w-6 h-6" />
      </button>
    </div>
  );
}