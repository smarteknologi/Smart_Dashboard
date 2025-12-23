import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/contexts/SidebarContext";
import { toast } from "sonner";
import {
  LayoutDashboard,
  Cpu,
  Layers,
  Activity,
  Server,
  Key,
  Shield,
  Settings,
  HelpCircle,
  LogOut,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

const navItems = [
  { title: "Overview", path: "/dashboard", icon: LayoutDashboard },
  { title: "Edge Deployment", path: "/dashboard/deployment", icon: Cpu },
  { title: "Core ML Ops", path: "/dashboard/ml-ops", icon: Layers },
  { title: "Performance", path: "/dashboard/performance", icon: Activity },
  { title: "Devices", path: "/dashboard/devices", icon: Server },
  { title: "API Keys", path: "/dashboard/api-keys", icon: Key },
  { title: "Security", path: "/dashboard/security", icon: Shield },
  { title: "Settings", path: "/dashboard/settings", icon: Settings },
  { title: "Support", path: "/dashboard/support", icon: HelpCircle },
];

export function DashboardSidebar() {
  const { collapsed, mobileOpen, setMobileOpen } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ REAL LOGOUT
  const handleLogout = async () => {
    try {
      await signOut(auth); // 🔥 ACTUAL LOGOUT
      toast.success("Logged out successfully");
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
      toast.error("Logout failed. Try again.");
    }
  };

  const handleNavClick = () => {
    if (mobileOpen) {
      setMobileOpen(false);
    }
  };

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        <img
          src="/logo.png"
          alt="Logo"
          className="w-20 h-20 object-contain"
        />

        {/* Mobile close */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={handleNavClick}
              className={cn(
                "nav-item flex items-center gap-3 px-3 py-2 rounded-xl transition-all",
                "hover:bg-primary/10 hover:text-primary",
                isActive && "bg-primary/15 text-primary"
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{item.title}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-full h-10 gap-3 rounded-xl transition-all duration-300
                     text-muted-foreground hover:text-destructive hover:bg-destructive/15"
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-64 transition-transform duration-300 lg:hidden",
          "bg-sidebar/95 backdrop-blur-xl border-r border-sidebar-border",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen transition-all duration-300 hidden lg:block",
          "bg-sidebar/80 backdrop-blur-xl border-r border-sidebar-border",
          collapsed ? "w-20" : "w-64"
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
