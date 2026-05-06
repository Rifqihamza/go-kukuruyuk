import Button from '@/src/components/Button';
import { useCartStore } from '@/src/hooks/useCartStore';
import { productService } from '@/src/lib/database';
import { theme } from '@/src/theme';
import { Product } from '@/src/types';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProductDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { addItem, items } = useCartStore();
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProduct = async () => {
            if (!id) return;
            setIsLoading(true);
            setError(null);

            try {
                const fetched = await productService.getById(id);
                setProduct(fetched);
                if (!fetched) {
                    setError('Produk tidak ditemukan');
                }
            } catch (err: any) {
                console.error('Error loading product:', err);
                setError('Gagal memuat detail produk');
            } finally {
                setIsLoading(false);
            }
        };

        loadProduct();
    }, [id]);

    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                    <Text style={styles.loadingText}>Memuat...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (error || !product) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.centerContainer}>
                    <Ionicons name="sad-outline" size={64} color={theme.colors.disabled} />
                    <Text style={styles.errorTitle}>{error || 'Produk tidak ditemukan'}</Text>
                    <Button title="Kembali" onPress={() => router.back()} variant="outline" />
                </View>
            </SafeAreaView>
        );
    }

    const cartItem = items.find(item => item.productId === product.id);
    const currentQtyInCart = cartItem?.quantity ?? 0;

    const handleAddToCart = () => {
        addItem({
            productId: product.id,
            productName: product.name,
            price: product.price,
            quantity,
            image: product.image,
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.topBarTitle}>Detail Menu</Text>
                <View style={styles.backButton} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.imageContainer}>
                    {product.image ? (
                        <Image source={{ uri: product.image }} style={styles.image} />
                    ) : (
                        <View style={styles.placeholderImage}>
                            <Ionicons name="fast-food-outline" size={80} color={theme.colors.primary} />
                        </View>
                    )}
                </View>

                <View style={styles.infoSection}>
                    <Text style={styles.category}>{product.category}</Text>
                    <Text style={styles.name}>{product.name}</Text>
                    <Text style={styles.price}>Rp {product.price.toLocaleString('id-ID')}</Text>

                    {product.description && (
                        <Text style={styles.description}>{product.description}</Text>
                    )}

                    {!product.isAvailable && (
                        <View style={styles.unavailableBadge}>
                            <Text style={styles.unavailableText}>Menu ini sedang tidak tersedia</Text>
                        </View>
                    )}
                </View>

                <View style={styles.quantitySection}>
                    <Text style={styles.sectionTitle}>Jumlah</Text>
                    <View style={styles.quantityControls}>
                        <TouchableOpacity
                            style={[styles.quantityButton, quantity <= 1 && styles.quantityButtonDisabled]}
                            onPress={() => setQuantity(q => Math.max(1, q - 1))}
                            disabled={quantity <= 1}
                        >
                            <Ionicons name="remove" size={24} color={quantity <= 1 ? theme.colors.disabled : theme.colors.primary} />
                        </TouchableOpacity>
                        <Text style={styles.quantityValue}>{quantity}</Text>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => setQuantity(q => q + 1)}
                        >
                            <Ionicons name="add" size={24} color={theme.colors.primary} />
                        </TouchableOpacity>
                    </View>
                </View>

                {currentQtyInCart > 0 && (
                    <View style={styles.cartInfo}>
                        <Ionicons name="cart" size={16} color={theme.colors.success} />
                        <Text style={styles.cartInfoText}>
                            Sudah ada {currentQtyInCart} item di keranjang
                        </Text>
                    </View>
                )}
            </ScrollView>

            <View style={styles.bottomBar}>
                <View style={styles.totalPrice}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalValue}>
                        Rp {(product.price * quantity).toLocaleString('id-ID')}
                    </Text>
                </View>
                <Button
                    title={currentQtyInCart > 0 ? "Tambah Lagi" : "Tambah ke Keranjang"}
                    onPress={handleAddToCart}
                    size="lg"
                    disabled={!product.isAvailable}
                    style={styles.addButton}
                />
            </View>
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
        gap: theme.spacing.md,
        padding: theme.spacing.xl,
    },
    loadingText: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
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
    imageContainer: {
        alignItems: 'center',
        paddingVertical: theme.spacing.xl,
        backgroundColor: theme.colors.surface,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: theme.borderRadius.lg,
    },
    placeholderImage: {
        width: 200,
        height: 200,
        borderRadius: theme.borderRadius.lg,
        backgroundColor: theme.colors.backgroundSecondary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoSection: {
        padding: theme.spacing.md,
        backgroundColor: theme.colors.surface,
        marginTop: 1,
    },
    category: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.primary,
        fontWeight: theme.typography.fontWeight.medium,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    name: {
        fontSize: theme.typography.fontSize.xxl,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.text,
        marginTop: 4,
    },
    price: {
        fontSize: theme.typography.fontSize.xl,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.primary,
        marginTop: theme.spacing.sm,
    },
    description: {
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.sm,
        lineHeight: 22,
    },
    unavailableBadge: {
        backgroundColor: theme.colors.error + '15',
        padding: theme.spacing.sm,
        borderRadius: theme.borderRadius.sm,
        marginTop: theme.spacing.sm,
    },
    unavailableText: {
        color: theme.colors.error,
        fontWeight: theme.typography.fontWeight.medium,
        textAlign: 'center',
    },
    quantitySection: {
        padding: theme.spacing.md,
        backgroundColor: theme.colors.surface,
        marginTop: 1,
    },
    sectionTitle: {
        fontSize: theme.typography.fontSize.md,
        fontWeight: theme.typography.fontWeight.semibold,
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,
    },
    quantityButton: {
        width: 44,
        height: 44,
        borderRadius: theme.borderRadius.full,
        borderWidth: 1.5,
        borderColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityButtonDisabled: {
        borderColor: theme.colors.disabled,
    },
    quantityValue: {
        fontSize: theme.typography.fontSize.xl,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.text,
        minWidth: 40,
        textAlign: 'center',
    },
    cartInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.xs,
        padding: theme.spacing.md,
        backgroundColor: theme.colors.success + '10',
        marginHorizontal: theme.spacing.md,
        marginTop: theme.spacing.sm,
        borderRadius: theme.borderRadius.sm,
    },
    cartInfoText: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.success,
        fontWeight: theme.typography.fontWeight.medium,
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
    totalPrice: {
        flex: 1,
    },
    totalLabel: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
    },
    totalValue: {
        fontSize: theme.typography.fontSize.lg,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.primary,
    },
    addButton: {
        flex: 2,
    },
    errorTitle: {
        fontSize: theme.typography.fontSize.lg,
        color: theme.colors.textSecondary,
        fontWeight: theme.typography.fontWeight.semibold,
    },
});