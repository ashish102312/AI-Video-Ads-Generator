import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Play, ArrowRight, Video, Sparkles, BarChart3 } from 'lucide-react';

const Welcome = () => {

    return (
        <div
            className="min-h-screen text-slate-50 font-sans overflow-hidden bg-cover bg-center bg-no-repeat relative"
            style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        >
            {/* Dark overlay for better text readability and matching the deep space aesthetic */}
            <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-[1px]"></div>

            {/* Navbar */}
            <nav className="relative z-10 container mx-auto px-6 py-6 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-amber-500 rounded-lg text-slate-900 shadow-lg shadow-amber-500/20">
                        <Zap className="w-5 h-5" fill="currentColor" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-white">AI ads Generator</span>
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/login" className="text-slate-200 hover:text-amber-400 font-medium transition-colors border border-white/20 rounded px-4 py-2 backdrop-blur-sm">Log In</Link>
                    <Link to="/register" className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded  shadow-lg shadow-amber-500/25 flex items-center gap-2 ">
                        Get Started <ArrowRight className="w-4 h-4 hover:translate-x-4 transition-all duration-400" />
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 container mx-auto px-6 pt-24 pb-32 text-center">
                <div className="inline-flex items-center gap-2 px-64 py-2   bg-amber-500/10 border border-amber-500/30 text-amber-300 mb-8 backdrop-blur-md shadow-lg shadow-amber-500/10">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-medium tracking-wide hover:text-amber-400 transition-colors animation-autoHover">AI-Powered Video Creation</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight drop-shadow-lg">
                    Create Stunning <span className="text-transparent bg-clip-text bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 underline">Video Ads</span><br />
                    in Seconds
                </h1>

                <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-12 drop-shadow-md">
                    Transform your text prompts into high-converting video advertisements. Boost your marketing ROI with our state-of-the-art AI generation engine.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded px-2 transition-all duration-300 shadow-xl shadow-amber-500/30 flex items-center justify-center gap-2 text-lg">
                        Start Generating Free <Zap className="w-5 h-5" fill="currentColor" />
                    </Link>
                    <button className="w-full sm:w-auto px-8 py-4 bg-slate-900/60 hover:bg-slate-800/80 text-white font-semibold rounded px-2 transition-all duration-300 border border-slate-700/50 backdrop-blur-md flex items-center justify-center gap-2 text-lg">
                        <Play className="w-5 h-5 text-amber-400" fill="currentColor" /> Watch Demo
                    </button>
                </div>
            </main>

            {/* Features Grid */}
            <section className="relative z-10 container mx-auto px-6 pb-32">
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {[
                        { icon: <Video className="w-6 h-6" />, title: 'Prompt to Video', desc: 'Type your ideas and watch them come to life in stunning 4K quality instantly.' },
                        { icon: <Sparkles className="w-6 h-6" />, title: 'Smart Scripts', desc: 'Our AI suggests high-converting hooks and calls-to-action tailored to your brand.' },
                        { icon: <BarChart3 className="w-6 h-6" />, title: 'Real-time Analytics', desc: 'Track views, engagement, and conversion rates directly from your dashboard.' },
                    ].map((feature, i) => (
                        <div key={i} className="bg-slate-900/40 border border-slate-700/50 p-8 rounded-2xl backdrop-blur-md hover:border-amber-500/50 hover:bg-slate-900/60 transition-all duration-300 hover:-translate-y-1 shadow-xl">
                            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center text-amber-400 mb-6 border border-amber-500/20">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                            <p className="text-slate-300 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <footer>
                <div>
                </div>
            </footer>
        </div>
    );
};

export default Welcome;
