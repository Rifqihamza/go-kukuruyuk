import { ProductCard } from '@/src/components/ProductCard';
import Search from '@/src/components/Search';
import { categoryService, productService } from '@/src/lib/database';
import { theme } from '@/src/theme';
import { Category, Product } from '@/src/types';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function MenuPage() {
    const router = useRouter();
    const params = useLocalSearchParams<{ productId?: string }>();
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const flatListRef = useRef<FlatList<Product>>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const [fetchedProducts, fetchedCategories] = await Promise.all([
                productService.getAll(),
                categoryService.getAll(),
            ]);
            setProducts(fetchedProducts);
            setCategories(fetchedCategories);
        } catch (err: any) {
            console.error('Error loading menu:', err);
            setError('Gagal memuat menu. Silakan refresh.');
        } finally {
            setIsLoading(false);
        }
    };

    const filteredMenu = useMemo(() => {
        let items = products;

        if (searchText) {
            items = items.filter((item) =>
                item.name.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        if (selectedCategory) {
            items = items.filter((item) => item.category === selectedCategory);
        }

        return items;
    }, [searchText, selectedCategory, products]);

    // Scroll to highlighted product if productId is passed
    useEffect(() => {
        if (params.productId && products.length > 0 && !isLoading) {
            const index = filteredMenu.findIndex(p => p.id === params.productId);
            if (index >= 0) {
                setTimeout(() => {
                    flatListRef.current?.scrollToIndex({
                        index,
                        animated: true,
                        viewPosition: 0.5,
                    });
                }, 300);
            }
        }
    }, [params.productId, filteredMenu, isLoading, products]);

    const handleProductPress = (product: Product) => {
        (router as any).push(`/product/${product.id}`);
    };

    const handleCategoryPress = (category: string | null) => {
        setSelectedCategory(category);
    };

    const renderItem = ({ item }: { item: Product }) => (
        <ProductCard product={item} onPress={handleProductPress} />
    );

    const renderHeader = () => (
        <View>
            <Search
                placeholder="Cari Menu Apa?"
                value={searchText}
                onChange={(text) => setSearchText(text)}
            />

            {/* Categories */}
            {categories.length > 0 && (
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Kategori</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoryContainer}
                    >
                        <TouchableOpacity
                            style={[
                                styles.categoryChip,
                                selectedCategory === null && styles.categoryChipActive,
                            ]}
                            onPress={() => handleCategoryPress(null)}
                        >
                            <Text style={[styles.categoryText, selectedCategory === null && styles.categoryTextActive]}>
                                Semua
                            </Text>
                        </TouchableOpacity>
                        {categories.map((cat) => (
                            <TouchableOpacity
                                key={cat.id}
                                style={[
                                    styles.categoryChip,
                                    selectedCategory === cat.name && styles.categoryChipActive,
                                ]}
                                onPress={() => handleCategoryPress(cat.name)}
                            >
                                <Text style={[styles.categoryText, selectedCategory === cat.name && styles.categoryTextActive]}>
                                    {cat.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}

            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>
                    {selectedCategory ? selectedCategory : 'Semua Menu'}
                </Text>
            </View>
        </View>
    );

    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                    <Text style={styles.loadingText}>Memuat menu...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.centerContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity style={styles.retryButton} onPress={loadData}>
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
                    <Ionicons name='fast-food' size={26} />
                    <Text style={styles.headerTitle}>Menu</Text>
                </View>
                {products.length > 0 && (
                    <Text style={styles.headerSubtitle}>
                        {products.length} pesanan
                    </Text>
                )}
            </View>
            <FlatList
                ref={flatListRef}
                data={filteredMenu}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ListHeaderComponent={renderHeader}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>
                            Menu tidak ditemukan.
                        </Text>
                    </View>
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                onScrollToIndexFailed={(info) => {
                    flatListRef.current?.scrollToOffset({
                        offset: info.averageItemLength * info.index,
                        animated: true,
                    });
                }}
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
    listContent: {
        paddingBottom: theme.spacing.xxl,
    },
    sectionContainer: {
        paddingHorizontal: theme.spacing.md,
        marginTop: theme.spacing.sm,
    },
    sectionTitle: {
        fontSize: theme.typography.fontSize.lg,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },
    categoryContainer: {
        paddingRight: theme.spacing.md,
        gap: theme.spacing.sm,
    },
    categoryChip: {
        paddingVertical: theme.spacing.xs,
        paddingHorizontal: theme.spacing.md,
        borderRadius: theme.borderRadius.full,
        backgroundColor: theme.colors.backgroundSecondary,
    },
    categoryChipActive: {
        backgroundColor: theme.colors.primary,
    },
    categoryText: {
        fontSize: theme.typography.fontSize.sm,
        fontWeight: theme.typography.fontWeight.medium,
        color: theme.colors.textSecondary,
    },
    categoryTextActive: {
        color: theme.colors.textLight,
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