import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      return toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Login Successful",
        description: "Welcome to BereansTechnology Dashboard",
      });
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast({
        title: "Login Successful",
        description: "Welcome to BereansTechnology Dashboard",
      });
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Google Login Failed",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side Image */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex lg:w-1/2 items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/D2.jpg')" }}
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

      {/* Right Side Login Form */}
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
              <p className="text-sm sm:text-base text-muted-foreground">Sign in to your account</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
              {/* Email */}
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="email" className="text-sm sm:text-base">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm sm:text-base">
                <label className="flex items-center space-x-2 mb-2 sm:mb-0">
                  <input type="checkbox" className="rounded border-white/20" />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                <a href="#" className="text-accent hover:underline">Forgot password?</a>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-accent hover:bg-accent/90 text-white text-sm sm:text-base"
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>

              <Button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full bg-red-500 hover:bg-red-600 text-white mt-2 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
                {loading ? "Signing in..." : "Sign in with Google"}
              </Button>

              <div className="text-center text-sm mt-4">
                <span className="text-muted-foreground">Don't have an account? </span>
                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="text-accent hover:underline font-medium"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
