import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContextType } from '../types';
import { USER_DATA } from '../data/mockData';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const [session, setSession] = useState<{ user: any } | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate checking for existing session - in mock we just check state
        // In a real app we might check async storage, but for mock we start with no session
        setIsLoading(false);
    }, []);

    const signIn = async (email: string, password: string): Promise<{ error?: string }> => {
        try {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Find user in mock data
            const foundUser = USER_DATA.find(user => 
                user.email === email && user.password === password
            );
            
            if (foundUser) {
                // Set user and session in state (no persistence)
                setUser(foundUser);
                setSession({ user: foundUser });
                return {};
            } else {
                return { error: 'Email atau password salah' };
            }
        } catch (e: any) {
            return { error: e.message || 'Terjadi kesalahan saat login' };
        }
    };

    const signUp = async (email: string, password: string, fullname: string): Promise<{ error?: string }> => {
        try {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Check if user already exists
            const existingUser = USER_DATA.find(user => user.email === email);
            if (existingUser) {
                return { error: 'Email sudah terdaftar' };
            }
            
            // Create new user (in a real app, this would be saved to database)
            const newUser = {
                id: USER_DATA.length + 1,
                username: email.split('@')[0],
                fullname: fullname,
                email: email,
                password: password,
                avatarImg: ''
            };
            
            // In a real app, we would save this to the database
            // For now, we'll just set the user in state (no persistence)
            setUser(newUser);
            setSession({ user: newUser });
            
            return {};
        } catch (e: any) {
            return { error: e.message || 'Terjadi kesalahan saat daftar' };
        }
    };

    const signOut = async () => {
        // Clear state
        setUser(null);
        setSession(null);
    };

    const value: AuthContextType = {
        user,
        session,
        isLoading,
        signIn,
        signUp,
        signOut,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}