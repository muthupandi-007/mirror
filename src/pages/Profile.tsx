import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  Settings, 
  Camera, 
  Eye, 
  EyeOff, 
  Bell, 
  Lock,
  Smartphone,
  Activity,
  Heart,
  Star,
  Download,
  Trash2,
  Edit3,
  Save,
  X,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import Layout from "@/components/Layout";

interface ProfileFormData {
  name: string;
  email: string;
  bio: string;
  phone: string;
  country: string;
  city: string;
}

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface PrivacySettings {
  profileVisibility: 'public' | 'friends' | 'private';
  showEmail: boolean;
  showPhone: boolean;
  showLocation: boolean;
  allowMessages: boolean;
}

interface EmailPreferences {
  marketingEmails: boolean;
  securityAlerts: boolean;
  activityUpdates: boolean;
  weeklyDigest: boolean;
}

interface ActivityItem {
  id: string;
  type: 'try-on' | 'favorite' | 'download' | 'share';
  description: string;
  timestamp: string;
  metadata?: any;
}

// Countries data for dropdown
const countries = [
  { code: 'US', name: 'United States', phoneCode: '+1' },
  { code: 'CA', name: 'Canada', phoneCode: '+1' },
  { code: 'GB', name: 'United Kingdom', phoneCode: '+44' },
  { code: 'DE', name: 'Germany', phoneCode: '+49' },
  { code: 'FR', name: 'France', phoneCode: '+33' },
  { code: 'IT', name: 'Italy', phoneCode: '+39' },
  { code: 'ES', name: 'Spain', phoneCode: '+34' },
  { code: 'NL', name: 'Netherlands', phoneCode: '+31' },
  { code: 'AU', name: 'Australia', phoneCode: '+61' },
  { code: 'JP', name: 'Japan', phoneCode: '+81' },
  { code: 'CN', name: 'China', phoneCode: '+86' },
  { code: 'IN', name: 'India', phoneCode: '+91' },
  { code: 'BR', name: 'Brazil', phoneCode: '+55' },
  { code: 'MX', name: 'Mexico', phoneCode: '+52' },
  { code: 'RU', name: 'Russia', phoneCode: '+7' },
  { code: 'KR', name: 'South Korea', phoneCode: '+82' },
  { code: 'SG', name: 'Singapore', phoneCode: '+65' },
  { code: 'AE', name: 'United Arab Emirates', phoneCode: '+971' },
  { code: 'SA', name: 'Saudi Arabia', phoneCode: '+966' },
  { code: 'ZA', name: 'South Africa', phoneCode: '+27' }
];

