import { useEffect, useState } from 'react';
import { MOCK_NOTIFICATIONS } from '@/src/data/mockData';
import { AppNotification } from '../types';

export const useNotifications = () => {
    const [notifications, setNotifications] = useState<AppNotification[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchNotifications = async () => {
        setIsLoading(true);
        
        // Simulate async loading with static data
        await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay to simulate loading
        
        // Sort by createdAt descending (newest first)
        const sortedNotifications = [...MOCK_NOTIFICATIONS].sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        
        setNotifications(sortedNotifications);
        setIsLoading(false);
    };

    const markAsRead = async (id: string) => {
        // Update the mock data
        const updatedNotifications = MOCK_NOTIFICATIONS.map(notification => 
            notification.id === id 
                ? { ...notification, isRead: true } 
                : notification
        );
        
        // Update state with sorted data
        const sortedNotifications = [...updatedNotifications].sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        
        setNotifications(sortedNotifications);
        
        // Refresh data after a short delay to simulate async update
        setTimeout(fetchNotifications, 500);
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    return { notifications, isLoading, markAsRead, onRefresh: fetchNotifications };
};