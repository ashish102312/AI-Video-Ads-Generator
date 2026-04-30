import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {Home,Video,LayoutTemplate,CreditCard,BarChart,Settings,LogOut,Menu,Sun,Moon,Zap} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home className="w-5 h-5" /> },
    { name: 'Editor', path: '/editor', icon: <Video className="w-5 h-5" /> },
    { name: 'Templates', path: '/templates', icon: <LayoutTemplate className="w-5 h-5" /> },
    { name: 'Analytics', path: '/analytics', icon: <BarChart className="w-5 h-5" /> },
    { name: 'Subscription', path: '/subscription', icon: <CreditCard className="w-5 h-5" /> },
  ];

  if (user?.role === 'admin') {
    navItems.push({ name: 'Admin Panel', path: '/admin', icon: <Settings className="w-5 h-5" /> });
  }

  return (
    <div className="w-64 bg-orange-300 dark:bg-dark-surface border-r border-slate-200 dark:border-dark-border h-screen flex flex-col transition-colors duration-200">
      <div className="p-6 flex items-center gap-3">
        <div className="p-2 bg-primary-500 rounded-lg text-white">
          <Zap className="w-6 h-6" fill="currentColor" />
        </div>
        <span className="text-xl font-bold text-slate-900 dark:text-white">AI generate</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400 font-medium'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-dark-border space-y-2">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors duration-200"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div >
  );
};

export default Sidebar;
