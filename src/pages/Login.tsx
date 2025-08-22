import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, register, checkUserExists } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });

  // Signup form state
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginForm.email || !loginForm.password) {
      toast("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await login(loginForm.email, loginForm.password);
      
      if (result.success) {
        toast(result.message);
        navigate("/home");
      } else {
        toast(result.message);
      }
    } catch (error) {
      toast("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signupForm.name || !signupForm.email || !signupForm.password || !signupForm.confirmPassword) {
      toast("Please fill in all fields");
      return;
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      toast("Passwords do not match");
      return;
    }

    if (signupForm.password.length < 6) {
      toast("Password must be at least 6 characters long");
      return;
    }

    // Check if user already exists
    if (checkUserExists(signupForm.email)) {
      toast("User with this email already exists. Please log in instead.");
      setActiveTab("login");
      setLoginForm({ email: signupForm.email, password: "" });
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await register(signupForm.name, signupForm.email, signupForm.password);
      
      if (result.success) {
        toast(result.message);
        navigate("/home");
      } else {
        toast(result.message);
      }
    } catch (error) {
      toast("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (form: 'login' | 'signup', field: string, value: string) => {
    if (form === 'login') {
      setLoginForm(prev => ({ ...prev, [field]: value }));
    } else {
      setSignupForm(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Clear forms when switching tabs
    if (value === 'login') {
      setLoginForm({ email: "", password: "" });
    } else {
      setSignupForm({ name: "", email: "", password: "", confirmPassword: "" });
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground">
            Virtual Try-On Mirror
          </h1>
          <p className="text-muted-foreground mt-2">
            Experience fashion in a whole new way
          </p>
        </div>

        <Card className="gradient-card border-border shadow-glow">
          <CardHeader>
            <CardTitle className="text-center text-foreground">Welcome</CardTitle>
            <CardDescription className="text-center">
              {activeTab === 'login' 
                ? 'Sign in to your existing account' 
                : 'Create a new account to get started'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email"
                      value={loginForm.email}
                      onChange={(e) => handleInputChange("login", "email", e.target.value)}
                      className="bg-secondary/50 border-border"
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Enter your password"
                      value={loginForm.password}
                      onChange={(e) => handleInputChange("login", "password", e.target.value)}
                      className="bg-secondary/50 border-border"
                      required 
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full gradient-primary hover:shadow-glow transition-all btn-glow"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Enter your full name"
                      value={signupForm.name}
                      onChange={(e) => handleInputChange("signup", "name", e.target.value)}
                      className="bg-secondary/50 border-border"
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input 
                      id="signup-email" 
                      type="email" 
                      placeholder="Enter your email"
                      value={signupForm.email}
                      onChange={(e) => handleInputChange("signup", "email", e.target.value)}
                      className="bg-secondary/50 border-border"
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input 
                      id="signup-password" 
                      type="password" 
                      placeholder="Create a password (min. 6 characters)"
                      value={signupForm.password}
                      onChange={(e) => handleInputChange("signup", "password", e.target.value)}
                      className="bg-secondary/50 border-border"
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input 
                      id="confirm-password" 
                      type="password" 
                      placeholder="Confirm your password"
                      value={signupForm.confirmPassword}
                      onChange={(e) => handleInputChange("signup", "confirmPassword", e.target.value)}
                      className="bg-secondary/50 border-border"
                      required 
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full gradient-primary hover:shadow-glow transition-all btn-glow"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
