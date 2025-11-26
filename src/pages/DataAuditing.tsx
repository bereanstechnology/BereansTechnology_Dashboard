import { motion } from "framer-motion";
import { FileCheck, Download, PlayCircle, CheckCircle2, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
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

export default function DataAuditing() {
  const [isRunning, setIsRunning] = useState(false);
  const [auditProgress, setAuditProgress] = useState(0);
  const { toast } = useToast();

  const runAudit = () => {
    setIsRunning(true);
    setAuditProgress(0);
    
    const interval = setInterval(() => {
      setAuditProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          toast({
            title: "Audit Complete",
            description: "Data audit completed successfully. 1,247 records validated.",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const auditResults = [
    { category: "Data Integrity", status: "passed", issues: 0, records: 1247 },
    { category: "Schema Validation", status: "passed", issues: 0, records: 1247 },
    { category: "Duplicate Detection", status: "warning", issues: 3, records: 1247 },
    { category: "Missing Fields", status: "passed", issues: 0, records: 1247 },
    { category: "Format Compliance", status: "warning", issues: 2, records: 1247 },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4 sm:space-y-6 p-2 sm:p-4 lg:p-6"
    >
      <motion.div variants={item}>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Automated Data Auditing</h2>
        <p className="text-sm sm:text-base text-muted-foreground">AI-powered continuous monitoring of data integrity</p>
      </motion.div>

      {/* Audit Control Panel */}
      <motion.div variants={item}>
        <Card className="glass-card border-0">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-lg sm:text-xl">Run Data Audit</CardTitle>
                <CardDescription className="text-sm">Validate data integrity and compliance</CardDescription>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button 
                  onClick={runAudit} 
                  disabled={isRunning}
                  className="bg-accent hover:bg-accent/90 text-white flex-1 sm:flex-none"
                >
                  <PlayCircle className="w-4 h-4 mr-2" />
                  {isRunning ? "Running..." : "Start Audit"}
                </Button>
                <Button variant="outline" className="flex-1 sm:flex-none">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          {isRunning && (
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">{auditProgress}%</span>
                </div>
                <Progress value={auditProgress} />
                <p className="text-xs text-muted-foreground">Analyzing records...</p>
              </div>
            </CardContent>
          )}
        </Card>
      </motion.div>

      {/* Audit Results */}
      <motion.div variants={item}>
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Audit Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {auditResults.map((result, index) => (
                <div key={index} className="glass p-3 sm:p-4 rounded-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 mb-2">
                    <div className="flex items-center gap-2 sm:gap-3">
                      {result.status === "passed" ? (
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 flex-shrink-0" />
                      )}
                      <span className="font-medium text-sm sm:text-base">{result.category}</span>
                    </div>
                    <Badge
                      variant={result.status === "passed" ? "default" : "secondary"}
                      className="text-xs w-fit"
                    >
                      {result.status === "passed" ? "Passed" : "Warning"}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground ml-0 sm:ml-8">
                    <div>
                      <span className="block">Issues Found</span>
                      <span className="font-semibold text-foreground">{result.issues}</span>
                    </div>
                    <div>
                      <span className="block">Records Checked</span>
                      <span className="font-semibold text-foreground">{result.records.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Workflow Steps */}
      <motion.div variants={item}>
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Audit Workflow</CardTitle>
            <CardDescription className="text-sm">Automated steps in the auditing process</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {[
                "Data Collection & Sampling",
                "Schema Validation",
                "Integrity Checks",
                "Anomaly Detection (AI)",
                "Compliance Verification",
                "Report Generation"
              ].map((step, index) => (
                <div key={index} className="flex items-center gap-2 sm:gap-3 glass p-2 sm:p-3 rounded-lg">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs sm:text-sm font-semibold text-accent">{index + 1}</span>
                  </div>
                  <span className="text-sm sm:text-base">{step}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
