import { useAuth as useAuthContext } from '../context/AuthContext';

/**
 * Custom hook to access authentication context.
 * Useful for grabbing the current user, checking authentication status, 
 * or triggering login/logout functions.
 * 
 * Includes an error check to ensure it's wrapped in an AuthProvider.
 */
export const useAuth = () => {
    const context = useAuthContext();

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};

export default useAuth;
