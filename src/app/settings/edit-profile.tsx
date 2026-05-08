import Button from '@/src/components/Button';
import { useUserProfile } from '@/src/hooks/useUserProfile';
import { theme } from '@/src/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditProfileScreen() {
    const router = useRouter();
    const { profile, loading, error, updateProfile } = useUserProfile();

    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        phone: '',
        address: '',
    });
    const [saving, setSaving] = useState(false);

    // Isi form dengan data profile
    useEffect(() => {
        if (profile) {
            setFormData({
                fullname: profile.fullname || '',
                email: profile.email || '',
                phone: profile.phone || '',
                address: profile.address || '',
            });
        }
    }, [profile]);

    const handleSave = async () => {
        // Validasi
        if (!formData.fullname.trim()) {
            Alert.alert('Error', 'Nama lengkap harus diisi');
            return;
        }
        if (!formData.email.trim()) {
            Alert.alert('Error', 'Email harus diisi');
            return;
        }
        if (!formData.phone.trim()) {
            Alert.alert('Error', 'Nomor telepon harus diisi');
            return;
        }

        setSaving(true);
        const success = await updateProfile(formData);
        setSaving(false);

        if (success) {
            Alert.alert(
                'Sukses',
                'Profil berhasil diperbarui',
                [{ text: 'OK', onPress: () => router.back() }]
            );
        } else {
            Alert.alert('Error', 'Gagal menyimpan perubahan');
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                    <Text style={styles.loadingText}>Memuat data profil...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.errorContainer}>
                    <Ionicons name="alert-circle" size={48} color="red" />
                    <Text style={styles.errorText}>{error}</Text>
                    <Button title="Coba Lagi" onPress={() => window.location.reload()} />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.topBarTitle}>Edit Profil</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* Avatar Section */}
                <View style={styles.avatarSection}>
                    <View style={styles.avatar}>
                        <Ionicons name="person" size={48} color={theme.colors.textLight} />
                    </View>
                    <TouchableOpacity style={styles.changePhotoButton}>
                        <Text style={styles.changePhotoText}>Ubah Foto</Text>
                    </TouchableOpacity>
                </View>

                {/* Form Section */}
                <View style={styles.formSection}>
                    <Text style={styles.fieldLabel}>Nama Lengkap</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={formData.fullname}
                            onChangeText={(text) => setFormData(prev => ({ ...prev, fullname: text }))}
                            placeholder="Nama Lengkap"
                            placeholderTextColor={theme.colors.disabled}
                        />
                    </View>

                    <Text style={styles.fieldLabel}>Email</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={formData.email}
                            onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
                            placeholder="Email"
                            placeholderTextColor={theme.colors.disabled}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <Text style={styles.fieldLabel}>No. Telepon</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={formData.phone}
                            onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
                            placeholder="No. Telepon"
                            placeholderTextColor={theme.colors.disabled}
                            keyboardType="phone-pad"
                        />
                    </View>

                    <Text style={styles.fieldLabel}>Alamat</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            value={formData.address}
                            onChangeText={(text) => setFormData(prev => ({ ...prev, address: text }))}
                            placeholder="Alamat"
                            placeholderTextColor={theme.colors.disabled}
                            multiline
                            numberOfLines={3}
                        />
                    </View>

                    <Button
                        title={saving ? "Menyimpan..." : "Simpan Perubahan"}
                        onPress={handleSave}
                        size="lg"
                        style={styles.saveButton}
                        disabled={saving}
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
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        backgroundColor: theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: theme.borderRadius.full,
        alignItems: 'center',
        justifyContent: 'center',
    },
    topBarTitle: {
        fontSize: theme.typography.fontSize.lg,
        fontWeight: theme.typography.fontWeight.semibold,
        color: theme.colors.text,
    },
    content: {
        padding: theme.spacing.md,
    },
    avatarSection: {
        alignItems: 'center',
        paddingVertical: theme.spacing.lg,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: theme.borderRadius.full,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    changePhotoButton: {
        marginTop: theme.spacing.sm,
    },
    changePhotoText: {
        color: theme.colors.primary,
        fontWeight: theme.typography.fontWeight.medium,
        fontSize: theme.typography.fontSize.md,
    },
    formSection: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    fieldLabel: {
        fontSize: theme.typography.fontSize.sm,
        fontWeight: theme.typography.fontWeight.semibold,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.xs,
        marginTop: theme.spacing.sm,
    },
    inputContainer: {
        backgroundColor: theme.colors.background,
        borderRadius: theme.borderRadius.sm,
        borderWidth: 1,
        borderColor: theme.colors.border,
        paddingHorizontal: theme.spacing.sm,
    },
    input: {
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.text,
        height: 48,
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
        paddingTop: theme.spacing.sm,
    },
    saveButton: {
        marginTop: theme.spacing.lg,
        width: '100%',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: theme.spacing.md,
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.textSecondary,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.lg,
    },
    errorText: {
        marginTop: theme.spacing.md,
        marginBottom: theme.spacing.lg,
        fontSize: theme.typography.fontSize.md,
        color: 'red',
        textAlign: 'center',
    },
});