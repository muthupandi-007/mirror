import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, Calendar, Shield, Settings } from "lucide-react";
import Layout from "@/components/Layout";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Layout>
      <div className="container px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Your Profile
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Manage your account and view your profile information
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <Card className="gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <User className="h-5 w-5 text-primary" />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  Your personal account details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                    <div className="p-3 bg-secondary/50 border border-border rounded-md">
                      <span className="text-foreground">{user.name}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                    <div className="p-3 bg-secondary/50 border border-border rounded-md">
                      <span className="text-foreground">{user.email}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Member Since</label>
                    <div className="p-3 bg-secondary/50 border border-border rounded-md">
                      <span className="text-foreground">{formatDate(user.createdAt)}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Account Status</label>
                    <div className="p-3 bg-secondary/50 border border-border rounded-md">
                      <span className="text-foreground flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <Button className="gradient-primary hover:shadow-glow transition-all btn-glow">
                    <Settings className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Account Actions & Stats */}
          <div className="space-y-6">
            {/* Account Stats */}
            <Card className="gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="text-foreground">Account Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Try-On Sessions</span>
                  <span className="text-foreground font-medium">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Saved Outfits</span>
                  <span className="text-foreground font-medium">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Favorites</span>
                  <span className="text-foreground font-medium">0</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="text-foreground">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start border-border">
                  <Shield className="mr-2 h-4 w-4" />
                  Privacy Settings
                </Button>
                <Button variant="outline" className="w-full justify-start border-border">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Preferences
                </Button>
                <Button variant="outline" className="w-full justify-start border-border">
                  <Calendar className="mr-2 h-4 w-4" />
                  Activity History
                </Button>
              </CardContent>
            </Card>

            {/* Account Security */}
            <Card className="gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="text-foreground">Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start border-border">
                  <Shield className="mr-2 h-4 w-4" />
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start border-border">
                  <Settings className="mr-2 h-4 w-4" />
                  Two-Factor Auth
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
