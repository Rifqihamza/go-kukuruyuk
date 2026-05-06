import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useCartStore } from '../hooks/useCartStore';
import { theme } from '../theme';
import { HeaderProps } from '../types';

export default function Header({
    userName = '',
    greeting = 'Selamat Datang',
    onNotificationPress,
    onProfilePress,
    cartItemCount,
    hasUnreadNotifications = false,
}: HeaderProps) {
    const router = useRouter();
    const { items } = useCartStore();
    const totalCartItems = cartItemCount ?? items.reduce((sum, i) => sum + i.quantity, 0);

    return (
        <View style={styles.header}>
            <View style={styles.titleContainer}>
                <TouchableOpacity style={styles.avatar} onPress={onProfilePress} activeOpacity={0.7}>
                    <Ionicons name="person" size={24} color={theme.colors.textLight} />
                </TouchableOpacity>
                <View style={styles.title}>
                    <Text style={styles.greeting}>{greeting}</Text>
                    <Text style={styles.userName}>{userName}</Text>
                </View>
            </View>
            <View style={styles.actionButtons}>
                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => (router as any).push('/cart')}
                    activeOpacity={0.7}
                >
                    <Ionicons name="cart-outline" size={24} color={theme.colors.text} />
                    {totalCartItems > 0 && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>
                                {totalCartItems > 99 ? '99+' : totalCartItems}
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => (router as any).push('/notifications')}
                    activeOpacity={0.7}
                >
                    <Ionicons name="notifications-outline" size={24} color={theme.colors.text} />
                    {hasUnreadNotifications && (
                        <View style={styles.notificationBadge} />
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.background,
    },
    titleContainer: {
        flexDirection: "row",
        gap: theme.spacing.sm,
        alignItems: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: theme.borderRadius.full,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    greeting: {
        fontWeight: theme.typography.fontWeight.regular,
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
    },
    userName: {
        fontWeight: theme.typography.fontWeight.semibold,
        fontSize: theme.typography.fontSize.lg,
        color: theme.colors.text,
    },
    actionButtons: {
        flexDirection: 'row',
        gap: theme.spacing.sm,
    },
    iconButton: {
        width: 44,
        height: 44,
        borderRadius: theme.borderRadius.full,
        backgroundColor: theme.colors.backgroundSecondary,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative' as const,
    },
    badge: {
        position: 'absolute' as const,
        top: -2,
        right: -2,
        backgroundColor: theme.colors.error,
        borderRadius: 10,
        minWidth: 18,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 4,
    },
    badgeText: {
        color: theme.colors.textLight,
        fontSize: 10,
        fontWeight: theme.typography.fontWeight.bold,
    },
    notificationBadge: {
        position: 'absolute' as const,
        top: 10,
        right: 10,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: theme.colors.error,
    },
});