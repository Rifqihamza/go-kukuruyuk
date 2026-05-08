import { useAppNavigation, useMockUsers } from '@/src/hooks';
import { theme } from '@/src/theme';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Halaman debugging untuk melihat daftar users (hanya untuk development)
export default function DebugUsersScreen() {
    const { users } = useMockUsers();
    const { goBack } = useAppNavigation()
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => goBack('./(tabs)/settings')} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <View>
                    <Text style={styles.headerTitle}>Debug: Registered Users</Text>
                    <Text style={styles.headerSubtitle}>Total: {users.length} users</Text>
                </View>
            </View>

            <ScrollView style={styles.scrollView}>
                {users.map((user) => (
                    <View key={user.id} style={styles.userCard}>
                        <View style={styles.userInfo}>
                            <Text style={styles.userName}>{user.fullname}</Text>
                            <Text style={styles.userEmail}>{user.email}</Text>
                            <Text style={styles.userUsername}>@{user.username}</Text>
                        </View>
                        <View style={styles.userMeta}>
                            <Text style={styles.userId}>ID: {user.id}</Text>
                        </View>
                    </View>
                ))}

                {users.length === 0 && (
                    <View style={styles.emptyState}>
                        <Ionicons name="people-outline" size={48} color={theme.colors.disabled} />
                        <Text style={styles.emptyText}>Belum ada user terdaftar</Text>
                    </View>
                )}
            </ScrollView>

            <View style={styles.infoCard}>
                <Ionicons name="information-circle-outline" size={20} color={theme.colors.primary} />
                <Text style={styles.infoText}>
                    Halaman ini hanya untuk debugging. Data disimpan di localStorage selama session browser.
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: theme.spacing.md,
        backgroundColor: theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    headerTitle: {
        fontSize: theme.typography.fontSize.lg,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.text,
    },
    headerSubtitle: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
        marginTop: 2,
    },
    scrollView: {
        flex: 1,
        padding: theme.spacing.md,
    },
    userCard: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        marginBottom: theme.spacing.sm,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: theme.typography.fontSize.md,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.text,
    },
    userEmail: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
        marginTop: 2,
    },
    userUsername: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.primary,
        marginTop: 2,
    },
    userMeta: {
        alignItems: 'flex-end',
    },
    userId: {
        fontSize: theme.typography.fontSize.xs,
        color: theme.colors.disabled,
        fontWeight: theme.typography.fontWeight.medium,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: theme.spacing.xl,
    },
    emptyText: {
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.md,
    },
    infoCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: theme.colors.primary + '10',
        margin: theme.spacing.md,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        borderLeftWidth: 4,
        borderLeftColor: theme.colors.primary,
    },
    infoText: {
        flex: 1,
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
        marginLeft: theme.spacing.sm,
        lineHeight: 18,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: theme.borderRadius.full,
        alignItems: 'center',
        justifyContent: 'center',
    },
});