import { Bell, Moon, Sun, User, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSidebar } from "@/contexts/SidebarContext";
import { useState } from "react";
import { toast } from "sonner";

interface DashboardHeaderProps {
  title: string;
}

export function DashboardHeader({ title }: DashboardHeaderProps) {
  const { collapsed, setMobileOpen } = useSidebar();
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const handleNotifications = () => {
    toast.info("You have 3 new notifications", {
      description: "2 deployments completed, 1 device went offline",
    });
  };

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    toast.success(`${darkMode ? "Light" : "Dark"} mode activated`);
  };

  const handleProfile = () => {
    toast.info("Profile settings", {
      description: "Opening user profile...",
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.info(`Searching for "${searchQuery}"...`);
    }
  };

  return (
    <header
      className={`fixed top-0 right-0 z-30 h-16 transition-all duration-300 left-0 lg:left-64 ${
        collapsed ? "lg:left-20" : "lg:left-64"
      }`}
    >
      <div className="flex items-center justify-between h-full px-4 md:px-6 bg-background/60 backdrop-blur-xl border-b border-border">
        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          {/* Page Title */}
          <h1 className="text-lg md:text-xl font-semibold text-foreground truncate">{title}</h1>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Search - Hidden on mobile */}
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48 lg:w-64 pl-10 bg-glass/30 border-glass-border/30"
            />
          </form>

          {/* Mobile Search Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => toast.info("Search feature coming soon")}>
            <Search className="w-5 h-5" />
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative" onClick={handleNotifications}>
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary animate-pulse" />
          </Button>

          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" onClick={handleThemeToggle}>
            {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </Button>

          {/* Profile */}
          <Button variant="glass" size="icon" className="rounded-full" onClick={handleProfile}>
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
