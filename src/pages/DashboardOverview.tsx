import { motion } from "framer-motion";
import { Shield, TrendingUp, FileCheck, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

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

export default function DashboardOverview() {
  const complianceScore = 92;

  const regulatoryStatus = [
    { name: "GDPR", status: "compliant", color: "bg-accent" },
    { name: "HIPAA", status: "compliant", color: "bg-accent" },
    { name: "ISO 27001", status: "partial", color: "bg-yellow-500" },
    { name: "PCI-DSS", status: "review", color: "bg-destructive" },
  ];

  const recentActivity = [
    { time: "2 mins ago", action: "Data audit completed", result: "success" },
    { time: "15 mins ago", action: "Report verification", result: "success" },
    { time: "1 hour ago", action: "Compliance check", result: "warning" },
    { time: "2 hours ago", action: "System update", result: "success" },
  ];

  const chartData = [
    { month: "Jan", score: 85, audits: 1050 },
    { month: "Feb", score: 87, audits: 1100 },
    { month: "Mar", score: 89, audits: 1150 },
    { month: "Apr", score: 88, audits: 1200 },
    { month: "May", score: 90, audits: 1250 },
    { month: "Jun", score: 92, audits: 1284 },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4 sm:space-y-6 p-2 sm:p-4 lg:p-6"
    >
      <motion.div variants={item}>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Dashboard Overview</h2>
        <p className="text-sm sm:text-base text-muted-foreground">Monitor your compliance status in real-time</p>
      </motion.div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <motion.div variants={item}>
          <Card className="glass-card border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
              <Shield className="w-5 h-5 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">{complianceScore}%</div>
              <Progress value={complianceScore} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">+5% from last month</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="glass-card border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-500">Low</div>
              <div className="flex gap-1 mt-2">
                <div className="h-2 flex-1 rounded bg-accent"></div>
                <div className="h-2 flex-1 rounded bg-accent/30"></div>
                <div className="h-2 flex-1 rounded bg-accent/30"></div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">2 items need attention</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="glass-card border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Audits</CardTitle>
              <FileCheck className="w-5 h-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">1,284</div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-accent">↑ 89% passed</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Last 30 days</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="glass-card border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Trend</CardTitle>
              <TrendingUp className="w-5 h-5 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">+12.5%</div>
              <p className="text-xs text-muted-foreground mt-2">Compliance improvement</p>
              <p className="text-xs text-muted-foreground">vs. previous quarter</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Regulatory Status */}
      <motion.div variants={item}>
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle>Regulatory Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {regulatoryStatus.map((reg) => (
                <div key={reg.name} className="glass p-4 rounded-xl text-center">
                  <div className={`w-12 h-12 ${reg.color} rounded-full mx-auto mb-2`}></div>
                  <h4 className="font-semibold mb-1">{reg.name}</h4>
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
                      : "Needs Review"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <motion.div variants={item}>
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Compliance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(213, 20%, 85%)" />
                  <XAxis dataKey="month" stroke="hsl(213, 20%, 53%)" fontSize={12} />
                  <YAxis stroke="hsl(213, 20%, 53%)" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(0, 0%, 100%)', 
                      border: '1px solid hsl(213, 20%, 85%)',
                      borderRadius: '8px'
                    }} 
                  />
                  <Legend />
                  <Line type="monotone" dataKey="score" stroke="hsl(89, 100%, 27%)" strokeWidth={2} name="Score %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Monthly Audits</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(213, 20%, 85%)" />
                  <XAxis dataKey="month" stroke="hsl(213, 20%, 53%)" fontSize={12} />
                  <YAxis stroke="hsl(213, 20%, 53%)" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(0, 0%, 100%)', 
                      border: '1px solid hsl(213, 20%, 85%)',
                      borderRadius: '8px'
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="audits" fill="hsl(210, 87%, 12%)" name="Total Audits" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div variants={item}>
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 sm:space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-2 sm:p-3 glass rounded-xl">
                  <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <div
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        activity.result === "success"
                          ? "bg-accent"
                          : activity.result === "warning"
                          ? "bg-yellow-500"
                          : "bg-destructive"
                      }`}
                    ></div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-xs sm:text-sm truncate">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                  <Badge
                    variant={activity.result === "success" ? "default" : "secondary"}
                    className="text-xs ml-2 flex-shrink-0"
                  >
                    {activity.result}
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
