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
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PersonalDataPage() {
    const { goBack } = useAppNavigation();
    const [dataSharing, setDataSharing] = useState(false);
    const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
    const [marketingEmails, setMarketingEmails] = useState(false);

    const privacySettings = [
        {
            id: 'data_sharing',
            title: 'Berbagi Data',
            description: 'Izinkan aplikasi berbagi data anonim untuk peningkatan layanan',
            value: dataSharing,
            onValueChange: setDataSharing,
        },
        {
            id: 'analytics',
            title: 'Analytics',
            description: 'Bantu kami meningkatkan aplikasi dengan mengirim data penggunaan anonim',
            value: analyticsEnabled,
            onValueChange: setAnalyticsEnabled,
        },
        {
            id: 'marketing',
            title: 'Email Pemasaran',
            description: 'Terima email tentang promo dan penawaran khusus',
            value: marketingEmails,
            onValueChange: setMarketingEmails,
        },
    ];

    const personalData = [
        {
            id: 'profile',
            title: 'Data Profil',
            description: 'Nama, email, nomor telepon',
            icon: 'person-outline',
            status: 'Dilindungi',
        },
        {
            id: 'payment',
            title: 'Data Pembayaran',
            description: 'Kartu kredit, rekening bank, histori transaksi',
            icon: 'card-outline',
            status: 'Terenkripsi',
        },
        {
            id: 'location',
            title: 'Data Lokasi',
            description: 'Lokasi pengiriman dan preferensi',
            icon: 'location-outline',
            status: 'Dilindungi',
        },
        {
            id: 'activity',
            title: 'Aktivitas',
            description: 'Log aktivitas dan penggunaan aplikasi',
            icon: 'time-outline',
            status: 'Dilindungi',
        },
    ];

    const handleDataRequest = (type: string) => {
        Alert.alert(
            'Permintaan Data',
            `Apakah Anda ingin mengajukan permintaan ${type} data pribadi Anda?`,
            [
                { text: 'Batal', style: 'cancel' },
                {
                    text: 'Ajukan',
                    onPress: () => {
                        Alert.alert(
                            'Berhasil',
                            'Permintaan Anda telah diajukan. Kami akan memproses dalam 30 hari kerja.',
                            [{ text: 'OK' }]
                        );
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => goBack('./security')} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Data Pribadi</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.content}>
                    <View style={styles.introCard}>
                        <Ionicons name="shield-checkmark-outline" size={48} color={theme.colors.primary} />
                        <Text style={styles.introTitle}>Data Anda Aman</Text>
                        <Text style={styles.introText}>
                            Kami berkomitmen untuk melindungi data pribadi Anda dengan standar keamanan tertinggi.
                            Data Anda dienkripsi dan hanya digunakan sesuai dengan kebijakan privasi kami.
                        </Text>
                    </View>

                    {/* Privacy Settings */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Pengaturan Privasi</Text>
                        <View style={styles.sectionContent}>
                            {privacySettings.map((setting) => (
                                <View key={setting.id} style={styles.settingRow}>
                                    <View style={styles.settingLeft}>
                                        <Text style={styles.settingTitle}>{setting.title}</Text>
                                        <Text style={styles.settingDescription}>{setting.description}</Text>
                                    </View>
                                    <Switch
                                        value={setting.value}
                                        onValueChange={setting.onValueChange}
                                        trackColor={{ false: theme.colors.disabled, true: theme.colors.primaryLight }}
                                        thumbColor={setting.value ? theme.colors.primary : '#f4f3f4'}
                                    />
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Personal Data Overview */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Data yang Kami Simpan</Text>
                        <View style={styles.sectionContent}>
                            {personalData.map((data) => (
                                <View key={data.id} style={styles.dataRow}>
                                    <View style={styles.dataLeft}>
                                        <Ionicons
                                            name={data.icon as any}
                                            size={24}
                                            color={theme.colors.primary}
                                        />
                                        <View style={styles.dataInfo}>
                                            <Text style={styles.dataTitle}>{data.title}</Text>
                                            <Text style={styles.dataDescription}>{data.description}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.statusContainer}>
                                        <Text style={styles.statusText}>{data.status}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Data Rights */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Hak Anda Atas Data</Text>
                        <Text style={styles.sectionDescription}>
                            Sesuai dengan peraturan perlindungan data, Anda memiliki hak untuk:
                        </Text>
                        <View style={styles.sectionContent}>
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => handleDataRequest('akses')}
                            >
                                <Ionicons name="eye-outline" size={20} color={theme.colors.primary} />
                                <Text style={styles.actionText}>Akses Data</Text>
                                <Ionicons name="chevron-forward" size={20} color={theme.colors.disabled} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => handleDataRequest('perbaikan')}
                            >
                                <Ionicons name="create-outline" size={20} color={theme.colors.primary} />
                                <Text style={styles.actionText}>Perbaiki Data</Text>
                                <Ionicons name="chevron-forward" size={20} color={theme.colors.disabled} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => handleDataRequest('penghapusan')}
                            >
                                <Ionicons name="trash-outline" size={20} color={theme.colors.error} />
                                <Text style={[styles.actionText, { color: theme.colors.error }]}>
                                    Hapus Data
                                </Text>
                                <Ionicons name="chevron-forward" size={20} color={theme.colors.disabled} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Security Info */}
                    <View style={styles.infoCard}>
                        <Ionicons name="information-circle-outline" size={24} color={theme.colors.primary} />
                        <View style={styles.infoContent}>
                            <Text style={styles.infoTitle}>Keamanan Data</Text>
                            <Text style={styles.infoText}>
                                Data Anda dilindungi dengan enkripsi end-to-end dan disimpan di server yang aman.
                                Kami tidak membagikan data Anda dengan pihak ketiga tanpa izin Anda.
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
    introCard: {
        backgroundColor: theme.colors.primary + '10',
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.md,
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
        borderLeftWidth: 4,
        borderLeftColor: theme.colors.primary,
    },
    introTitle: {
        fontSize: theme.typography.fontSize.lg,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.primary,
        marginTop: theme.spacing.md,
        marginBottom: theme.spacing.sm,
    },
    introText: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: 18,
    },
    section: {
        marginBottom: theme.spacing.xl,
    },
    sectionTitle: {
        fontSize: theme.typography.fontSize.md,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },
    sectionDescription: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.sm,
        lineHeight: 18,
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
        flex: 1,
        marginRight: theme.spacing.md,
    },
    settingTitle: {
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.text,
        fontWeight: theme.typography.fontWeight.medium,
        marginBottom: 2,
    },
    settingDescription: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
        lineHeight: 16,
    },
    dataRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    dataLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    dataInfo: {
        marginLeft: theme.spacing.md,
        flex: 1,
    },
    dataTitle: {
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.text,
        fontWeight: theme.typography.fontWeight.medium,
        marginBottom: 2,
    },
    dataDescription: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
        lineHeight: 16,
    },
    statusContainer: {
        backgroundColor: theme.colors.success + '20',
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: 4,
        borderRadius: theme.borderRadius.sm,
    },
    statusText: {
        fontSize: theme.typography.fontSize.xs,
        color: theme.colors.success,
        fontWeight: theme.typography.fontWeight.bold,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    actionText: {
        flex: 1,
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.text,
        marginLeft: theme.spacing.sm,
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