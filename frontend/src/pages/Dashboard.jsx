import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Video, BarChart3, Clock, ArrowRight, Play, MoreVertical, Loader2 } from 'lucide-react';

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
            <span className="border-r-4 border-amber-500 animate-pulse ml-1 h-[1.2em] inline-block translate-y-[0.1em]"></span>
        </span>
    );
};

const Dashboard = () => {
    const { user } = useAuth();
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5001/api/v1/videos', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                if (data.success) {
                    setVideos(data.data);
                }
            } catch (err) {
                console.error("Failed to fetch videos", err);
            } finally {
                setLoading(false);
            }
        };
        fetchVideos();
    }, []);

    const totalViews = videos.reduce((acc, v) => acc + (v.views || 0), 0);
    const stats = [
        { title: 'Videos Created', value: videos.length.toString(), icon: <Video className="w-6 h-6 text-white" />, gradientClass: 'from-blue-500 to-indigo-600' },
        { title: 'Total Views', value: totalViews.toString(), icon: <BarChart3 className="w-6 h-6 text-white" />, gradientClass: 'from-emerald-500 to-teal-600' },
        { title: 'Hours Saved', value: (videos.length * 2).toString(), icon: <Clock className="w-6 h-6 text-white" />, gradientClass: 'from-purple-500 to-fuchsia-600' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 min-h-[40px] flex items-center">
                        <Typewriter text={`Welcome back, ${user?.name?.split(' ')[0] || ''} 👋`} />
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">You are on your dashboard.</p>
                </div>
                <Link to="/editor" className="btn-primary flex items-center gap-2 whitespace-nowrap">
                    <Video className="w-5 h-5" />
                    Create New Video
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className={`relative overflow-hidden rounded-2xl p-6 shadow-lg bg-gradient-to-br ${stat.gradientClass} text-white hover:scale-[1.02] transition-transform duration-300`}>
                        <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/20 blur-2xl rounded-full pointer-events-none"></div>
                        <div className="flex items-center justify-between relative z-10 group cursor-default">
                            <div>
                                <p className="text-sm font-medium text-white/80 mb-1">{stat.title}</p>
                                <h3 className="text-3xl font-bold">{stat.value}</h3>
                            </div>
                            <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Videos Section */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Videos</h2>
                    <Link to="/analytics" className="text-sm font-medium text-primary-600 hover:text-primary-500 flex items-center gap-1 transition-colors">
                        View All <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center py-10">
                        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
                    </div>
                ) : videos.length === 0 ? (
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                        <Video className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">No videos yet</h3>
                        <p className="text-slate-500 dark:text-slate-400 mb-6">You haven't generated any videos yet.</p>
                        <Link to="/editor" className="btn-primary inline-flex">Start Generating</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {videos.map((video) => (
                            <div key={video.id} className="card group hover:shadow-md transition-all duration-300">
                                <div className="relative aspect-video bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                    <video src={video.videoUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" muted loop playsInline onMouseEnter={(e) => e.target.play()} onMouseLeave={(e) => e.target.pause()} poster={video.thumbnail}></video>
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                                        <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary-600 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            <Play className="w-6 h-6 ml-1" />
                                        </button>
                                    </div>
                                    {video.status === 'Processing' && (
                                        <div className="absolute top-3 right-3 px-2.5 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full shadow-sm">
                                            Processing
                                        </div>
                                    )}
                                    {video.status === 'Ready' && (
                                        <div className="absolute top-3 right-3 px-2.5 py-1 bg-green-500 text-white text-xs font-semibold rounded-full shadow-sm">
                                            Ready
                                        </div>
                                    )}
                                </div>

                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold text-slate-900 dark:text-white text-lg truncate pr-4" title={video.title}>{video.title}</h3>
                                        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                                        <span className="flex items-center gap-1">
                                            <BarChart3 className="w-4 h-4" /> {video.views} views
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" /> {new Date(video.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div >
    );
};

export default Dashboard;
