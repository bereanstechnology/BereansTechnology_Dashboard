import { motion } from "framer-motion";
import { Shield, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

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

export default function RegulatoryAlignment() {
  const regulations = [
    {
      name: "GDPR",
      fullName: "General Data Protection Regulation",
      score: 95,
      status: "compliant",
      checks: 24,
      passed: 23,
      issues: 1,
    },
    {
      name: "HIPAA",
      fullName: "Health Insurance Portability and Accountability Act",
      score: 93,
      status: "compliant",
      checks: 18,
      passed: 17,
      issues: 1,
    },
    {
      name: "ISO 27001",
      fullName: "Information Security Management",
      score: 88,
      status: "partial",
      checks: 32,
      passed: 28,
      issues: 4,
    },
    {
      name: "PCI-DSS",
      fullName: "Payment Card Industry Data Security Standard",
      score: 85,
      status: "review",
      checks: 28,
      passed: 24,
      issues: 4,
    },
  ];

  const requirementDetails = [
    { category: "Data Protection", compliant: 18, partial: 2, failed: 0 },
    { category: "Access Control", compliant: 15, partial: 1, failed: 1 },
    { category: "Encryption", compliant: 12, partial: 0, failed: 0 },
    { category: "Audit Logging", compliant: 10, partial: 2, failed: 0 },
    { category: "Incident Response", compliant: 8, partial: 1, failed: 1 },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4 sm:space-y-6 p-2 sm:p-4 lg:p-6"
    >
      <motion.div variants={item}>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Regulatory Alignment Checks</h2>
        <p className="text-sm sm:text-base text-muted-foreground">Automated validation against compliance frameworks</p>
      </motion.div>

      {/* Regulatory Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {regulations.map((reg, index) => (
          <motion.div key={index} variants={item}>
            <Card className="glass-card border-0 h-full">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-accent" />
                  <Badge
                    variant={
                      reg.status === "compliant"
                        ? "default"
                        : reg.status === "partial"
                        ? "secondary"
                        : "destructive"
                    }
                    className="text-xs"
                  >
                    {reg.status === "compliant"
                      ? "Compliant"
                      : reg.status === "partial"
                      ? "Partial"
                      : "Review"}
                  </Badge>
                </div>
                <CardTitle className="text-lg sm:text-xl">{reg.name}</CardTitle>
                <CardDescription className="text-xs sm:text-sm">{reg.fullName}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Compliance Score</span>
                      <span className="font-bold text-accent">{reg.score}%</span>
                    </div>
                    <Progress value={reg.score} />
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs sm:text-sm">
                    <div className="glass p-2 rounded">
                      <div className="font-semibold text-primary">{reg.checks}</div>
                      <div className="text-xs text-muted-foreground">Checks</div>
                    </div>
                    <div className="glass p-2 rounded">
                      <div className="font-semibold text-accent">{reg.passed}</div>
                      <div className="text-xs text-muted-foreground">Passed</div>
                    </div>
                    <div className="glass p-2 rounded">
                      <div className="font-semibold text-yellow-500">{reg.issues}</div>
                      <div className="text-xs text-muted-foreground">Issues</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Requirement Categories */}
      <motion.div variants={item}>
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Requirement Categories</CardTitle>
            <CardDescription className="text-sm">Breakdown by compliance category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {requirementDetails.map((req, index) => (
                <div key={index} className="glass p-3 sm:p-4 rounded-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <span className="font-medium text-sm sm:text-base">{req.category}</span>
                    <div className="flex gap-2 flex-wrap">
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
                        <span className="text-xs sm:text-sm">{req.compliant} Compliant</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                        <span className="text-xs sm:text-sm">{req.partial} Partial</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <XCircle className="w-3 h-3 sm:w-4 sm:h-4 text-destructive" />
                        <span className="text-xs sm:text-sm">{req.failed} Failed</span>
                      </div>
                    </div>
                  </div>
                  <Progress 
                    value={(req.compliant / (req.compliant + req.partial + req.failed)) * 100} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Compliance Actions */}
      <motion.div variants={item}>
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Recent Compliance Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 sm:space-y-3">
              {[
                { action: "GDPR data mapping updated", time: "10 min ago", status: "success" },
                { action: "HIPAA access logs reviewed", time: "1 hour ago", status: "success" },
                { action: "ISO 27001 policy alignment check", time: "2 hours ago", status: "warning" },
                { action: "PCI-DSS encryption audit", time: "3 hours ago", status: "pending" },
              ].map((action, index) => (
                <div key={index} className="flex items-center justify-between glass p-2 sm:p-3 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium truncate">{action.action}</p>
                    <p className="text-xs text-muted-foreground">{action.time}</p>
                  </div>
                  <Badge
                    variant={
                      action.status === "success"
                        ? "default"
                        : action.status === "warning"
                        ? "secondary"
                        : "outline"
                    }
                    className="text-xs ml-2 flex-shrink-0"
                  >
                    {action.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
