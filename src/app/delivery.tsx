import { theme } from '@/src/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { useAppNavigation } from '../hooks/useAppNavigation';
import { useOrders } from '../hooks/useOrders';
import { Order } from '../types';
const STATUS_STEPS = ['Pending', 'Processing', 'In Transit', 'Delivered'];

export default function DeliveryScreen() {
    const router = useRouter();
    const { activeOrders, isLoading } = useOrders();
    const { replaceTo } = useAppNavigation()
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const renderOrderItem = ({ item }: { item: any }) => {
        const currentStepIndex = STATUS_STEPS.indexOf(item.status);

        return (
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.orderId}>Order #{item.id.slice(0, 8)}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: theme.colors.primary + '20' }]}>
                        <Text style={styles.statusText}>{item.status}</Text>
                    </View>
                </View>

                {/* Progress Tracker sederhana */}
                <View style={styles.trackerContainer}>
                    {STATUS_STEPS.map((step, index) => (
                        <View key={step} style={styles.stepWrapper}>
                            <View style={[
                                styles.stepDot,
                                { backgroundColor: index <= currentStepIndex ? theme.colors.primary : theme.colors.disabled }
                            ]} />
                            {index < STATUS_STEPS.length - 1 && (
                                <View style={[styles.stepLine, { backgroundColor: index < currentStepIndex ? theme.colors.primary : theme.colors.disabled }]} />
                            )}
                        </View>
                    ))}
                </View>

                <View style={styles.infoRow}>
                    <Ionicons name="location-outline" size={16} color={theme.colors.textSecondary} />
                    <Text style={styles.infoText}>{(item as any).address || 'Jl. Raya Bekasi No. 123'}</Text>
                </View>

                <TouchableOpacity style={styles.detailButton} onPress={() => setSelectedOrder(item)}>
                    <Text style={styles.detailButtonText}>Lihat Detail Pesanan</Text>
                </TouchableOpacity>
            </View>
        );
    };

    if (selectedOrder) {
        return (
            <SafeAreaView style={styles.container}>
                <Header userName="Jhon Doe" greeting="Detail Pesanan" />
                <View style={styles.detailContainer}>
                    <View style={styles.detailHeader}>
                        <Text style={styles.detailTitle}>Pesanan #{selectedOrder.id}</Text>
                        <Text style={styles.detailStatus}>
                            Status: {selectedOrder.status}
                        </Text>
                    </View>

                    <View style={styles.detailInfo}>
                        <View style={styles.infoItem}>
                            <Ionicons name="calendar-outline" size={16} color={theme.colors.textSecondary} />
                            <Text>Tanggal: {selectedOrder.date}</Text>
                        </View>

                        <View style={styles.infoItem}>
                            <Ionicons name="location-outline" size={16} color={theme.colors.textSecondary} />
                            <Text>Alamat: {(selectedOrder as any).address || 'Jl. Raya Bekasi No. 123'}</Text>
                        </View>
                    </View>

                    <View style={styles.detailItemsTitle}>
                        <Text>Items Pesanan</Text>
                    </View>

                    <FlatList
                        data={selectedOrder.items || []}
                        keyExtractor={(item) => item.productId}
                        renderItem={({ item }) => (
                            <View style={styles.orderItem}>
                                <View style={styles.orderItemInfo}>
                                    <Text style={styles.orderItemName}>{item.productName}</Text>
                                    <Text style={styles.orderItemDetails}>
                                        {item.quantity} x {item.price.toLocaleString('id-ID')}
                                    </Text>
                                </View>
                                <Text style={styles.orderItemPrice}>
                                    {(item.quantity * item.price).toLocaleString('id-ID')}
                                </Text>
                            </View>
                        )}
                        contentContainerStyle={styles.itemsList}
                    />

                    <View style={styles.detailTotal}>
                        <Text style={styles.detailTotalLabel}>Total:</Text>
                        <Text style={styles.detailTotalAmount}>
                            {selectedOrder.total.toLocaleString('id-ID')}
                        </Text>
                    </View>

                    {/* Delivery Map */}
                    <View style={styles.mapContainer}>
                        <Text style={styles.mapTitle}>Lokasi Pengiriman</Text>
                        <View style={styles.mapPlaceholder}>
                            <Ionicons name="map-outline" size={48} color={theme.colors.primary} />
                            <Text style={styles.mapPlaceholderText}>Peta sedang dimuat...</Text>
                            <Text style={styles.mapStatus}>
                                Status: {selectedOrder.status === 'Pending' ? 'Menunggu konfirmasi' :
                                        selectedOrder.status === 'Completed' ? 'Selesai' : 'Diproses'}
                            </Text>
                            <View style={styles.mapMarker}>
                                <Ionicons name="location" size={24} color={theme.colors.primary} />
                            </View>
                        </View>
                        <View style={styles.deliveryInfo}>
                            <View style={styles.deliveryRow}>
                                <Ionicons name="person-outline" size={16} color={theme.colors.textSecondary} />
                                <Text style={styles.deliveryText}>Driver: Ahmad Supardi</Text>
                            </View>
                            <View style={styles.deliveryRow}>
                                <Ionicons name="call-outline" size={16} color={theme.colors.textSecondary} />
                                <Text style={styles.deliveryText}>+62 812-3456-7890</Text>
                            </View>
                            <View style={styles.deliveryRow}>
                                <Ionicons name="time-outline" size={16} color={theme.colors.textSecondary} />
                                <Text style={styles.deliveryText}>Estimasi: 15 menit lagi</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => setSelectedOrder(null)} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={24} color={theme.colors.textLight} />
                        <Text style={styles.backButtonText}>Kembali</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header userName="Jhon Doe" greeting="Delivery Status" />
            <TouchableOpacity onPress={() => replaceTo('/')} style={{ position: 'absolute', bottom: 20, left: 20, backgroundColor: theme.colors.primary, borderRadius: 50, padding: 10, zIndex: 1 }} >
                <Ionicons name="chevron-back" size={26} color={theme.colors.textLight} />
            </TouchableOpacity>

            {isLoading ? (
                <View style={styles.center}><ActivityIndicator size="large" color={theme.colors.primary} /></View>
            ) : activeOrders.length === 0 ? (
                <View style={styles.center}>
                    <Ionicons name="basket-outline" size={64} color={theme.colors.disabled} />
                    <Text style={styles.emptyText}>Tidak ada pengiriman aktif</Text>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(tabs)')}>
                        <Text style={styles.backButtonText}>Pesan Sekarang</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={activeOrders}
                    keyExtractor={(item) => item.id}
                    renderItem={renderOrderItem}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: theme.spacing.md },
    listContent: { padding: theme.spacing.md },
    card: { backgroundColor: theme.colors.surface, padding: theme.spacing.md, borderRadius: theme.borderRadius.lg, marginBottom: theme.spacing.md, borderWidth: 1, borderColor: theme.colors.border },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.md },
    orderId: { fontSize: theme.typography.fontSize.md, fontWeight: 'bold', color: theme.colors.text },
    statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
    statusText: { fontSize: 10, fontWeight: 'bold', color: theme.colors.primary },
    trackerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.md },
    stepWrapper: { flex: 1, flexDirection: 'row', alignItems: 'center' },
    stepDot: { width: 12, height: 12, borderRadius: 6 },
    stepLine: { flex: 1, height: 2, marginHorizontal: 2 },
    infoRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: theme.spacing.md },
    infoText: { fontSize: theme.typography.fontSize.sm, color: theme.colors.textSecondary },
    detailButton: { backgroundColor: theme.colors.backgroundSecondary, padding: 10, borderRadius: 8, alignItems: 'center' },
    detailButtonText: { color: theme.colors.text, fontWeight: '600' },
    emptyText: { marginTop: theme.spacing.md, fontSize: theme.typography.fontSize.md, color: theme.colors.textSecondary },
    backButton: { backgroundColor: theme.colors.primary, padding: 10, borderRadius: 10, flexDirection: 'row', gap: 5, alignItems: 'flex-start' },
    backButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: theme.typography.fontSize.lg },
    // Detail view styles
    detailContainer: { flex: 1, padding: theme.spacing.md },
    detailHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.md },
    detailTitle: { fontSize: theme.typography.fontSize.lg, fontWeight: 'bold', color: theme.colors.text },
    detailStatus: { fontSize: theme.typography.fontSize.md, color: theme.colors.textSecondary },
    detailItemsTitle: { fontSize: theme.typography.fontSize.md, fontWeight: 'bold', marginVertical: theme.spacing.sm },
    detailInfo: { marginBottom: theme.spacing.md },
    infoItem: { flexDirection: 'row', alignItems: 'center', marginVertical: 4 },
    orderItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderColor: theme.colors.border },
    orderItemInfo: { flex: 1 },
    orderItemName: { fontSize: theme.typography.fontSize.md, fontWeight: '600' },
    orderItemDetails: { fontSize: theme.typography.fontSize.sm, color: theme.colors.textSecondary },
    orderItemPrice: { fontSize: theme.typography.fontSize.md, fontWeight: 'bold', color: theme.colors.primary },
    itemsList: { paddingVertical: theme.spacing.sm },
    detailTotal: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: theme.spacing.md, paddingVertical: theme.spacing.md, borderTopWidth: 1, borderColor: theme.colors.border },
    detailTotalLabel: { fontSize: theme.typography.fontSize.md, fontWeight: 'bold', color: theme.colors.text },
    detailTotalAmount: { fontSize: theme.typography.fontSize.md, fontWeight: 'bold', color: theme.colors.primary },
    // Map styles
    mapContainer: { marginTop: theme.spacing.xl },
    mapTitle: { fontSize: theme.typography.fontSize.md, fontWeight: 'bold', color: theme.colors.text, marginBottom: theme.spacing.sm },
    mapPlaceholder: { height: 200, backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.md, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: theme.colors.border, position: 'relative' },
    mapPlaceholderText: { fontSize: theme.typography.fontSize.md, color: theme.colors.textSecondary, marginTop: theme.spacing.sm },
    mapStatus: { fontSize: theme.typography.fontSize.sm, color: theme.colors.primary, fontWeight: '600', marginTop: theme.spacing.xs, textAlign: 'center' },
    mapMarker: { position: 'absolute', top: '40%', left: '45%', backgroundColor: theme.colors.primary + '20', padding: 8, borderRadius: 20 },
    deliveryInfo: { marginTop: theme.spacing.md, backgroundColor: theme.colors.surface, padding: theme.spacing.md, borderRadius: theme.borderRadius.md },
    deliveryRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 4 },
    deliveryText: { fontSize: theme.typography.fontSize.sm, color: theme.colors.text, marginLeft: theme.spacing.sm },
});