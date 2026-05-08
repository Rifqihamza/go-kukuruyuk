import Button from '@/src/components/Button';
import { useAppNavigation } from '@/src/hooks';
import { theme } from '@/src/theme';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TwoFactorPage() {
    const { goBack } = useAppNavigation();
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState<'sms' | 'email' | 'app'>('app');
    const [verificationCode, setVerificationCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [setupStep, setSetupStep] = useState<'initial' | 'setup' | 'verify'>('initial');

    const methods = [
        {
            id: 'app',
            name: 'Authenticator App',
            description: 'Gunakan aplikasi seperti Google Authenticator',
            icon: 'phone-portrait-outline',
            recommended: true
        },
        {
            id: 'sms',
            name: 'SMS',
            description: 'Kirim kode verifikasi via SMS',
            icon: 'chatbubble-outline',
            recommended: false
        },
        {
            id: 'email',
            name: 'Email',
            description: 'Kirim kode verifikasi via email',
            icon: 'mail-outline',
            recommended: false
        }
    ];

    const handleToggle2FA = async (enabled: boolean) => {
        if (enabled) {
            setSetupStep('setup');
        } else {
            Alert.alert(
                'Nonaktifkan 2FA',
                'Apakah Anda yakin ingin menonaktifkan autentikasi dua faktor? Ini akan mengurangi keamanan akun Anda.',
                [
                    { text: 'Batal', style: 'cancel' },
                    {
                        text: 'Nonaktifkan',
                        style: 'destructive',
                        onPress: () => {
                            setTwoFactorEnabled(false);
                            setSetupStep('initial');
                        }
                    }
                ]
            );
        }
    };

    const handleMethodSelect = (method: 'sms' | 'email' | 'app') => {
        setSelectedMethod(method);
    };

    const handleSetup = async () => {
        if (selectedMethod === 'sms' && !phoneNumber.trim()) {
            Alert.alert('Error', 'Nomor telepon harus diisi');
            return;
        }

        if (selectedMethod === 'email' && !email.trim()) {
            Alert.alert('Error', 'Email harus diisi');
            return;
        }

        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            if (selectedMethod === 'app') {
                // Show QR code for app setup
                Alert.alert(
                    'Setup Berhasil',
                    'QR code telah ditampilkan. Pindai dengan aplikasi authenticator Anda.',
                    [{ text: 'Lanjut', onPress: () => setSetupStep('verify') }]
                );
            } else {
                Alert.alert(
                    'Kode Terkirim',
                    `Kode verifikasi telah dikirim ke ${selectedMethod === 'sms' ? phoneNumber : email}`,
                    [{ text: 'OK', onPress: () => setSetupStep('verify') }]
                );
            }
        } catch {
            Alert.alert('Error', 'Gagal mengirim kode verifikasi');
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async () => {
        if (!verificationCode.trim()) {
            Alert.alert('Error', 'Kode verifikasi harus diisi');
            return;
        }

        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Mock verification
            Alert.alert(
                'Berhasil!',
                'Autentikasi dua faktor berhasil diaktifkan',
                [{
                    text: 'OK',
                    onPress: () => {
                        setTwoFactorEnabled(true);
                        setSetupStep('initial');
                    }
                }]
            );
        } catch {
            Alert.alert('Error', 'Kode verifikasi salah');
        } finally {
            setLoading(false);
        }
    };

    const renderInitialSetup = () => (
        <View style={styles.content}>
            <View style={styles.iconContainer}>
                <Ionicons name="shield-checkmark" size={80} color={theme.colors.primary} />
            </View>

            <Text style={styles.title}>Autentikasi Dua Faktor</Text>
            <Text style={styles.description}>
                Tambahkan lapisan keamanan ekstra dengan autentikasi dua faktor (2FA).
                Kode verifikasi tambahan akan diperlukan saat login.
            </Text>

            <View style={styles.benefitsCard}>
                <Text style={styles.benefitsTitle}>Keuntungan 2FA:</Text>
                <View style={styles.benefitList}>
                    <View style={styles.benefit}>
                        <Ionicons name="checkmark-circle" size={16} color={theme.colors.success} />
                        <Text style={styles.benefitText}>Perlindungan ekstra dari hacking</Text>
                    </View>
                    <View style={styles.benefit}>
                        <Ionicons name="checkmark-circle" size={16} color={theme.colors.success} />
                        <Text style={styles.benefitText}>Aman dari pencurian akun</Text>
                    </View>
                    <View style={styles.benefit}>
                        <Ionicons name="checkmark-circle" size={16} color={theme.colors.success} />
                        <Text style={styles.benefitText}>Verifikasi identitas yang lebih baik</Text>
                    </View>
                </View>
            </View>

            <View style={styles.toggleSection}>
                <Text style={styles.toggleLabel}>Aktifkan Autentikasi Dua Faktor</Text>
                <Switch
                    value={twoFactorEnabled}
                    onValueChange={handleToggle2FA}
                    trackColor={{ false: theme.colors.disabled, true: theme.colors.primaryLight }}
                    thumbColor={twoFactorEnabled ? theme.colors.primary : '#f4f3f4'}
                />
            </View>
        </View>
    );

    const renderMethodSetup = () => (
        <View style={styles.content}>
            <View style={styles.iconContainer}>
                <Ionicons name="settings-outline" size={64} color={theme.colors.primary} />
            </View>

            <Text style={styles.title}>Pilih Metode Verifikasi</Text>
            <Text style={styles.description}>
                Pilih metode yang ingin digunakan untuk menerima kode verifikasi.
            </Text>

            <View style={styles.methodsContainer}>
                {methods.map((method) => (
                    <TouchableOpacity
                        key={method.id}
                        style={[
                            styles.methodCard,
                            selectedMethod === method.id && styles.methodCardSelected,
                            method.recommended && styles.methodCardRecommended
                        ]}
                        onPress={() => handleMethodSelect(method.id as any)}
                    >
                        <View style={styles.methodHeader}>
                            <Ionicons
                                name={method.icon as any}
                                size={24}
                                color={selectedMethod === method.id ? theme.colors.primary : theme.colors.textSecondary}
                            />
                            {method.recommended && (
                                <View style={styles.recommendedBadge}>
                                    <Text style={styles.recommendedText}>Direkomendasikan</Text>
                                </View>
                            )}
                        </View>
                        <Text style={[
                            styles.methodName,
                            selectedMethod === method.id && styles.methodNameSelected
                        ]}>
                            {method.name}
                        </Text>
                        <Text style={[
                            styles.methodDescription,
                            selectedMethod === method.id && styles.methodDescriptionSelected
                        ]}>
                            {method.description}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {(selectedMethod === 'sms' || selectedMethod === 'email') && (
                <View style={styles.contactForm}>
                    {selectedMethod === 'sms' && (
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Nomor Telepon</Text>
                            <TextInput
                                style={styles.input}
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                                placeholder="081234567890"
                                keyboardType="phone-pad"
                            />
                        </View>
                    )}

                    {selectedMethod === 'email' && (
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                placeholder="email@example.com"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                    )}
                </View>
            )}

            <Button
                title="Lanjutkan Setup"
                onPress={handleSetup}
                variant="primary"
                size="lg"
                loading={loading}
                disabled={loading}
            />
        </View>
    );

    const renderVerification = () => (
        <View style={styles.content}>
            <View style={styles.iconContainer}>
                <Ionicons name="keypad-outline" size={64} color={theme.colors.primary} />
            </View>

            <Text style={styles.title}>Verifikasi Kode</Text>
            <Text style={styles.description}>
                Masukkan kode verifikasi yang dikirim ke {selectedMethod === 'sms' ? 'nomor telepon' : selectedMethod === 'email' ? 'email' : 'aplikasi authenticator'} Anda.
            </Text>

            <View style={styles.verificationForm}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Kode Verifikasi</Text>
                    <TextInput
                        style={styles.codeInput}
                        value={verificationCode}
                        onChangeText={setVerificationCode}
                        placeholder="000000"
                        keyboardType="number-pad"
                        maxLength={6}
                        textAlign="center"
                        autoFocus
                    />
                </View>

                <Text style={styles.resendText}>
                    Tidak menerima kode? <Text style={styles.resendLink}>Kirim ulang</Text>
                </Text>
            </View>

            <Button
                title="Verifikasi & Aktifkan"
                onPress={handleVerify}
                variant="primary"
                size="lg"
                loading={loading}
                disabled={loading || verificationCode.length !== 6}
            />
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => goBack('./security')} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Autentikasi Dua Faktor</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {setupStep === 'initial' && renderInitialSetup()}
                {setupStep === 'setup' && renderMethodSetup()}
                {setupStep === 'verify' && renderVerification()}
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
    benefitsCard: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        marginBottom: theme.spacing.xl,
    },
    benefitsTitle: {
        fontSize: theme.typography.fontSize.sm,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },
    benefitList: {
        gap: theme.spacing.xs,
    },
    benefit: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
    },
    benefitText: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
    },
    toggleSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
    },
    toggleLabel: {
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.text,
        flex: 1,
    },
    methodsContainer: {
        gap: theme.spacing.sm,
        marginBottom: theme.spacing.xl,
    },
    methodCard: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    methodCardSelected: {
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.primary + '10',
    },
    methodCardRecommended: {
        borderColor: theme.colors.success,
    },
    methodHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.sm,
    },
    recommendedBadge: {
        backgroundColor: theme.colors.success,
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: 2,
        borderRadius: theme.borderRadius.sm,
    },
    recommendedText: {
        fontSize: theme.typography.fontSize.xs,
        color: theme.colors.textLight,
        fontWeight: theme.typography.fontWeight.bold,
    },
    methodName: {
        fontSize: theme.typography.fontSize.md,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.text,
        marginBottom: 2,
    },
    methodNameSelected: {
        color: theme.colors.primary,
    },
    methodDescription: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
    },
    methodDescriptionSelected: {
        color: theme.colors.primary,
    },
    contactForm: {
        marginBottom: theme.spacing.xl,
    },
    inputGroup: {
        marginBottom: theme.spacing.md,
    },
    label: {
        fontSize: theme.typography.fontSize.sm,
        fontWeight: theme.typography.fontWeight.medium,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    input: {
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.text,
        backgroundColor: theme.colors.surface,
    },
    verificationForm: {
        marginBottom: theme.spacing.xl,
    },
    codeInput: {
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        fontSize: theme.typography.fontSize.xl,
        color: theme.colors.text,
        backgroundColor: theme.colors.surface,
        letterSpacing: 8,
        fontWeight: theme.typography.fontWeight.bold,
    },
    resendText: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        marginTop: theme.spacing.sm,
    },
    resendLink: {
        color: theme.colors.primary,
        fontWeight: theme.typography.fontWeight.bold,
    },
});