import { ReactNode } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { useSidebar } from "@/contexts/SidebarContext";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const { collapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Orbs */}
      <div className="orb orb-primary w-48 md:w-96 h-48 md:h-96 -top-24 md:-top-48 -left-24 md:-left-48" />
      <div className="orb orb-accent w-32 md:w-64 h-32 md:h-64 top-1/2 right-0" style={{ animationDelay: "-5s" }} />
      <div className="orb orb-primary w-24 md:w-48 h-24 md:h-48 bottom-0 left-1/3" style={{ animationDelay: "-10s" }} />
      
      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none noise-overlay" />

      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className={`min-h-screen transition-all duration-300 lg:ml-64 ${collapsed ? "lg:ml-20" : "lg:ml-64"}`}>
        <DashboardHeader title={title} />
        <main className="pt-20 md:pt-16 p-4 md:p-6 relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
}
