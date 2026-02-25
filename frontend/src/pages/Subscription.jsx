import React from 'react';
import { Check, Star, Zap } from 'lucide-react';

const Subscription = () => {
    const plans = [
        {
            name: 'Free Starter',
            price: '$0',
            description: 'Perfect for testing out the AI ad capabilities.',
            features: ['5 Generated videos / day', '720p resolution', 'Watermark included', 'Basic text prompts', 'Community support'],
            cta: 'Current Plan',
            highlighted: false,
        },
        {
            name: 'Pro Creator',
            price: '$29',
            period: '/mo',
            description: 'The standard for creators and small businesses.',
            features: ['50 Generated videos / day', '1080p & 4K resolution', 'No watermarks', 'Advanced prompt enhancement', 'Priority email support', 'Custom brand colors', 'Trending music library'],
            cta: 'Upgrade to Pro',
            highlighted: true,
            icon: <Star className="w-5 h-5" />,
        },
        {
            name: 'Enterprise',
            price: '$99',
            period: '/mo',
            description: 'For teams that need maximum performance.',
            features: ['Unlimited video generation', 'Highest quality render engines', 'API Access', 'Dedicated account manager', 'Custom AI models', 'White-labeling'],
            cta: 'Contact Sales',
            highlighted: false,
        },
    ];

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto py-8">
            <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">Choose the perfect plan for your needs</h1>
                <p className="text-lg text-slate-500 dark:text-slate-400">Unlock the full power of AI video generation with our robust feature set and flexible pricing.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-center">
                {plans.map((plan, i) => (
                    <div key={i} className={`card relative p-8 flex flex-col ${plan.highlighted ? 'border-primary-500 shadow-xl shadow-primary-500/20 scale-105 z-10' : 'border-slate-200 dark:border-dark-border'}`}>
                {plan.highlighted && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-600 text-white font-bold text-xs uppercase tracking-wider py-1 px-4 rounded-full flex items-center gap-1">
                        <Zap fill="currentColor" className="w-3 h-3" /> Most Popular
                    </div>
                )}

                <div className="mb-8">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                        {plan.name} {plan.icon && <span className="text-amber-500">{plan.icon}</span>}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{plan.description}</p>
                </div>

                <div className="mb-8">
                    <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{plan.price}</span>
                    {plan.period && <span className="text-slate-500 font-medium">{plan.period}</span>}
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                    {plan.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-primary-500 shrink-0" />
                            <span className="text-slate-600 dark:text-slate-300 text-sm font-medium">{feature}</span>
                        </li>
                    ))}
                </ul>

                <button className={`w-full py-3 px-4 rounded-xl font-bold transition-all ${plan.highlighted ? 'bg-primary-600 text-white hover:bg-primary-500 shadow-lg shadow-primary-500/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                {plan.cta}
            </button>
        </div>
    ))
}
      </div >
    </div >
  );
};

export default Subscription;
