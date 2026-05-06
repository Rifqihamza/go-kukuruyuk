import { useRouter } from 'expo-router';

export const useAppNavigation = () => {
    const router = useRouter();

    // Helper untuk navigasi dengan parameter
    const navigateTo = (path: string, params?: Record<string, any>) => {
        router.push({
            pathname: path as any,
            params: params,
        });
    };

    // Helper untuk replace (mengganti halaman, cocok untuk Login/Logout)
    const replaceTo = (path: string, params?: Record<string, any>) => {
        router.replace({
            pathname: path as any,
            params: params,
        });
    };

    // Helper Back yang Aman (Kembali jika bisa, ke Index jika tidak)
    const goBack = (fallbackPath: string) => {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace(fallbackPath as any);
        }
    };

    return { navigateTo, replaceTo, goBack };
};