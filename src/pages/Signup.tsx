import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

import { auth } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({ title: "Error", description: "Passwords do not match", variant: "destructive" });
      return;
    }
    if (!formData.name || !formData.email || !formData.password) {
      toast({ title: "Error", description: "Please fill in all fields", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await updateProfile(userCredential.user, { displayName: formData.name });

      toast({ title: "Account Created", description: `Welcome, ${formData.name}!` });
      navigate("/dashboard");
    } catch (error: any) {
      toast({ title: "Signup Failed", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user.displayName) {
        await updateProfile(result.user, { displayName: result.user.displayName });
      }

      toast({
        title: "Signup Successful",
        description: `Welcome, ${result.user.displayName || "User"}!`,
      });
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Google Signup Failed",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Illustration */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex lg:w-1/2 items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/D1.jpg')" }}
      >
        <div className="max-w-md text-center px-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {/* Optional tagline or hero text */}
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="glass-card p-6 sm:p-8 md:p-10">
            <div className="text-center mb-6 sm:mb-8">
              <a href="https://bereanstechnology.com/">
                <img
                  src="/logo.png"
                  alt="BereansTechnology Logo"
                  className="mx-auto mb-2 sm:mb-4 w-36 sm:w-44 h-20 sm:h-28 object-contain"
                />
              </a>
              <p className="text-sm sm:text-base text-muted-foreground">Create account</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-4 sm:space-y-5">
              {/* Full Name */}
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="name" className="text-sm sm:text-base">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-10 glass border-white/20 focus:border-accent text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="email" className="text-sm sm:text-base">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 glass border-white/20 focus:border-accent text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="password" className="text-sm sm:text-base">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10 pr-10 glass border-white/20 focus:border-accent text-sm sm:text-base"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm sm:text-base">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="pl-10 glass border-white/20 focus:border-accent text-sm sm:text-base"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-white text-sm sm:text-base">
                {loading ? "Creating Account..." : "Create Account"}
              </Button>

              {/* Google Signup */}
              <Button
                type="button"
                onClick={handleGoogleSignup}
                disabled={loading}
                className="w-full bg-red-500 hover:bg-red-600 text-white mt-2 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
                {loading ? "Signing up..." : "Sign up with Google"}
              </Button>

              <div className="text-center text-sm mt-4">
                <span className="text-muted-foreground">Already have an account? </span>
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-accent hover:underline font-medium"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
