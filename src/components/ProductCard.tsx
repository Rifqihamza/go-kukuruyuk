import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../theme';
import { Product } from '../types';

interface Props {
    product: Product;
    onPress: (product: Product) => void;
}

export const ProductCard = React.memo<Props>(({ product, onPress }) => (
    <TouchableOpacity
        style={styles.card}
        onPress={() => onPress(product)}
        activeOpacity={0.7}
    >
        <View style={styles.imageContainer}>
            {product.image ? (
                <Image source={{ uri: product.image }} style={styles.image} />
            ) : (
                <View style={styles.placeholderImage}>
                    <Ionicons name="fast-food-outline" size={32} color={theme.colors.primary} />
                </View>
            )}
            {!product.isAvailable && (
                <View style={styles.outOfStockBadge}>
                    <Text style={styles.outOfStockText}>Habis</Text>
                </View>
            )}
        </View>
        <View style={styles.content}>
            <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
            {product.description && (
                <Text style={styles.description} numberOfLines={2}>{product.description}</Text>
            )}
            <Text style={styles.price}>Rp {product.price.toLocaleString('id-ID')}</Text>
        </View>
    </TouchableOpacity>
));

ProductCard.displayName = 'ProductCard';

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: theme.colors.surface,
        marginHorizontal: theme.spacing.md,
        marginVertical: theme.spacing.xs,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.sm,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    imageContainer: {
        position: 'relative' as const,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: theme.borderRadius.sm,
        backgroundColor: theme.colors.backgroundSecondary,
    },
    placeholderImage: {
        width: 80,
        height: 80,
        borderRadius: theme.borderRadius.sm,
        backgroundColor: theme.colors.backgroundSecondary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    outOfStockBadge: {
        position: 'absolute' as const,
        top: 4,
        left: 4,
        backgroundColor: theme.colors.error,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    outOfStockText: {
        color: theme.colors.textLight,
        fontSize: theme.typography.fontSize.xs,
        fontWeight: theme.typography.fontWeight.bold,
    },
    content: {
        flex: 1,
        marginLeft: theme.spacing.sm,
        justifyContent: 'center',
    },
    name: {
        fontWeight: theme.typography.fontWeight.semibold,
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.text,
    },
    description: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
        marginTop: 2,
    },
    price: {
        color: theme.colors.primary,
        fontWeight: theme.typography.fontWeight.bold,
        fontSize: theme.typography.fontSize.md,
        marginTop: 4,
    },
});