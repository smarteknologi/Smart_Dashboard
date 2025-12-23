import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  Layers,
  RefreshCw,
  Cpu,
  Zap,
  ArrowRight,
  Check,
  Clock,
  FileCode,
  Settings2,
  Play,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ConversionTask {
  id: number;
  name: string;
  status: "completed" | "running" | "queued" | "cancelled";
  progress: number;
  time: string;
}

const initialTasks: ConversionTask[] = [
  { id: 1, name: "PyTorch → Core ML", status: "completed", progress: 100, time: "2m 34s" },
  { id: 2, name: "TensorFlow → TFLite", status: "running", progress: 67, time: "~1m remaining" },
  { id: 3, name: "ONNX → TensorRT", status: "queued", progress: 0, time: "Pending" },
];

const optimizationMetrics = [
  { label: "Quantization", value: "INT8", improvement: "-72% size" },
  { label: "Pruning", value: "30%", improvement: "+15% speed" },
  { label: "GPU Acceleration", value: "Enabled", improvement: "2.4x faster" },
  { label: "Batch Size", value: "32", improvement: "Optimized" },
];

const benchmarks = [
  { model: "YOLOv8-nano", cpu: 45, gpu: 12, tpu: 8 },
  { model: "ResNet-50", cpu: 89, gpu: 23, tpu: 15 },
  { model: "BERT-tiny", cpu: 120, gpu: 35, tpu: 22 },
  { model: "MobileNet-v3", cpu: 28, gpu: 9, tpu: 6 },
];

