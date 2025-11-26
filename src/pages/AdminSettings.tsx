import { motion } from "framer-motion";
import { User, Lock, Bell, Key, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";


import { useState, useEffect } from "react";
import { auth } from "@/firebase";
import {
  updateProfile,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";


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

export default function AdminSettings() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.div variants={item}>
        <h2 className="text-3xl font-bold text-foreground mb-2">Admin Settings</h2>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </motion.div>

      {/* Profile Settings */}
      <motion.div variants={item}>
        <Card className="glass-card border-0">
          <CardHeader>
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-accent" />
              <CardTitle>Profile Information</CardTitle>
            </div>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue="Admin" className="glass" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="User" className="glass" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="admin@bereanstechnology.com" className="glass" />
            </div>
            <Button className="bg-accent hover:bg-accent/90 text-white">Save Changes</Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Security Settings */}
      <motion.div variants={item}>
        <Card className="glass-card border-0">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-accent" />
              <CardTitle>Change Password</CardTitle>
            </div>
            <CardDescription>Update your account password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" className="glass" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" className="glass" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" className="glass" />
            </div>
            <Button className="bg-accent hover:bg-accent/90 text-white">Update Password</Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Notification Settings */}
      <motion.div variants={item}>
        <Card className="glass-card border-0">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-accent" />
              <CardTitle>Notification Preferences</CardTitle>
            </div>
            <CardDescription>Manage your notification settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive compliance alerts via email</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Audit Reports</p>
                <p className="text-sm text-muted-foreground">Weekly audit summary reports</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Risk Alerts</p>
                <p className="text-sm text-muted-foreground">Immediate alerts for high-risk findings</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* API Settings */}
      <motion.div variants={item}>
        <Card className="glass-card border-0">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Key className="w-5 h-5 text-accent" />
              <CardTitle>API & Integration Keys</CardTitle>
            </div>
            <CardDescription>Manage your API access tokens</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <div className="flex gap-2">
                <Input id="apiKey" defaultValue="sk_live_••••••••••••••••" className="glass" readOnly />
                <Button variant="outline" className="glass">Regenerate</Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="webhookUrl">Webhook URL</Label>
              <Input id="webhookUrl" placeholder="https://your-domain.com/webhook" className="glass" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Access Control */}
      <motion.div variants={item}>
        <Card className="glass-card border-0">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-accent" />
              <CardTitle>Access Control</CardTitle>
            </div>
            <CardDescription>Manage user permissions and roles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {["View Dashboard", "Run Audits", "Export Reports", "Manage Settings"].map((permission) => (
                <div key={permission} className="flex items-center justify-between p-3 glass rounded-xl">
                  <span className="font-medium">{permission}</span>
                  <Switch defaultChecked />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
