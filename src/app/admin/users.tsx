import { useMockUsers, useRoleAccess, useAppNavigation } from '@/src/hooks';
import { theme } from '@/src/theme';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    TextInput
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AdminUsersPage() {
    const { navigateTo } = useAppNavigation();
    const { canAccessAdminPanel } = useRoleAccess();
    const { users, deleteUser } = useMockUsers();
    const [searchQuery, setSearchQuery] = useState('');

    // Redirect if not admin
    if (!canAccessAdminPanel()) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.centerContainer}>
                    <Ionicons name="shield-checkmark" size={64} color={theme.colors.error} />
                    <Text style={styles.errorTitle}>Access Denied</Text>
                    <Text style={styles.errorText}>
                        Anda tidak memiliki izin untuk mengakses halaman ini.
                    </Text>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigateTo('/admin')}
                    >
                        <Text style={styles.backButtonText}>Kembali</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    const filteredUsers = users.filter(user =>
        user.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'admin':
                return theme.colors.error;
            case 'merchant':
                return theme.colors.warning;
            case 'customer':
                return theme.colors.primary;
            default:
                return theme.colors.disabled;
        }
    };

    const handleDeleteUser = (userId: number, userName: string) => {
        Alert.alert(
            'Hapus User',
            `Apakah Anda yakin ingin menghapus user "${userName}"?`,
            [
                { text: 'Batal', style: 'cancel' },
                {
                    text: 'Hapus',
                    style: 'destructive',
                    onPress: () => {
                        deleteUser(userId);
                        Alert.alert('Berhasil', 'User berhasil dihapus');
                    }
                }
            ]
        );
    };

    const handleAddUser = () => {
        navigateTo('/admin/users/add');
    };

    const handleEditUser = (userId: number) => {
        navigateTo(`/admin/users/${userId}/edit`);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigateTo('/admin')} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Kelola Users</Text>
                <TouchableOpacity onPress={handleAddUser} style={styles.addButton}>
                    <Ionicons name="add" size={24} color={theme.colors.primary} />
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                    <Ionicons name="search" size={20} color={theme.colors.textSecondary} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Cari user..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>{users.length}</Text>
                        <Text style={styles.statLabel}>Total Users</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>
                            {users.filter(u => u.role === 'customer').length}
                        </Text>
                        <Text style={styles.statLabel}>Customers</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>
                            {users.filter(u => u.role === 'merchant').length}
                        </Text>
                        <Text style={styles.statLabel}>Merchants</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>
                            {users.filter(u => u.role === 'admin').length}
                        </Text>
                        <Text style={styles.statLabel}>Admins</Text>
                    </View>
                </View>

                <View style={styles.usersList}>
                    {filteredUsers.map((user) => (
                        <View key={user.id} style={styles.userCard}>
                            <View style={styles.userInfo}>
                                <View style={styles.userHeader}>
                                    <Text style={styles.userName}>{user.fullname}</Text>
                                    <View style={[styles.roleBadge, { backgroundColor: getRoleColor(user.role) + '20' }]}>
                                        <Text style={[styles.roleText, { color: getRoleColor(user.role) }]}>
                                            {user.role}
                                        </Text>
                                    </View>
                                </View>
                                <Text style={styles.userEmail}>{user.email}</Text>
                                <Text style={styles.userPhone}>{user.phone || 'No phone'}</Text>
                            </View>

                            <View style={styles.userActions}>
                                <TouchableOpacity
                                    style={styles.actionButton}
                                    onPress={() => handleEditUser(user.id)}
                                >
                                    <Ionicons name="create-outline" size={20} color={theme.colors.primary} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.actionButton, styles.deleteButton]}
                                    onPress={() => handleDeleteUser(user.id, user.fullname)}
                                >
                                    <Ionicons name="trash-outline" size={20} color={theme.colors.error} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}

                    {filteredUsers.length === 0 && (
                        <View style={styles.emptyState}>
                            <Ionicons name="people-outline" size={48} color={theme.colors.disabled} />
                            <Text style={styles.emptyText}>
                                {searchQuery ? 'Tidak ada user ditemukan' : 'Belum ada user terdaftar'}
                            </Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.xl,
    },
    errorTitle: {
        fontSize: theme.typography.fontSize.xl,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.error,
        marginTop: theme.spacing.md,
        marginBottom: theme.spacing.sm,
    },
    errorText: {
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: theme.spacing.xl,
    },
    backButton: {
        padding: theme.spacing.xs,
    },
    backButtonText: {
        color: theme.colors.primary,
        fontSize: theme.typography.fontSize.md,
        fontWeight: theme.typography.fontWeight.medium,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.md,
        backgroundColor: theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    headerTitle: {
        fontSize: theme.typography.fontSize.lg,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.text,
    },
    addButton: {
        padding: theme.spacing.xs,
    },
    searchContainer: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        backgroundColor: theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
        borderRadius: theme.borderRadius.md,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
    },
    searchInput: {
        flex: 1,
        marginLeft: theme.spacing.sm,
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.text,
    },
    scrollContent: {
        padding: theme.spacing.md,
    },
    statsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: theme.spacing.sm,
        marginBottom: theme.spacing.xl,
    },
    statCard: {
        flex: 1,
        minWidth: '45%',
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    statNumber: {
        fontSize: theme.typography.fontSize.xxl,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.primary,
        marginBottom: 2,
    },
    statLabel: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
        textAlign: 'center',
    },
    usersList: {
        gap: theme.spacing.sm,
    },
    userCard: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
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
    userHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    userName: {
        fontSize: theme.typography.fontSize.md,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.text,
    },
    roleBadge: {
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: 2,
        borderRadius: theme.borderRadius.sm,
    },
    roleText: {
        fontSize: theme.typography.fontSize.xs,
        fontWeight: theme.typography.fontWeight.bold,
        textTransform: 'capitalize',
    },
    userEmail: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
        marginBottom: 2,
    },
    userPhone: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
    },
    userActions: {
        flexDirection: 'row',
        gap: theme.spacing.sm,
    },
    actionButton: {
        padding: theme.spacing.sm,
        borderRadius: theme.borderRadius.sm,
        backgroundColor: theme.colors.backgroundSecondary,
    },
    deleteButton: {
        backgroundColor: theme.colors.error + '10',
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
        textAlign: 'center',
    },
});