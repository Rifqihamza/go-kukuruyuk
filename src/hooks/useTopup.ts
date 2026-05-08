import { useState } from 'react';

interface TopUpParams {
    amount: number;
    paymentMethodId: string;
}

export function useTopUp() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const processTopUp = async (params: TopUpParams) => {
        try {
            setLoading(true);
            setError(null);
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Mock validation
            if (params.amount <= 0) {
                throw new Error('Jumlah top up harus lebih dari 0');
            }

            // Mock successful top up
            const result = {
                transactionId: `TOPUP_${Date.now()}`,
                amount: params.amount,
                paymentMethodId: params.paymentMethodId,
                status: 'success',
                timestamp: new Date().toISOString(),
            };

            return { success: true, data: result };
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Top up gagal';
            setError(errorMsg);
            return { success: false, error: errorMsg };
        } finally {
            setLoading(false);
        }
    };

    return {
        processTopUp,
        loading,
        error,
    };
}