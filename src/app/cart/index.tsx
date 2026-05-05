import Button from '@/src/components/Button';
import { useCartStore } from '@/src/store/cartStore';
import { theme } from '@/src/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CartScreen() {
    const router = useRouter();
    const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
    const totalPrice = getTotalPrice();

    const renderItem = ({ item }: { item: ReturnType<typeof useCartStore.getState>['items'][0] }) => (
        <View style={styles.cartItem}>
            <View style={styles.itemImage}>
                {item.image ? (
                    <Image source={{ uri: item.image }} style={styles.image} />
                ) : (
                    <Ionicons name="fast-food-outline" size={28} color={theme.colors.primary} />
                )}
            </View>
            <View style={styles.itemInfo}>
                <Text style={styles.itemName} numberOfLines={1}>{item.productName}</Text>
                <Text style={styles.itemPrice}>Rp {item.price.toLocaleString('id-ID')}</Text>
                <View style={styles.quantityRow}>
                    <TouchableOpacity
                        style={styles.qtyButton}
                        onPress={() => updateQuantity(item.productId, item.quantity - 1)}
                    >
                        <Ionicons name="remove" size={16} color={theme.colors.primary} />
                    </TouchableOpacity>
                    <Text style={styles.qtyValue}>{item.quantity}</Text>
                    <TouchableOpacity
                        style={styles.qtyButton}
                        onPress={() => updateQuantity(item.productId, item.quantity + 1)}
                    >
                        <Ionicons name="add" size={16} color={theme.colors.primary} />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => removeItem(item.productId)}
            >
                <Ionicons name="trash-outline" size={20} color={theme.colors.error} />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.topBarTitle}>Keranjang</Text>
                {items.length > 0 && (
                    <TouchableOpacity onPress={clearCart}>
                        <Text style={styles.clearText}>Hapus Semua</Text>
                    </TouchableOpacity>
                )}
            </View>

            {items.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons name="cart-outline" size={80} color={theme.colors.disabled} />
                    <Text style={styles.emptyTitle}>Keranjang kosong</Text>
                    <Text style={styles.emptySubtitle}>Tambahkan menu favorit kamu</Text>
                    <Button
                        title="Mulai Pesan"
                        onPress={() => router.push('/')}
                        size="md"
                        style={styles.shopButton}
                    />
                </View>
            ) : (
                <>
                    <FlatList
                        data={items}
                        keyExtractor={(item) => item.productId}
                        renderItem={renderItem}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                    />
                    <View style={styles.bottomBar}>
                        <View style={styles.totalSection}>
                            <Text style={styles.totalLabel}>Total</Text>
                            <Text style={styles.totalPrice}>Rp {totalPrice.toLocaleString('id-ID')}</Text>
                        </View>
                        <Button
                            title="Pesan Sekarang"
                            onPress={() => { }}
                            size="lg"
                            style={styles.checkoutButton}
                        />
                    </View>
                </>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        backgroundColor: theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: theme.borderRadius.full,
        alignItems: 'center',
        justifyContent: 'center',
    },
    topBarTitle: {
        fontSize: theme.typography.fontSize.lg,
        fontWeight: theme.typography.fontWeight.semibold,
        color: theme.colors.text,
    },
    clearText: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.error,
        fontWeight: theme.typography.fontWeight.medium,
    },
    listContent: {
        padding: theme.spacing.md,
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.sm,
        marginBottom: theme.spacing.sm,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: theme.borderRadius.sm,
        backgroundColor: theme.colors.backgroundSecondary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: theme.borderRadius.sm,
    },
    itemInfo: {
        flex: 1,
        marginLeft: theme.spacing.sm,
    },
    itemName: {
        fontSize: theme.typography.fontSize.md,
        fontWeight: theme.typography.fontWeight.semibold,
        color: theme.colors.text,
    },
    itemPrice: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.primary,
        fontWeight: theme.typography.fontWeight.medium,
        marginTop: 2,
    },
    quantityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
        marginTop: theme.spacing.xs,
    },
    qtyButton: {
        width: 28,
        height: 28,
        borderRadius: theme.borderRadius.full,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    qtyValue: {
        fontSize: theme.typography.fontSize.md,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.text,
        minWidth: 20,
        textAlign: 'center',
    },
    deleteButton: {
        padding: theme.spacing.sm,
    },
    bottomBar: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.md,
        backgroundColor: theme.colors.surface,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        gap: theme.spacing.md,
    },
    totalSection: {
        flex: 1,
    },
    totalLabel: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
    },
    totalPrice: {
        fontSize: theme.typography.fontSize.lg,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.primary,
    },
    checkoutButton: {
        flex: 2,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing.xl,
    },
    emptyTitle: {
        fontSize: theme.typography.fontSize.xl,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.text,
        marginTop: theme.spacing.md,
    },
    emptySubtitle: {
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.textSecondary,
        marginTop: 4,
    },
    shopButton: {
        marginTop: theme.spacing.lg,
    },
});