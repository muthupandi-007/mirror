import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  bio?: string;
  phone?: string;
  country?: string;
  city?: string;
  profilePicture?: string;
  privacySettings?: {
    profileVisibility: 'public' | 'friends' | 'private';
    showEmail: boolean;
    showPhone: boolean;
    showLocation: boolean;
    allowMessages: boolean;
  };
  emailPreferences?: {
    marketingEmails: boolean;
    securityAlerts: boolean;
    activityUpdates: boolean;
    weeklyDigest: boolean;
  };
  twoFactorEnabled?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  checkUserExists: (email: string) => boolean;
  updateUserProfile: (updates: Partial<User>) => Promise<{ success: boolean; message: string }>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; message: string }>;
  updatePrivacySettings: (settings: User['privacySettings']) => Promise<{ success: boolean; message: string }>;
  updateEmailPreferences: (preferences: User['emailPreferences']) => Promise<{ success: boolean; message: string }>;
  toggleTwoFactor: (enabled: boolean) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('currentUser');
      }
    }
    setIsLoading(false);
  }, []);

  // Check if a user with the given email already exists
  const checkUserExists = (email: string): boolean => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.some((u: User) => u.email.toLowerCase() === email.toLowerCase());
  };

  // Register a new user
  const register = async (name: string, email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      // Check if user already exists
      if (checkUserExists(email)) {
        return { success: false, message: 'User with this email already exists. Please log in instead.' };
      }

      // Create new user with default settings
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        createdAt: new Date().toISOString(),
        bio: '',
        phone: '',
        country: '',
        city: '',
        profilePicture: '',
        privacySettings: {
          profileVisibility: 'public',
          showEmail: false,
          showPhone: false,
          showLocation: false,
          allowMessages: true
        },
        emailPreferences: {
          marketingEmails: false,
          securityAlerts: true,
          activityUpdates: true,
          weeklyDigest: false
        },
        twoFactorEnabled: false
      };

      // Store user credentials (in a real app, this would be hashed)
      const userCredentials = {
        email,
        password, // In production, this should be hashed
        userId: newUser.id
      };

      // Get existing users and add new one
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      users.push(newUser);
      
      // Get existing credentials and add new one
      const credentials = JSON.parse(localStorage.getItem('userCredentials') || '[]');
      credentials.push(userCredentials);

      // Save to localStorage
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('userCredentials', JSON.stringify(credentials));
      localStorage.setItem('currentUser', JSON.stringify(newUser));

      setUser(newUser);
      return { success: true, message: 'Account created successfully!' };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Failed to create account. Please try again.' };
    }
  };

  // Login existing user
  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      // Check if user exists and credentials match
      const credentials = JSON.parse(localStorage.getItem('userCredentials') || '[]');
      const userCredential = credentials.find((c: any) => 
        c.email.toLowerCase() === email.toLowerCase() && c.password === password
      );

      if (!userCredential) {
        return { success: false, message: 'Invalid email or password. Please check your credentials or sign up first.' };
      }

      // Get user data
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userData = users.find((u: User) => u.id === userCredential.userId);

      if (!userData) {
        return { success: false, message: 'User data not found. Please sign up again.' };
      }

      // Set current user
      localStorage.setItem('currentUser', JSON.stringify(userData));
      setUser(userData);
      return { success: true, message: 'Welcome back!' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Failed to log in. Please try again.' };
    }
  };

  // Update user profile
  const updateUserProfile = async (updates: Partial<User>): Promise<{ success: boolean; message: string }> => {
    try {
      if (!user) {
        return { success: false, message: 'No user logged in' };
      }

      // Update user data
      const updatedUser = { ...user, ...updates };
      
      // Update in users array
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex((u: User) => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem('users', JSON.stringify(users));
      }

      // Update current user
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setUser(updatedUser);

      return { success: true, message: 'Profile updated successfully!' };
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, message: 'Failed to update profile. Please try again.' };
    }
  };

  // Update password
  const updatePassword = async (currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> => {
    try {
      if (!user) {
        return { success: false, message: 'No user logged in' };
      }

      // Verify current password
      const credentials = JSON.parse(localStorage.getItem('userCredentials') || '[]');
      const userCredential = credentials.find((c: any) => c.userId === user.id);
      
      if (!userCredential || userCredential.password !== currentPassword) {
        return { success: false, message: 'Current password is incorrect' };
      }

      // Update password
      userCredential.password = newPassword;
      localStorage.setItem('userCredentials', JSON.stringify(credentials));

      return { success: true, message: 'Password updated successfully!' };
    } catch (error) {
      console.error('Password update error:', error);
      return { success: false, message: 'Failed to update password. Please try again.' };
    }
  };

  // Update privacy settings
  const updatePrivacySettings = async (settings: User['privacySettings']): Promise<{ success: boolean; message: string }> => {
    try {
      if (!settings) {
        return { success: false, message: 'Invalid privacy settings' };
      }

      return await updateUserProfile({ privacySettings: settings });
    } catch (error) {
      console.error('Privacy settings update error:', error);
      return { success: false, message: 'Failed to update privacy settings. Please try again.' };
    }
  };

  // Update email preferences
  const updateEmailPreferences = async (preferences: User['emailPreferences']): Promise<{ success: boolean; message: string }> => {
    try {
      if (!preferences) {
        return { success: false, message: 'Invalid email preferences' };
      }

      return await updateUserProfile({ emailPreferences: preferences });
    } catch (error) {
      console.error('Email preferences update error:', error);
      return { success: false, message: 'Failed to update email preferences. Please try again.' };
    }
  };

  // Toggle two-factor authentication
  const toggleTwoFactor = async (enabled: boolean): Promise<{ success: boolean; message: string }> => {
    try {
      return await updateUserProfile({ twoFactorEnabled: enabled });
    } catch (error) {
      console.error('Two-factor toggle error:', error);
      return { success: false, message: 'Failed to update two-factor authentication. Please try again.' };
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    register,
    login,
    logout,
    checkUserExists,
    updateUserProfile,
    updatePassword,
    updatePrivacySettings,
    updateEmailPreferences,
    toggleTwoFactor,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
