# Authentication System Documentation

## Overview

The Virtual Try-On Mirror application now includes a comprehensive authentication system that ensures new users must sign up before they can access the platform. This system provides secure user management with local storage persistence.

## Features

### 🔐 User Registration
- **New users must sign up first**: The system prevents new users from logging in without creating an account
- **Email uniqueness validation**: Each email can only be associated with one account
- **Password confirmation**: Users must confirm their password during registration
- **Minimum password length**: Passwords must be at least 6 characters long

### 🔑 User Login
- **Existing users only**: Only registered users can log in
- **Credential validation**: Email and password must match stored credentials
- **Automatic redirection**: Successful login redirects to the home page

### 🛡️ Route Protection
- **Protected routes**: All main application pages require authentication
- **Automatic redirects**: Unauthenticated users are redirected to login
- **Session persistence**: Users remain logged in across browser sessions

### 👤 User Management
- **Profile information**: Users can view their account details
- **Session management**: Secure logout functionality
- **User data persistence**: Account information stored locally

## How It Works

### 1. First-Time Users
1. User visits the application
2. They are automatically redirected to `/login`
3. They must click the "Sign Up" tab
4. Fill out the registration form with:
   - Full Name
   - Email Address
   - Password (min. 6 characters)
   - Confirm Password
5. System validates the information and creates account
6. User is automatically logged in and redirected to `/home`

### 2. Returning Users
1. User visits the application
2. If they have an active session, they're redirected to `/home`
3. If no active session, they're redirected to `/login`
4. They can log in with their email and password
5. System validates credentials and logs them in

### 3. Authentication Flow
```
New User → Sign Up → Account Created → Auto Login → Access Granted
Existing User → Login → Credentials Validated → Access Granted
Unauthenticated User → Protected Route → Redirect to Login
```

## Technical Implementation

### Components
- **`AuthContext`**: Manages authentication state and user data
- **`ProtectedRoute`**: Wraps routes that require authentication
- **`Login`**: Handles both login and registration forms
- **`Profile`**: Displays user information and account management

### Data Storage
- **Local Storage**: User data and credentials stored locally
- **User Records**: Name, email, creation date, and unique ID
- **Credentials**: Email, password, and user ID mapping

### Security Features
- **Input validation**: Form validation for all user inputs
- **Duplicate prevention**: Prevents multiple accounts with same email
- **Session management**: Secure logout and session clearing

## File Structure

```
src/
├── contexts/
│   └── AuthContext.tsx          # Authentication context and logic
├── components/
│   ├── ProtectedRoute.tsx       # Route protection component
│   └── Layout.tsx               # Updated with user menu and logout
├── pages/
│   ├── Login.tsx                # Updated authentication forms
│   ├── Profile.tsx              # New user profile page
│   └── Index.tsx                # Updated with auth checks
└── App.tsx                      # Updated with auth provider and protected routes
```

## Usage Examples

### Checking Authentication Status
```tsx
import { useAuth } from '@/contexts/AuthContext';

const MyComponent = () => {
  const { isAuthenticated, user, isLoading } = useAuth();
  
  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Please log in</div>;
  
  return <div>Welcome, {user.name}!</div>;
};
```

### Protecting Routes
```tsx
import ProtectedRoute from '@/components/ProtectedRoute';

<Route path="/protected" element={
  <ProtectedRoute>
    <ProtectedComponent />
  </ProtectedRoute>
} />
```

### User Registration
```tsx
const { register } = useAuth();

const handleSignup = async () => {
  const result = await register(name, email, password);
  if (result.success) {
    // Account created successfully
  } else {
    // Handle error
  }
};
```

## Security Considerations

### Current Implementation
- **Local Storage**: Data is stored in browser's local storage
- **Plain Text Passwords**: Passwords are stored as-is (not recommended for production)
- **Client-Side Validation**: Basic validation on the frontend

### Production Recommendations
- **Backend API**: Implement server-side authentication
- **Password Hashing**: Use bcrypt or similar for password security
- **JWT Tokens**: Implement proper token-based authentication
- **HTTPS**: Ensure all communication is encrypted
- **Rate Limiting**: Prevent brute force attacks
- **Input Sanitization**: Server-side input validation

## Testing the System

### 1. Test New User Flow
1. Clear browser local storage
2. Visit the application
3. Verify redirect to login page
4. Try to access protected routes (should redirect to login)
5. Complete registration form
6. Verify automatic login and access to protected routes

### 2. Test Existing User Flow
1. Log out from existing account
2. Try to log in with correct credentials
3. Verify successful login and access
4. Test session persistence (refresh page)

### 3. Test Route Protection
1. Log out from application
2. Try to access `/home`, `/try-on`, etc.
3. Verify redirect to login page
4. Log in and verify access restored

## Troubleshooting

### Common Issues
- **"User already exists"**: Email is already registered, use login instead
- **"Invalid credentials"**: Check email and password spelling
- **Route not accessible**: Ensure user is logged in
- **Session not persisting**: Check browser local storage settings

### Debug Information
- Check browser console for authentication errors
- Verify local storage contains user data
- Ensure all required components are properly imported
- Check route protection implementation

## Future Enhancements

- **Password Reset**: Email-based password recovery
- **Email Verification**: Confirm email addresses
- **Social Login**: Google, Facebook, etc.
- **Two-Factor Authentication**: Additional security layer
- **User Roles**: Admin, premium, basic user types
- **Activity Logging**: Track user actions and sessions
