import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileCheck,
  Shield,
  TrendingUp,
  CheckCircle2,
  FileText,
  Plug,
  Settings,
  HelpCircle,
  LogOut,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { LogoutModal } from "./LogoutModal";

const menuItems = [
  { title: "Dashboard Overview", url: "/dashboard", icon: LayoutDashboard },
  { title: "Automated Data Auditing", url: "/dashboard/auditing", icon: FileCheck },
  { title: "AI-Powered Verification", url: "/dashboard/verification", icon: Shield },
  { title: "Real-Time Compliance", url: "/dashboard/realtime", icon: TrendingUp }, // ✅ corrected
  { title: "Regulatory Alignment", url: "/dashboard/regulatory", icon: CheckCircle2 },
  { title: "Exportable Reports", url: "/dashboard/reports", icon: FileText },
  { title: "Integrations", url: "/dashboard/integrations", icon: Plug },
  { title: "Admin Settings", url: "/dashboard/settings", icon: Settings },
  { title: "Support / Help", url: "/dashboard/support", icon: HelpCircle },
];


export const DashboardSidebar = ({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Close sidebar on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        glass-card 
        w-64 
        min-h-[calc(100vh-4rem)] 
        lg:min-h-[calc(100vh-7rem)]
        p-4 
        fixed lg:sticky 
        top-16 lg:top-20
        left-0
        z-50 lg:z-auto
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 p-2 hover:bg-white/50 rounded-xl smooth-transition"
          aria-label="Close menu"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>

        <nav className="space-y-2 mt-12 lg:mt-0">
          {menuItems.map((item) => (
            <NavLink
              key={item.url}
              to={item.url}
              end={item.url === "/dashboard"}
              onClick={() => onClose()}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl smooth-transition ${
                  isActive
                    ? "bg-accent text-white shadow-lg"
                    : "text-foreground hover:bg-white/50"
                }`
              }
            >
              <item.icon className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm font-medium">{item.title}</span>
            </NavLink>
          ))}

          <button
            onClick={() => {
              setShowLogoutModal(true);
              onClose();
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl smooth-transition text-destructive hover:bg-destructive/10 w-full"
          >
            <LogOut className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </nav>
      </aside>

      <LogoutModal open={showLogoutModal} onOpenChange={setShowLogoutModal} />
    </>
  );
};
