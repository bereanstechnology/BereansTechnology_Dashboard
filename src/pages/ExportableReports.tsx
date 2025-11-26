import { motion } from "framer-motion";
import { FileText, Download, Calendar, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

export default function ExportableReports() {
  const { toast } = useToast();

  const exportReport = (format: string, reportName: string) => {
    toast({
      title: "Report Export Started",
      description: `Generating ${reportName} in ${format} format...`,
    });
  };

  const reports = [
    {
      name: "Monthly Compliance Report",
      date: "June 2024",
      type: "Comprehensive",
      size: "2.4 MB",
      formats: ["PDF", "CSV", "JSON"],
    },
    {
      name: "GDPR Audit Report",
      date: "June 15, 2024",
      type: "Regulatory",
      size: "1.8 MB",
      formats: ["PDF", "JSON"],
    },
    {
      name: "Risk Assessment Report",
      date: "June 10, 2024",
      type: "Risk Analysis",
      size: "1.2 MB",
      formats: ["PDF", "CSV"],
    },
    {
      name: "Data Integrity Report",
      date: "June 5, 2024",
      type: "Data Audit",
      size: "3.1 MB",
      formats: ["PDF", "CSV", "JSON"],
    },
  ];

  const templates = [
    { name: "Executive Summary", description: "High-level overview for leadership" },
    { name: "Technical Audit", description: "Detailed technical findings" },
    { name: "Regulatory Compliance", description: "Framework-specific reports" },
    { name: "Custom Template", description: "Build your own report template" },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4 sm:space-y-6 p-2 sm:p-4 lg:p-6"
    >
      <motion.div variants={item}>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Exportable Audit Reports</h2>
        <p className="text-sm sm:text-base text-muted-foreground">Generate comprehensive reports in multiple formats</p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={item}>
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Generate New Report</CardTitle>
            <CardDescription className="text-sm">Create customized compliance reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {templates.map((template, index) => (
                <div key={index} className="glass p-3 sm:p-4 rounded-xl hover:shadow-lg smooth-transition cursor-pointer">
                  <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-accent mb-2" />
                  <h4 className="font-semibold text-sm sm:text-base mb-1">{template.name}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3">{template.description}</p>
                  <Button 
                    size="sm" 
                    className="w-full bg-accent hover:bg-accent/90 text-white text-xs"
                    onClick={() => exportReport("PDF", template.name)}
                  >
                    Generate
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Available Reports */}
      <motion.div variants={item}>
        <Card className="glass-card border-0">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-lg sm:text-xl">Available Reports</CardTitle>
                <CardDescription className="text-sm">Download previously generated reports</CardDescription>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" size="sm" className="text-xs">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Filter by Date
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Filter by Type
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {reports.map((report, index) => (
                <div key={index} className="glass p-3 sm:p-4 rounded-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-primary flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-sm sm:text-base mb-1 truncate">{report.name}</h4>
                        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                          <span>{report.date}</span>
                          <span>•</span>
                          <span>{report.size}</span>
                          <Badge variant="outline" className="text-xs">
                            {report.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {report.formats.map((format, fIndex) => (
                        <Button
                          key={fIndex}
                          size="sm"
                          variant="outline"
                          className="text-xs"
                          onClick={() => exportReport(format, report.name)}
                        >
                          <Download className="w-3 h-3 mr-1" />
                          {format}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Export Options */}
      <motion.div variants={item}>
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Export Formats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {[
                { format: "PDF", desc: "Formatted document for sharing", icon: "📄" },
                { format: "CSV", desc: "Spreadsheet data format", icon: "📊" },
                { format: "JSON", desc: "Structured data for APIs", icon: "{ }" },
              ].map((option, index) => (
                <div key={index} className="glass p-3 sm:p-4 rounded-xl text-center">
                  <div className="text-3xl sm:text-4xl mb-2">{option.icon}</div>
                  <h4 className="font-semibold text-sm sm:text-base mb-1">{option.format}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">{option.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
