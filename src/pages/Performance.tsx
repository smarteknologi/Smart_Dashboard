import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Activity, Cpu, Clock, Zap, TrendingUp, AlertCircle } from "lucide-react";

const latencyTimeline = [
  { time: "00:00", edge: 18, cloud: 45 },
  { time: "02:00", edge: 22, cloud: 52 },
  { time: "04:00", edge: 15, cloud: 38 },
  { time: "06:00", edge: 28, cloud: 65 },
  { time: "08:00", edge: 35, cloud: 78 },
  { time: "10:00", edge: 42, cloud: 95 },
  { time: "12:00", edge: 38, cloud: 82 },
  { time: "14:00", edge: 32, cloud: 70 },
  { time: "16:00", edge: 45, cloud: 98 },
  { time: "18:00", edge: 28, cloud: 62 },
  { time: "20:00", edge: 20, cloud: 48 },
  { time: "22:00", edge: 16, cloud: 42 },
];

const fpsData = [
  { device: "Edge #1", fps: 120 },
  { device: "Edge #2", fps: 98 },
  { device: "Mobile", fps: 60 },
  { device: "IoT", fps: 30 },
  { device: "Server", fps: 180 },
];

const utilizationData = [
  { name: "CPU", value: 68, color: "hsl(356, 71%, 36%)" },
  { name: "GPU", value: 82, color: "hsl(0, 39%, 66%)" },
  { name: "Memory", value: 54, color: "hsl(0, 33%, 50%)" },
  { name: "Network", value: 41, color: "hsl(60, 1%, 63%)" },
];

const errorSpikes = [
  { time: "Mon", errors: 3, anomalies: 1 },
  { time: "Tue", errors: 8, anomalies: 2 },
  { time: "Wed", errors: 2, anomalies: 0 },
  { time: "Thu", errors: 5, anomalies: 3 },
  { time: "Fri", errors: 12, anomalies: 4 },
  { time: "Sat", errors: 1, anomalies: 0 },
  { time: "Sun", errors: 0, anomalies: 0 },
];

export default function Performance() {
  return (
    <DashboardLayout title="Performance Analytics">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Avg Latency", value: "23ms", icon: Clock, change: "-12%" },
          { label: "Peak FPS", value: "180", icon: Activity, change: "+8%" },
          { label: "CPU Utilization", value: "68%", icon: Cpu, change: "+3%" },
          { label: "Error Rate", value: "0.02%", icon: AlertCircle, change: "-15%" },
        ].map((stat, index) => (
          <Card
            key={index}
            variant="glass"
            className="opacity-0 animate-fade-up"
            style={{ animationDelay: `${index * 50}ms`, animationFillMode: "forwards" }}
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                  <p className="text-xs text-success mt-1">{stat.change} from last week</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Latency Timeline */}
        <Card variant="glass" className="opacity-0 animate-fade-up" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Latency Timeline (ms)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={latencyTimeline}>
                  <defs>
                    <linearGradient id="edgeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(356, 71%, 36%)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="hsl(356, 71%, 36%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="cloudGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(60, 1%, 63%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(60, 1%, 63%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 15%, 18%)" vertical={false} />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: "hsl(60, 1%, 63%)", fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(60, 1%, 63%)", fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0, 30%, 10%)",
                      border: "1px solid hsl(0, 20%, 20%)",
                      borderRadius: "12px",
                    }}
                  />
                  <Area type="monotone" dataKey="edge" stroke="hsl(356, 71%, 36%)" strokeWidth={2} fill="url(#edgeGradient)" name="Edge" />
                  <Area type="monotone" dataKey="cloud" stroke="hsl(60, 1%, 63%)" strokeWidth={2} fill="url(#cloudGradient)" name="Cloud" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">Edge Inference</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted-foreground" />
                <span className="text-sm text-muted-foreground">Cloud Inference</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FPS by Device */}
        <Card variant="glass" className="opacity-0 animate-fade-up" style={{ animationDelay: "250ms", animationFillMode: "forwards" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              FPS by Device
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fpsData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 15%, 18%)" horizontal={false} />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: "hsl(60, 1%, 63%)", fontSize: 11 }} />
                  <YAxis type="category" dataKey="device" axisLine={false} tickLine={false} tick={{ fill: "hsl(60, 1%, 63%)", fontSize: 11 }} width={70} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0, 30%, 10%)",
                      border: "1px solid hsl(0, 20%, 20%)",
                      borderRadius: "12px",
                    }}
                  />
                  <Bar dataKey="fps" fill="hsl(356, 71%, 36%)" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resource Utilization */}
        <Card variant="glass" className="opacity-0 animate-fade-up" style={{ animationDelay: "300ms", animationFillMode: "forwards" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-primary" />
              Resource Utilization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={utilizationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {utilizationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0, 30%, 10%)",
                      border: "1px solid hsl(0, 20%, 20%)",
                      borderRadius: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {utilizationData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted-foreground">{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Error & Anomaly Detection */}
        <Card variant="glass" className="lg:col-span-2 opacity-0 animate-fade-up" style={{ animationDelay: "350ms", animationFillMode: "forwards" }}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-primary" />
              Error & Anomaly Detection
            </CardTitle>
            <Button variant="ghost" size="sm">View Logs</Button>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={errorSpikes}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 15%, 18%)" vertical={false} />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: "hsl(60, 1%, 63%)", fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(60, 1%, 63%)", fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0, 30%, 10%)",
                      border: "1px solid hsl(0, 20%, 20%)",
                      borderRadius: "12px",
                    }}
                  />
                  <Bar dataKey="errors" fill="hsl(356, 71%, 36%)" radius={[4, 4, 0, 0]} name="Errors" />
                  <Bar dataKey="anomalies" fill="hsl(0, 39%, 66%)" radius={[4, 4, 0, 0]} name="Anomalies" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">Errors</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <span className="text-sm text-muted-foreground">Anomalies</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
