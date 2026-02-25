import React, { useState, useEffect } from 'react';
import { Sparkles, Video, Settings2, Download, Play, Music, LayoutTemplate, Layers } from 'lucide-react';

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

const Editor = () => {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [activeTab, setActiveTab] = useState('prompt');
    const [videoUrl, setVideoUrl] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');

    const handleGenerate = async () => {
        setIsGenerating(true);
        setErrorMsg('');
        setVideoUrl(null);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5001/api/v1/videos/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ prompt })
            });
            const data = await response.json();

            if (data.success) {
                setVideoUrl(data.data.videoUrl);
            } else {
                setErrorMsg(data.message || 'Failed to generate video');
            }
        } catch (error) {
            console.error("Video Generation Error:", error);
            setErrorMsg("Network error occurred while generating video");
        } finally {
            setIsGenerating(false);
        }
    };

    const tabs = [
        { id: 'prompt', name: 'Text to Video', icon: <Sparkles className="w-4 h-4" /> },
        { id: 'style', name: 'Visual Style', icon: <Settings2 className="w-4 h-4" /> },
        { id: 'audio', name: 'Audio Settings', icon: <Music className="w-4 h-4" /> },
    ];

    return (
        <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white min-h-[40px] flex items-center">
                        <Typewriter text="AI Video Editor" />
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Transform your ideas into stunning promotional videos.</p>
                </div>
                <div className="flex gap-3">
                    <button className="btn-secondary flex items-center gap-2">
                        <LayoutTemplate className="w-4 h-4" /> Saved Projects
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-6 flex-1 h-[calc(100vh-180px)]">
                {/* Left Sidebar - Controls */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <div className="card h-full flex flex-col relative overflow-hidden">
                        {/* Context Tabs */}
                        <div className="flex border-b border-slate-200 dark:border-dark-border p-2 gap-2">
                            {tabs.map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => setActiveTab(t.id)}
                                    className={`flex-1 py-2 px-3 flex items-center justify-center gap-2 text-sm font-medium rounded-lg transition-colors ${activeTab === t.id ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                >
                                    {t.icon}
                                    {t.name}
                                </button>
                            ))}
                        </div>

                        {/* Panel Content */}
                        <div className="flex-1 p-5 overflow-y-auto">
                            {activeTab === 'prompt' && (
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Describe your video ad
                                        </label>
                                        <textarea
                                            className="input-field min-h-[160px] resize-none pb-12"
                                            placeholder="e.g., A high-energy promotional video for a new summer clothing collection perfectly suited for gen-z..."
                                            value={prompt}
                                            onChange={(e) => setPrompt(e.target.value)}
                                        ></textarea>

                                        <div className="-mt-11 mb-2 px-3 flex items-center justify-between">
                                            <span className="text-xs text-slate-400">{prompt.length} / 500 characters</span>
                                            <button className="text-xs font-medium text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1">
                                                <Sparkles className="w-3 h-3" /> Enhance Prompt
                                            </button>
                                        </div>

                                        {errorMsg && (
                                            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm border border-red-200">
                                                <strong>Error:</strong> {errorMsg}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Video Aspect Ratio</label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {[
                                                { ratio: '9:16', label: 'TikTok/Reels', icon: <div className="w-3 h-6 border-2 border-current rounded-sm" /> },
                                                { ratio: '1:1', label: 'Instagram', icon: <div className="w-5 h-5 border-2 border-current rounded-sm" /> },
                                                { ratio: '16:9', label: 'YouTube', icon: <div className="w-6 h-4 border-2 border-current rounded-sm" /> },
                                            ].map((item, idx) => (
                                                <button key={idx} className="flex flex-col items-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-dark-border hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors focus:ring-2 focus:ring-primary-500">
                                                    {item.icon}
                                                    <span className="text-xs font-semibold">{item.ratio}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'style' && (
                                <div className="h-full flex items-center justify-center text-slate-500">Style settings coming soon</div>
                            )}
                            {activeTab === 'audio' && (
                                <div className="h-full flex items-center justify-center text-slate-500">Audio settings coming soon</div>
                            )}
                        </div>

                        {/* Action Bar */}
                        <div className="p-5 border-t border-slate-200 dark:border-dark-border bg-slate-50/50 dark:bg-dark-surface">
                            <button
                                onClick={handleGenerate}
                                disabled={isGenerating || !prompt}
                                className="w-full btn-primary py-3 text-base flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                            >
                                {isGenerating ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Generating Magic...
                                    </>
                                ) : (
                                    <>
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                                        <Sparkles className="w-5 h-5 relative z-10" />
                                        <span className="relative z-10">Generate Video (1 Credit)</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Area - Preview */}
                <div className={`lg:col-span-8 flex flex-col h-full card bg-slate-100/50 dark:bg-slate-900/50 border-dashed justify-center items-center relative overflow-hidden group ${videoUrl ? 'p-2' : 'p-6'}`}>
                    {videoUrl ? (
                        <div className="w-full h-full relative rounded-xl overflow-hidden shadow-2xl bg-black flex items-center justify-center">
                            <video
                                src={videoUrl}
                                controls
                                autoPlay
                                loop
                                className="w-full max-h-full object-contain"
                            />
                            <div className="absolute top-4 right-4 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <a href={videoUrl} download="generated-video.mp4" target="_blank" rel="noopener noreferrer" className="p-2 bg-black/40 backdrop-blur border border-white/20 rounded-lg text-white hover:bg-black/60 transition-colors">
                                    <Download className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="absolute top-4 right-4 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button className="p-2 bg-white/10 backdrop-blur border border-white/20 rounded-lg text-slate-700 dark:text-white hover:bg-white/20 transition-colors">
                                    <Download className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="text-center max-w-sm">
                                <div className="w-24 h-24 bg-white dark:bg-dark-surface rounded-full shadow-xl shadow-slate-200/50 dark:shadow-none mx-auto flex items-center justify-center mb-6 border border-slate-100 dark:border-dark-border text-primary-500 relative">
                                    <Layers className="w-10 h-10 absolute opacity-20 transform scale-150 rotate-12" />
                                    <Video className="w-10 h-10 relative z-10" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Preview Generation</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">
                                    Your stunning video will appear right here once generation is complete. Enter your prompt on the left to begin.
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div >
    );
};

export default Editor;