export default function MLOps() {
  const [selectedFormat, setSelectedFormat] = useState<string>("coreml");
  const [conversionTasks, setConversionTasks] = useState<ConversionTask[]>(initialTasks);
  const [nextTaskId, setNextTaskId] = useState(4);

  const formats = [
    { id: "coreml", name: "Core ML", ext: ".mlmodel" },
    { id: "onnx", name: "ONNX", ext: ".onnx" },
    { id: "tflite", name: "TensorFlow Lite", ext: ".tflite" },
    { id: "tensorrt", name: "TensorRT", ext: ".engine" },
  ];

  const handleStartConversion = () => {
    const formatName = formats.find(f => f.id === selectedFormat)?.name || "Unknown";
    const newTask: ConversionTask = {
      id: nextTaskId,
      name: `Model → ${formatName}`,
      status: "running",
      progress: 0,
      time: "Starting...",
    };
    
    setConversionTasks([newTask, ...conversionTasks]);
    setNextTaskId(nextTaskId + 1);
    
    toast.success("Conversion started!", {
      description: `Converting model to ${formatName} format`
    });

    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setConversionTasks(prev => 
          prev.map(t => t.id === newTask.id 
            ? { ...t, status: "completed" as const, progress: 100, time: "Just completed" }
            : t
          )
        );
        toast.success("Conversion complete!", {
          description: `${newTask.name} finished successfully`
        });
      } else {
        setConversionTasks(prev => 
          prev.map(t => t.id === newTask.id 
            ? { ...t, progress: Math.min(progress, 99), time: `~${Math.ceil((100 - progress) / 20)}m remaining` }
            : t
          )
        );
      }
    }, 500);
  };

  const handleCancelTask = (taskId: number) => {
    setConversionTasks(prev => 
      prev.map(t => t.id === taskId 
        ? { ...t, status: "cancelled" as const, time: "Cancelled" }
        : t
      )
    );
    toast.info("Task cancelled");
  };

  const handleQuickAction = (action: string) => {
    toast.loading(`Running ${action}...`, { id: action });
    setTimeout(() => {
      toast.success(`${action} completed!`, { id: action, description: "Operation finished successfully" });
    }, 2000);
  };

  return (
    <DashboardLayout title="Core ML Operations">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Main Operations */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          {/* Model Conversion */}
          <Card variant="glass" className="opacity-0 animate-fade-up" style={{ animationFillMode: "forwards" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-primary" />
                Model Conversion
              </CardTitle>
              <CardDescription>Convert models between different formats</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Format Selection */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-6">
                {formats.map((format) => (
                  <button
                    key={format.id}
                    onClick={() => setSelectedFormat(format.id)}
                    className={cn(
                      "p-3 md:p-4 rounded-xl border text-left transition-all duration-300",
                      selectedFormat === format.id
                        ? "border-primary bg-primary/10 shadow-glow"
                        : "border-glass-border bg-glass/20 hover:border-primary/50"
                    )}
                  >
                    <p className="font-medium text-foreground text-sm md:text-base">{format.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{format.ext}</p>
                  </button>
                ))}
              </div>

              {/* Conversion Tasks */}
              <div className="space-y-3 md:space-y-4 max-h-64 overflow-y-auto">
                {conversionTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-3 md:p-4 rounded-xl bg-glass/30 border border-glass-border/20"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center",
                          task.status === "completed" ? "bg-success/20" :
                          task.status === "running" ? "bg-primary/20" :
                          task.status === "cancelled" ? "bg-destructive/20" : "bg-muted"
                        )}>
                          {task.status === "completed" ? (
                            <Check className="w-4 h-4 text-success" />
                          ) : task.status === "running" ? (
                            <RefreshCw className="w-4 h-4 text-primary animate-spin" />
                          ) : task.status === "cancelled" ? (
                            <X className="w-4 h-4 text-destructive" />
                          ) : (
                            <Clock className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">{task.name}</p>
                          <p className="text-xs text-muted-foreground">{task.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {task.status === "running" && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7"
                            onClick={() => handleCancelTask(task.id)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        )}
                        <span className={cn(
                          "text-xs font-medium px-2 py-1 rounded-full",
                          task.status === "completed" ? "badge-success" :
                          task.status === "running" ? "badge-warning" :
                          task.status === "cancelled" ? "badge-error" : "badge-glass"
                        )}>
                          {task.status}
                        </span>
                      </div>
                    </div>
                    <Progress value={task.progress} className="h-1.5" />
                  </div>
                ))}
              </div>

              <Button variant="glow" className="mt-4" onClick={handleStartConversion}>
                <Play className="w-4 h-4 mr-2" />
                Start New Conversion
              </Button>
            </CardContent>
          </Card>

          {/* Benchmark Results */}
          <Card variant="glass" className="opacity-0 animate-fade-up" style={{ animationDelay: "150ms", animationFillMode: "forwards" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-primary" />
                Inference Benchmarks
              </CardTitle>
              <CardDescription>Latency comparison across hardware (ms)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-muted-foreground">Model</th>
                      <th className="text-center py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-muted-foreground">CPU</th>
                      <th className="text-center py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-muted-foreground">GPU</th>
                      <th className="text-center py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-muted-foreground">TPU</th>
                    </tr>
                  </thead>
                  <tbody>
                    {benchmarks.map((row, index) => (
                      <tr key={index} className="border-b border-border/50">
                        <td className="py-3 px-2 md:px-4">
                          <div className="flex items-center gap-2">
                            <FileCode className="w-4 h-4 text-primary hidden sm:block" />
                            <span className="font-medium text-foreground text-xs md:text-sm">{row.model}</span>
                          </div>
                        </td>
                        <td className="text-center py-3 px-2 md:px-4 text-muted-foreground text-xs md:text-sm">{row.cpu}ms</td>
                        <td className="text-center py-3 px-2 md:px-4 text-primary font-medium text-xs md:text-sm">{row.gpu}ms</td>
                        <td className="text-center py-3 px-2 md:px-4 text-success font-medium text-xs md:text-sm">{row.tpu}ms</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 md:space-y-6">
          {/* Optimization Metrics */}
          <Card variant="glass" className="opacity-0 animate-fade-up" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Optimization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4">
              {optimizationMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-glass/30 border border-glass-border/20">
                  <div>
                    <p className="text-xs md:text-sm text-muted-foreground">{metric.label}</p>
                    <p className="font-medium text-foreground text-sm md:text-base">{metric.value}</p>
                  </div>
                  <span className="text-xs text-success font-medium">{metric.improvement}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card variant="glass" className="opacity-0 animate-fade-up" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings2 className="w-5 h-5 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 md:space-y-3">
              <Button variant="outline" className="w-full justify-between text-sm" onClick={() => handleQuickAction("Quantization")}>
                Run Quantization
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between text-sm" onClick={() => handleQuickAction("Pruning")}>
                Apply Pruning
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between text-sm" onClick={() => handleQuickAction("Model Profiling")}>
                Profile Model
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between text-sm" onClick={() => handleQuickAction("Report Export")}>
                Export Report
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
