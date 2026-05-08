import { useAuth } from '../contexts/AuthContext';

export type UserRole = 'customer' | 'merchant' | 'admin';

export function useRoleAccess() {
    const { user } = useAuth();

    const hasRole = (roles: UserRole | UserRole[]): boolean => {
        if (!user) return false;

        const userRole = user.role as UserRole;
        if (Array.isArray(roles)) {
            return roles.includes(userRole);
        }
        return userRole === roles;
    };

    const isAdmin = () => hasRole('admin');
    const isMerchant = () => hasRole('merchant');
    const isCustomer = () => hasRole('customer');

    const canAccessAdminPanel = () => hasRole('admin');
    const canAccessMerchantPanel = () => hasRole(['merchant', 'admin']);
    const canAccessCustomerFeatures = () => hasRole(['customer', 'merchant', 'admin']);

    const getRoleDisplayName = (): string => {
        if (!user) return 'Guest';

        switch (user.role) {
            case 'admin':
                return 'Administrator';
            case 'merchant':
                return 'Merchant';
            case 'customer':
                return 'Customer';
            default:
                return 'User';
        }
    };

    const getRoleColor = (): string => {
        if (!user) return '#666666';

        switch (user.role) {
            case 'admin':
                return '#FF6B6B'; // Red
            case 'merchant':
                return '#4ECDC4'; // Teal
            case 'customer':
                return '#45B7D1'; // Blue
            default:
                return '#666666';
        }
    };

    return {
        user,
        userRole: user?.role as UserRole,
        hasRole,
        isAdmin,
        isMerchant,
        isCustomer,
        canAccessAdminPanel,
        canAccessMerchantPanel,
        canAccessCustomerFeatures,
        getRoleDisplayName,
        getRoleColor,
    };
}