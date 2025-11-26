import { motion } from "framer-motion";
import { Plug, CheckCircle2, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export default function Integrations() {
  const { toast } = useToast();
  const [integrationStates, setIntegrationStates] = useState<Record<string, boolean>>({
    slack: true,
    jira: true,
    github: false,
    microsoft: false,
    salesforce: true,
    aws: false,
  });

  const toggleIntegration = (key: string, name: string) => {
    setIntegrationStates(prev => ({ ...prev, [key]: !prev[key] }));
    toast({
      title: integrationStates[key] ? "Integration Disabled" : "Integration Enabled",
      description: `${name} integration ${integrationStates[key] ? 'disconnected' : 'connected'} successfully`,
    });
  };

  const integrations = [
    {
      key: "slack",
      name: "Slack",
      description: "Real-time compliance alerts and notifications",
      category: "Communication",
      logo: "💬",
    },
    {
      key: "jira",
      name: "Jira",
      description: "Automatic ticket creation for compliance issues",
      category: "Project Management",
      logo: "📋",
    },
    {
      key: "github",
      name: "GitHub",
      description: "Code compliance scanning and repository audits",
      category: "Development",
      logo: "🔧",
    },
    {
      key: "microsoft",
      name: "Microsoft Teams",
      description: "Collaborate on compliance workflows",
      category: "Communication",
      logo: "👥",
    },
    {
      key: "salesforce",
      name: "Salesforce",
      description: "CRM data compliance monitoring",
      category: "CRM",
      logo: "☁️",
    },
    {
      key: "aws",
      name: "AWS",
      description: "Cloud infrastructure compliance checks",
      category: "Cloud",
      logo: "☁️",
    },
  ];

  const apiInfo = [
    { label: "REST API", value: "Available", status: "active" },
    { label: "Webhooks", value: "Configured", status: "active" },
    { label: "Rate Limit", value: "1000/hour", status: "normal" },
    { label: "API Version", value: "v2.1", status: "current" },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4 sm:space-y-6 p-2 sm:p-4 lg:p-6"
    >
      <motion.div variants={item}>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Integrations</h2>
        <p className="text-sm sm:text-base text-muted-foreground">Connect your existing tools and platforms</p>
      </motion.div>

      {/* API Overview */}
      <motion.div variants={item}>
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">API & Integration Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {apiInfo.map((info, index) => (
                <div key={index} className="glass p-3 sm:p-4 rounded-xl text-center">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">{info.label}</p>
                  <p className="text-base sm:text-lg font-semibold">{info.value}</p>
                  <Badge 
                    variant={info.status === "active" ? "default" : "secondary"}
                    className="mt-2 text-xs"
                  >
                    {info.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Available Integrations */}
      <motion.div variants={item}>
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Available Integrations</CardTitle>
            <CardDescription className="text-sm">Seamless connection with your tech stack</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {integrations.map((integration, index) => (
                <div key={index} className="glass p-3 sm:p-4 rounded-xl">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="text-2xl sm:text-3xl">{integration.logo}</div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-sm sm:text-base truncate">{integration.name}</h4>
                        <Badge variant="outline" className="text-xs mt-1">
                          {integration.category}
                        </Badge>
                      </div>
                    </div>
                    <Switch
                      checked={integrationStates[integration.key]}
                      onCheckedChange={() => toggleIntegration(integration.key, integration.name)}
                    />
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                    {integration.description}
                  </p>
                  {integrationStates[integration.key] && (
                    <div className="flex items-center gap-2 text-xs text-accent">
                      <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Connected</span>
                    </div>
                  )}
                  {!integrationStates[integration.key] && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full text-xs"
                      onClick={() => toggleIntegration(integration.key, integration.name)}
                    >
                      <Plug className="w-3 h-3 mr-2" />
                      Connect
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Webhook Configuration */}
      <motion.div variants={item}>
        <Card className="glass-card border-0">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-lg sm:text-xl">Webhook Configuration</CardTitle>
                <CardDescription className="text-sm">Configure event-driven integrations</CardDescription>
              </div>
              <Button className="bg-accent hover:bg-accent/90 text-white w-full sm:w-auto">
                <Settings className="w-4 h-4 mr-2" />
                Configure Webhooks
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 sm:space-y-3">
              {[
                { event: "compliance.score.changed", endpoint: "https://api.example.com/webhooks/compliance" },
                { event: "audit.completed", endpoint: "https://api.example.com/webhooks/audit" },
                { event: "issue.detected", endpoint: "https://api.example.com/webhooks/issues" },
              ].map((webhook, index) => (
                <div key={index} className="glass p-3 sm:p-4 rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-medium">{webhook.event}</p>
                      <p className="text-xs text-muted-foreground truncate">{webhook.endpoint}</p>
                    </div>
                    <Badge className="bg-accent/10 text-accent text-xs w-fit">Active</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
