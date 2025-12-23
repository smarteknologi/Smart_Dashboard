import { useState, useRef } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Upload,
  Cloud,
  Cpu,
  Smartphone,
  Server,
  Check,
  FileCode,
  Zap,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const targetOptions = [
  { id: "edge", label: "Edge Device", icon: Cpu, description: "ARM/RISC-V processors" },
  { id: "mobile", label: "Mobile", icon: Smartphone, description: "iOS & Android" },
  { id: "iot", label: "IoT", icon: Zap, description: "Embedded systems" },
  { id: "server", label: "Server", icon: Server, description: "x86/GPU clusters" },
];

const initialModels = [
  { name: "YOLOv8-nano.onnx", size: "6.2 MB", format: "ONNX", uploaded: "Today" },
  { name: "resnet50-quantized.tflite", size: "12.8 MB", format: "TFLite", uploaded: "Yesterday" },
  { name: "bert-tiny.pt", size: "45.3 MB", format: "PyTorch", uploaded: "3 days ago" },
];

export default function Deployment() {
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployProgress, setDeployProgress] = useState(0);
  const [uploadedModel, setUploadedModel] = useState<string | null>(null);
  const [recentModels, setRecentModels] = useState(initialModels);
  const [importUrl, setImportUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    const validExtensions = ['.onnx', '.tflite', '.pt', '.pb', '.mlmodel'];
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!validExtensions.includes(ext)) {
      toast.error("Invalid file format", {
        description: "Please upload .onnx, .tflite, .pt, .pb, or .mlmodel files"
      });
      return;
    }

    setUploadedModel(file.name);
    const newModel = {
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      format: ext.replace('.', '').toUpperCase(),
      uploaded: "Just now"
    };
    setRecentModels([newModel, ...recentModels.slice(0, 2)]);
    
    toast.success("Model uploaded!", {
      description: `${file.name} has been uploaded successfully.`
    });
  };

  const handleBrowseFiles = () => {
    fileInputRef.current?.click();
  };

  const handleImportFromUrl = () => {
    if (!importUrl.trim()) {
      toast.error("Please enter a URL");
      return;
    }
    
    toast.loading("Importing model...", { id: "import" });
    setTimeout(() => {
      const modelName = importUrl.split('/').pop() || "imported-model.onnx";
      setUploadedModel(modelName);
      setRecentModels([
        { name: modelName, size: "Auto-detected", format: "ONNX", uploaded: "Just now" },
        ...recentModels.slice(0, 2)
      ]);
      toast.success("Model imported!", { id: "import", description: `${modelName} imported from URL` });
      setImportUrl("");
    }, 2000);
  };

  const handleDeploy = () => {
    if (!selectedTarget) {
      toast.error("Select a target", {
        description: "Please select a deployment target first."
      });
      return;
    }

    if (!uploadedModel) {
      toast.error("No model selected", {
        description: "Please upload or select a model first."
      });
      return;
    }

    setIsDeploying(true);
    setDeployProgress(0);

    const interval = setInterval(() => {
      setDeployProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDeploying(false);
          toast.success("Deployment successful!", {
            description: `${uploadedModel} deployed to ${targetOptions.find(t => t.id === selectedTarget)?.label}`
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleModelSelect = (model: typeof recentModels[0]) => {
    setUploadedModel(model.name);
    toast.info(`Selected: ${model.name}`, {
      description: `${model.format} format, ${model.size}`
    });
  };

  return (
    <DashboardLayout title="Edge Model Deployment">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".onnx,.tflite,.pt,.pb,.mlmodel"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileSelect(file);
        }}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Upload Section */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          {/* Upload Card */}
          <Card variant="glass" className="opacity-0 animate-fade-up" style={{ animationFillMode: "forwards" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                Upload Model
              </CardTitle>
              <CardDescription>
                Drag and drop your model file or click to browse
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={cn(
                  "relative border-2 border-dashed rounded-2xl p-8 md:p-12 text-center transition-all duration-300 cursor-pointer",
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-glass-border hover:border-primary/50 hover:bg-glass/30",
                  uploadedModel && "border-success bg-success/5"
                )}
                onClick={handleBrowseFiles}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  const file = e.dataTransfer.files[0];
                  if (file) handleFileSelect(file);
                }}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className={cn(
                    "w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center",
                    uploadedModel ? "bg-success/20" : "bg-primary/10"
                  )}>
                    {uploadedModel ? (
                      <Check className="w-7 h-7 md:w-8 md:h-8 text-success" />
                    ) : (
                      <Cloud className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                    )}
                  </div>
                  <div>
                    <p className="text-base md:text-lg font-medium text-foreground mb-1">
                      {uploadedModel || "Drop your model here"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {uploadedModel ? "Click to change model" : "Supports .onnx, .tflite, .pt, .pb, .mlmodel"}
                    </p>
                  </div>
                  <Button variant="outline" onClick={(e) => { e.stopPropagation(); handleBrowseFiles(); }}>
                    Browse Files
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Target Selection */}
          <Card variant="glass" className="opacity-0 animate-fade-up" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-primary" />
                Select Target
              </CardTitle>
              <CardDescription>
                Choose the deployment target for your model
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {targetOptions.map((target) => (
                  <button
                    key={target.id}
                    onClick={() => setSelectedTarget(target.id)}
                    className={cn(
                      "relative p-3 md:p-4 rounded-xl border transition-all duration-300 text-left",
                      selectedTarget === target.id
                        ? "border-primary bg-primary/10 shadow-glow"
                        : "border-glass-border bg-glass/20 hover:border-primary/50"
                    )}
                  >
                    {selectedTarget === target.id && (
                      <div className="absolute top-2 right-2">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                    )}
                    <target.icon
                      className={cn(
                        "w-6 h-6 md:w-8 md:h-8 mb-2 md:mb-3",
                        selectedTarget === target.id ? "text-primary" : "text-muted-foreground"
                      )}
                    />
                    <p className="font-medium text-foreground text-sm md:text-base">{target.label}</p>
                    <p className="text-xs text-muted-foreground mt-1 hidden md:block">{target.description}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Deploy Button */}
          <Card variant="glass" className="opacity-0 animate-fade-up" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
            <CardContent className="p-4 md:p-6">
              {isDeploying ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Deploying {uploadedModel}...</span>
                    <span className="text-sm text-primary">{deployProgress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                      style={{ width: `${deployProgress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-foreground">Ready to Deploy</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedTarget && uploadedModel
                        ? `${uploadedModel} → ${targetOptions.find((t) => t.id === selectedTarget)?.label}`
                        : !uploadedModel 
                        ? "Upload a model to continue"
                        : "Select a target to continue"}
                    </p>
                  </div>
                  <Button variant="glow" size="lg" onClick={handleDeploy} className="w-full sm:w-auto">
                    Deploy to Device
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Models Sidebar */}
        <div className="space-y-4 md:space-y-6">
          <Card variant="glass" className="opacity-0 animate-fade-up" style={{ animationDelay: "150ms", animationFillMode: "forwards" }}>
            <CardHeader>
              <CardTitle className="text-lg">Recent Models</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentModels.map((model, index) => (
                <button
                  key={index}
                  onClick={() => handleModelSelect(model)}
                  className={cn(
                    "w-full p-3 md:p-4 rounded-xl bg-glass/30 border border-glass-border/20 hover:border-primary/30 transition-all duration-300 text-left",
                    uploadedModel === model.name && "border-primary bg-primary/5"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <FileCode className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate text-sm">{model.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="badge-glass text-xs">{model.format}</span>
                        <span className="text-xs text-muted-foreground">{model.size}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{model.uploaded}</p>
                    </div>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Model URL */}
          <Card variant="glass" className="opacity-0 animate-fade-up" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
            <CardHeader>
              <CardTitle className="text-lg">Import from URL</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input 
                placeholder="https://huggingface.co/model..." 
                value={importUrl}
                onChange={(e) => setImportUrl(e.target.value)}
              />
              <Button variant="outline" className="w-full" onClick={handleImportFromUrl}>
                Import Model
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
