import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Key,
  Plus,
  Copy,
  Trash2,
  Eye,
  EyeOff,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface APIKeyData {
  id: number;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
  status: "active" | "deprecated";
}

const generateRandomKey = (prefix: string) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = prefix;
  for (let i = 0; i < 24; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const initialKeys: APIKeyData[] = [
  { id: 1, name: "Production API Key", key: "sk_live_xxxxxxxxxxxxxxxxxxxxx", created: "Dec 1, 2024", lastUsed: "2 hours ago", status: "active" },
  { id: 2, name: "Development Key", key: "sk_dev_xxxxxxxxxxxxxxxxxxxxx", created: "Nov 15, 2024", lastUsed: "5 min ago", status: "active" },
  { id: 3, name: "Testing Key", key: "sk_test_xxxxxxxxxxxxxxxxxxxxx", created: "Oct 20, 2024", lastUsed: "3 days ago", status: "active" },
  { id: 4, name: "Legacy Key (Deprecated)", key: "sk_old_xxxxxxxxxxxxxxxxxxxxx", created: "Aug 5, 2024", lastUsed: "30 days ago", status: "deprecated" },
];

export default function APIKeys() {
  const [visibleKeys, setVisibleKeys] = useState<Set<number>>(new Set());
  const [apiKeys, setApiKeys] = useState<APIKeyData[]>(initialKeys);
  const [newKeyName, setNewKeyName] = useState("");
  const [nextId, setNextId] = useState(5);

  const toggleKeyVisibility = (id: number) => {
    const newVisible = new Set(visibleKeys);
    if (newVisible.has(id)) {
      newVisible.delete(id);
    } else {
      newVisible.add(id);
    }
    setVisibleKeys(newVisible);
  };

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success("Copied!", { description: "API key copied to clipboard." });
  };

  const generateKey = () => {
    if (!newKeyName.trim()) {
      toast.error("Please enter a key name");
      return;
    }

    const newKey: APIKeyData = {
      id: nextId,
      name: newKeyName,
      key: generateRandomKey("sk_new_"),
      created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      lastUsed: "Never",
      status: "active",
    };

    setApiKeys([newKey, ...apiKeys]);
    setNextId(nextId + 1);
    setNewKeyName("");
    setVisibleKeys(new Set([...visibleKeys, newKey.id]));
    
    toast.success("API Key Generated!", {
      description: "Your new API key has been created. Make sure to copy it now!",
    });
  };

  const refreshKey = (id: number) => {
    const keyData = apiKeys.find(k => k.id === id);
    if (!keyData) return;

    toast.loading("Regenerating key...", { id: `refresh-${id}` });
    
    setTimeout(() => {
      setApiKeys(prev => prev.map(k => 
        k.id === id ? { ...k, key: generateRandomKey("sk_new_"), created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) } : k
      ));
      setVisibleKeys(new Set([...visibleKeys, id]));
      toast.success("Key regenerated!", { id: `refresh-${id}`, description: "Your API key has been updated." });
    }, 1000);
  };

  const deleteKey = (id: number) => {
    const keyData = apiKeys.find(k => k.id === id);
    if (!keyData) return;

    toast.warning(`Delete "${keyData.name}"?`, {
      description: "This action cannot be undone.",
      action: {
        label: "Delete",
        onClick: () => {
          setApiKeys(prev => prev.filter(k => k.id !== id));
          toast.success("Key deleted", { description: `${keyData.name} has been removed.` });
        },
      },
    });
  };

  return (
    <DashboardLayout title="API Keys">
      <div className="max-w-4xl space-y-4 md:space-y-6">
        {/* Info Banner */}
        <Card variant="glass" className="opacity-0 animate-fade-up border-warning/30" style={{ animationFillMode: "forwards" }}>
          <CardContent className="p-4 flex items-start gap-3 md:gap-4">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-warning/20 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-warning" />
            </div>
            <div>
              <p className="font-medium text-foreground text-sm md:text-base">Keep your API keys secure</p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                Never share your API keys in public repositories or client-side code. 
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Create New Key */}
        <Card variant="glass" className="opacity-0 animate-fade-up" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5 text-primary" />
              Create New API Key
            </CardTitle>
            <CardDescription>Generate a new key for your applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4">
              <Input 
                placeholder="Key name (e.g., Production API)" 
                className="flex-1"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && generateKey()}
              />
              <Button variant="glow" onClick={generateKey} className="w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Generate Key
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* API Keys List */}
        <Card variant="glass" className="opacity-0 animate-fade-up" style={{ animationDelay: "150ms", animationFillMode: "forwards" }}>
          <CardHeader>
            <CardTitle>Your API Keys</CardTitle>
            <CardDescription>Manage your existing API keys</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 md:space-y-4">
            {apiKeys.map((apiKey) => (
              <div
                key={apiKey.id}
                className={cn(
                  "p-3 md:p-4 rounded-xl border transition-all duration-300",
                  apiKey.status === "deprecated"
                    ? "bg-destructive/5 border-destructive/20"
                    : "bg-glass/30 border-glass-border/20 hover:border-primary/30"
                )}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-medium text-foreground text-sm md:text-base">{apiKey.name}</h3>
                      {apiKey.status === "deprecated" && (
                        <span className="badge-error text-xs">Deprecated</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyKey(apiKey.key)}>
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => refreshKey(apiKey.id)}>
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => deleteKey(apiKey.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <code className="text-xs md:text-sm text-muted-foreground font-mono bg-background/50 px-2 py-1 rounded flex-1 overflow-hidden">
                      {visibleKeys.has(apiKey.id)
                        ? apiKey.key
                        : apiKey.key.slice(0, 7) + "•".repeat(16)}
                    </code>
                    <button
                      onClick={() => toggleKeyVisibility(apiKey.id)}
                      className="text-muted-foreground hover:text-foreground transition-colors p-1"
                    >
                      {visibleKeys.has(apiKey.id) ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-3 md:gap-4 text-xs text-muted-foreground flex-wrap">
                    <span>Created: {apiKey.created}</span>
                    <span>Last used: {apiKey.lastUsed}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Usage Stats */}
        <Card variant="glass" className="opacity-0 animate-fade-up" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
          <CardHeader>
            <CardTitle>API Usage</CardTitle>
            <CardDescription>Current billing period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
              {[
                { label: "Total Requests", value: "1.2M", limit: "5M" },
                { label: "Compute Hours", value: "847", limit: "1,000" },
                { label: "Data Transfer", value: "45 GB", limit: "100 GB" },
              ].map((stat, index) => (
                <div key={index} className="p-3 md:p-4 rounded-xl bg-glass/30 border border-glass-border/20">
                  <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-xl md:text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">of {stat.limit}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
