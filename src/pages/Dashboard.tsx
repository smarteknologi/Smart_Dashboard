import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { DeviceCard } from "@/components/dashboard/DeviceCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  Cpu,
  Server,
  Activity,
  Zap,
  Clock,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  Upload,
} from "lucide-react";

const latencyData = [
  { name: "00:00", value: 45 },
  { name: "04:00", value: 38 },
  { name: "08:00", value: 52 },
  { name: "12:00", value: 67 },
  { name: "16:00", value: 49 },
  { name: "20:00", value: 55 },
  { name: "24:00", value: 42 },
];

const throughputData = [
  { name: "Mon", value: 1200, secondary: 980 },
  { name: "Tue", value: 1350, secondary: 1100 },
  { name: "Wed", value: 1180, secondary: 900 },
  { name: "Thu", value: 1420, secondary: 1150 },
  { name: "Fri", value: 1290, secondary: 1050 },
  { name: "Sat", value: 1100, secondary: 850 },
  { name: "Sun", value: 980, secondary: 780 },
];

const recentDeployments = [
  { id: 1, name: "YOLOv8-Edge", status: "success", time: "2 min ago", version: "v3.2.1" },
  { id: 2, name: "ResNet-Lite", status: "success", time: "15 min ago", version: "v2.0.0" },
  { id: 3, name: "GPT-Nano", status: "pending", time: "1 hour ago", version: "v1.5.0" },
  { id: 4, name: "BERT-Mobile", status: "failed", time: "3 hours ago", version: "v1.0.2" },
];

const topDevices = [
  { name: "Edge Node #1", os: "Linux ARM64", status: "online" as const, performance: 94, lastSeen: "Just now", type: "edge" as const },
  { name: "Mobile Hub", os: "Android 14", status: "online" as const, performance: 87, lastSeen: "2 min ago", type: "mobile" as const },
  { name: "GPU Server", os: "Ubuntu 22.04", status: "syncing" as const, performance: 78, lastSeen: "5 min ago", type: "server" as const },
];

export default function Dashboard() {
  const navigate = useNavigate();

  const handleDeployModel = () => {
    toast.success("Redirecting to deployment...");
    navigate("/dashboard/deployment");
  };

  const handleRunBenchmark = () => {
    toast.loading("Running benchmark...", { id: "benchmark" });
    setTimeout(() => {
      toast.success("Benchmark completed! Avg latency: 23ms", { id: "benchmark" });
    }, 2000);
  };

  const handleViewAllDeployments = () => {
    navigate("/dashboard/deployment");
  };

  const handleManageDevices = () => {
    navigate("/dashboard/devices");
  };

  const handleDeploymentClick = (deployment: typeof recentDeployments[0]) => {
    if (deployment.status === "failed") {
      toast.error(`${deployment.name} failed to deploy`, {
        description: "Check logs for more details",
        action: {
          label: "View Logs",
          onClick: () => toast.info("Opening logs..."),
        },
      });
    } else if (deployment.status === "pending") {
      toast.info(`${deployment.name} is still deploying...`, {
        description: "Estimated time: 5 minutes",
      });
    } else {
      toast.success(`${deployment.name} ${deployment.version}`, {
        description: "Deployed successfully",
      });
    }
  };

  return (
    <DashboardLayout title="Overview">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-4 mb-6">
        <StatCard
          title="Total Deployments"
          value="1,284"
          change="+12.5%"
          changeType="positive"
          icon={Upload}
          delay={100}
        />
        <StatCard
          title="Active Devices"
          value="47"
          change="+3 new"
          changeType="positive"
          icon={Server}
          delay={150}
        />
        <StatCard
          title="Model Runtime"
          value="99.8%"
          change="Optimal"
          changeType="positive"
          icon={Cpu}
          delay={200}
        />
        <StatCard
          title="Avg Latency"
          value="23ms"
          change="-8ms"
          changeType="positive"
          icon={Clock}
          delay={250}
        />
        <StatCard
          title="Error Rate"
          value="0.02%"
          change="Normal"
          changeType="positive"
          icon={AlertTriangle}
          delay={300}
        />
        <StatCard
          title="Sync Health"
          value="98.5%"
          change="All good"
          changeType="positive"
          icon={Activity}
          delay={350}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
        <ChartCard title="Inference Latency (ms)" data={latencyData} />
        <ChartCard title="Throughput (req/s)" data={throughputData} showSecondary />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Recent Deployments */}
        <Card variant="glass" className="lg:col-span-1 opacity-0 animate-fade-up" style={{ animationDelay: "400ms", animationFillMode: "forwards" }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base md:text-lg">Recent Deployments</CardTitle>
            <Button variant="ghost" size="sm" onClick={handleViewAllDeployments}>
              <span className="hidden sm:inline">View all</span>
              <ArrowUpRight className="w-4 h-4 sm:ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentDeployments.map((deployment) => (
                <button
                  key={deployment.id}
                  onClick={() => handleDeploymentClick(deployment)}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-glass/30 border border-glass-border/20 hover:bg-glass/50 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    {deployment.status === "success" ? (
                      <CheckCircle className="w-5 h-5 text-success shrink-0" />
                    ) : deployment.status === "pending" ? (
                      <Clock className="w-5 h-5 text-warning shrink-0" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-primary shrink-0" />
                    )}
                    <div className="text-left">
                      <p className="font-medium text-foreground text-sm">{deployment.name}</p>
                      <p className="text-xs text-muted-foreground">{deployment.time}</p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      deployment.status === "success"
                        ? "badge-success"
                        : deployment.status === "pending"
                        ? "badge-warning"
                        : "badge-error"
                    }`}
                  >
                    {deployment.status}
                  </span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Devices */}
        <Card variant="glass" className="lg:col-span-2 opacity-0 animate-fade-up" style={{ animationDelay: "450ms", animationFillMode: "forwards" }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base md:text-lg">Top Performing Devices</CardTitle>
            <Button variant="ghost" size="sm" onClick={handleManageDevices}>
              <span className="hidden sm:inline">Manage</span>
              <ArrowUpRight className="w-4 h-4 sm:ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {topDevices.map((device, index) => (
                <DeviceCard key={index} {...device} delay={500 + index * 50} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card variant="glass" className="mt-4 md:mt-6 opacity-0 animate-fade-up" style={{ animationDelay: "600ms", animationFillMode: "forwards" }}>
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-1">Quick Actions</h3>
              <p className="text-sm text-muted-foreground">Deploy models, manage devices, or analyze performance</p>
            </div>
            <div className="flex flex-wrap gap-3 w-full sm:w-auto">
              <Button variant="glow" className="flex-1 sm:flex-none" onClick={handleDeployModel}>
                <Upload className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Deploy</span> Model
              </Button>
              <Button variant="outline" className="flex-1 sm:flex-none" onClick={handleRunBenchmark}>
                <Zap className="w-4 h-4 mr-2" />
                Benchmark
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
