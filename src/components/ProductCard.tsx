import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Product } from '../types';

interface Props {
    item: Product;
    onPress: () => void;
}

export const ProductCard = ({ item, onPress }: Props) => (
    <TouchableOpacity style={styles.card} onPress={onPress}>
        <Text style={styles.icon}>{item.image}</Text>
        <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>Rp {item.price.toLocaleString()}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    card: { padding: 15, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginVertical: 8, borderRadius: 12 },
    icon: { fontSize: 30, marginRight: 15 },
    name: { fontWeight: 'bold', fontSize: 16 },
    price: { color: '#FF6B00' }
});