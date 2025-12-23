import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Lock,
  Key,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  RefreshCw,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";

const securityStatus = [
  { label: "Encryption Status", status: "enabled", description: "AES-256 encryption active" },
  { label: "TLS Certificate", status: "valid", description: "Valid until Mar 2025" },
  { label: "API Authentication", status: "enabled", description: "OAuth 2.0 + JWT" },
  { label: "Rate Limiting", status: "enabled", description: "1000 req/min per key" },
];

const authLogs = [
  { event: "API Key Generated", user: "alex@smarteknologi.com", time: "10 min ago", status: "success" },
  { event: "Login Attempt", user: "admin@smarteknologi.com", time: "1 hour ago", status: "success" },
  { event: "Failed Login", user: "unknown@attacker.com", time: "3 hours ago", status: "blocked" },
  { event: "Password Changed", user: "alex@smarteknologi.com", time: "2 days ago", status: "success" },
  { event: "2FA Enabled", user: "team@smarteknologi.com", time: "5 days ago", status: "success" },
];

const complianceChecks = [
  { name: "GDPR Compliance", status: "passed", lastCheck: "2 hours ago" },
  { name: "SOC 2 Type II", status: "passed", lastCheck: "1 day ago" },
  { name: "HIPAA Requirements", status: "review", lastCheck: "3 days ago" },
  { name: "ISO 27001", status: "passed", lastCheck: "1 week ago" },
];

const deviceCertificates = [
  { device: "Edge Node Alpha", status: "valid", expires: "2025-06-15" },
  { device: "Production Server #1", status: "valid", expires: "2025-03-22" },
  { device: "Mobile Hub", status: "expiring", expires: "2025-01-10" },
  { device: "IoT Gateway", status: "valid", expires: "2025-08-30" },
];

export default function Security() {
  return (
    <DashboardLayout title="Security & Compliance">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Security Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {securityStatus.map((item, index) => (
              <Card
                key={index}
                variant="glass"
                className="opacity-0 animate-fade-up"
                style={{ animationDelay: `${index * 50}ms`, animationFillMode: "forwards" }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-xs font-medium text-success uppercase">{item.status}</span>
                  </div>
                  <p className="font-medium text-foreground text-sm">{item.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Authentication Logs */}
          <Card variant="glass" className="opacity-0 animate-fade-up" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5 text-primary" />
                  Authentication Logs
                </CardTitle>
                <CardDescription>Recent authentication events</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {authLogs.map((log, index) => (
                  <div
                    key={index}
                    className={cn(
                      "p-4 rounded-xl border transition-all",
                      log.status === "blocked"
                        ? "bg-destructive/5 border-destructive/20"
                        : "bg-glass/30 border-glass-border/20"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {log.status === "success" ? (
                          <CheckCircle className="w-5 h-5 text-success" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-destructive" />
                        )}
                        <div>
                          <p className="font-medium text-foreground">{log.event}</p>
                          <p className="text-sm text-muted-foreground">{log.user}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={cn(
                          "text-xs font-medium px-2 py-1 rounded-full",
                          log.status === "success" ? "badge-success" : "badge-error"
                        )}>
                          {log.status}
                        </span>
                        <p className="text-xs text-muted-foreground mt-1">{log.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Device Certificates */}
          <Card variant="glass" className="opacity-0 animate-fade-up" style={{ animationDelay: "250ms", animationFillMode: "forwards" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                Device Certificates
              </CardTitle>
              <CardDescription>TLS certificate status for connected devices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Device</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Expires</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deviceCertificates.map((cert, index) => (
                      <tr key={index} className="border-b border-border/50">
                        <td className="py-3 px-4 font-medium text-foreground">{cert.device}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={cn(
                            "text-xs font-medium px-2 py-1 rounded-full",
                            cert.status === "valid" ? "badge-success" :
                            cert.status === "expiring" ? "badge-warning" : "badge-error"
                          )}>
                            {cert.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center text-muted-foreground">{cert.expires}</td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">
                            <RefreshCw className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Compliance Status */}
          <Card variant="glass" className="opacity-0 animate-fade-up" style={{ animationDelay: "150ms", animationFillMode: "forwards" }}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {complianceChecks.map((check, index) => (
                <div
                  key={index}
                  className={cn(
                    "p-3 rounded-xl border",
                    check.status === "review"
                      ? "bg-warning/5 border-warning/20"
                      : "bg-glass/30 border-glass-border/20"
                  )}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-foreground text-sm">{check.name}</span>
                    {check.status === "passed" ? (
                      <CheckCircle className="w-4 h-4 text-success" />
                    ) : (
                      <Clock className="w-4 h-4 text-warning" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">Last check: {check.lastCheck}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card variant="glass" className="opacity-0 animate-fade-up" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
            <CardHeader>
              <CardTitle className="text-lg">Security Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Shield className="w-4 h-4 mr-2" />
                Run Security Scan
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <RefreshCw className="w-4 h-4 mr-2" />
                Rotate All Keys
              </Button>
            </CardContent>
          </Card>

          {/* Alert Card */}
          <Card variant="glass" className="border-warning/30 opacity-0 animate-fade-up" style={{ animationDelay: "250ms", animationFillMode: "forwards" }}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Action Required</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    1 device certificate expiring within 30 days. Renew to maintain secure connections.
                  </p>
                  <Button variant="ghost" size="sm" className="mt-2 -ml-2 text-warning">
                    Renew Certificate
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
