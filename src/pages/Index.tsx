import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Zap,
  ArrowRight,
  Cpu,
  Activity,
  Shield,
  Cloud,
  ChevronRight,
} from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "Edge ML Deployment",
    description: "Deploy optimized models to edge devices with one click",
  },
  {
    icon: Activity,
    title: "Real-time Analytics",
    description: "Monitor inference latency, throughput, and performance",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "End-to-end encryption and compliance monitoring",
  },
  {
    icon: Cloud,
    title: "Cloud-Edge Sync",
    description: "Seamless synchronization between cloud and edge",
  },
];

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Orbs */}
      <div className="orb orb-primary w-[800px] h-[800px] -top-96 -right-96 opacity-20" />
      <div className="orb orb-accent w-[600px] h-[600px] bottom-0 -left-64 opacity-15" style={{ animationDelay: "-8s" }} />
      <div className="orb orb-primary w-[400px] h-[400px] top-1/2 left-1/2 opacity-10" style={{ animationDelay: "-15s" }} />

      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none noise-overlay" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 lg:px-12">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/20 shadow-glow">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <span className="text-xl font-semibold text-foreground">
            Smart<span className="text-primary">teknologi</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/auth")}>
            Sign In
          </Button>
          <Button variant="glow" onClick={() => navigate("/auth")}>
            Get Started
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 px-6 lg:px-12 pt-20 pb-32">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 opacity-0 animate-fade-up" style={{ animationFillMode: "forwards" }}>
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI & Edge Computing Platform</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight opacity-0 animate-fade-up" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
            Deploy ML Models at the
            <span className="gradient-text-primary block mt-2">Edge of Intelligence</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 opacity-0 animate-fade-up" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
            Transform your AI infrastructure with real-time edge computing.
            Deploy, monitor, and optimize machine learning models across distributed devices.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up" style={{ animationDelay: "300ms", animationFillMode: "forwards" }}>
            <Button variant="glow" size="xl" onClick={() => navigate("/dashboard")}>
              Launch Dashboard
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="xl" onClick={() => navigate("/auth")}>
              View Demo
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto mt-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-card p-6 opacity-0 animate-fade-up hover:-translate-y-2 transition-transform duration-300"
                style={{ animationDelay: `${400 + index * 100}ms`, animationFillMode: "forwards" }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-4xl mx-auto mt-24">
          <div className="glass-card p-8 opacity-0 animate-fade-up" style={{ animationDelay: "800ms", animationFillMode: "forwards" }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "99.9%", label: "Uptime" },
                { value: "<25ms", label: "Avg Latency" },
                { value: "10K+", label: "Deployments" },
                { value: "500+", label: "Edge Devices" },
              ].map((stat, index) => (
                <div key={index}>
                  <p className="text-3xl md:text-4xl font-bold gradient-text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-8 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Smarteknologi. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Documentation
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
