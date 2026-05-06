import { supabase } from '@/src/lib/supabase';
import { useEffect, useState } from 'react';

export const useNotifications = () => {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchNotifications = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('notifications')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error("Error fetching notifications:", error);
        else setNotifications(data);
        setIsLoading(false);
    };

    const markAsRead = async (id: string) => {
        await supabase
            .from('notifications')
            .update({ is_read: true })
            .eq('id', id);

        fetchNotifications(); // Refresh data
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    return { notifications, isLoading, markAsRead, onRefresh: fetchNotifications };
};