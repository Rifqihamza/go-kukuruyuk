import { PROMOTIONS, PROMO_MENUS } from '@/src/data/mockData';
import { theme } from '@/src/theme';
import { MenuItem, PromoItem } from '@/src/types';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PromoPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'promotions' | 'menus'>('promotions');

    const navigateBack = () => router.back();

    const renderPromotionCard = ({ item }: { item: PromoItem }) => (
        <View style={styles.promoCard}>
            <View style={styles.promoHeader}>
                <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{item.discount}</Text>
                </View>
                <Text style={styles.promoTitle}>{item.title}</Text>
            </View>

            <Text style={styles.promoDescription}>{item.description}</Text>

            <View style={styles.promoFooter}>
                <View style={styles.validityContainer}>
                    <Ionicons name="time-outline" size={14} color={theme.colors.textSecondary} />
                    <Text style={styles.validityText}>Berlaku hingga {item.validUntil}</Text>
                </View>
                <TouchableOpacity style={styles.claimButton}>
                    <Text style={styles.claimButtonText}>Klaim Promo</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderMenuCard = ({ item }: { item: MenuItem }) => (
        <View style={styles.menuCard}>
            <View style={styles.menuHeader}>
                <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{item.discount}%</Text>
                </View>
            </View>

            <View style={styles.menuInfo}>
                <Text style={styles.menuName}>{item.name}</Text>
                <Text style={styles.menuDescription}>{item.description}</Text>

                <View style={styles.priceContainer}>
                    <Text style={styles.originalPrice}>Rp {item.originalPrice?.toLocaleString('id-ID')}</Text>
                    <Text style={styles.discountedPrice}>Rp {item.price.toLocaleString('id-ID')}</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.orderButton}>
                <Ionicons name="add-circle" size={20} color={theme.colors.primary} />
                <Text style={styles.orderButtonText}>Pesan</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={navigateBack} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Promo & Diskon</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* Tab Selector */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'promotions' && styles.tabActive]}
                    onPress={() => setActiveTab('promotions')}
                >
                    <Text style={[styles.tabText, activeTab === 'promotions' && styles.tabTextActive]}>
                        Kupon Promo
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, activeTab === 'menus' && styles.tabActive]}
                    onPress={() => setActiveTab('menus')}
                >
                    <Text style={[styles.tabText, activeTab === 'menus' && styles.tabTextActive]}>
                        Menu Promo
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Content */}
            {activeTab === 'promotions' ? (
                <FlatList
                    data={PROMOTIONS}
                    keyExtractor={(item) => item.id}
                    renderItem={renderPromotionCard}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Kupon Promo Tersedia</Text>
                            <Text style={styles.sectionSubtitle}>Klaim kupon promo untuk diskon spesial</Text>
                        </View>
                    }
                />
            ) : (
                <FlatList
                    data={PROMO_MENUS}
                    keyExtractor={(item) => item.id}
                    renderItem={renderMenuCard}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Menu Promo Hari Ini</Text>
                            <Text style={styles.sectionSubtitle}>Nikmati menu favorit dengan harga spesial</Text>
                        </View>
                    }
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.md,
        backgroundColor: theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    backButton: {
        padding: theme.spacing.xs,
    },
    headerTitle: {
        fontSize: theme.typography.fontSize.lg,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.text,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: theme.colors.surface,
        marginHorizontal: theme.spacing.md,
        marginVertical: theme.spacing.sm,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.xs,
    },
    tab: {
        flex: 1,
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.md,
        borderRadius: theme.borderRadius.sm,
        alignItems: 'center',
    },
    tabActive: {
        backgroundColor: theme.colors.primary,
    },
    tabText: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
        fontWeight: theme.typography.fontWeight.medium,
    },
    tabTextActive: {
        color: '#FFFFFF',
        fontWeight: theme.typography.fontWeight.bold,
    },
    listContent: {
        padding: theme.spacing.md,
    },
    sectionHeader: {
        marginBottom: theme.spacing.lg,
    },
    sectionTitle: {
        fontSize: theme.typography.fontSize.lg,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    sectionSubtitle: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
    },
    promoCard: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    promoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },
    discountBadge: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: 4,
        borderRadius: theme.borderRadius.sm,
        marginRight: theme.spacing.sm,
    },
    discountText: {
        color: '#FFFFFF',
        fontSize: theme.typography.fontSize.sm,
        fontWeight: theme.typography.fontWeight.bold,
    },
    promoTitle: {
        fontSize: theme.typography.fontSize.md,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.text,
        flex: 1,
    },
    promoDescription: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.md,
        lineHeight: 18,
    },
    promoFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    validityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    validityText: {
        fontSize: theme.typography.fontSize.xs,
        color: theme.colors.textSecondary,
        marginLeft: 4,
    },
    claimButton: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.borderRadius.sm,
    },
    claimButtonText: {
        color: '#FFFFFF',
        fontSize: theme.typography.fontSize.sm,
        fontWeight: theme.typography.fontWeight.bold,
    },
    menuCard: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuHeader: {
        position: 'absolute',
        top: theme.spacing.sm,
        right: theme.spacing.sm,
    },
    menuInfo: {
        flex: 1,
    },
    menuName: {
        fontSize: theme.typography.fontSize.md,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.text,
        marginBottom: 4,
    },
    menuDescription: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.sm,
        lineHeight: 16,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
    },
    originalPrice: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
        textDecorationLine: 'line-through',
    },
    discountedPrice: {
        fontSize: theme.typography.fontSize.md,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.primary,
    },
    orderButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.primary + '20',
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borderRadius.md,
    },
    orderButtonText: {
        color: theme.colors.primary,
        fontSize: theme.typography.fontSize.sm,
        fontWeight: theme.typography.fontWeight.bold,
        marginLeft: theme.spacing.xs,
    },
});