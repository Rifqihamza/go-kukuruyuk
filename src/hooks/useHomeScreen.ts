import { useEffect, useState } from 'react';
import { USER_DATA, MENU_ITEMS, ORDER_HISTORY } from '../data/mockData';
import { Order, Product, QuickAccessItem, User } from '../types';

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
    const [deliveryEstimation, setDeliveryEstimation] = useState('0');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const user: User = USER_DATA[0] || { id: 1, username: 'Jhon', fullname: 'Jhon Doe', email: 'jhondoe@gmail.com', password: 'jhon123', avatarImg: '' };

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            // Simulate async loading with static data
            await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay to simulate loading

            setProducts(MENU_ITEMS);

            // 1. Filter pesanan yang masih berjalan (Pending)
            const active = ORDER_HISTORY.filter((order: Order) =>
                order.status === 'Pending'
            );

            setActiveOrders(active);

            // 2. LOGIC BARU: Cek apakah ada pesanan aktif
            if (active.length > 0) {
                // Jika ada pesanan, gunakan estimasi dari database (default 15 menit jika tidak ada)
                setDeliveryEstimation('15 Menit'); // Using default since no settings in mockData
            } else {
                // Jika tidak ada pesanan, ubah teksnya
                setDeliveryEstimation('Belum ada pesanan');
            }

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