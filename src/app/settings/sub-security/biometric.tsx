import Button from '@/src/components/Button';
import { useAppNavigation } from '@/src/hooks';
import { theme } from '@/src/theme';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    Alert,
    Platform,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BiometricPage() {
    const { goBack } = useAppNavigation();
    const [biometricEnabled, setBiometricEnabled] = useState(false);
    const [faceIdEnabled, setFaceIdEnabled] = useState(false);
    const [touchIdEnabled, setTouchIdEnabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const isIOS = Platform.OS === 'ios';
    const biometricType = isIOS ? 'Face ID / Touch ID' : 'Fingerprint';
    const biometricIcon = isIOS ? 'person-circle-outline' : 'finger-print-outline';

    const handleBiometricToggle = async (enabled: boolean) => {
        if (enabled) {
            // Simulate biometric setup
            setLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 1500));
                Alert.alert(
                    'Biometric Diaktifkan',
                    `Autentikasi ${biometricType} berhasil diaktifkan untuk akun Anda.`,
                    [{ text: 'OK' }]
                );
                setBiometricEnabled(true);
            } catch {
                Alert.alert('Error', 'Gagal mengaktifkan biometric authentication');
            } finally {
                setLoading(false);
            }
        } else {
            Alert.alert(
                'Nonaktifkan Biometric',
                'Apakah Anda yakin ingin menonaktifkan autentikasi biometric?',
                [
                    { text: 'Batal', style: 'cancel' },
                    {
                        text: 'Nonaktifkan',
                        style: 'destructive',
                        onPress: () => setBiometricEnabled(false)
                    }
                ]
            );
        }
    };

    const handleFaceIdToggle = async (enabled: boolean) => {
        if (enabled) {
            setLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                Alert.alert(
                    'Face ID Diaktifkan',
                    'Face ID berhasil diaktifkan untuk autentikasi.',
                    [{ text: 'OK' }]
                );
                setFaceIdEnabled(true);
            } catch {
                Alert.alert('Error', 'Gagal mengaktifkan Face ID');
            } finally {
                setLoading(false);
            }
        } else {
            setFaceIdEnabled(false);
        }
    };

    const handleTouchIdToggle = async (enabled: boolean) => {
        if (enabled) {
            setLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                Alert.alert(
                    'Touch ID Diaktifkan',
                    'Touch ID berhasil diaktifkan untuk autentikasi.',
                    [{ text: 'OK' }]
                );
                setTouchIdEnabled(true);
            } catch {
                Alert.alert('Error', 'Gagal mengaktifkan Touch ID');
            } finally {
                setLoading(false);
            }
        } else {
            setTouchIdEnabled(false);
        }
    };

    const testBiometric = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            Alert.alert(
                'Berhasil',
                `${biometricType} berhasil diverifikasi!`,
                [{ text: 'OK' }]
            );
        } catch {
            Alert.alert('Error', 'Verifikasi biometric gagal');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => goBack('./security')} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Biometric Authentication</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.content}>
                    <View style={styles.iconContainer}>
                        <Ionicons name={biometricIcon} size={80} color={theme.colors.primary} />
                    </View>

                    <Text style={styles.title}>Autentikasi Biometric</Text>
                    <Text style={styles.description}>
                        Aktifkan autentikasi biometric untuk akses yang lebih aman dan cepat ke akun Anda.
                    </Text>

                    {/* Main Biometric Toggle */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Pengaturan Utama</Text>
                        <View style={styles.sectionContent}>
                            <View style={styles.settingRow}>
                                <View style={styles.settingLeft}>
                                    <Ionicons name={biometricIcon} size={24} color={theme.colors.primary} />
                                    <View>
                                        <Text style={styles.settingLabel}>Aktifkan {biometricType}</Text>
                                        <Text style={styles.settingDescription}>
                                            Gunakan {biometricType.toLowerCase()} untuk login dan transaksi
                                        </Text>
                                    </View>
                                </View>
                                <Switch
                                    value={biometricEnabled}
                                    onValueChange={handleBiometricToggle}
                                    trackColor={{ false: theme.colors.disabled, true: theme.colors.primaryLight }}
                                    thumbColor={biometricEnabled ? theme.colors.primary : '#f4f3f4'}
                                    disabled={loading}
                                />
                            </View>
                        </View>
                    </View>

                    {/* Advanced Settings */}
                    {biometricEnabled && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Pengaturan Lanjutan</Text>
                            <View style={styles.sectionContent}>
                                {isIOS && (
                                    <>
                                        <View style={styles.settingRow}>
                                            <View style={styles.settingLeft}>
                                                <Ionicons name="person-circle-outline" size={24} color={theme.colors.primary} />
                                                <View>
                                                    <Text style={styles.settingLabel}>Face ID</Text>
                                                    <Text style={styles.settingDescription}>Gunakan pengenalan wajah</Text>
                                                </View>
                                            </View>
                                            <Switch
                                                value={faceIdEnabled}
                                                onValueChange={handleFaceIdToggle}
                                                trackColor={{ false: theme.colors.disabled, true: theme.colors.primaryLight }}
                                                thumbColor={faceIdEnabled ? theme.colors.primary : '#f4f3f4'}
                                                disabled={loading}
                                            />
                                        </View>

                                        <View style={styles.settingRow}>
                                            <View style={styles.settingLeft}>
                                                <Ionicons name="finger-print-outline" size={24} color={theme.colors.primary} />
                                                <View>
                                                    <Text style={styles.settingLabel}>Touch ID</Text>
                                                    <Text style={styles.settingDescription}>Gunakan sidik jari</Text>
                                                </View>
                                            </View>
                                            <Switch
                                                value={touchIdEnabled}
                                                onValueChange={handleTouchIdToggle}
                                                trackColor={{ false: theme.colors.disabled, true: theme.colors.primaryLight }}
                                                thumbColor={touchIdEnabled ? theme.colors.primary : '#f4f3f4'}
                                                disabled={loading}
                                            />
                                        </View>
                                    </>
                                )}

                                {!isIOS && (
                                    <View style={styles.settingRow}>
                                        <View style={styles.settingLeft}>
                                            <Ionicons name="finger-print-outline" size={24} color={theme.colors.primary} />
                                            <View>
                                                <Text style={styles.settingLabel}>Fingerprint</Text>
                                                <Text style={styles.settingDescription}>Gunakan sidik jari perangkat</Text>
                                            </View>
                                        </View>
                                        <Switch
                                            value={touchIdEnabled}
                                            onValueChange={handleTouchIdToggle}
                                            trackColor={{ false: theme.colors.disabled, true: theme.colors.primaryLight }}
                                            thumbColor={touchIdEnabled ? theme.colors.primary : '#f4f3f4'}
                                            disabled={loading}
                                        />
                                    </View>
                                )}
                            </View>
                        </View>
                    )}

                    {/* Test Section */}
                    {biometricEnabled && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Test Autentikasi</Text>
                            <View style={styles.sectionContent}>
                                <View style={styles.testCard}>
                                    <Ionicons name="scan-circle-outline" size={48} color={theme.colors.primary} />
                                    <Text style={styles.testTitle}>Test {biometricType}</Text>
                                    <Text style={styles.testDescription}>
                                        Klik tombol di bawah untuk menguji autentikasi biometric Anda
                                    </Text>
                                    <Button
                                        title="Test Sekarang"
                                        onPress={testBiometric}
                                        variant="outline"
                                        size="md"
                                        loading={loading}
                                        disabled={loading}
                                        style={styles.testButton}
                                    />
                                </View>
                            </View>
                        </View>
                    )}

                    {/* Security Info */}
                    <View style={styles.infoCard}>
                        <Ionicons name="information-circle-outline" size={24} color={theme.colors.primary} />
                        <View style={styles.infoContent}>
                            <Text style={styles.infoTitle}>Informasi Keamanan</Text>
                            <Text style={styles.infoText}>
                                Data biometric Anda disimpan dengan aman di perangkat dan tidak dikirim ke server kami.
                                Autentikasi hanya berfungsi di perangkat yang telah diaktifkan.
                            </Text>
                        </View>
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
        flexGrow: 1,
    },
    content: {
        padding: theme.spacing.md,
    },
    iconContainer: {
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    title: {
        fontSize: theme.typography.fontSize.xl,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.text,
        textAlign: 'center',
        marginBottom: theme.spacing.sm,
    },
    description: {
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: theme.spacing.xl,
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
        padding: theme.spacing.md,
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
        fontWeight: theme.typography.fontWeight.medium,
    },
    settingDescription: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
        marginTop: 2,
    },
    testCard: {
        alignItems: 'center',
        padding: theme.spacing.xl,
    },
    testTitle: {
        fontSize: theme.typography.fontSize.lg,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.text,
        marginTop: theme.spacing.md,
        marginBottom: theme.spacing.sm,
    },
    testDescription: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: 18,
        marginBottom: theme.spacing.lg,
    },
    testButton: {
        marginTop: theme.spacing.md,
    },
    infoCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: theme.colors.primary + '10',
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        borderLeftWidth: 4,
        borderLeftColor: theme.colors.primary,
    },
    infoContent: {
        flex: 1,
        marginLeft: theme.spacing.sm,
    },
    infoTitle: {
        fontSize: theme.typography.fontSize.sm,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.primary,
        marginBottom: theme.spacing.xs,
    },
    infoText: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
        lineHeight: 18,
    },
});