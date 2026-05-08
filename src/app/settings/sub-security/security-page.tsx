import Button from '@/src/components/Button';
import { useAuth } from '@/src/contexts/AuthContext';
import { useAppNavigation } from '@/src/hooks';
import { theme } from '@/src/theme';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SecurityPage() {
    const [biometricEnabled, setBiometricEnabled] = useState(false);
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const { replaceTo, navigateTo } = useAppNavigation();
    const { signOut } = useAuth();

    // Fungsi untuk logout dari semua perangkat
    const handleLogoutAllDevices = async () => {
        Alert.alert(
            'Logout dari Semua Perangkat',
            'Tindakan ini akan mengeluarkan Anda dari semua perangkat yang sedang login. Apakah Anda yakin?',
            [
                {
                    text: 'Batal',
                    style: 'cancel',
                },
                {
                    text: 'Logout Semua',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            // Tampilkan loading indicator
                            Alert.alert(
                                'Proses Logout',
                                'Sedang logout dari semua perangkat...',
                                [{ text: 'OK' }],
                                { cancelable: false }
                            );

                            // Panggil API untuk logout dari semua perangkat
                            // Di mock, kita hanya clear local session
                            await signOut();

                            // Di production, panggil endpoint logout semua perangkat
                            // await api.post('/auth/logout-all-devices');

                            // Clear semua storage
                            await AsyncStorage.removeItem('auth_token');
                            await AsyncStorage.removeItem('user_data');
                            await AsyncStorage.removeItem('refresh_token');
                            await AsyncStorage.removeItem('device_id');

                            // Navigasi ke halaman login
                            navigateTo('/(auth)/sign-page');

                            // Tampilkan notifikasi sukses
                            Alert.alert(
                                'Berhasil',
                                'Anda telah logout dari semua perangkat',
                                [{ text: 'OK' }]
                            );
                        } catch (error) {
                            console.error('Force logout error:', error);
                            Alert.alert(
                                'Error',
                                'Gagal logout dari semua perangkat. Silakan coba lagi.',
                                [{ text: 'OK' }]
                            );
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const handleClearLocalData = () => {
        Alert.alert(
            'Hapus Data Lokal',
            'Ini akan menghapus semua cache dan data sementara aplikasi di perangkat ini. Anda harus login kembali.',
            [
                { text: 'Batal', style: 'cancel' },
                {
                    text: 'Hapus',
                    style: 'destructive',
                    onPress: async () => {
                        await signOut();
                        // Di sini bisa ditambahkan pembersihan AsyncStorage lainnya jika perlu
                        navigateTo('/(auth)/sign-page');
                    }
                }
            ],
            { cancelable: true }
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => replaceTo('../../(tabs)/settings')} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Keamanan</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Account Security */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Keamanan Akun</Text>
                    <View style={styles.sectionContent}>
                        <TouchableOpacity
                            style={styles.settingRow}
                            onPress={() => navigateTo('/settings/sub-security/change-password' as any)}
                        >
                            <View style={styles.settingLeft}>
                                <Ionicons name="lock-closed-outline" size={22} color={theme.colors.primary} />
                                <Text style={styles.settingLabel}>Ubah Password</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color={theme.colors.disabled} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.settingRow}
                            onPress={() => navigateTo('/settings/sub-security/biometric' as any)}
                        >
                            <View style={styles.settingLeft}>
                                <Ionicons name="finger-print-outline" size={22} color={theme.colors.primary} />
                                <Text style={styles.settingLabel}>Biometric Authentication</Text>
                            </View>
                            <View style={styles.settingRight}>
                                <Text style={styles.settingValue}>{biometricEnabled ? 'Aktif' : 'Nonaktif'}</Text>
                                <Switch
                                    value={biometricEnabled}
                                    onValueChange={setBiometricEnabled}
                                    trackColor={{ false: theme.colors.disabled, true: theme.colors.primaryLight }}
                                    thumbColor={biometricEnabled ? theme.colors.primary : '#f4f3f4'}
                                />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.settingRow}
                            onPress={() => navigateTo('/settings/sub-security/two-factor' as any)}
                        >
                            <View style={styles.settingLeft}>
                                <Ionicons name="shield-checkmark-outline" size={22} color={theme.colors.primary} />
                                <Text style={styles.settingLabel}>Autentikasi Dua Faktor</Text>
                            </View>
                            <View style={styles.settingRight}>
                                <Text style={styles.settingValue}>{twoFactorEnabled ? 'Aktif' : 'Nonaktif'}</Text>
                                <Switch
                                    value={twoFactorEnabled}
                                    onValueChange={setTwoFactorEnabled}
                                    trackColor={{ false: theme.colors.disabled, true: theme.colors.primaryLight }}
                                    thumbColor={twoFactorEnabled ? theme.colors.primary : '#f4f3f4'}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Privacy Settings */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Privasi & Data</Text>
                    <View style={styles.sectionContent}>
                        <TouchableOpacity
                            style={styles.settingRow}
                            onPress={() => navigateTo('/settings/sub-security/personal-data' as any)}
                        >
                            <View style={styles.settingLeft}>
                                <Ionicons name="eye-off-outline" size={22} color={theme.colors.primary} />
                                <Text style={styles.settingLabel}>Data Pribadi</Text>
                            </View>
                            <View style={styles.settingRight}>
                                <Text style={styles.settingValue}>Dilindungi</Text>
                                <Ionicons name="chevron-forward" size={20} color={theme.colors.disabled} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.settingRow}
                            onPress={() => navigateTo('/settings/sub-security/download-data' as any)}
                        >
                            <View style={styles.settingLeft}>
                                <Ionicons name="download-outline" size={22} color={theme.colors.primary} />
                                <Text style={styles.settingLabel}>Unduh Data</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color={theme.colors.disabled} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Security Status */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Status Keamanan</Text>
                    <View style={styles.sectionContent}>
                        <View style={styles.statusCard}>
                            <View style={styles.statusHeader}>
                                <Ionicons name="shield-checkmark" size={24} color={theme.colors.success} />
                                <Text style={styles.statusTitle}>Akun Aman</Text>
                            </View>
                            <Text style={styles.statusDescription}>
                                Akun Anda dalam kondisi aman. Semua langkah keamanan telah diaktifkan.
                            </Text>
                        </View>

                        <View style={styles.securityTips}>
                            <Text style={styles.tipsTitle}>Tips Keamanan:</Text>
                            <View style={styles.tipItem}>
                                <Ionicons name="checkmark-circle" size={16} color={theme.colors.success} />
                                <Text style={styles.tipText}>Gunakan password yang kuat</Text>
                            </View>
                            <View style={styles.tipItem}>
                                <Ionicons name="checkmark-circle" size={16} color={theme.colors.success} />
                                <Text style={styles.tipText}>Aktifkan autentikasi dua faktor</Text>
                            </View>
                            <View style={styles.tipItem}>
                                <Ionicons name="checkmark-circle" size={16} color={theme.colors.success} />
                                <Text style={styles.tipText}>Jaga kerahasiaan informasi akun</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Recent Activity */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Aktivitas Terakhir</Text>
                    <View style={styles.sectionContent}>
                        <View style={styles.activityItem}>
                            <View style={styles.activityIcon}>
                                <Ionicons name="log-in-outline" size={20} color={theme.colors.success} />
                            </View>
                            <View style={styles.activityInfo}>
                                <Text style={styles.activityTitle}>Login berhasil</Text>
                                <Text style={styles.activityMeta}>iPhone 14 • Jakarta • 2 jam yang lalu</Text>
                            </View>
                        </View>

                        <View style={styles.activityItem}>
                            <View style={styles.activityIcon}>
                                <Ionicons name="card-outline" size={20} color={theme.colors.primary} />
                            </View>
                            <View style={styles.activityInfo}>
                                <Text style={styles.activityTitle}>Kartu kredit ditambahkan</Text>
                                <Text style={styles.activityMeta}>**** **** **** 1234 • 1 hari yang lalu</Text>
                            </View>
                        </View>

                        <View style={styles.activityItem}>
                            <View style={styles.activityIcon}>
                                <Ionicons name="lock-closed-outline" size={20} color={theme.colors.warning} />
                            </View>
                            <View style={styles.activityInfo}>
                                <Text style={styles.activityTitle}>Password diubah</Text>
                                <Text style={styles.activityMeta}>Web • Jakarta • 3 hari yang lalu</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.emergencySection}>
                    <Text style={styles.sectionTitle}>Aksi Darurat</Text>
                    <View style={styles.emergencyContainer}>
                        <Button
                            title="Logout dari Semua Perangkat"
                            onPress={handleLogoutAllDevices}
                            variant="primary"  // Gunakan variant danger jika ada
                            size="md"
                            style={styles.emergencyButton}
                        />

                        {/* Opsional: Tambahan tombol emergency lainnya */}
                        <Button
                            title="Hapus Data Lokal"
                            onPress={handleClearLocalData}
                            variant="secondary"
                            size="md"
                            style={styles.emergencyButton}
                        />
                    </View>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.md,
        backgroundColor: theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    backButton: {
        padding: theme.spacing.xs,
    },
    headerTitle: {
        fontSize: theme.typography.fontSize.lg,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.text,
    },
    scrollContent: {
        padding: theme.spacing.md,
        paddingBottom: theme.spacing.xxl,
    },
    section: {
        marginBottom: theme.spacing.lg,
    },
    sectionTitle: {
        fontSize: theme.typography.fontSize.md,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },
    sectionContent: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        overflow: 'hidden',
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
        flex: 1,
    },
    settingLabel: {
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.text,
    },
    settingRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
    },
    settingValue: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
    },
    statusCard: {
        padding: theme.spacing.md,
        backgroundColor: theme.colors.success + '10',
        borderRadius: theme.borderRadius.md,
        marginBottom: theme.spacing.md,
    },
    statusHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },
    statusTitle: {
        fontSize: theme.typography.fontSize.md,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.success,
        marginLeft: theme.spacing.sm,
    },
    statusDescription: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
        lineHeight: 18,
    },
    securityTips: {
        padding: theme.spacing.md,
        paddingTop: 0,
    },
    tipsTitle: {
        fontSize: theme.typography.fontSize.sm,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },
    tipItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2,
    },
    tipText: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
        marginLeft: theme.spacing.sm,
    },
    activityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    activityIcon: {
        width: 40,
        height: 40,
        borderRadius: theme.borderRadius.full,
        backgroundColor: theme.colors.backgroundSecondary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: theme.spacing.md,
    },
    activityInfo: {
        flex: 1,
    },
    activityTitle: {
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.text,
        marginBottom: 2,
    },
    activityMeta: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
    },
    emergencySection: {
        marginTop: theme.spacing.lg,
        paddingHorizontal: theme.spacing.md,
    },
    emergencyContainer: {
        gap: theme.spacing.sm,
    },
    emergencyButton: {
        backgroundColor: theme.colors.error,
        borderColor: theme.colors.error,
        paddingVertical: theme.spacing.md
    },
});