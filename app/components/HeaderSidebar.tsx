'use client'
import { X } from "lucide-react";
import Image from "next/image";

interface HeaderSidebarProps {
  onClose: () => void;
}

export default function HeaderSidebar({ onClose }: HeaderSidebarProps) {
  return (
    <div className="flex justify-between items-center px-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 relative">
      <Image
        src="/icon-512x512.png"
        alt="Expensify"
        width={56}
        height={56}
        priority
        className="z-10"
      />
      <h2 className="text-lg font-semibold absolute left-1/2 transform -translate-x-1/2 ml-7 hidden md:block text-gray-900 dark:text-white">Expensify</h2>
      <h2 className="text-lg font-semibold md:hidden text-gray-900 dark:text-white">Expensify</h2>
      <button
        onClick={onClose}
        className="md:hidden z-10 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
      >
        <X className="w-6 h-6" />
      </button>
    </div>
  );
}