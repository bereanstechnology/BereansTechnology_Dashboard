import { motion } from "framer-motion";
import { HelpCircle, Mail, FileText, Send } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

const faqs = [
  {
    question: "How does the AI-powered compliance work?",
    answer: "Our AI system continuously monitors your data and processes, comparing them against regulatory requirements. It uses machine learning to identify patterns, anomalies, and potential compliance issues in real-time.",
  },
  {
    question: "Which regulations does the platform support?",
    answer: "We currently support GDPR, HIPAA, ISO 27001, PCI-DSS, SOC 2, and many other regulatory frameworks. Custom compliance rules can also be configured.",
  },
  {
    question: "How often are audits performed?",
    answer: "Audits run continuously in the background. You can also trigger manual audits at any time or schedule them at specific intervals based on your needs.",
  },
  {
    question: "Can I export compliance reports?",
    answer: "Yes, all reports can be exported in multiple formats including PDF, CSV, and JSON. Reports are fully customizable and can be scheduled for automatic delivery.",
  },
  {
    question: "How secure is my data?",
    answer: "We use enterprise-grade encryption, secure data centers, and follow strict security protocols. All data is encrypted in transit and at rest, and we maintain SOC 2 Type II certification.",
  },
];

export default function Support() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.div variants={item}>
        <h2 className="text-3xl font-bold text-foreground mb-2">Support / Help</h2>
        <p className="text-muted-foreground">Get assistance and find answers to common questions</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Links */}
        <motion.div variants={item} className="lg:col-span-1">
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start glass">
                <FileText className="mr-2 h-4 w-4" />
                Documentation
              </Button>
              <Button variant="outline" className="w-full justify-start glass">
                <HelpCircle className="mr-2 h-4 w-4" />
                Getting Started Guide
              </Button>
              <Button variant="outline" className="w-full justify-start glass">
                <Mail className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 mt-6">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="text-sm">support@bereanstechnology.com</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Response Time</p>
                <p className="text-sm">Within 24 hours</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Hours</p>
                <p className="text-sm">24/7 Support Available</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* FAQ and Submit Ticket */}
        <div className="lg:col-span-2 space-y-6">
          {/* FAQ Section */}
          <motion.div variants={item}>
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Find quick answers to common questions</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </motion.div>

          {/* Submit Ticket */}
          <motion.div variants={item}>
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle>Submit a Support Ticket</CardTitle>
                <CardDescription>Can't find what you're looking for? Contact our support team</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your name" className="glass" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" className="glass" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Brief description of your issue" className="glass" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Provide detailed information about your question or issue"
                      className="glass min-h-[150px]"
                    />
                  </div>
                  <Button className="w-full bg-accent hover:bg-accent/90 text-white">
                    <Send className="mr-2 h-4 w-4" />
                    Submit Ticket
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
