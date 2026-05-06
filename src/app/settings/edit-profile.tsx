import Button from '@/src/components/Button';
import { useAppNavigation } from '@/src/hooks/useAppNavigation';
import { theme } from '@/src/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditProfileScreen() {
    const router = useRouter();
    const { replaceTo } = useAppNavigation();
    const [fullname, setFullname] = useState('Jhon Doe');
    const [email, setEmail] = useState('jhondoe@gmail.com');
    const [phone, setPhone] = useState('08123456789');
    const [address, setAddress] = useState('Jl. Contoh No. 123');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => replaceTo('../(tabs)/settings')} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.topBarTitle}>Edit Profil</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* Avatar */}
                <View style={styles.avatarSection}>
                    <View style={styles.avatar}>
                        <Ionicons name="person" size={48} color={theme.colors.textLight} />
                    </View>
                    <TouchableOpacity style={styles.changePhotoButton}>
                        <Text style={styles.changePhotoText}>Ubah Foto</Text>
                    </TouchableOpacity>
                </View>

                {/* Form */}
                <View style={styles.formSection}>
                    <Text style={styles.fieldLabel}>Nama Lengkap</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={fullname}
                            onChangeText={setFullname}
                            placeholder="Nama Lengkap"
                            placeholderTextColor={theme.colors.disabled}
                        />
                    </View>

                    <Text style={styles.fieldLabel}>Email</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
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
                            value={phone}
                            onChangeText={setPhone}
                            placeholder="No. Telepon"
                            placeholderTextColor={theme.colors.disabled}
                            keyboardType="phone-pad"
                        />
                    </View>

                    <Text style={styles.fieldLabel}>Alamat</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            value={address}
                            onChangeText={setAddress}
                            placeholder="Alamat"
                            placeholderTextColor={theme.colors.disabled}
                            multiline
                            numberOfLines={3}
                        />
                    </View>

                    <Button
                        title="Simpan Perubahan"
                        onPress={() => router.back()}
                        size="lg"
                        style={styles.saveButton}
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
});