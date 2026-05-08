import { useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { session, isLoading } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (isLoading) return;

        const inAuthGroup = segments[0] === '(auth)';

        // Jika belum login dan tidak di halaman auth, redirect ke login
        if (!session && !inAuthGroup) {
            router.replace('/(auth)/sign-page');
        }
        // Jika sudah login dan di halaman auth, redirect ke home
        else if (session && inAuthGroup) {
            router.replace('/(tabs)');
        }
    }, [session, isLoading, segments, router]);

    return <>{children}</>;
}