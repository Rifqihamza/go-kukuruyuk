import { theme } from '@/src/theme';
import { getNotificationStyle } from '@/src/utils/notificationHelper';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNotifications } from '../hooks/useNotification';

export default function NotificationsScreen() {
    const router = useRouter();
    const { notifications, isLoading, markAsRead } = useNotifications();

    const renderItem = ({ item }: { item: any }) => {
        const { icon, color } = getNotificationStyle(item.type);

        return (
            <TouchableOpacity
                style={[styles.notificationCard, !item.is_read && styles.unreadCard]}
                onPress={() => !item.is_read && markAsRead(item.id)}
                activeOpacity={0.7}
            >
                <View style={[styles.iconContainer, { backgroundColor: color + '15' }]}>
                    <Ionicons name={icon as any} size={22} color={color} />
                </View>
                <View style={styles.content}>
                    <View style={styles.titleRow}>
                        <Text style={[styles.title, !item.is_read && styles.unreadTitle]}>{item.title}</Text>
                        {!item.is_read && <View style={styles.unreadDot} />}
                    </View>
                    <Text style={styles.message} numberOfLines={2}>{item.message}</Text>
                    <Text style={styles.time}>{new Date(item.created_at).toLocaleDateString()}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.topBarTitle}>Notifikasi</Text>
                <View style={{ width: 40 }} />
            </View>

            {isLoading ? (
                <ActivityIndicator size="large" color={theme.colors.primary} style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={notifications}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Tidak ada notifikasi.</Text>}
                />
            )}
        </SafeAreaView>
    );
}
// ... (StyleSheet tidak perlu diubah, tetap sama)

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: theme.spacing.md, paddingVertical: theme.spacing.sm, backgroundColor: theme.colors.surface, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
    backButton: { width: 40, height: 40, borderRadius: theme.borderRadius.full, alignItems: 'center', justifyContent: 'center' },
    topBarTitle: { fontSize: theme.typography.fontSize.lg, fontWeight: theme.typography.fontWeight.semibold, color: theme.colors.text },
    listContent: { padding: theme.spacing.md },
    headerActions: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.md },
    headerCount: { fontSize: theme.typography.fontSize.sm, color: theme.colors.textSecondary },
    markAllRead: { fontSize: theme.typography.fontSize.sm, color: theme.colors.primary, fontWeight: theme.typography.fontWeight.medium },
    notificationCard: { flexDirection: 'row', backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.md, padding: theme.spacing.sm, marginBottom: theme.spacing.sm, gap: theme.spacing.sm },
    unreadCard: { backgroundColor: theme.colors.primaryLight + '08' },
    iconContainer: { width: 44, height: 44, borderRadius: theme.borderRadius.full, alignItems: 'center', justifyContent: 'center' },
    content: { flex: 1 },
    titleRow: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.xs },
    title: { fontSize: theme.typography.fontSize.md, color: theme.colors.text, fontWeight: theme.typography.fontWeight.medium },
    unreadTitle: { fontWeight: theme.typography.fontWeight.bold },
    unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: theme.colors.primary },
    message: { fontSize: theme.typography.fontSize.sm, color: theme.colors.textSecondary, marginTop: 2, lineHeight: 18 },
    time: { fontSize: theme.typography.fontSize.xs, color: theme.colors.disabled, marginTop: 4 },
});