import { useEffect, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  User,
  Bell,
  Shield,
  Palette,
  Database,
  Key,
  Save,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Settings() {
  const auth = getAuth();
  const user = auth.currentUser;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;

    try {
      setLoading(true);

      if (name !== user.displayName) {
        await updateProfile(user, {
          displayName: name,
        });
      }

      toast({
        title: "Settings saved",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Something went wrong while saving your settings.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Settings">
      <div className="max-w-4xl space-y-6">

        {/* Profile Settings */}
        <Card variant="glass" className="opacity-0 animate-fade-up" style={{ animationFillMode: "forwards" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Profile Settings
            </CardTitle>
            <CardDescription>Manage your account information</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" defaultValue="Smarteknologi" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" defaultValue="ML Engineer" />
              </div>

            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card variant="glass" className="opacity-0 animate-fade-up" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Notifications
            </CardTitle>
            <CardDescription>Configure how you receive notifications</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {[
              { id: "deploy", label: "Deployment Alerts", desc: "Deployment status updates", checked: true },
              { id: "performance", label: "Performance Alerts", desc: "Performance degradation alerts", checked: true },
              { id: "device", label: "Device Status", desc: "Connectivity changes", checked: false },
              { id: "security", label: "Security Alerts", desc: "Security notifications", checked: true },
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div>
                  <Label className="text-base">{item.label}</Label>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                <Switch defaultChecked={item.checked} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card variant="glass" className="opacity-0 animate-fade-up" style={{ animationDelay: "150ms", animationFillMode: "forwards" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Security
            </CardTitle>
            <CardDescription>Manage your security preferences</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Extra account protection</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="pt-4 border-t border-border">
              <Button variant="outline">
                <Key className="w-4 h-4 mr-2" />
                Change Password
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card variant="glass" className="opacity-0 animate-fade-up" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-primary" />
              Appearance
            </CardTitle>
            <CardDescription>Customize UI preferences</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <Label className="text-base">Animations</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-base">Compact Mode</Label>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Data */}
        <Card variant="glass" className="opacity-0 animate-fade-up" style={{ animationDelay: "250ms", animationFillMode: "forwards" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" />
              Data & Storage
            </CardTitle>
            <CardDescription>Manage local data</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <Label className="text-base">Auto-sync</Label>
              <Switch defaultChecked />
            </div>
            <div className="pt-4 border-t border-border flex gap-3">
              <Button variant="outline">Export Data</Button>
              <Button variant="outline" className="text-destructive">
                Clear Cache
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Save */}
        <div className="flex justify-end opacity-0 animate-fade-up" style={{ animationDelay: "300ms", animationFillMode: "forwards" }}>
          <Button variant="glow" size="lg" onClick={handleSave} disabled={loading}>
            <Save className="w-4 h-4 mr-2" />
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>

      </div>
    </DashboardLayout>
  );
}
