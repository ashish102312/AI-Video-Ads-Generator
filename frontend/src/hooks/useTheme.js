import { useState, useEffect } from 'react';

const useTheme = () => {
    const [theme, setTheme] = useState(
        // Get theme from local storage or check system preference
        localStorage.getItem('theme') ? localStorage.getItem('theme') :
            window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    );

    useEffect(() => {
        const root = window.document.documentElement;

        // Remove old theme
        root.classList.remove('light', 'dark');

        // Add new theme
        root.classList.add(theme);

        // Save to local storage
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    return { theme, toggleTheme };
};

export default useTheme;
