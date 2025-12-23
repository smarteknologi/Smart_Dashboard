import { cn } from "@/lib/utils";
import { Cpu, Smartphone, Server, Wifi, WifiOff, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface DeviceCardProps {
  name: string;
  os: string;
  status: "online" | "offline" | "syncing";
  performance: number;
  lastSeen: string;
  type: "edge" | "mobile" | "server";
  delay?: number;
}

const deviceIcons = {
  edge: Cpu,
  mobile: Smartphone,
  server: Server,
};

const statusConfig = {
  online: { icon: Wifi, color: "text-success", bg: "bg-success/20" },
  offline: { icon: WifiOff, color: "text-muted-foreground", bg: "bg-muted/20" },
  syncing: { icon: RefreshCw, color: "text-warning", bg: "bg-warning/20" },
};

export function DeviceCard({ name, os, status, performance, lastSeen, type, delay = 0 }: DeviceCardProps) {
  const DeviceIcon = deviceIcons[type];
  const StatusIcon = statusConfig[status].icon;

  const handleClick = () => {
    toast.info(`${name}`, {
      description: `Status: ${status} | Performance: ${performance}%`,
      action: {
        label: "Details",
        onClick: () => toast.info("Opening device details..."),
      },
    });
  };

  return (
    <button
      onClick={handleClick}
      className="device-card opacity-0 animate-fade-up text-left w-full"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 border border-primary/20">
          <DeviceIcon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
        </div>
        <div className={cn("flex items-center gap-1.5 px-2 py-1 rounded-full", statusConfig[status].bg)}>
          <StatusIcon className={cn("w-3 h-3", statusConfig[status].color, status === "syncing" && "animate-spin")} />
          <span className={cn("text-xs font-medium capitalize", statusConfig[status].color)}>{status}</span>
        </div>
      </div>

      <h4 className="font-semibold text-foreground mb-1 text-sm md:text-base truncate">{name}</h4>
      <p className="text-xs text-muted-foreground mb-3 truncate">{os}</p>

      {/* Performance Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Performance</span>
          <span className="font-medium text-foreground">{performance}%</span>
        </div>
        <div className="h-1.5 md:h-2 rounded-full bg-muted/50 overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              performance >= 80 ? "bg-success" : performance >= 50 ? "bg-warning" : "bg-primary"
            )}
            style={{ width: `${performance}%` }}
          />
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-3">Last seen: {lastSeen}</p>
    </button>
  );
}
