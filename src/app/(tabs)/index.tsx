import Header from '@/src/components/Header';
import { ProductCard } from '@/src/components/ProductCard';
import QuickAccess from '@/src/components/QuickAccess';
import { useHomeScreen } from '@/src/hooks/useHomeScreen'; // Hook ini akan kita update di bawah
import { theme } from '@/src/theme';
import { Product } from '@/src/types';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    const router = useRouter();
    const {
        user,
        activeOrders,
        popularProducts, // Mengambil data populer
        quickAccessItems,
        deliveryEstimation,
        isLoading,
        error,
        onRefresh,
    } = useHomeScreen();

    const handleProductPress = (product: Product) => {
        router.push(`/product/${product.id}` as any);
    };

    const renderHeader = () => (
        <View>
            <Header userName={user.fullname} greeting="Selamat Datang" />

            <View style={styles.deliveryEstimationCard}>
                <Text style={styles.textWhiteBold}>Estimasi Pengiriman</Text>
                <Text style={styles.titleCard}>{deliveryEstimation}</Text>
            </View>

            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Akses Cepat</Text>
                <View style={styles.quickAccessContainer}>
                    {quickAccessItems.map((item) => (
                        <QuickAccess key={item.id} item={item} />
                    ))}
                </View>
            </View>

            {/* Error & Loading state */}
            {isLoading && (
                <ActivityIndicator size="large" color={theme.colors.primary} style={{ marginTop: 20 }} />
            )}

            {error && !isLoading && (
                <View style={styles.loadingContainer}>
                    <Ionicons name="cloud-offline-outline" size={48} color={theme.colors.error} />
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity style={styles.retryButton} onPress={onRefresh}>
                        <Text style={styles.retryButtonText}>Coba Lagi</Text>
                    </TouchableOpacity>
                </View>
            )}

            {activeOrders.length > 0 && (
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Pesanan Aktif</Text>
                    {activeOrders.map((order) => (
                        <View key={order.id} style={styles.activeOrderCard}>
                            <View style={styles.cardInnerPadding}>
                                <View style={styles.rowSpaceBetween}>
                                    <Text style={styles.textWhiteBold}>{order.orderName}</Text>
                                    <Text style={styles.textWhiteBold}>Rp {order.total.toLocaleString('id-ID')}</Text>
                                </View>
                                <Text style={styles.textCard}>Status: {order.status}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            )}

            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Menu Populer</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={popularProducts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ProductCard product={item} onPress={handleProductPress} />
                )}
                ListHeaderComponent={renderHeader}
                ListEmptyComponent={!isLoading ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Tidak ada menu populer saat ini.</Text>
                    </View>
                ) : null}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    loadingContainer: {
        paddingVertical: theme.spacing.xl,
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing.sm,
    },
    loadingText: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
    },
    errorText: {
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        marginTop: theme.spacing.sm,
        paddingHorizontal: theme.spacing.lg,
    },
    retryButton: {
        marginTop: theme.spacing.md,
        backgroundColor: theme.colors.primary,
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.lg,
        borderRadius: theme.borderRadius.full,
    },
    retryButtonText: {
        color: theme.colors.textLight,
        fontWeight: theme.typography.fontWeight.semibold,
        fontSize: theme.typography.fontSize.md,
    },
    listContent: {
        paddingBottom: theme.spacing.xxl,
    },
    deliveryEstimationCard: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        marginHorizontal: theme.spacing.md,
        marginTop: theme.spacing.sm,
    },
    sectionContainer: {
        marginTop: theme.spacing.md,
        paddingHorizontal: theme.spacing.md,
    },
    sectionTitle: {
        fontSize: theme.typography.fontSize.lg,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },
    quickAccessContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: theme.spacing.sm,
        paddingBottom: theme.spacing.lg,
    },
    activeOrderCard: {
        backgroundColor: theme.colors.primary,
        borderRadius: theme.borderRadius.md,
        marginBottom: theme.spacing.sm,
    },
    cardInnerPadding: {
        padding: theme.spacing.md,
        gap: theme.spacing.xs,
    },
    rowSpaceBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textWhiteBold: {
        color: theme.colors.textLight,
        fontWeight: theme.typography.fontWeight.bold,
    },
    textCard: {
        color: theme.colors.textLight,
        fontSize: theme.typography.fontSize.sm,
    },
    titleCard: {
        fontSize: theme.typography.fontSize.xxl,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.textLight,
        marginTop: theme.spacing.xs,
    },
    emptyContainer: {
        paddingVertical: theme.spacing.xl,
        alignItems: 'center',
    },
    emptyText: {
        textAlign: 'center',
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.textSecondary,
    },
});