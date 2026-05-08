import { useAuth } from '@/src/contexts/AuthContext';
import { useAppNavigation, useRoleAccess } from '@/src/hooks';
import { theme } from '@/src/theme';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SettingRowProps {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    value?: string;
    isSwitch?: boolean;
    switchValue?: boolean;
    onSwitchChange?: (value: boolean) => void;
    onPress?: () => void;
    isDanger?: boolean;
}

function SettingRow({
    icon,
    label,
    value,
    isSwitch = false,
    switchValue = false,
    onSwitchChange,
    onPress,
    isDanger = false,
}: SettingRowProps) {
    return (
        <TouchableOpacity
            style={styles.settingRow}
            onPress={onPress}
            disabled={isSwitch}
            activeOpacity={isSwitch ? 1 : 0.6}
        >
            <View style={styles.settingLeft}>
                <Ionicons
                    name={icon}
                    size={22}
                    color={isDanger ? theme.colors.error : theme.colors.primary}
                />
                <Text style={[styles.settingLabel, isDanger && styles.dangerText]}>
                    {label}
                </Text>
            </View>
            <View style={styles.settingRight}>
                {value && <Text style={styles.settingValue}>{value}</Text>}
                {isSwitch && (
                    <Switch
                        value={switchValue}
                        onValueChange={onSwitchChange}
                        trackColor={{ false: theme.colors.disabled, true: theme.colors.primaryLight }}
                        thumbColor={switchValue ? theme.colors.primary : '#f4f3f4'}
                    />
                )}
                {!isSwitch && !value && (
                    <Ionicons name="chevron-forward" size={20} color={theme.colors.disabled} />
                )}
            </View>
        </TouchableOpacity>
    );
}

