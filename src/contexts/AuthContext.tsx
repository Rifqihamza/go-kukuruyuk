// src/contexts/AuthContext.tsx
import * as SecureStore from 'expo-secure-store';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useMockUsers } from '../hooks/useMockUsers';
import { AuthContextType, User } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Keys untuk storage
const STORAGE_KEYS = {
    USER_TOKEN: 'auth_token',
    USER_DATA: 'user_data',
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { addUser, findUserByEmail } = useMockUsers();
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<{ user: User } | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load session saat aplikasi mulai
    useEffect(() => {
        loadStoredSession();
    }, []);

    const loadStoredSession = async () => {
        try {
            setIsLoading(true);

            // Coba ambil token dari SecureStore
            const token = await SecureStore.getItemAsync(STORAGE_KEYS.USER_TOKEN);
            const storedUser = await SecureStore.getItemAsync(STORAGE_KEYS.USER_DATA);

            if (token && storedUser) {
                const userData = JSON.parse(storedUser);
                setUser(userData);
                setSession({ user: userData });
                console.log('Session loaded from storage');
            }
        } catch (error) {
            console.error('Failed to load session:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const saveSession = async (userData: User) => {
        try {
            // Buat token sederhana (di real app, ini dari backend)
            const token = `token_${Date.now()}_${userData.id}`;

            // Simpan token dan user data ke SecureStore
            await SecureStore.setItemAsync(STORAGE_KEYS.USER_TOKEN, token);
            await SecureStore.setItemAsync(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));

            console.log('Session saved to storage');
        } catch (error) {
            console.error('Failed to save session:', error);
        }
    };

    const clearSession = async () => {
        try {
            // Hapus data dari SecureStore
            await SecureStore.deleteItemAsync(STORAGE_KEYS.USER_TOKEN);
            await SecureStore.deleteItemAsync(STORAGE_KEYS.USER_DATA);

            console.log('Session cleared from storage');
        } catch (error) {
            console.error('Failed to clear session:', error);
        }
    };

    const signIn = async (email: string, password: string): Promise<{ error?: string }> => {
        try {
            setIsLoading(true);
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Find user in mock data
            const foundUser = findUserByEmail(email);

            if (foundUser && foundUser.password === password) {
                // Set user and session in state
                setUser(foundUser);
                setSession({ user: foundUser });

                // Simpan ke storage
                await saveSession(foundUser);

                return {};
            } else {
                return { error: 'Email atau password salah' };
            }
        } catch (e: any) {
            return { error: e.message || 'Terjadi kesalahan saat login' };
        } finally {
            setIsLoading(false);
        }
    };

    const signUp = async (email: string, password: string, fullname: string): Promise<{ error?: string }> => {
        try {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Check if user already exists
            const existingUser = findUserByEmail(email);
            if (existingUser) {
                return { error: 'Email sudah terdaftar' };
            }

            // Create new user and add to mock data
            const newUser = addUser({
                role: 'customer', // New users default to customer role
                username: email.split('@')[0],
                fullname: fullname,
                email: email,
                password: password,
                avatarImg: '',
            });

            // Set user and session in state
            setUser(newUser);
            setSession({ user: newUser });

            return {};
        } catch (e: any) {
            return { error: e.message || 'Terjadi kesalahan saat daftar' };
        }
    };

    const signOut = async () => {
        try {
            setIsLoading(true);
            // Clear state
            setUser(null);
            setSession(null);

            // Clear storage
            await clearSession();
        } catch (error) {
            console.error('Failed to sign out:', error);
        } finally {
            setIsLoading(false);
        }
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