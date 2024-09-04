'use client'
import { X } from "lucide-react";

interface HeaderSidebarProps {
  onClose: () => void;
}

export default function HeaderSidebar({ onClose }: HeaderSidebarProps) {
  return (
    <div className="flex justify-between items-center px-4 bg-white border-b h-16">
      <img src="/icon.png" alt="Expensify" width={56} height={56} />
      <h2 className="text-lg font-semibold">Expensify</h2>
      <button
        onClick={onClose}
        className="md:hidden"
      >
        <X className="w-6 h-6" />
      </button>
    </div>
  );
}