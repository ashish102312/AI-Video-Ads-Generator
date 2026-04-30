import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Zap, ArrowRight, Github } from 'lucide-react';
import Snowfall from 'react-snowfall';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/v1/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            const data = await res.json();

            if (data.success) {
                login(data.user, data.token);
                navigate(data.user.role === 'admin' ? '/admin' : '/dashboard');
            } else {
                alert(data.message || 'Registration failed');
            }
        } catch (err) {
            console.error(err);
            alert("Network error. Is backend running?");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-cover bg-center bg-no-repeat font-sans text-slate-50"
            style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        >
            {/* Dark overlay matching Welcome.jsx */}
            <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-[1px]"></div>

            <Snowfall
                color="#ffffff"
                style={{ filter: "drop-shadow(0 0 10px #ffffff)" }}
                snowflakeCount={150}
            />

            {/* Decorative Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-[500px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none transition-colors"></div>

            <div className="relative z-10 w-full max-w-md bg-slate-900/60 p-8 sm:p-10 rounded-2xl shadow-xl shadow-black/50 border border-slate-700/50 backdrop-blur-md transition-all duration-300 hover:border-amber-500/30">
                <div className="flex justify-center mb-8">
                    <div className="p-3 bg-amber-500/20 rounded-xl text-amber-400 border border-amber-500/20 shadow-lg shadow-amber-500/10">
                        <Zap className="w-8 h-8" fill="currentColor" />
                    </div>
                </div>

                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Create an Account</h1>
                    <p className="text-slate-300">Start creating videos</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                <User className="w-5 h-5" />
                            </div>
                            <input
                                type="text" required value={name} onChange={(e) => setName(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all hover:bg-slate-900/70"
                                placeholder="Full Name"
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                <Mail className="w-5 h-5" />
                            </div>
                            <input
                                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all hover:bg-slate-900/70"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                <Lock className="w-5 h-5" />
                            </div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all hover:bg-slate-900/70"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded shadow-lg shadow-amber-500/25 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                        ) : (
                            <>
                                <div className='flex items-center gap-2 hover:translate-x-10 transition-all duration-400'>
                                    <span >Sign Up</span> <ArrowRight className="w-5 h-5" />
                                </div>
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-400">
                    <span>Already have an account?</span>
                    <Link to="/login" className="font-semibold text-amber-500 hover:text-amber-400 transition-colors">
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
