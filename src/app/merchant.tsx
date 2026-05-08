import Button from '@/src/components/Button';
import { useRoleAccess } from '@/src/hooks/useRoleAccess';
import { useAppNavigation } from '@/src/hooks';
import { theme } from '@/src/theme';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MerchantPanel() {
    const { navigateTo } = useAppNavigation();
    const { user, canAccessMerchantPanel, getRoleDisplayName, getRoleColor } = useRoleAccess();
    const [isLoading, setIsLoading] = useState(false);

    // Redirect if not merchant or admin
    if (!canAccessMerchantPanel()) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.centerContainer}>
                    <Ionicons name="storefront" size={64} color={theme.colors.error} />
                    <Text style={styles.errorTitle}>Access Denied</Text>
                    <Text style={styles.errorText}>
                        Anda tidak memiliki izin untuk mengakses halaman merchant.
                    </Text>
                    <Button
                        title="Kembali"
                        onPress={() => navigateTo('/(tabs)')}
                        variant="primary"
                        size="md"
                        style={styles.backButton}
                    />
                </View>
            </SafeAreaView>
        );
    }

    const merchantActions = [
        {
            id: 'products',
            title: 'Kelola Menu',
            description: 'Tambah, edit, dan hapus menu restoran',
            icon: 'restaurant-outline',
            action: () => navigateTo('/merchant/products'),
        },
        {
            id: 'orders',
            title: 'Pesanan Masuk',
            description: 'Lihat dan kelola pesanan pelanggan',
            icon: 'document-text-outline',
            action: () => navigateTo('/merchant/orders'),
        },
        {
            id: 'analytics',
            title: 'Laporan Penjualan',
            description: 'Pantau performa dan pendapatan',
            icon: 'bar-chart-outline',
            action: () => navigateTo('/merchant/analytics'),
        },
        {
            id: 'profile',
            title: 'Profil Restoran',
            description: 'Update informasi dan pengaturan restoran',
            icon: 'business-outline',
            action: () => navigateTo('/merchant/profile'),
        },
        {
            id: 'promotions',
            title: 'Promo & Diskon',
            description: 'Kelola promo dan diskon khusus',
            icon: 'pricetag-outline',
            action: () => navigateTo('/merchant/promotions'),
        },
        {
            id: 'reviews',
            title: 'Ulasan Pelanggan',
            description: 'Baca dan tanggapi ulasan pelanggan',
            icon: 'star-outline',
            action: () => navigateTo('/merchant/reviews'),
        },
    ];

    const handleAction = async (action: () => void) => {
        try {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 500)); // Simulate loading
            action();
        } catch {
            Alert.alert('Error', 'Terjadi kesalahan saat menjalankan aksi');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigateTo('/(tabs)/settings')} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>Merchant Panel</Text>
                    <View style={[styles.roleBadge, { backgroundColor: getRoleColor() + '20' }]}>
                        <Text style={[styles.roleText, { color: getRoleColor() }]}>
                            {getRoleDisplayName()}
                        </Text>
                    </View>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.welcomeCard}>
                    <Ionicons name="storefront" size={48} color={theme.colors.primary} />
                    <Text style={styles.welcomeTitle}>Selamat datang, {user?.fullname}</Text>
                    <Text style={styles.welcomeText}>
                        Kelola restoran Anda dengan mudah melalui panel merchant Go Kukuruyuk.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Menu Merchant</Text>
                    <View style={styles.actionsGrid}>
                        {merchantActions.map((action) => (
                            <TouchableOpacity
                                key={action.id}
                                style={styles.actionCard}
                                onPress={() => handleAction(action.action)}
                                disabled={isLoading}
                            >
                                <View style={[styles.actionIcon, { backgroundColor: theme.colors.primary + '20' }]}>
                                    <Ionicons
                                        name={action.icon as any}
                                        size={24}
                                        color={theme.colors.primary}
                                    />
                                </View>
                                <Text style={styles.actionTitle}>{action.title}</Text>
                                <Text style={styles.actionDescription}>{action.description}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.statsSection}>
                    <Text style={styles.sectionTitle}>Statistik Hari Ini</Text>
                    <View style={styles.statsGrid}>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>12</Text>
                            <Text style={styles.statLabel}>Pesanan</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>Rp 450K</Text>
                            <Text style={styles.statLabel}>Pendapatan</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>4.8</Text>
                            <Text style={styles.statLabel}>Rating</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>95%</Text>
                            <Text style={styles.statLabel}>Tingkat Kepuasan</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.quickActions}>
                    <Text style={styles.sectionTitle}>Aksi Cepat</Text>
                    <View style={styles.quickActionsGrid}>
                        <Button
                            title="Tambah Menu Baru"
                            onPress={() => navigateTo('/merchant/products/add')}
                            variant="outline"
                            size="sm"
                            style={styles.quickActionButton}
                        />
                        <Button
                            title="Lihat Pesanan"
                            onPress={() => navigateTo('/merchant/orders')}
                            variant="outline"
                            size="sm"
                            style={styles.quickActionButton}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.xl,
    },
    errorTitle: {
        fontSize: theme.typography.fontSize.xl,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.error,
        marginTop: theme.spacing.md,
        marginBottom: theme.spacing.sm,
    },
    errorText: {
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: theme.spacing.xl,
    },
    backButton: {
        marginRight: theme.spacing.md,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.md,
        backgroundColor: theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    headerContent: {
        flex: 1,
    },
    headerTitle: {
        fontSize: theme.typography.fontSize.lg,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.text,
    },
    roleBadge: {
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: 4,
        borderRadius: theme.borderRadius.sm,
        alignSelf: 'flex-start',
        marginTop: 4,
    },
    roleText: {
        fontSize: theme.typography.fontSize.xs,
        fontWeight: theme.typography.fontWeight.bold,
    },
    scrollContent: {
        padding: theme.spacing.md,
    },
    welcomeCard: {
        backgroundColor: theme.colors.primary + '10',
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.md,
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
        borderLeftWidth: 4,
        borderLeftColor: theme.colors.primary,
    },
    welcomeTitle: {
        fontSize: theme.typography.fontSize.lg,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.primary,
        marginTop: theme.spacing.md,
        marginBottom: theme.spacing.sm,
        textAlign: 'center',
    },
    welcomeText: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: 18,
    },
    section: {
        marginBottom: theme.spacing.xl,
    },
    sectionTitle: {
        fontSize: theme.typography.fontSize.md,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
    },
    actionsGrid: {
        gap: theme.spacing.sm,
    },
    actionCard: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    actionIcon: {
        width: 48,
        height: 48,
        borderRadius: theme.borderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing.sm,
    },
    actionTitle: {
        fontSize: theme.typography.fontSize.md,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.text,
        marginBottom: 2,
    },
    actionDescription: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
        lineHeight: 16,
    },
    statsSection: {
        marginBottom: theme.spacing.xl,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: theme.spacing.sm,
    },
    statCard: {
        flex: 1,
        minWidth: '45%',
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    statNumber: {
        fontSize: theme.typography.fontSize.xl,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.primary,
        marginBottom: 2,
    },
    statLabel: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
        textAlign: 'center',
    },
    quickActions: {
        marginBottom: theme.spacing.xl,
    },
    quickActionsGrid: {
        flexDirection: 'row',
        gap: theme.spacing.sm,
    },
    quickActionButton: {
        flex: 1,
    },
});