const Profile = () => {
  const { 
    user, 
    updateUserProfile, 
    updatePassword, 
    updatePrivacySettings, 
    updateEmailPreferences, 
    toggleTwoFactor 
  } = useAuth();
  
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isPrivacySettingsOpen, setIsPrivacySettingsOpen] = useState(false);
  const [isEmailPreferencesOpen, setIsEmailPreferencesOpen] = useState(false);
  const [isActivityHistoryOpen, setIsActivityHistoryOpen] = useState(false);
  const [is2FAOpen, setIs2FAOpen] = useState(false);
  const [isProfilePictureOpen, setIsProfilePictureOpen] = useState(false);
  
  const [profileForm, setProfileForm] = useState<ProfileFormData>({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    phone: user?.phone || '+1 ',
    country: user?.country || '',
    city: user?.city || ''
  });
  
  const [passwordForm, setPasswordForm] = useState<PasswordFormData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>(
    user?.privacySettings || {
      profileVisibility: 'public',
      showEmail: false,
      showPhone: false,
      showLocation: false,
      allowMessages: true
    }
  );
  
  const [emailPreferences, setEmailPreferences] = useState<EmailPreferences>(
    user?.emailPreferences || {
      marketingEmails: false,
      securityAlerts: true,
      activityUpdates: true,
      weeklyDigest: false
    }
  );
  
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  
  const [profilePicture, setProfilePicture] = useState<string | null>(user?.profilePicture || null);
  const [activityHistory] = useState<ActivityItem[]>([
    {
      id: '1',
      type: 'try-on',
      description: 'Tried on Summer Dress Collection',
      timestamp: '2024-01-15T10:30:00Z',
      metadata: { items: 3 }
    },
    {
      id: '2',
      type: 'favorite',
      description: 'Added Blue Jeans to favorites',
      timestamp: '2024-01-14T15:45:00Z'
    },
    {
      id: '3',
      type: 'download',
      description: 'Downloaded outfit combination',
      timestamp: '2024-01-13T09:20:00Z'
    },
    {
      id: '4',
      type: 'share',
      description: 'Shared outfit on social media',
      timestamp: '2024-01-12T14:15:00Z'
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name,
        email: user.email,
        bio: user.bio || '',
        phone: user.phone || '',
        country: user.country || '',
        city: user.city || ''
      });
      setPrivacySettings(user.privacySettings || privacySettings);
      setEmailPreferences(user.emailPreferences || emailPreferences);
      setProfilePicture(user.profilePicture || null);
    }
  }, [user]);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

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

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await updateUserProfile({
        name: profileForm.name,
        email: profileForm.email,
        bio: profileForm.bio,
        phone: profileForm.phone,
        country: profileForm.country,
        city: profileForm.city
      });
      
      if (result.success) {
        showMessage('success', result.message);
        setIsEditProfileOpen(false);
      } else {
        showMessage('error', result.message);
      }
    } catch (error) {
      showMessage('error', 'Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showMessage('error', 'New passwords do not match!');
      return;
    }
    
    if (passwordForm.newPassword.length < 6) {
      showMessage('error', 'New password must be at least 6 characters long!');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await updatePassword(passwordForm.currentPassword, passwordForm.newPassword);
      
      if (result.success) {
        showMessage('success', result.message);
        setIsChangePasswordOpen(false);
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        showMessage('error', result.message);
      }
    } catch (error) {
      showMessage('error', 'Failed to update password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrivacySave = async () => {
    setIsLoading(true);
    
    try {
      const result = await updatePrivacySettings(privacySettings);
      
      if (result.success) {
        showMessage('success', result.message);
        setIsPrivacySettingsOpen(false);
      } else {
        showMessage('error', result.message);
      }
    } catch (error) {
      showMessage('error', 'Failed to save privacy settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailPreferencesSave = async () => {
    setIsLoading(true);
    
    try {
      const result = await updateEmailPreferences(emailPreferences);
      
      if (result.success) {
        showMessage('success', result.message);
        setIsEmailPreferencesOpen(false);
      } else {
        showMessage('error', result.message);
      }
    } catch (error) {
      showMessage('error', 'Failed to save email preferences. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfilePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfilePictureSave = async () => {
    if (!profilePicture) return;
    
    setIsLoading(true);
    
    try {
      const result = await updateUserProfile({ profilePicture });
      
      if (result.success) {
        showMessage('success', 'Profile picture updated successfully!');
        setIsProfilePictureOpen(false);
      } else {
        showMessage('error', result.message);
      }
    } catch (error) {
      showMessage('error', 'Failed to update profile picture. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTwoFactorSetup = async () => {
    setIsLoading(true);
    
    try {
      const result = await toggleTwoFactor(true);
      
      if (result.success) {
        showMessage('success', 'Two-factor authentication enabled successfully!');
        setIs2FAOpen(false);
      } else {
        showMessage('error', result.message);
      }
    } catch (error) {
      showMessage('error', 'Failed to enable two-factor authentication. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTwoFactorDisable = async () => {
    setIsLoading(true);
    
    try {
      const result = await toggleTwoFactor(false);
      
      if (result.success) {
        showMessage('success', 'Two-factor authentication disabled successfully!');
        setIs2FAOpen(false);
      } else {
        showMessage('error', result.message);
      }
    } catch (error) {
      showMessage('error', 'Failed to disable two-factor authentication. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'try-on': return <User className="h-4 w-4 text-blue-500" />;
      case 'favorite': return <Heart className="h-4 w-4 text-red-500" />;
      case 'download': return <Download className="h-4 w-4 text-green-500" />;
      case 'share': return <Mail className="h-4 w-4 text-purple-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'try-on': return 'bg-blue-100 text-blue-800';
      case 'favorite': return 'bg-red-100 text-red-800';
      case 'download': return 'bg-green-100 text-green-800';
      case 'share': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="container px-4 py-8">
        {/* Message Display */}
        {message && (
          <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center gap-2 ${
            message.type === 'success' 
              ? 'bg-green-100 border border-green-300 text-green-800' 
              : 'bg-red-100 border border-red-300 text-red-800'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            <span className="font-medium">{message.text}</span>
          </div>
        )}

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
                {/* Profile Picture Section */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
                      {profilePicture ? (
                        <img 
                          src={profilePicture} 
                          alt="Profile" 
                          className="w-24 h-24 rounded-full object-cover"
                        />
                      ) : (
                        user.name.charAt(0).toUpperCase()
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                      onClick={() => setIsProfilePictureOpen(true)}
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground">{user.name}</h3>
                    <p className="text-muted-foreground">{user.email}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Member since {formatDate(user.createdAt)}
                    </p>
                    {user.bio && (
                      <p className="text-sm text-foreground mt-2 italic">"{user.bio}"</p>
                    )}
                  </div>
                </div>

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

                  {user.phone && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Phone</label>
                      <div className="p-3 bg-secondary/50 border border-border rounded-md">
                        <span className="text-foreground">{user.phone}</span>
                      </div>
                    </div>
                  )}

                  {user.city && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">City</label>
                      <div className="p-3 bg-secondary/50 border border-border rounded-md">
                        <span className="text-foreground">{user.city}</span>
                      </div>
                    </div>
                  )}
                  {user.country && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Country</label>
                      <div className="p-3 bg-secondary/50 border border-border rounded-md">
                        <span className="text-foreground">{user.country}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-border">
                  <Button 
                    className="gradient-primary hover:shadow-glow transition-all btn-glow"
                    onClick={() => setIsEditProfileOpen(true)}
                    disabled={isLoading}
                  >
                    <Edit3 className="mr-2 h-4 w-4" />
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
                  <span className="text-foreground font-medium">{activityHistory.filter(a => a.type === 'try-on').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Saved Outfits</span>
                  <span className="text-foreground font-medium">{activityHistory.filter(a => a.type === 'favorite').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Downloads</span>
                  <span className="text-foreground font-medium">{activityHistory.filter(a => a.type === 'download').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Shares</span>
                  <span className="text-foreground font-medium">{activityHistory.filter(a => a.type === 'share').length}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="text-foreground">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-border"
                  onClick={() => setIsPrivacySettingsOpen(true)}
                  disabled={isLoading}
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Privacy Settings
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-border"
                  onClick={() => setIsEmailPreferencesOpen(true)}
                  disabled={isLoading}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Email Preferences
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-border"
                  onClick={() => setIsActivityHistoryOpen(true)}
                  disabled={isLoading}
                >
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
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-border"
                  onClick={() => setIsChangePasswordOpen(true)}
                  disabled={isLoading}
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Change Password
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-border"
                  onClick={() => setIs2FAOpen(true)}
                  disabled={isLoading}
                >
                  <Smartphone className="mr-2 h-4 w-4" />
                  Two-Factor Auth
                  {user.twoFactorEnabled && (
                    <div className="ml-auto w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Edit Profile Modal */}
        <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Update your profile information
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell us about yourself..."
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex gap-2">
                  <select
                    className="w-24 p-2 border border-border rounded-md bg-background text-sm"
                    value={profileForm.phone.split(' ')[0] || '+1'}
                    onChange={(e) => {
                      const currentPhone = profileForm.phone.replace(/^\+\d+\s/, '');
                      setProfileForm(prev => ({ 
                        ...prev, 
                        phone: `${e.target.value} ${currentPhone}` 
                      }));
                    }}
                    disabled={isLoading}
                  >
                    {countries.map(country => (
                      <option key={country.code} value={country.phoneCode}>
                        {country.phoneCode}
                      </option>
                    ))}
                  </select>
                  <Input
                    id="phone"
                    value={profileForm.phone.replace(/^\+\d+\s/, '')}
                    onChange={(e) => {
                      const countryCode = profileForm.phone.split(' ')[0] || '+1';
                      setProfileForm(prev => ({ 
                        ...prev, 
                        phone: `${countryCode} ${e.target.value}` 
                      }));
                    }}
                    placeholder="(555) 123-4567"
                    disabled={isLoading}
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <select
                  id="country"
                  className="w-full p-2 border border-border rounded-md bg-background"
                  value={profileForm.country}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, country: e.target.value }))}
                  disabled={isLoading}
                >
                  <option value="">Select a country</option>
                  {countries.map(country => (
                    <option key={country.code} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={profileForm.city}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, city: e.target.value }))}
                  placeholder="Enter your city"
                  disabled={isLoading}
                />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditProfileOpen(false)} disabled={isLoading}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Change Password Modal */}
        <Dialog open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Change Password</DialogTitle>
              <DialogDescription>
                Update your account password
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showPasswords.current ? "text" : "password"}
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                    required
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                    disabled={isLoading}
                  >
                    {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showPasswords.new ? "text" : "password"}
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                    required
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                    disabled={isLoading}
                  >
                    {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showPasswords.confirm ? "text" : "password"}
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    required
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                    disabled={isLoading}
                  >
                    {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsChangePasswordOpen(false)} disabled={isLoading}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  ) : (
                    <Lock className="mr-2 h-4 w-4" />
                  )}
                  Update Password
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Privacy Settings Modal */}
        <Dialog open={isPrivacySettingsOpen} onOpenChange={setIsPrivacySettingsOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Privacy Settings</DialogTitle>
              <DialogDescription>
                Control who can see your profile information
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Profile Visibility</Label>
                <select
                  className="w-full p-2 border border-border rounded-md bg-background"
                  value={privacySettings.profileVisibility}
                  onChange={(e) => setPrivacySettings(prev => ({ 
                    ...prev, 
                    profileVisibility: e.target.value as 'public' | 'friends' | 'private' 
                  }))}
                  disabled={isLoading}
                >
                  <option value="public">Public</option>
                  <option value="friends">Friends Only</option>
                  <option value="private">Private</option>
                </select>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="showEmail">Show Email Address</Label>
                  <input
                    id="showEmail"
                    type="checkbox"
                    checked={privacySettings.showEmail}
                    onChange={(e) => setPrivacySettings(prev => ({ ...prev, showEmail: e.target.checked }))}
                    className="w-4 h-4"
                    disabled={isLoading}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="showPhone">Show Phone Number</Label>
                  <input
                    id="showPhone"
                    type="checkbox"
                    checked={privacySettings.showPhone}
                    onChange={(e) => setPrivacySettings(prev => ({ ...prev, showPhone: e.target.checked }))}
                    className="w-4 h-4"
                    disabled={isLoading}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="showLocation">Show Location</Label>
                  <input
                    id="showLocation"
                    type="checkbox"
                    checked={privacySettings.showLocation}
                    onChange={(e) => setPrivacySettings(prev => ({ ...prev, showLocation: e.target.checked }))}
                    className="w-4 h-4"
                    disabled={isLoading}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="allowMessages">Allow Messages</Label>
                  <input
                    id="allowMessages"
                    type="checkbox"
                    checked={privacySettings.allowMessages}
                    onChange={(e) => setPrivacySettings(prev => ({ ...prev, allowMessages: e.target.checked }))}
                    className="w-4 h-4"
                    disabled={isLoading}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsPrivacySettingsOpen(false)} disabled={isLoading}>
                  Cancel
                </Button>
                <Button onClick={handlePrivacySave} disabled={isLoading}>
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Save Settings
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>

        {/* Email Preferences Modal */}
        <Dialog open={isEmailPreferencesOpen} onOpenChange={setIsEmailPreferencesOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Email Preferences</DialogTitle>
              <DialogDescription>
                Choose which emails you'd like to receive
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="marketingEmails">Marketing Emails</Label>
                  <input
                    id="marketingEmails"
                    type="checkbox"
                    checked={emailPreferences.marketingEmails}
                    onChange={(e) => setEmailPreferences(prev => ({ ...prev, marketingEmails: e.target.checked }))}
                    className="w-4 h-4"
                    disabled={isLoading}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="securityAlerts">Security Alerts</Label>
                  <input
                    id="securityAlerts"
                    type="checkbox"
                    checked={emailPreferences.securityAlerts}
                    onChange={(e) => setEmailPreferences(prev => ({ ...prev, securityAlerts: e.target.checked }))}
                    className="w-4 h-4"
                    disabled={isLoading}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="activityUpdates">Activity Updates</Label>
                  <input
                    id="activityUpdates"
                    type="checkbox"
                    checked={emailPreferences.activityUpdates}
                    onChange={(e) => setEmailPreferences(prev => ({ ...prev, activityUpdates: e.target.checked }))}
                    className="w-4 h-4"
                    disabled={isLoading}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="weeklyDigest">Weekly Digest</Label>
                  <input
                    id="weeklyDigest"
                    type="checkbox"
                    checked={emailPreferences.weeklyDigest}
                    onChange={(e) => setEmailPreferences(prev => ({ ...prev, weeklyDigest: e.target.checked }))}
                    className="w-4 h-4"
                    disabled={isLoading}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEmailPreferencesOpen(false)} disabled={isLoading}>
                  Cancel
                </Button>
                <Button onClick={handleEmailPreferencesSave} disabled={isLoading}>
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Save Preferences
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>

        {/* Activity History Modal */}
        <Dialog open={isActivityHistoryOpen} onOpenChange={setIsActivityHistoryOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Activity History</DialogTitle>
              <DialogDescription>
                View your recent account activity
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {activityHistory.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                  <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{activity.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(activity.timestamp)} at {formatTime(activity.timestamp)}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button onClick={() => setIsActivityHistoryOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Two-Factor Authentication Modal */}
        <Dialog open={is2FAOpen} onOpenChange={setIs2FAOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Two-Factor Authentication</DialogTitle>
              <DialogDescription>
                {user.twoFactorEnabled 
                  ? 'Manage your two-factor authentication settings' 
                  : 'Add an extra layer of security to your account'
                }
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {!user.twoFactorEnabled ? (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <Smartphone className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Two-factor authentication adds an extra layer of security by requiring a code from your phone in addition to your password.
                  </p>
                  <Button className="w-full" onClick={handleTwoFactorSetup} disabled={isLoading}>
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    ) : (
                      <Smartphone className="mr-2 h-4 w-4" />
                    )}
                    Set Up 2FA
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 text-green-800">
                      <Shield className="h-4 w-4" />
                      <span className="font-medium">Two-factor authentication is enabled</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Recovery Codes</Label>
                    <p className="text-sm text-muted-foreground">
                      Save these recovery codes in a secure location. You can use them to access your account if you lose your phone.
                    </p>
                    <div className="grid grid-cols-2 gap-2 p-3 bg-secondary/50 border border-border rounded-md">
                      <code className="text-xs">ABC123DEF</code>
                      <code className="text-xs">GHI456JKL</code>
                      <code className="text-xs">MNO789PQR</code>
                      <code className="text-xs">STU012VWX</code>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download Recovery Codes
                  </Button>
                  <Button variant="destructive" className="w-full" onClick={handleTwoFactorDisable} disabled={isLoading}>
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    ) : (
                      <X className="mr-2 h-4 w-4" />
                    )}
                    Disable 2FA
                  </Button>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button onClick={() => setIs2FAOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Profile Picture Modal */}
        <Dialog open={isProfilePictureOpen} onOpenChange={setIsProfilePictureOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Update Profile Picture</DialogTitle>
              <DialogDescription>
                Upload a new profile picture
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white text-4xl font-bold mb-4 overflow-hidden">
                  {profilePicture ? (
                    <img 
                      src={profilePicture} 
                      alt="Profile Preview" 
                      className="w-32 h-32 rounded-full object-cover"
                    />
                  ) : (
                    user.name.charAt(0).toUpperCase()
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureUpload}
                  className="hidden"
                  id="profile-picture-upload"
                  disabled={isLoading}
                />
                <Label 
                  htmlFor="profile-picture-upload"
                  className={`cursor-pointer inline-flex items-center px-4 py-2 border border-border rounded-md shadow-sm text-sm font-medium text-foreground bg-background hover:bg-secondary/50 ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Choose Photo
                </Label>
              </div>
              {profilePicture && (
                <div className="flex gap-2">
                  <Button 
                    className="flex-1"
                    onClick={handleProfilePictureSave}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}
                    Save Picture
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setProfilePicture(null)}
                    disabled={isLoading}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsProfilePictureOpen(false)} disabled={isLoading}>
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Profile;
