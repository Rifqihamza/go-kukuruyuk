import { Ionicons } from '@expo/vector-icons';
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../theme';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught:', error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <View style={styles.container}>
                    <Ionicons name="sad-outline" size={64} color={theme.colors.disabled} />
                    <Text style={styles.title}>Oops! Terjadi Kesalahan</Text>
                    <Text style={styles.message}>
                        Maaf, terjadi masalah yang tidak terduga. Silakan coba lagi.
                    </Text>
                    {this.state.error && (
                        <Text style={styles.errorDetail} numberOfLines={3}>
                            {this.state.error.message}
                        </Text>
                    )}
                    <TouchableOpacity style={styles.retryButton} onPress={this.handleRetry}>
                        <Ionicons name="refresh" size={20} color={theme.colors.textLight} />
                        <Text style={styles.retryText}>Coba Lagi</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return this.props.children;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
        padding: theme.spacing.xl,
    },
    title: {
        fontSize: theme.typography.fontSize.xl,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.text,
        marginTop: theme.spacing.md,
        textAlign: 'center',
    },
    message: {
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        marginTop: theme.spacing.sm,
        lineHeight: 22,
    },
    errorDetail: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.error,
        textAlign: 'center',
        marginTop: theme.spacing.md,
        backgroundColor: theme.colors.error + '10',
        padding: theme.spacing.sm,
        borderRadius: theme.borderRadius.sm,
        width: '100%',
    },
    retryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
        backgroundColor: theme.colors.primary,
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.lg,
        borderRadius: theme.borderRadius.full,
        marginTop: theme.spacing.xl,
    },
    retryText: {
        color: theme.colors.textLight,
        fontSize: theme.typography.fontSize.md,
        fontWeight: theme.typography.fontWeight.semibold,
    },
});