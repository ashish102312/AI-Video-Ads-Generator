import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';
import Templates from './pages/Templates';
import Subscription from './pages/Subscription';
import Analytics from './pages/Analytics';
import AdminPanel from './pages/AdminPanel';

// Components
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

// Admin Route Wrapper
const AdminRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated || user?.role !== 'admin') return <Navigate to="/dashboard" replace />;
  return children;
};

// Layout with Sidebar for Dashboard pages
const DashboardLayout = ({ children }) => (
  <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-dark-bg transition-colors duration-200">
    <Sidebar />
    <div className="flex-1 flex flex-col overflow-hidden">
      <Navbar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 dark:bg-dark-bg p-6">
        {children}
      </main>
    </div>
  </div>
);

// Auth Layout for Login/Register
const AuthLayout = ({ children }) => (
  <div className="min-h-screen bg-slate-50 dark:bg-dark-bg transition-colors duration-200">
    {children}
  </div>
);

const AppContent = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
        <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
        <Route path="/verify-email" element={<AuthLayout><VerifyEmail /></AuthLayout>} />
        <Route path="/forgot-password" element={<AuthLayout><ForgotPassword /></AuthLayout>} />
        <Route path="/reset-password" element={<AuthLayout><ResetPassword /></AuthLayout>} />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout><Dashboard /></DashboardLayout></ProtectedRoute>} />
        <Route path="/editor" element={<ProtectedRoute><DashboardLayout><Editor /></DashboardLayout></ProtectedRoute>} />
        <Route path="/templates" element={<ProtectedRoute><DashboardLayout><Templates /></DashboardLayout></ProtectedRoute>} />
        <Route path="/subscription" element={<ProtectedRoute><DashboardLayout><Subscription /></DashboardLayout></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><DashboardLayout><Analytics /></DashboardLayout></ProtectedRoute>} />

        {/* Admin Route */}
        <Route path="/admin" element={<AdminRoute><DashboardLayout><AdminPanel /></DashboardLayout></AdminRoute>} />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
