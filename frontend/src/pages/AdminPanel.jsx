import React, { useState, useEffect } from 'react';
import { Users, Video, CreditCard, Activity, ArrowUpRight, ArrowDownRight, MoreVertical } from 'lucide-react';
import Button from '../components/ui/Button';

const Typewriter = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    if (isDeleting) {
      if (displayText === '') {
        setIsDeleting(false);
      } else {
        timeout = setTimeout(() => setDisplayText(prev => prev.slice(0, -1)), 50);
      }
    } else {
      if (displayText === text) {
        timeout = setTimeout(() => setIsDeleting(true), 3000); // pause before deleting
      } else {
        timeout = setTimeout(() => setDisplayText(prev => text.slice(0, prev.length + 1)), 150);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, text]);

  return (
    <span>
      {displayText}
      <span className="border-r-4 border-amber-500 animate-pulse ml-1 h-8 inline-block translate-y-1"></span>
    </span>
  );
};

const StatCard = ({ title, value, change, isPositive, icon: Icon, gradientClass }) => (
  <div className={`relative overflow-hidden rounded-2xl p-6 shadow-lg bg-gradient-to-br ${gradientClass} text-white hover:scale-[1.02] transition-transform duration-300`}>
    <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/20 blur-2xl rounded-full pointer-events-none"></div>
    <div className="flex items-start justify-between relative z-10">
      <div>
        <p className="text-sm font-medium text-white/80 mb-1">{title}</p>
        <h3 className="text-3xl font-bold">{value}</h3>
      </div>
      <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
    <div className="mt-4 flex items-center gap-2 relative z-10">
      <span className="flex items-center text-sm font-medium text-white bg-white/20 px-2 py-0.5 rounded-full">
        {isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
        {change}
      </span>
      <span className="text-sm text-white/70">vs last month</span>
    </div>
  </div>
);

const AdminPanel = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/v1/admin/stats`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setStats(data.data.metrics);
          setRecentUsers(data.data.recentUsers);
        }
      } catch (err) {
        console.error("Failed to load admin stats", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAdminStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 min-h-[40px] flex items-center">
            <Typewriter text="Admin Dashboard" />
          </h1>
          <p className="text-slate-500 dark:text-slate-400">Overview of your platform's metrics and recent activities.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            Export Data
          </Button>
          <Button variant="primary">
            Generate Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={isLoading ? '-' : stats?.totalUsers || 0}
          change="+"
          isPositive={true}
          icon={Users}
          gradientClass="from-blue-500 to-indigo-600"
        />
        <StatCard
          title="Videos Generated"
          value={isLoading ? '-' : stats?.totalVideos || 0}
          change="+"
          isPositive={true}
          icon={Video}
          gradientClass="from-amber-500 to-orange-600"
        />
        <StatCard
          title="Monthly Revenue"
          value={isLoading ? '-' : `$${((stats?.totalUsers || 0) * 19).toLocaleString()}`}
          change="+"
          isPositive={true}
          icon={CreditCard}
          gradientClass="from-emerald-500 to-teal-600"
        />
        <StatCard
          title="Total Views"
          value={isLoading ? '-' : stats?.totalViews || 0}
          change="+"
          isPositive={true}
          icon={Activity}
          gradientClass="from-rose-500 to-red-600"
        />
      </div>

      {/* Recent Users Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Signups</h2>
          <button className="text-sm font-medium text-amber-500 hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="py-4 px-6 text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">User</th>
                <th className="py-4 px-6 text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Plan</th>
                <th className="py-4 px-6 text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Joined</th>
                <th className="py-4 px-6 text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {recentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white">{user.name}</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${user.plan === 'Pro' ? 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/30' :
                      user.plan === 'Enterprise' ? 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-500/20 dark:text-purple-400 dark:border-purple-500/30' :
                        'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                      }`}>
                      {user.plan}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></div>
                      <span className="text-sm text-slate-700 dark:text-slate-300">{user.status}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-500 dark:text-slate-400">
                    {new Date(user.date).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
