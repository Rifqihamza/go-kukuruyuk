import { PAYMENT_METHODS } from '@/src/data/mockData';
import type { PaymentMethod } from '@/src/types';
import { useEffect, useState } from 'react';

export function usePaymentMethods() {
    const [methods, setMethods] = useState<PaymentMethod[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadMethods = async () => {
        try {
            setLoading(true);
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));
            setMethods(PAYMENT_METHODS);
        } catch {
            setError('Gagal memuat metode pembayaran');
        } finally {
            setLoading(false);
        }
    };

    const addMethod = async (method: Omit<PaymentMethod, 'id'>) => {
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));
            const newMethod: PaymentMethod = {
                ...method,
                id: Date.now().toString(),
            };
            setMethods(prev => [...prev, newMethod]);
            return true;
        } catch {
            setError('Gagal menambah metode pembayaran');
            return false;
        }
    };

    const deleteMethod = async (id: string) => {
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));
            setMethods(prev => prev.filter(m => m.id !== id));
            return true;
        } catch {
            setError('Gagal menghapus metode pembayaran');
            return false;
        }
    };

    useEffect(() => {
        loadMethods();
    }, []);

    return {
        methods,
        loading,
        error,
        addMethod,
        deleteMethod,
        refetch: loadMethods,
    };
}