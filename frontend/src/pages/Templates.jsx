import React, { useState, useEffect } from 'react';
import { Search, Play, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

const Templates = () => {
    const templates = [
        { id: 1, title: 'E-commerce Sale', category: 'Retail', thumbnail: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=400&h=250' },
        { id: 2, title: 'App Promo', category: 'Tech', thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=400&h=250' },
        { id: 3, title: 'Real Estate Tour', category: 'Real Estate', thumbnail: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=400&h=250' },
        { id: 4, title: 'Restaurant Intro', category: 'Food', thumbnail: 'https://images.unsplash.com/photo-1555396273305-9c62f21e141a?auto=format&fit=crop&q=80&w=400&h=250' },
        { id: 5, title: 'Fitness Gym Ad', category: 'Health', thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400&h=250' },
        { id: 6, title: 'Travel Vlog Intro', category: 'Travel', thumbnail: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=400&h=250' },
    ];

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const navigate = useNavigate();

    const filteredTemplates = templates.filter(template => {
        const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleSelectTemplate = (template = null) => {
        // Here you could potentially pass the template data to the editor securely
        // For now, we'll just navigate to the blank editor where they drop their prompt
        navigate('/editor', { state: { template } });
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white min-h-[40px] flex items-center">
                        <Typewriter text="Video Templates" />
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Start from a pre-made template to generate videos faster.</p>
                </div>

                <div className="relative w-full sm:w-64">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Search className="w-4 h-4" />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="input-field pl-10 h-10 text-sm"
                        placeholder="Search templates..."
                    />
                </div>
            </div>

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                {['All', 'Retail', 'Tech', 'Real Estate', 'Food', 'Health', 'Travel'].map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap border focus:ring-2 focus:ring-primary-500 focus:outline-none transition-colors ${selectedCategory === category
                            ? 'bg-primary-50 text-primary-600 border-primary-200 dark:bg-primary-900/40 dark:text-primary-400 dark:border-primary-800'
                            : 'bg-white dark:bg-dark-surface border-slate-200 dark:border-dark-border text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Template Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTemplates.map((template) => (
                    <div key={template.id} className="card group hover:shadow-lg transition-all duration-300">
                        <div className="relative aspect-video bg-slate-100 dark:bg-slate-800 overflow-hidden">
                            <img src={template.thumbnail} alt={template.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                                <button onClick={() => handleSelectTemplate(template)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-slate-100">
                                    <Play className="w-5 h-5 ml-0.5" />
                                </button>
                                <button onClick={() => handleSelectTemplate(template)} className="btn-primary py-2 px-4 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                    Use
                                </button>
                            </div>
                            <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold rounded-md uppercase tracking-wider">
                                {template.category}
                            </div>
                        </div>

                        <div className="p-4">
                            <h3 className="font-bold text-slate-900 dark:text-white text-lg">{template.title}</h3>
                        </div>
                    </div>
                ))}

                {/* Create Custom Template card */}
                <div
                    onClick={() => handleSelectTemplate(null)}
                    className="card group hover:shadow-lg transition-all duration-300 border-dashed border-2 bg-slate-50/50 dark:bg-dark-bg/50 flex flex-col items-center justify-center cursor-pointer min-h-[220px]"
                >
                    <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Plus className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-lg">Blank Canvas</h3>
                    <p className="text-sm text-slate-500 mt-1">Start from scratch</p>
                </div>
            </div>
        </div>
    );
};

export default Templates;
