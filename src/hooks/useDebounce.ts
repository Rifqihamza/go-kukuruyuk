import { useEffect, useState } from 'react';

/**
 * Hook untuk menunda update value sampai user berhenti mengetik.
 * @param value Nilai yang ingin di-debounce
 * @param delay Waktu tunggu dalam ms (default: 300ms)
 * @returns Nilai setelah delay
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}