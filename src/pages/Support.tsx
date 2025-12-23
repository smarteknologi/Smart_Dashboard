import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  HelpCircle,
  Book,
  MessageSquare,
  Video,
  FileText,
  ExternalLink,
  Search,
  ChevronRight,
} from "lucide-react";

const resources = [
  { icon: Book, title: "Documentation", description: "Comprehensive guides and API references", link: "#" },
  { icon: Video, title: "Video Tutorials", description: "Step-by-step video walkthroughs", link: "#" },
  { icon: FileText, title: "Knowledge Base", description: "FAQs and troubleshooting guides", link: "#" },
  { icon: MessageSquare, title: "Community Forum", description: "Connect with other developers", link: "#" },
];

const popularArticles = [
  { title: "Getting Started with Edge Deployment", views: "12.4k" },
  { title: "Optimizing Model Performance", views: "8.7k" },
  { title: "API Authentication Best Practices", views: "6.2k" },
  { title: "Troubleshooting Connectivity Issues", views: "5.1k" },
  { title: "Understanding Core ML Conversions", views: "4.8k" },
];

export default function Support() {
  return (
    <DashboardLayout title="Support & Documentation">
      <div className="max-w-5xl space-y-6">
        {/* Search */}
        <Card variant="glass" className="opacity-0 animate-fade-up" style={{ animationFillMode: "forwards" }}>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">How can we help?</h2>
            <p className="text-muted-foreground mb-6">Search our documentation and knowledge base</p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search for tutorials, guides, and more..."
                className="pl-12 h-12 text-base"
              />
            </div>
          </CardContent>
        </Card>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {resources.map((resource, index) => (
            <Card
              key={index}
              variant="glass"
              className="opacity-0 animate-fade-up hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
              style={{ animationDelay: `${100 + index * 50}ms`, animationFillMode: "forwards" }}
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <resource.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{resource.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                <Button variant="ghost" size="sm" className="p-0 h-auto text-primary">
                  Learn more
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Popular Articles */}
          <Card variant="glass" className="opacity-0 animate-fade-up" style={{ animationDelay: "300ms", animationFillMode: "forwards" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Popular Articles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {popularArticles.map((article, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-glass/30 transition-colors group"
                >
                  <span className="text-foreground group-hover:text-primary transition-colors">
                    {article.title}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{article.views} views</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </a>
              ))}
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card variant="glass" className="opacity-0 animate-fade-up" style={{ animationDelay: "350ms", animationFillMode: "forwards" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                Contact Support
              </CardTitle>
              <CardDescription>Can't find what you're looking for?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl bg-glass/30 border border-glass-border/20">
                <h4 className="font-medium text-foreground mb-1">Live Chat</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Chat with our support team in real-time. Average response time: 2 minutes.
                </p>
                <Button variant="glow" size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Start Chat
                </Button>
              </div>

              <div className="p-4 rounded-xl bg-glass/30 border border-glass-border/20">
                <h4 className="font-medium text-foreground mb-1">Email Support</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Send us a detailed message and we'll respond within 24 hours.
                </p>
                <Button variant="outline" size="sm">
                  Send Email
                </Button>
              </div>

              <div className="p-4 rounded-xl bg-glass/30 border border-glass-border/20">
                <h4 className="font-medium text-foreground mb-1">Schedule a Call</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Book a 30-minute call with our technical team.
                </p>
                <Button variant="outline" size="sm">
                  Book Call
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
