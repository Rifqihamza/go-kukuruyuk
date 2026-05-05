import { useEffect, useState } from 'react';
import { orderService, productService, settingsService } from '../lib/database';
import { Order, Product, QuickAccessItem } from '../types';

const QUICK_ACCESS_ITEMS: QuickAccessItem[] = [
    { id: 'qa-1', name: 'Delivery', icon: 'truck-delivery', urlTo: '/delivery' },
    { id: 'qa-2', name: 'Menu', icon: 'food', urlTo: '/menu' },
    { id: 'qa-3', name: 'Promo', icon: 'tag-multiple', urlTo: '/promo' },
    { id: 'qa-4', name: 'Activity', icon: 'history', urlTo: '/history' },
];

export function useHomeScreen() {
    const [searchText, setSearchText] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [activeOrders, setActiveOrders] = useState<Order[]>([]);
    const [deliveryEstimation, setDeliveryEstimation] = useState('15');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const user = { fullname: 'Jhon Doe', username: 'jhon' };

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const [fetchedProducts, fetchedOrders, estimation] = await Promise.all([
                productService.getAll(),
                orderService.getAll(),
                settingsService.get('delivery_estimation_minutes'),
            ]);

            setProducts(fetchedProducts);
            setActiveOrders(fetchedOrders.filter(order => order.status === 'Pending'));
            setDeliveryEstimation(estimation || '15');
        } catch (err: any) {
            console.error('Error loading home data:', err);
            setError('Gagal memuat data. Silakan tarik layar ke bawah untuk refresh.');
        } finally {
            setIsLoading(false);
        }
    };

    const popularProducts = products.slice(0, 5);

    // Filter dilakukan di komponen menggunakan useDebounce
    const getFilteredProducts = (query: string) => {
        return query
            ? products.filter(item =>
                item.name.toLowerCase().includes(query.toLowerCase())
            )
            : popularProducts;
    };

    return {
        user,
        activeOrders,
        popularProducts,
        allProducts: products,
        getFilteredProducts,
        deliveryEstimation,
        searchText,
        setSearchText,
        quickAccessItems: QUICK_ACCESS_ITEMS,
        isLoading,
        error,
        onRefresh: loadData,
    };
}