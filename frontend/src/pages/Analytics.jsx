import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Clock, ArrowUpRight } from 'lucide-react';

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
                timeout = setTimeout(() => setIsDeleting(true), 3000);
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

const Analytics = () => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white min-h-[40px] flex items-center">
                    <Typewriter text="Analytics Overview" />
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Track the performance of your generated videos.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: 'Total Views', value: '45.2K', change: '+12.5%', icon: <BarChart3 /> },
                    { title: 'Unique Viewers', value: '12.4K', change: '+5.2%', icon: <Users /> },
                    { title: 'Avg. Watch Time', value: '1m 24s', change: '+1.4%', icon: <Clock /> },
                    { title: 'Conversion Rate', value: '3.2%', change: '+0.8%', icon: <TrendingUp /> },
                ].map((stat, i) => (
                    <div key={i} className="card p-6 border-l-4 border-l-primary-500">
                        <div className="flex justify-between items-start mb-4">
                            <div className="text-slate-500 dark:text-slate-400 p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                {stat.icon}
                            </div>
                            <span className="flex items-center gap-1 text-sm font-medium text-green-500 bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded-full">
                                <ArrowUpRight className="w-3 h-3" /> {stat.change}
                            </span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{stat.title}</p>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card p-6 h-[400px] flex items-center justify-center border-dashed border-2">
                <div className="text-center text-slate-500">
                    <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p className="font-medium text-lg">Detailed charts are coming soon.</p>
                    <p className="text-sm">We're building beautiful visualizations for your data.</p>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
