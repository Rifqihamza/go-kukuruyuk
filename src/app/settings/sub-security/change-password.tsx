import Button from '@/src/components/Button';
import { useAppNavigation } from '@/src/hooks';
import { theme } from '@/src/theme';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    Alert,
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

export default function ChangePasswordPage() {
    const { goBack } = useAppNavigation();
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const handleInputChange = (field: keyof typeof formData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
        setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const validateForm = () => {
        if (!formData.currentPassword.trim()) {
            Alert.alert('Error', 'Password lama harus diisi');
            return false;
        }

        if (formData.newPassword.length < 8) {
            Alert.alert('Error', 'Password baru minimal 8 karakter');
            return false;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            Alert.alert('Error', 'Konfirmasi password tidak cocok');
            return false;
        }

        if (formData.currentPassword === formData.newPassword) {
            Alert.alert('Error', 'Password baru tidak boleh sama dengan password lama');
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            Alert.alert(
                'Berhasil',
                'Password berhasil diubah',
                [{ text: 'OK', onPress: () => goBack('./security') }]
            );
        } catch {
            Alert.alert('Error', 'Gagal mengubah password. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    const PasswordInput = ({
        label,
        value,
        onChangeText,
        placeholder,
        showPassword,
        onToggleVisibility,
        field
    }: {
        label: string;
        value: string;
        onChangeText: (text: string) => void;
        placeholder: string;
        showPassword: boolean;
        onToggleVisibility: () => void;
        field: keyof typeof showPasswords;
    }) => (
        <View style={styles.inputGroup}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    secureTextEntry={!showPasswords[field]}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => togglePasswordVisibility(field)}
                >
                    <Ionicons
                        name={showPasswords[field] ? "eye-off-outline" : "eye-outline"}
                        size={20}
                        color={theme.colors.textSecondary}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => goBack('./security')} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Ubah Password</Text>
                <View style={{ width: 24 }} />
            </View>

            <KeyboardAvoidingView
                style={styles.keyboardAvoidingView}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.content}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="lock-closed" size={64} color={theme.colors.primary} />
                        </View>

                        <Text style={styles.description}>
                            Pastikan password baru Anda kuat dan mudah diingat. Gunakan kombinasi huruf besar, kecil, angka, dan simbol.
                        </Text>

                        <View style={styles.form}>
                            <PasswordInput
                                label="Password Lama"
                                value={formData.currentPassword}
                                onChangeText={(text) => handleInputChange('currentPassword', text)}
                                placeholder="Masukkan password lama"
                                showPassword={showPasswords.current}
                                onToggleVisibility={() => togglePasswordVisibility('current')}
                                field="current"
                            />

                            <PasswordInput
                                label="Password Baru"
                                value={formData.newPassword}
                                onChangeText={(text) => handleInputChange('newPassword', text)}
                                placeholder="Masukkan password baru"
                                showPassword={showPasswords.new}
                                onToggleVisibility={() => togglePasswordVisibility('new')}
                                field="new"
                            />

                            <PasswordInput
                                label="Konfirmasi Password Baru"
                                value={formData.confirmPassword}
                                onChangeText={(text) => handleInputChange('confirmPassword', text)}
                                placeholder="Konfirmasi password baru"
                                showPassword={showPasswords.confirm}
                                onToggleVisibility={() => togglePasswordVisibility('confirm')}
                                field="confirm"
                            />
                        </View>

                        <View style={styles.passwordStrength}>
                            <Text style={styles.strengthTitle}>Kriteria Password:</Text>
                            <View style={styles.criteriaList}>
                                <View style={styles.criterion}>
                                    <Ionicons
                                        name={formData.newPassword.length >= 8 ? "checkmark-circle" : "ellipse-outline"}
                                        size={16}
                                        color={formData.newPassword.length >= 8 ? theme.colors.success : theme.colors.textSecondary}
                                    />
                                    <Text style={styles.criterionText}>Minimal 8 karakter</Text>
                                </View>
                                <View style={styles.criterion}>
                                    <Ionicons
                                        name={/[A-Z]/.test(formData.newPassword) && /[a-z]/.test(formData.newPassword) ? "checkmark-circle" : "ellipse-outline"}
                                        size={16}
                                        color={/[A-Z]/.test(formData.newPassword) && /[a-z]/.test(formData.newPassword) ? theme.colors.success : theme.colors.textSecondary}
                                    />
                                    <Text style={styles.criterionText}>Huruf besar dan kecil</Text>
                                </View>
                                <View style={styles.criterion}>
                                    <Ionicons
                                        name={/\d/.test(formData.newPassword) ? "checkmark-circle" : "ellipse-outline"}
                                        size={16}
                                        color={/\d/.test(formData.newPassword) ? theme.colors.success : theme.colors.textSecondary}
                                    />
                                    <Text style={styles.criterionText}>Minimal 1 angka</Text>
                                </View>
                                <View style={styles.criterion}>
                                    <Ionicons
                                        name={/[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword) ? "checkmark-circle" : "ellipse-outline"}
                                        size={16}
                                        color={/[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword) ? theme.colors.success : theme.colors.textSecondary}
                                    />
                                    <Text style={styles.criterionText}>Minimal 1 simbol</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <Button
                        title={loading ? "Menyimpan..." : "Simpan Password"}
                        onPress={handleSubmit}
                        variant="primary"
                        size="lg"
                        loading={loading}
                        disabled={loading}
                    />
                </View>
            </KeyboardAvoidingView>
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
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    content: {
        padding: theme.spacing.md,
    },
    iconContainer: {
        alignItems: 'center',
        marginBottom: theme.spacing.lg,
    },
    description: {
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: theme.spacing.xl,
    },
    form: {
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.borderRadius.md,
        backgroundColor: theme.colors.surface,
    },
    input: {
        flex: 1,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.text,
    },
    eyeButton: {
        padding: theme.spacing.sm,
    },
    passwordStrength: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        marginBottom: theme.spacing.lg,
    },
    strengthTitle: {
        fontSize: theme.typography.fontSize.sm,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },
    criteriaList: {
        gap: theme.spacing.xs,
    },
    criterion: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
    },
    criterionText: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
    },
    footer: {
        padding: theme.spacing.md,
        backgroundColor: theme.colors.surface,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
    },
});