import { useCallback, useEffect, useState } from 'react';
import { orderService } from '../lib/database';
import { Order } from '../types';

export const useOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadOrders = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await orderService.getAll();
            setOrders(data);
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError('Gagal memuat pesanan');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadOrders();
    }, [loadOrders]);

    // Filter pesanan yang aktif untuk ditampilkan di layar Delivery
    const activeOrders = orders.filter(order =>
        ['Pending', 'Processing', 'In Transit'].includes(order.status)
    );

    return {
        orders,          // Semua pesanan (untuk history)
        activeOrders,    // Hanya pesanan aktif
        isLoading,
        error,
        refetch: loadOrders
    };
};