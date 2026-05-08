import Button from '@/src/components/Button';
import { theme } from '@/src/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
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
    const router = useRouter();
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [darkModeEnabled, setDarkModeEnabled] = useState(false);
    const user = { fullname: 'Jhon Doe', email: 'jhondoe@gmail.com' };
    const navigateTo = (path: string) => (router as any).push(path);

    const handleLogout = () => {
        console.log("✅ Anda Berhasil Keluar")
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
                            onPress={() => navigateTo('/settings/language')}
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
                            onPress={() => navigateTo('/settings/edit-profile')}
                        />
                        <SettingRow
                            icon="lock-closed-outline"
                            label="Keamanan"
                            value="Aktif"
                            onPress={() => navigateTo('/settings/security')}
                        />
                        <SettingRow
                            icon="card-outline"
                            label="Pembayaran"
                            onPress={() => navigateTo('/settings/payments/payment')}
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
                            onPress={() => navigateTo('/settings/privacy')}
                        />
                        <SettingRow
                            icon="help-circle-outline"
                            label="Bantuan"
                            onPress={() => navigateTo('/settings/help')}
                        />
                    </View>
                </View>

                {/* Logout */}
                <View style={styles.logoutSection}>
                    <Button
                        title="Keluar"
                        onPress={handleLogout}
                        variant="outline"
                        size="lg"
                        style={styles.logoutButton}
                    />
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
    },
});