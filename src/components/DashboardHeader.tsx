import { useState } from "react";
import { Bell, Search, Menu, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogoutModal } from "./LogoutModal";

export const DashboardHeader = ({ 
  onMenuToggle, 
  isSidebarOpen 
}: { 
  onMenuToggle: () => void;
  isSidebarOpen: boolean;
}) => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
      <header
        className="h-16 px-4 md:px-6 flex items-center justify-between sticky top-0 z-40 shadow-md"
        style={{ backgroundColor: "#04193b" }}  // ✅ Background color added
      >
        <div className="flex items-center gap-3 md:gap-6">
          {/* Mobile Menu Button */}
          <button 
            onClick={onMenuToggle}
            className="lg:hidden p-2 hover:bg-white/20 rounded-xl smooth-transition"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5 text-white" />
          </button>
          
          {/* Logo */}
          <a href="https://bereanstechnology.com/">
            <img
              src="/logo.png"
              alt="Bereans Technology Logo"
              className="w-24 h-12 object-contain"
            />
          </a>
          
          {/* Search Bar */}
          <div className="hidden lg:flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2 w-64 xl:w-96">
            <Search className="w-5 h-5 text-gray-300" />
            <Input
              placeholder="Search..."
              className="border-0 bg-transparent text-white placeholder-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Notification */}
          <button className="hidden sm:block relative p-2 hover:bg-white/20 rounded-xl smooth-transition">
            <Bell className="w-5 h-5 text-white" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <Avatar className="cursor-pointer hover:scale-105 smooth-transition">
                <AvatarFallback className="bg-accent text-white">AD</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 glass-card">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/dashboard/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowLogoutModal(true)}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <LogoutModal open={showLogoutModal} onOpenChange={setShowLogoutModal} />
    </>
  );
};
