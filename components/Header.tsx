interface HeaderProps {
  toggleSidebar: () => void;
  onSignOut: () => Promise<void>;
}

export default function Header({ toggleSidebar, onSignOut }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-600">
          {/* Add your sidebar toggle icon here */}
          Menu
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Your App Name</h1>
        <button onClick={onSignOut} className="text-gray-500 hover:text-gray-600">
          Sign Out
        </button>
      </div>
    </header>
  );
}