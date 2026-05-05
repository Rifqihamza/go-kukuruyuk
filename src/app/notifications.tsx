import { theme } from '@/src/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    read: boolean;
    icon: keyof typeof Ionicons.glyphMap;
    iconColor: string;
}

const NOTIFICATIONS: Notification[] = [
    { id: 'n1', title: 'Pesanan Selesai', message: 'Pesanan ORD001 telah selesai. Nikmati makanan Anda!', time: '2 jam lalu', read: false, icon: 'checkmark-circle', iconColor: theme.colors.success },
    { id: 'n2', title: 'Poin Ditambahkan', message: 'Anda mendapatkan 18 poin dari pesanan Ayam Geprek.', time: '2 jam lalu', read: false, icon: 'gift', iconColor: theme.colors.secondary },
    { id: 'n3', title: 'Promo Spesial!', message: 'Diskon 20% untuk semua menu Main Course hari ini!', time: '1 hari lalu', read: true, icon: 'pricetag', iconColor: theme.colors.primary },
    { id: 'n4', title: 'Pesanan Diproses', message: 'Pesanan ORD003 sedang diproses oleh dapur.', time: '1 hari lalu', read: true, icon: 'time', iconColor: theme.colors.warning },
    { id: 'n5', title: 'Selamat Datang', message: 'Selamat bergabung di Go Kukuruyuk! Nikmati berbagai menu lezat kami.', time: '3 hari lalu', read: true, icon: 'happy', iconColor: theme.colors.primary },
];

export default function NotificationsScreen() {
    const router = useRouter();

    const renderItem = ({ item }: { item: Notification }) => (
        <TouchableOpacity style={[styles.notificationCard, !item.read && styles.unreadCard]} activeOpacity={0.7}>
            <View style={[styles.iconContainer, { backgroundColor: item.iconColor + '15' }]}>
                <Ionicons name={item.icon} size={22} color={item.iconColor} />
            </View>
            <View style={styles.content}>
                <View style={styles.titleRow}>
                    <Text style={[styles.title, !item.read && styles.unreadTitle]}>{item.title}</Text>
                    {!item.read && <View style={styles.unreadDot} />}
                </View>
                <Text style={styles.message} numberOfLines={2}>{item.message}</Text>
                <Text style={styles.time}>{item.time}</Text>
            </View>
        </TouchableOpacity>
    );

    const renderHeader = () => (
        <View style={styles.headerActions}>
            <Text style={styles.headerCount}>{NOTIFICATIONS.filter(n => !n.read).length} belum dibaca</Text>
            <TouchableOpacity>
                <Text style={styles.markAllRead}>Tandai semua dibaca</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.topBarTitle}>Notifikasi</Text>
                <View style={{ width: 40 }} />
            </View>

            <FlatList
                data={NOTIFICATIONS}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ListHeaderComponent={renderHeader}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

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