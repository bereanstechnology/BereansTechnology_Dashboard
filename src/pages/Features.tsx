import { motion } from "framer-motion";
import { FileCheck, Shield, TrendingUp, CheckCircle2, FileText, Plug } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: FileCheck,
    title: "Automated Data Auditing",
    description: "AI-powered continuous monitoring of data integrity with automated compliance checks and anomaly detection.",
    route: "/dashboard/auditing",
  },
  {
    icon: Shield,
    title: "AI-Powered Report Verification",
    description: "Intelligent verification of compliance reports using machine learning algorithms for accuracy and completeness.",
    route: "/dashboard/verification",
  },
  {
    icon: TrendingUp,
    title: "Real-Time Compliance Score",
    description: "Live compliance scoring with instant updates and trend analysis for proactive risk management.",
    route: "/dashboard/realtime",
  },
  {
    icon: CheckCircle2,
    title: "Regulatory Alignment Checks",
    description: "Automated validation against GDPR, HIPAA, ISO 27001, PCI-DSS, and other regulatory frameworks.",
    route: "/dashboard/regulatory",
  },
  {
    icon: FileText,
    title: "Exportable Audit Reports",
    description: "Generate comprehensive audit reports in multiple formats (PDF, CSV, JSON) with customizable templates.",
    route: "/dashboard/reports",
  },
  {
    icon: Plug,
    title: "Integrations",
    description: "Seamless integration with your existing tools and platforms via REST API and webhooks.",
    route: "/dashboard/integrations",
  },
];

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

export default function Features() {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4 sm:space-y-6 p-2 sm:p-4 lg:p-6"
    >
      <motion.div variants={item}>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Features</h2>
        <p className="text-sm sm:text-base text-muted-foreground">Explore our comprehensive compliance tools</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {features.map((feature, index) => (
          <motion.div key={index} variants={item}>
            <Card className="glass-card border-0 hover:shadow-xl smooth-transition h-full">
              <CardHeader>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                </div>
                <CardTitle className="text-lg sm:text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full bg-accent hover:bg-accent/90 text-white text-sm sm:text-base"
                  onClick={() => navigate(feature.route)}
                >
                  Run Audit
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
