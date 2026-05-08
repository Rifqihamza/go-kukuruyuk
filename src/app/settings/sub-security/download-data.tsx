import Button from '@/src/components/Button';
import { useAppNavigation } from '@/src/hooks';
import { theme } from '@/src/theme';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DownloadDataPage() {
    const { goBack } = useAppNavigation();
    const [loading, setLoading] = useState(false);
    const [requestStatus, setRequestStatus] = useState<'idle' | 'processing' | 'ready'>('idle');

    const dataCategories = [
        {
            id: 'profile',
            title: 'Data Profil',
            description: 'Informasi akun, nama, email, nomor telepon',
            icon: 'person-outline',
            size: '~50 KB',
        },
        {
            id: 'transactions',
            title: 'Riwayat Transaksi',
            description: 'Semua transaksi pembelian dan top up',
            icon: 'card-outline',
            size: '~200 KB',
        },
        {
            id: 'orders',
            title: 'Riwayat Pesanan',
            description: 'Detail semua pesanan makanan',
            icon: 'restaurant-outline',
            size: '~150 KB',
        },
        {
            id: 'activity',
            title: 'Log Aktivitas',
            description: 'Riwayat login dan aktivitas aplikasi',
            icon: 'time-outline',
            size: '~100 KB',
        },
        {
            id: 'preferences',
            title: 'Preferensi',
            description: 'Pengaturan aplikasi dan preferensi pengguna',
            icon: 'settings-outline',
            size: '~25 KB',
        },
    ];

    const handleDownloadRequest = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            setRequestStatus('processing');
            Alert.alert(
                'Permintaan Dikirim',
                'Permintaan unduh data Anda telah diajukan. Kami akan memproses dalam 24-48 jam dan mengirim notifikasi ketika data siap diunduh.',
                [{ text: 'OK' }]
            );
        } catch {
            Alert.alert('Error', 'Gagal mengajukan permintaan. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadAll = async () => {
        if (requestStatus !== 'ready') {
            Alert.alert('Data Belum Siap', 'Data Anda belum siap untuk diunduh. Silakan tunggu notifikasi dari kami.');
            return;
        }

        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 3000));
            Alert.alert(
                'Berhasil!',
                'File data Anda telah diunduh ke perangkat.',
                [{ text: 'OK' }]
            );
        } catch {
            Alert.alert('Error', 'Gagal mengunduh data. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = () => {
        switch (requestStatus) {
            case 'processing':
                return 'time-outline';
            case 'ready':
                return 'checkmark-circle-outline';
            default:
                return 'download-outline';
        }
    };

    const getStatusText = () => {
        switch (requestStatus) {
            case 'processing':
                return 'Sedang diproses...';
            case 'ready':
                return 'Siap diunduh';
            default:
                return 'Belum diminta';
        }
    };

    const getStatusColor = () => {
        switch (requestStatus) {
            case 'processing':
                return theme.colors.warning;
            case 'ready':
                return theme.colors.success;
            default:
                return theme.colors.textSecondary;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => goBack('./security')} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Unduh Data</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.content}>
                    <View style={styles.introCard}>
                        <Ionicons name="download-outline" size={48} color={theme.colors.primary} />
                        <Text style={styles.introTitle}>Unduh Data Anda</Text>
                        <Text style={styles.introText}>
                            Anda berhak mendapatkan salinan data pribadi yang kami simpan.
                            Data akan dikirim dalam format JSON dan ZIP.
                        </Text>
                    </View>

                    {/* Request Status */}
                    <View style={styles.statusCard}>
                        <View style={styles.statusHeader}>
                            <Ionicons
                                name={getStatusIcon()}
                                size={24}
                                color={getStatusColor()}
                            />
                            <Text style={styles.statusTitle}>Status Permintaan</Text>
                        </View>
                        <Text style={[styles.statusText, { color: getStatusColor() }]}>
                            {getStatusText()}
                        </Text>
                        {requestStatus === 'processing' && (
                            <Text style={styles.processingNote}>
                                Proses biasanya memakan waktu 24-48 jam. Anda akan menerima notifikasi ketika data siap.
                            </Text>
                        )}
                    </View>

                    {/* Data Categories */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Kategori Data</Text>
                        <Text style={styles.sectionDescription}>
                            Data berikut akan disertakan dalam file unduhan:
                        </Text>
                        <View style={styles.sectionContent}>
                            {dataCategories.map((category) => (
                                <View key={category.id} style={styles.categoryRow}>
                                    <View style={styles.categoryLeft}>
                                        <Ionicons
                                            name={category.icon as any}
                                            size={24}
                                            color={theme.colors.primary}
                                        />
                                        <View style={styles.categoryInfo}>
                                            <Text style={styles.categoryTitle}>{category.title}</Text>
                                            <Text style={styles.categoryDescription}>{category.description}</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.categorySize}>{category.size}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Download Actions */}
                    <View style={styles.actionsSection}>
                        <Text style={styles.sectionTitle}>Aksi</Text>

                        {requestStatus === 'idle' && (
                            <View style={styles.actionCard}>
                                <Text style={styles.actionDescription}>
                                    Untuk mengunduh data Anda, pertama-tama ajukan permintaan.
                                    Kami akan memproses permintaan Anda sesuai dengan peraturan privasi data.
                                </Text>
                                <Button
                                    title="Ajukan Permintaan Unduh"
                                    onPress={handleDownloadRequest}
                                    variant="primary"
                                    size="lg"
                                    loading={loading}
                                    disabled={loading}
                                    style={styles.actionButton}
                                />
                            </View>
                        )}

                        {requestStatus === 'processing' && (
                            <View style={styles.actionCard}>
                                <Ionicons name="time-outline" size={48} color={theme.colors.warning} />
                                <Text style={styles.processingTitle}>Sedang Diproses</Text>
                                <Text style={styles.processingText}>
                                    Permintaan Anda sedang diproses. Mohon tunggu notifikasi selanjutnya.
                                </Text>
                            </View>
                        )}

                        {requestStatus === 'ready' && (
                            <View style={styles.actionCard}>
                                <Ionicons name="checkmark-circle-outline" size={48} color={theme.colors.success} />
                                <Text style={styles.readyTitle}>Data Siap Diunduh</Text>
                                <Text style={styles.readyText}>
                                    Data Anda telah siap. Klik tombol di bawah untuk mengunduh.
                                </Text>
                                <Button
                                    title="Unduh Semua Data"
                                    onPress={handleDownloadAll}
                                    variant="primary"
                                    size="lg"
                                    loading={loading}
                                    disabled={loading}
                                    style={styles.actionButton}
                                />
                            </View>
                        )}
                    </View>

                    {/* Important Notes */}
                    <View style={styles.notesCard}>
                        <Ionicons name="information-circle-outline" size={24} color={theme.colors.primary} />
                        <View style={styles.notesContent}>
                            <Text style={styles.notesTitle}>Catatan Penting</Text>
                            <View style={styles.notesList}>
                                <Text style={styles.noteText}>• Data akan dikirim dalam format terenkripsi</Text>
                                <Text style={styles.noteText}>• Link unduhan berlaku selama 7 hari</Text>
                                <Text style={styles.noteText}>• Untuk pertanyaan, hubungi support@kukuruyuk.com</Text>
                                <Text style={styles.noteText}>• Proses ini sesuai dengan GDPR dan UU PDP</Text>
                            </View>
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
    statusCard: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        marginBottom: theme.spacing.xl,
    },
    statusHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },
    statusTitle: {
        fontSize: theme.typography.fontSize.md,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.text,
        marginLeft: theme.spacing.sm,
    },
    statusText: {
        fontSize: theme.typography.fontSize.md,
        fontWeight: theme.typography.fontWeight.medium,
    },
    processingNote: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.sm,
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
    categoryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    categoryLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    categoryInfo: {
        marginLeft: theme.spacing.md,
        flex: 1,
    },
    categoryTitle: {
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.text,
        fontWeight: theme.typography.fontWeight.medium,
        marginBottom: 2,
    },
    categoryDescription: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
        lineHeight: 16,
    },
    categorySize: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.primary,
        fontWeight: theme.typography.fontWeight.bold,
    },
    actionsSection: {
        marginBottom: theme.spacing.xl,
    },
    actionCard: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.md,
        alignItems: 'center',
    },
    actionDescription: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: 18,
        marginBottom: theme.spacing.lg,
    },
    actionButton: {
        width: '100%',
    },
    processingTitle: {
        fontSize: theme.typography.fontSize.lg,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.warning,
        marginTop: theme.spacing.md,
        marginBottom: theme.spacing.sm,
    },
    processingText: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: 18,
    },
    readyTitle: {
        fontSize: theme.typography.fontSize.lg,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.success,
        marginTop: theme.spacing.md,
        marginBottom: theme.spacing.sm,
    },
    readyText: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: 18,
        marginBottom: theme.spacing.lg,
    },
    notesCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: theme.colors.primary + '10',
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        borderLeftWidth: 4,
        borderLeftColor: theme.colors.primary,
    },
    notesContent: {
        flex: 1,
        marginLeft: theme.spacing.sm,
    },
    notesTitle: {
        fontSize: theme.typography.fontSize.sm,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.primary,
        marginBottom: theme.spacing.xs,
    },
    notesList: {
        gap: theme.spacing.xs,
    },
    noteText: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
        lineHeight: 16,
    },
});