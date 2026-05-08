import Button from '@/src/components/Button';
import { theme } from '@/src/theme';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/src/contexts/AuthContext';
import { useRouter } from 'expo-router';

type AuthMode = 'login' | 'register';

export default function LoginScreen() {
    const [mode, setMode] = useState<AuthMode>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { signIn, signUp } = useAuth();
    const router = useRouter();

    const handleSubmit = async () => {
        setError('');

        if (!email.trim() || !password.trim()) {
            setError('Email dan password harus diisi');
            return;
        }

        if (mode === 'register' && !fullname.trim()) {
            setError('Nama lengkap harus diisi');
            return;
        }

        if (password.length < 6) {
            setError('Password minimal 6 karakter');
            return;
        }

        setLoading(true);
        setError('');

        try {
            if (mode === 'login') {
                const result = await signIn(email, password);
                if (result.error) {
                    setError(result.error);
                } else {
                    // Successfully logged in, redirect to home
                    router.replace('/(tabs)');
                }
            } else {
                const result = await signUp(email, password, fullname);
                if (result.error) {
                    setError(result.error);
                } else {
                    // Successfully registered, redirect to home
                    router.replace('/(tabs)');
                }
            }
        } catch {
            setError('Terjadi kesalahan. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Logo & Title */}
                    <View style={styles.headerSection}>
                        <View style={styles.logoContainer}>
                            <Ionicons name="fast-food" size={48} color={theme.colors.textLight} />
                        </View>
                        <Text style={styles.appName}>Go Kukuruyuk</Text>
                        <Text style={styles.tagline}>
                            {mode === 'login' ? 'Masuk untuk memesan' : 'Daftar akun baru'}
                        </Text>
                    </View>

                    {/* Form */}
                    <View style={styles.formSection}>
                        {mode === 'register' && (
                            <View style={styles.inputContainer}>
                                <Ionicons name="person-outline" size={20} color={theme.colors.textSecondary} style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nama Lengkap"
                                    placeholderTextColor={theme.colors.disabled}
                                    value={fullname}
                                    onChangeText={setFullname}
                                    autoCapitalize="words"
                                />
                            </View>
                        )}

                        <View style={styles.inputContainer}>
                            <Ionicons name="mail-outline" size={20} color={theme.colors.textSecondary} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                placeholderTextColor={theme.colors.disabled}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Ionicons name="lock-closed-outline" size={20} color={theme.colors.textSecondary} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor={theme.colors.disabled}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>

                        {error ? (
                            <View style={styles.errorContainer}>
                                <Ionicons name="alert-circle" size={16} color={theme.colors.error} />
                                <Text style={styles.errorText}>{error}</Text>
                            </View>
                        ) : null}

                        <Button
                            title={loading ? 'Memproses...' : mode === 'login' ? 'Masuk' : 'Daftar'}
                            onPress={handleSubmit}
                            size="lg"
                            disabled={loading}
                            loading={loading}
                            style={styles.submitButton}
                        />

                        <TouchableOpacity
                            style={styles.switchMode}
                            onPress={() => {
                                setMode(mode === 'login' ? 'register' : 'login');
                                setError('');
                            }}
                        >
                            <Text style={styles.switchModeText}>
                                {mode === 'login'
                                    ? 'Belum punya akun? Daftar'
                                    : 'Sudah punya akun? Masuk'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: theme.spacing.lg,
    },
    headerSection: {
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
    },
    logoContainer: {
        width: 96,
        height: 96,
        borderRadius: theme.borderRadius.full,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing.md,
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    appName: {
        fontSize: theme.typography.fontSize.xxl,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.text,
    },
    tagline: {
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.textSecondary,
        marginTop: 4,
    },
    formSection: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.lg,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
        borderRadius: theme.borderRadius.md,
        paddingHorizontal: theme.spacing.md,
        marginBottom: theme.spacing.sm,
        borderWidth: 1,
        borderColor: theme.colors.border,
        height: 52,
    },
    inputIcon: {
        marginRight: theme.spacing.sm,
    },
    input: {
        flex: 1,
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.text,
        height: '100%',
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.xs,
        backgroundColor: theme.colors.error + '10',
        padding: theme.spacing.sm,
        borderRadius: theme.borderRadius.sm,
        marginBottom: theme.spacing.sm,
    },
    errorText: {
        flex: 1,
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.error,
    },
    submitButton: {
        marginTop: theme.spacing.sm,
        width: '100%',
    },
    switchMode: {
        alignItems: 'center',
        marginTop: theme.spacing.md,
        padding: theme.spacing.sm,
    },
    switchModeText: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.primary,
        fontWeight: theme.typography.fontWeight.medium,
    },
});