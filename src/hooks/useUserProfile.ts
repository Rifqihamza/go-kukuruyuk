import { USER_DATA } from '@/src/data/mockData';
import type { User } from '@/src/types';
import { useEffect, useState } from 'react';

export function useUserProfile(userId?: string) {
    const [profile, setProfile] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadProfile = async () => {
        try {
            setLoading(true);
            setError(null);
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));

            // Use mock data - in real app, this would fetch by userId
            const user = USER_DATA[0] || null;
            setProfile(user);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Gagal memuat profil');
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async (data: Partial<User>) => {
        try {
            setLoading(true);
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock update - in real app, this would call API
            const updated = { ...profile, ...data } as User;
            setProfile(updated);
            return true;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Gagal update profil');
            return false;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProfile();
    }, [userId]);

    return {
        profile,
        loading,
        error,
        updateProfile,
        refetch: loadProfile,
    };
}