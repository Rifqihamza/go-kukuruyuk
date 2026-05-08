import { orderService } from '@/src/lib/database';
import { theme } from '@/src/theme';
import { Order } from '@/src/types';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const STATUS_COLORS: Record<Order['status'], string> = {
    Completed: theme.colors.success,
    Pending: theme.colors.warning,
    Cancelled: theme.colors.error,
};

function OrderCard({ order }: { order: Order }) {
    const statusColor = STATUS_COLORS[order.status];

    return (
        <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
                <View style={styles.orderInfo}>
                    <Text style={styles.orderId}>{order.id}</Text>
                    <Text style={styles.orderName}>{order.orderName}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
                    <Text style={styles.statusText}>{order.status}</Text>
                </View>
            </View>

            <View style={styles.orderDetails}>
                <View style={styles.detailRow}>
                    <Ionicons name="calendar-outline" size={16} color={theme.colors.textSecondary} />
                    <Text style={styles.detailText}>{order.date}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Ionicons name="cash-outline" size={16} color={theme.colors.textSecondary} />
                    <Text style={styles.detailText}>Rp {order.total.toLocaleString('id-ID')}</Text>
                </View>
            </View>

            {order.items && order.items.length > 0 && (
                <View style={styles.itemsContainer}>
                    <Text style={styles.itemsTitle}>Items:</Text>
                    {order.items.map((item, idx) => (
                        <View key={idx} style={styles.itemRow}>
                            <Text style={styles.itemName}>
                                {item.quantity}x {item.productName}
                            </Text>
                            <Text style={styles.itemPrice}>
                                Rp {item.price.toLocaleString('id-ID')}
                            </Text>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
}

export default function HistoryPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedOrders = await orderService.getAll();
            const sorted = [...fetchedOrders].sort(
                (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            );
            setOrders(sorted);
        } catch (err: any) {
            console.error('Error loading orders:', err);
            setError('Gagal memuat riwayat pesanan.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                    <Text style={styles.loadingText}>Memuat riwayat...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.centerContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity style={styles.retryButton} onPress={loadOrders}>
                        <Text style={styles.retryButtonText}>Coba Lagi</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <AntDesign name='history' size={26} />
                    <Text style={styles.headerTitle}>Riwayat Pesanan</Text>
                </View>
                {orders.length > 0 && (
                    <Text style={styles.headerSubtitle}>
                        {orders.length} pesanan
                    </Text>
                )}
            </View>

            <FlatList
                data={orders}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <OrderCard order={item} />}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Ionicons name="receipt-outline" size={64} color={theme.colors.disabled} />
                        <Text style={styles.emptyTitle}>Belum ada pesanan</Text>
                        <Text style={styles.emptySubtitle}>
                            Pesanan kamu akan muncul di sini
                        </Text>
                    </View>
                )}
                showsVerticalScrollIndicator={false}
            />
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
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing.sm,
        padding: theme.spacing.xl,
    },
    loadingText: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
    },
    errorText: {
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.textSecondary,
        textAlign: 'center',
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
    },
    header: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.md,
        backgroundColor: theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    headerTitle: {
        fontSize: theme.typography.fontSize.lg,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.text,
    },
    headerSubtitle: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
        marginTop: 2,
    },
    listContent: {
        padding: theme.spacing.md,
        paddingBottom: theme.spacing.xxl,
    },
    orderCard: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.sm,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    orderInfo: {
        flex: 1,
    },
    orderId: {
        fontSize: theme.typography.fontSize.xs,
        color: theme.colors.textSecondary,
        fontWeight: theme.typography.fontWeight.medium,
    },
    orderName: {
        fontSize: theme.typography.fontSize.md,
        fontWeight: theme.typography.fontWeight.semibold,
        color: theme.colors.text,
        marginTop: 2,
    },
    statusBadge: {
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs / 2,
        borderRadius: theme.borderRadius.full,
    },
    statusText: {
        fontSize: theme.typography.fontSize.xs,
        color: theme.colors.textLight,
        fontWeight: theme.typography.fontWeight.semibold,
    },
    orderDetails: {
        flexDirection: 'row',
        gap: theme.spacing.md,
        marginTop: theme.spacing.sm,
        paddingTop: theme.spacing.sm,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    detailText: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
    },
    itemsContainer: {
        marginTop: theme.spacing.sm,
        paddingTop: theme.spacing.sm,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
    },
    itemsTitle: {
        fontSize: theme.typography.fontSize.sm,
        fontWeight: theme.typography.fontWeight.semibold,
        color: theme.colors.text,
        marginBottom: 4,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 2,
    },
    itemName: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
    },
    itemPrice: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.text,
        fontWeight: theme.typography.fontWeight.medium,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 80,
    },
    emptyTitle: {
        fontSize: theme.typography.fontSize.lg,
        fontWeight: theme.typography.fontWeight.semibold,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.md,
    },
    emptySubtitle: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.disabled,
        marginTop: 4,
    },
});