import { motion } from "framer-motion";
import { Shield, CheckCircle2, XCircle, Upload, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
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

export default function AIVerification() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationProgress, setVerificationProgress] = useState(0);
  const { toast } = useToast();

  const verifyReport = () => {
    setIsVerifying(true);
    setVerificationProgress(0);
    
    const interval = setInterval(() => {
      setVerificationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsVerifying(false);
          toast({
            title: "Verification Complete",
            description: "AI analysis completed. Report accuracy: 98.5%",
          });
          return 100;
        }
        return prev + 12.5;
      });
    }, 600);
  };

  const verificationResults = [
    { metric: "Data Accuracy", score: 98, status: "excellent" },
    { metric: "Completeness", score: 95, status: "excellent" },
    { metric: "Consistency", score: 92, status: "good" },
    { metric: "Regulatory Alignment", score: 97, status: "excellent" },
    { metric: "Format Compliance", score: 89, status: "good" },
  ];

  const aiInsights = [
    { type: "success", message: "All critical compliance fields validated" },
    { type: "success", message: "No data anomalies detected" },
    { type: "warning", message: "Minor formatting inconsistencies in 3 sections" },
    { type: "success", message: "Cross-reference checks passed" },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4 sm:space-y-6 p-2 sm:p-4 lg:p-6"
    >
      <motion.div variants={item}>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">AI-Powered Report Verification</h2>
        <p className="text-sm sm:text-base text-muted-foreground">Intelligent verification using machine learning algorithms</p>
      </motion.div>

      {/* Upload & Verify */}
      <motion.div variants={item}>
        <Card className="glass-card border-0">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-lg sm:text-xl">Upload Report for Verification</CardTitle>
                <CardDescription className="text-sm">AI will analyze for accuracy and compliance</CardDescription>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" className="flex-1 sm:flex-none">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
                <Button 
                  onClick={verifyReport} 
                  disabled={isVerifying}
                  className="bg-accent hover:bg-accent/90 text-white flex-1 sm:flex-none"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  {isVerifying ? "Verifying..." : "Verify Report"}
                </Button>
              </div>
            </div>
          </CardHeader>
          {isVerifying && (
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>AI Analysis Progress</span>
                  <span className="font-medium">{verificationProgress}%</span>
                </div>
                <Progress value={verificationProgress} />
                <p className="text-xs text-muted-foreground">Running machine learning models...</p>
              </div>
            </CardContent>
          )}
        </Card>
      </motion.div>

      {/* Verification Scores */}
      <motion.div variants={item}>
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Verification Scores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {verificationResults.map((result, index) => (
                <div key={index} className="glass p-3 sm:p-4 rounded-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <span className="font-medium text-sm sm:text-base">{result.metric}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xl sm:text-2xl font-bold text-accent">{result.score}%</span>
                      <Badge
                        variant={result.status === "excellent" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {result.status}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={result.score} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* AI Insights */}
      <motion.div variants={item}>
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">AI Insights</CardTitle>
            <CardDescription className="text-sm">Machine learning analysis results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 sm:space-y-3">
              {aiInsights.map((insight, index) => (
                <div key={index} className="flex items-start gap-2 sm:gap-3 glass p-2 sm:p-3 rounded-lg">
                  {insight.type === "success" ? (
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  )}
                  <span className="text-xs sm:text-sm">{insight.message}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* AI Workflow */}
      <motion.div variants={item}>
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">AI Verification Process</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                { icon: FileText, title: "Document Parsing", desc: "Extract and structure data" },
                { icon: Shield, title: "Pattern Recognition", desc: "Identify compliance patterns" },
                { icon: CheckCircle2, title: "Anomaly Detection", desc: "Flag inconsistencies" },
                { icon: Shield, title: "Cross-Validation", desc: "Verify against standards" },
              ].map((step, index) => (
                <div key={index} className="glass p-3 sm:p-4 rounded-xl">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-2 sm:mb-3">
                    <step.icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                  </div>
                  <h4 className="font-semibold text-sm sm:text-base mb-1">{step.title}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
