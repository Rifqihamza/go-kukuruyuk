import { theme } from '@/src/theme';
export const getNotificationStyle = (type: string) => {
    switch (type) {
        case 'ORDER_COMPLETED':
            return { icon: 'checkmark-circle', color: theme.colors.success };
        case 'PROMO':
            return { icon: 'pricetag', color: theme.colors.primary };
        default:
            return { icon: 'notifications', color: theme.colors.textSecondary };
    }
};