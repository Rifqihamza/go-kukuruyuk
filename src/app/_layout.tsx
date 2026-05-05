import { ErrorBoundary } from '@/src/components/ErrorBoundary';
import { AuthProvider } from '@/src/contexts/AuthContext';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
    return (
        <ErrorBoundary>
            <AuthProvider>
                <StatusBar style="dark" />
                <Slot />
            </AuthProvider>
        </ErrorBoundary>
    );
}