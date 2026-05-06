import { useAppNavigation } from '@/src/hooks/useAppNavigation';
import { theme } from '@/src/theme';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PrivacyScreen() {
    const { replaceTo } = useAppNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => replaceTo('../(tabs)/settings')} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.topBarTitle}>Kebijakan Privasi</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.updated}>Terakhir diperbarui: 5 Mei 2026</Text>
                <Text style={styles.paragraph}>
                    Go Kukuruyuk menghormati privasi Anda. Kebijakan privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda.
                </Text>
                <Text style={styles.heading}>1. Informasi yang Kami Kumpulkan</Text>
                <Text style={styles.paragraph}>
                    Kami mengumpulkan informasi yang Anda berikan saat mendaftar, seperti nama, alamat email, dan nomor telepon. Kami juga mengumpulkan data pemesanan dan riwayat transaksi.
                </Text>
                <Text style={styles.heading}>2. Penggunaan Informasi</Text>
                <Text style={styles.paragraph}>
                    Informasi Anda digunakan untuk memproses pesanan, meningkatkan layanan, dan mengirimkan notifikasi penting terkait pesanan Anda.
                </Text>
                <Text style={styles.heading}>3. Keamanan Data</Text>
                <Text style={styles.paragraph}>
                    Kami menggunakan enkripsi SSL dan praktik keamanan standar industri untuk melindungi data Anda. Kami tidak akan membagikan data pribadi Anda kepada pihak ketiga tanpa persetujuan Anda.
                </Text>
                <Text style={styles.heading}>4. Hak Anda</Text>
                <Text style={styles.paragraph}>
                    Anda berhak mengakses, memperbaiki, atau menghapus data pribadi Anda kapan saja melalui pengaturan akun.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: theme.spacing.md, paddingVertical: theme.spacing.sm, backgroundColor: theme.colors.surface, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
    backButton: { width: 40, height: 40, borderRadius: theme.borderRadius.full, alignItems: 'center', justifyContent: 'center' },
    topBarTitle: { fontSize: theme.typography.fontSize.lg, fontWeight: theme.typography.fontWeight.semibold, color: theme.colors.text },
    content: { padding: theme.spacing.md },
    updated: { fontSize: theme.typography.fontSize.sm, color: theme.colors.textSecondary, marginBottom: theme.spacing.md, fontStyle: 'italic' },
    heading: { fontSize: theme.typography.fontSize.lg, fontWeight: theme.typography.fontWeight.bold, color: theme.colors.text, marginTop: theme.spacing.md, marginBottom: theme.spacing.xs },
    paragraph: { fontSize: theme.typography.fontSize.md, color: theme.colors.textSecondary, lineHeight: 22, marginBottom: theme.spacing.sm },
});