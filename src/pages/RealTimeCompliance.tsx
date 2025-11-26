import { motion } from "framer-motion";
import { TrendingUp, Activity, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

const COLORS = ["#59D091", "#E4757D", "#718096", "#1D4ED8"];

export default function RealTimeCompliance() {
  const [complianceScore, setComplianceScore] = useState(92);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setComplianceScore(Math.floor(Math.random() * 10) + 88);
      setIsRefreshing(false);
      toast({
        title: "Data Refreshed",
        description: "Real-time compliance data updated successfully",
      });
    }, 1500);
  };

  const trendData = [
    { month: "Jan", score: 85 },
    { month: "Feb", score: 87 },
    { month: "Mar", score: 89 },
    { month: "Apr", score: 88 },
    { month: "May", score: 90 },
    { month: "Jun", score: 92 },
  ];

  const pieData = [
    { name: "GDPR", value: 95 },
    { name: "HIPAA", value: 93 },
    { name: "ISO 27001", value: 88 },
    { name: "PCI-DSS", value: 85 },
  ];

  const realtimeMetrics = [
    { label: "Active Monitors", value: "24/7" },
    { label: "Last Check", value: "2 min ago" },
    { label: "Issues Detected", value: "3" },
    { label: "Auto-Resolved", value: "12" },
  ];

  const liveActivities = [
    { time: "Just now", event: "Compliance check completed", type: "success" },
    { time: "2 min ago", event: "GDPR validation passed", type: "success" },
    { time: "5 min ago", event: "Minor issue detected in ISO 27001", type: "warning" },
    { time: "8 min ago", event: "Auto-remediation triggered", type: "success" },
    { time: "12 min ago", event: "PCI-DSS audit scheduled", type: "info" },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-4 p-4 lg:p-6">
      {/* Header */}
      <motion.div variants={item} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">Real-Time Compliance Score</h2>
          <p className="text-sm sm:text-base text-muted-foreground">Live compliance monitoring with instant updates</p>
        </div>
        <Button onClick={refreshData} disabled={isRefreshing} className="bg-accent hover:bg-accent/90 text-white">
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </motion.div>

      {/* Current Compliance Score */}
      <motion.div variants={item}>
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Current Compliance Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <div className="text-5xl sm:text-6xl font-bold text-accent mb-2">{complianceScore}%</div>
                <p className="text-sm sm:text-base text-muted-foreground">Overall Compliance</p>
                <Badge className="mt-2 bg-accent/10 text-accent flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +5% from last month
                </Badge>
              </div>
              <div className="w-full sm:flex-1">
                <Progress value={complianceScore} className="h-3 sm:h-4" />
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {realtimeMetrics.map((metric, index) => (
                    <div key={index} className="glass p-2 rounded-lg">
                      <p className="text-xs text-muted-foreground">{metric.label}</p>
                      <p className="text-sm font-semibold">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Compliance Trend Chart */}
      <motion.div variants={item}>
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Compliance Trend (6 Months)</CardTitle>
            <CardDescription className="text-sm">Historical performance analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#59D091" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#59D091" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#CBD5E1" />
                <XAxis dataKey="month" stroke="#718096" fontSize={12} />
                <YAxis stroke="#718096" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #CBD5E1",
                    borderRadius: "8px",
                  }}
                />
                <Area type="monotone" dataKey="score" stroke="#59D091" strokeWidth={3} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Regulatory Breakdown & Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Pie Chart */}
        <motion.div variants={item}>
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Regulatory Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Live Activity Feed */}
        <motion.div variants={item}>
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Live Activity Feed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {liveActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-2 glass p-2 rounded-lg">
                  <Activity
                    className={`w-4 h-4 mt-0.5 ${
                      activity.type === "success" ? "text-accent" : activity.type === "warning" ? "text-yellow-500" : "text-primary"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium truncate">{activity.event}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
