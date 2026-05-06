import { theme } from '@/src/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { useOrders } from '../hooks/useOrders';
const STATUS_STEPS = ['Pending', 'Processing', 'In Transit', 'Delivered'];

export default function DeliveryScreen() {
    const router = useRouter();
    const { activeOrders, isLoading } = useOrders();

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
                    <Text style={styles.infoText}>{item.address || 'Jl. Raya Bekasi No. 123'}</Text>
                </View>

                <TouchableOpacity style={styles.detailButton}>
                    <Text style={styles.detailButtonText}>Lihat Detail Pesanan</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header userName="Jhon Doe  " greeting="Delivery Status" />

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
    backButton: { marginTop: theme.spacing.md, backgroundColor: theme.colors.primary, padding: 12, paddingHorizontal: 24, borderRadius: 8 },
    backButtonText: { color: '#FFF', fontWeight: 'bold' }
});