export default function SettingPage() {
    const { navigateTo } = useAppNavigation();
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [darkModeEnabled, setDarkModeEnabled] = useState(false);
    const { user, signOut } = useAuth();
    const { canAccessAdminPanel, canAccessMerchantPanel, isAdmin } = useRoleAccess();

    const handleLogout = async () => {
        // Tampilkan konfirmasi logout
        Alert.alert(
            'Konfirmasi Logout',
            'Apakah Anda yakin ingin keluar?',
            [
                {
                    text: 'Batal',
                    style: 'cancel',
                },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            console.log('Logging out...');
                            await signOut();
                            console.log('Logout successful');
                            // Navigate to login page after successful logout
                            navigateTo('/(auth)/sign-page');
                        } catch (error) {
                            console.error('Logout error:', error);
                            // Still navigate to login even if logout fails
                            navigateTo('/(auth)/sign-page');
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Ionicons name='settings' size={26} />
                <Text style={styles.headerTitle}>Pengaturan</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Profile Section */}
                {user && (
                    <View style={styles.profileCard}>
                        <View style={styles.avatar}>
                            <Ionicons name="person" size={36} color={theme.colors.textLight} />
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={styles.profileName}>{user.fullname}</Text>
                            <Text style={styles.profileEmail}>{user.email}</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigateTo('../settings/edit-profile')} style={styles.editButton}>
                            <Ionicons name="create-outline" size={20} color={theme.colors.primary} />
                        </TouchableOpacity>
                    </View>
                )}

                {/* Admin/Merchant Panel */}
                {(canAccessAdminPanel() || canAccessMerchantPanel()) && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            {isAdmin() ? 'Admin Panel' : 'Merchant Panel'}
                        </Text>
                        <View style={styles.sectionContent}>
                            <TouchableOpacity
                                style={styles.panelButton}
                                onPress={() => navigateTo(isAdmin() ? '/admin' : '/merchant')}
                            >
                                <View style={styles.panelContent}>
                                    <Ionicons
                                        name={isAdmin() ? "shield-checkmark" : "storefront"}
                                        size={24}
                                        color={theme.colors.primary}
                                    />
                                    <View style={styles.panelText}>
                                        <Text style={styles.panelTitle}>
                                            {isAdmin() ? 'Buka Admin Panel' : 'Buka Merchant Panel'}
                                        </Text>
                                        <Text style={styles.panelDescription}>
                                            {isAdmin()
                                                ? 'Kelola sistem dan semua data platform'
                                                : 'Kelola restoran dan pesanan'
                                            }
                                        </Text>
                                    </View>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color={theme.colors.disabled} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {/* Preferences */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Preferensi</Text>
                    <View style={styles.sectionContent}>
                        <SettingRow
                            icon="notifications-outline"
                            label="Notifikasi"
                            isSwitch
                            switchValue={notificationsEnabled}
                            onSwitchChange={setNotificationsEnabled}
                        />
                        <SettingRow
                            icon="moon-outline"
                            label="Mode Gelap"
                            isSwitch
                            switchValue={darkModeEnabled}
                            onSwitchChange={setDarkModeEnabled}
                        />
                        <SettingRow
                            icon="language-outline"
                            label="Bahasa"
                            value="Indonesia"
                            onPress={() => navigateTo('../settings/language')}
                        />
                    </View>
                </View>

                {/* Account */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Akun</Text>
                    <View style={styles.sectionContent}>
                        <SettingRow
                            icon="person-outline"
                            label="Edit Profil"
                            onPress={() => navigateTo('../settings/edit-profile')}
                        />
                        <SettingRow
                            icon="lock-closed-outline"
                            label="Keamanan"
                            value="Aktif"
                            onPress={() => navigateTo('../settings/sub-security/security-page')}
                        />
                        <SettingRow
                            icon="card-outline"
                            label="Pembayaran"
                            onPress={() => navigateTo('../settings/payments/payment')}
                        />
                        <SettingRow
                            icon="bug-outline"
                            label="Debug Users"
                            onPress={() => navigateTo('/debug-users')}
                        />
                    </View>
                </View>

                {/* About */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Tentang</Text>
                    <View style={styles.sectionContent}>
                        <SettingRow
                            icon="information-circle-outline"
                            label="Versi Aplikasi"
                            value="1.0.0"
                        />
                        <SettingRow
                            icon="document-text-outline"
                            label="Kebijakan Privasi"
                            onPress={() => navigateTo('../settings/privacy')}
                        />
                        <SettingRow
                            icon="help-circle-outline"
                            label="Bantuan"
                            onPress={() => navigateTo('../settings/help')}
                        />
                    </View>
                </View>

                {/* Logout - FIXED */}
                <View style={styles.logoutSection}>
                    <TouchableOpacity
                        onPress={handleLogout}  // ← PERBAIKAN: langsung handleLogout, bukan () => handleLogout
                        style={styles.logoutButton}
                    >
                        <Text style={styles.logoutTitle}>Keluar</Text>
                    </TouchableOpacity>
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
    header: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.md,
        backgroundColor: theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: theme.typography.fontSize.lg,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.text,
    },
    scrollContent: {
        paddingBottom: theme.spacing.xxl,
    },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        margin: theme.spacing.md,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: theme.borderRadius.full,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileInfo: {
        flex: 1,
        marginLeft: theme.spacing.md,
    },
    profileName: {
        fontSize: theme.typography.fontSize.lg,
        fontWeight: theme.typography.fontWeight.semibold,
        color: theme.colors.text,
    },
    profileEmail: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
        marginTop: 2,
    },
    editButton: {
        width: 40,
        height: 40,
        borderRadius: theme.borderRadius.full,
        backgroundColor: theme.colors.backgroundSecondary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    section: {
        marginTop: theme.spacing.sm,
        paddingHorizontal: theme.spacing.md,
    },
    sectionTitle: {
        fontSize: theme.typography.fontSize.sm,
        fontWeight: theme.typography.fontWeight.semibold,
        color: theme.colors.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: theme.spacing.sm,
        paddingLeft: theme.spacing.xs,
    },
    sectionContent: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
    },
    settingLabel: {
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.text,
    },
    dangerText: {
        color: theme.colors.error,
    },
    settingRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.xs,
    },
    settingValue: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
    },
    seedRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.md,
    },
    seedSubtitle: {
        fontSize: theme.typography.fontSize.xs,
        color: theme.colors.textSecondary,
        marginTop: 1,
    },
    seedingText: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.success,
        fontWeight: theme.typography.fontWeight.medium,
    },
    logoutSection: {
        marginTop: theme.spacing.xl,
        paddingHorizontal: theme.spacing.md,
    },
    logoutButton: {
        width: '100%',
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.md,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.primary,
        borderRadius: theme.spacing.md
    },
    logoutTitle: {
        textAlign: 'center',
        width: '100%',
        color: theme.colors.background,
        fontWeight: theme.typography.fontWeight.bold,
        fontSize: theme.typography.fontSize.lg,
        textTransform: 'uppercase'
    },
    panelButton: {
        padding: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
        flexDirection: 'row',
        alignItems: 'center'
    },
    panelContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    panelText: {
        flex: 1,
        marginLeft: theme.spacing.sm,
    },
    panelTitle: {
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.text,
        fontWeight: theme.typography.fontWeight.medium,
    },
    panelDescription: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
        marginTop: 2,
    },
});