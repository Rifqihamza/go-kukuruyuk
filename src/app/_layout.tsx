// app/_layout.tsx
import { ErrorBoundary } from '@/src/components/ErrorBoundary';
import { AuthProvider } from '@/src/contexts/AuthContext';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
    return (
        <ErrorBoundary>
            <AuthProvider>
                <StatusBar style='inverted' />
                <Slot />
            </AuthProvider>
        </ErrorBoundary>
    );
}

// Auth guard component for role-based access
export function RoleGuard({ children, allowedRoles, fallback }: {
    children: React.ReactNode;
    allowedRoles: string[];
    fallback?: React.ReactNode;
}) {
    // This will be implemented in individual pages that need role protection
    return <>{children}</>;
}