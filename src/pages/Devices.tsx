import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DeviceCard } from "@/components/dashboard/DeviceCard";
import { toast } from "sonner";
import {
  Plus,
  Search,
  Filter,
  Grid3X3,
  List,
  RefreshCw,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface Device {
  id: number;
  name: string;
  os: string;
  status: "online" | "offline" | "syncing";
  performance: number;
  lastSeen: string;
  type: "edge" | "mobile" | "server";
}

const initialDevices: Device[] = [
  { id: 1, name: "Edge Node Alpha", os: "Linux ARM64", status: "online", performance: 94, lastSeen: "Just now", type: "edge" },
  { id: 2, name: "Production Server #1", os: "Ubuntu 22.04 LTS", status: "online", performance: 87, lastSeen: "2 min ago", type: "server" },
  { id: 3, name: "Mobile Test Device", os: "iOS 17.2", status: "online", performance: 92, lastSeen: "5 min ago", type: "mobile" },
  { id: 4, name: "IoT Gateway Hub", os: "FreeRTOS", status: "syncing", performance: 78, lastSeen: "10 min ago", type: "edge" },
  { id: 5, name: "Android Dev Phone", os: "Android 14", status: "online", performance: 85, lastSeen: "15 min ago", type: "mobile" },
  { id: 6, name: "GPU Cluster Node #3", os: "CentOS 8", status: "online", performance: 96, lastSeen: "1 min ago", type: "server" },
  { id: 7, name: "Raspberry Pi Edge", os: "Raspbian", status: "offline", performance: 0, lastSeen: "2 hours ago", type: "edge" },
  { id: 8, name: "Jetson Nano Dev", os: "JetPack 5.1", status: "online", performance: 88, lastSeen: "3 min ago", type: "edge" },
  { id: 9, name: "Windows Workstation", os: "Windows 11", status: "online", performance: 91, lastSeen: "Just now", type: "server" },
];

export default function Devices() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [devices, setDevices] = useState<Device[]>(initialDevices);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newDeviceName, setNewDeviceName] = useState("");
  const [newDeviceOS, setNewDeviceOS] = useState("");
  const [newDeviceType, setNewDeviceType] = useState<"edge" | "mobile" | "server">("edge");
  const [nextId, setNextId] = useState(10);

  const filteredDevices = devices.filter((device) => {
    const matchesSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.os.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = !filterStatus || device.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const onlineCount = devices.filter((d) => d.status === "online").length;
  const offlineCount = devices.filter((d) => d.status === "offline").length;
  const syncingCount = devices.filter((d) => d.status === "syncing").length;

  const handleRefresh = () => {
    toast.loading("Refreshing devices...", { id: "refresh" });
    setTimeout(() => {
      setDevices(prev => prev.map(d => ({
        ...d,
        lastSeen: d.status === "online" ? "Just now" : d.lastSeen,
        performance: d.status === "online" ? Math.min(100, d.performance + Math.floor(Math.random() * 5)) : d.performance
      })));
      toast.success("Devices refreshed!", { id: "refresh" });
    }, 1500);
  };

  const handleFilter = () => {
    if (filterStatus) {
      setFilterStatus(null);
      toast.info("Filter cleared");
    } else {
      toast.info("Select a status to filter", {
        action: {
          label: "Online",
          onClick: () => {
            setFilterStatus("online");
            toast.success("Filtering online devices");
          }
        }
      });
    }
  };

  const handleAddDevice = () => {
    if (!newDeviceName.trim() || !newDeviceOS.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    const newDevice: Device = {
      id: nextId,
      name: newDeviceName,
      os: newDeviceOS,
      status: "syncing",
      performance: 0,
      lastSeen: "Connecting...",
      type: newDeviceType,
    };

    setDevices([newDevice, ...devices]);
    setNextId(nextId + 1);
    setIsAddDialogOpen(false);
    setNewDeviceName("");
    setNewDeviceOS("");

    toast.loading(`Connecting to ${newDeviceName}...`, { id: `device-${nextId}` });
    
    setTimeout(() => {
      setDevices(prev => prev.map(d => 
        d.id === newDevice.id 
          ? { ...d, status: "online" as const, performance: Math.floor(Math.random() * 20) + 80, lastSeen: "Just now" }
          : d
      ));
      toast.success(`${newDeviceName} connected!`, { id: `device-${nextId}` });
    }, 3000);
  };

  return (
    <DashboardLayout title="Devices & Integrations">
      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
        {[
          { label: "Total Devices", value: devices.length, color: "text-foreground", filter: null },
          { label: "Online", value: onlineCount, color: "text-success", filter: "online" },
          { label: "Offline", value: offlineCount, color: "text-primary", filter: "offline" },
          { label: "Syncing", value: syncingCount, color: "text-warning", filter: "syncing" },
        ].map((stat, index) => (
          <button
            key={index}
            onClick={() => setFilterStatus(filterStatus === stat.filter ? null : stat.filter)}
            className="text-left"
          >
            <Card
              variant="glass"
              className={cn(
                "opacity-0 animate-fade-up transition-all duration-300",
                filterStatus === stat.filter && "ring-2 ring-primary"
              )}
              style={{ animationDelay: `${index * 50}ms`, animationFillMode: "forwards" }}
            >
              <CardContent className="p-3 md:p-4 flex items-center justify-between">
                <span className="text-xs md:text-sm text-muted-foreground">{stat.label}</span>
                <span className={cn("text-xl md:text-2xl font-bold", stat.color)}>{stat.value}</span>
              </CardContent>
            </Card>
          </button>
        ))}
      </div>

      {/* Controls */}
      <Card variant="glass" className="mb-4 md:mb-6 opacity-0 animate-fade-up" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
        <CardContent className="p-3 md:p-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 md:gap-4">
            <div className="flex items-center gap-2 md:gap-3 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search devices..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="icon" onClick={handleFilter} className={cn(filterStatus && "border-primary text-primary")}>
                {filterStatus ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4" />}
              </Button>
              <Button variant="outline" size="icon" onClick={handleRefresh}>
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <div className="flex items-center bg-glass/30 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "p-2 rounded-md transition-all",
                    viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "p-2 rounded-md transition-all",
                    viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              <Button variant="glow" onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Add</span> Device
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Device Grid */}
      <div className={cn(
        "gap-3 md:gap-4",
        viewMode === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          : "flex flex-col"
      )}>
        {filteredDevices.map((device, index) => (
          <DeviceCard
            key={device.id}
            name={device.name}
            os={device.os}
            status={device.status}
            performance={device.performance}
            lastSeen={device.lastSeen}
            type={device.type}
            delay={250 + index * 50}
          />
        ))}
      </div>

      {filteredDevices.length === 0 && (
        <Card variant="glass" className="mt-6">
          <CardContent className="p-8 md:p-12 text-center">
            <p className="text-muted-foreground">No devices found matching your search.</p>
            <Button variant="outline" className="mt-4" onClick={() => { setSearchQuery(""); setFilterStatus(null); }}>
              Clear filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Add Device Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Device</DialogTitle>
            <DialogDescription>
              Connect a new device to your network
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Device Name</label>
              <Input
                placeholder="e.g., Edge Node Beta"
                value={newDeviceName}
                onChange={(e) => setNewDeviceName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Operating System</label>
              <Input
                placeholder="e.g., Linux ARM64"
                value={newDeviceOS}
                onChange={(e) => setNewDeviceOS(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Device Type</label>
              <div className="grid grid-cols-3 gap-2">
                {(["edge", "mobile", "server"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setNewDeviceType(type)}
                    className={cn(
                      "p-3 rounded-xl border text-center capitalize transition-all",
                      newDeviceType === type
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="glow" onClick={handleAddDevice}>
              Add Device
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
