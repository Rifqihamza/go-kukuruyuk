import { useAppNavigation } from '@/src/hooks/useAppNavigation';
import { theme } from '@/src/theme';
import { Ionicons } from '@expo/vector-icons';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const FAQ = [
    { q: 'Bagaimana cara memesan?', a: 'Pilih menu favorit Anda, tambahkan ke keranjang, lalu klik "Pesan Sekarang". Ikuti petunjuk pembayaran.' },
    { q: 'Berapa lama estimasi pengiriman?', a: 'Estimasi pengiriman sekitar 15 menit, tergantung lokasi Anda.' },
    { q: 'Bagaimana cara membatalkan pesanan?', a: 'Hubungi customer service kami melalui WhatsApp atau email untuk pembatalan pesanan.' },
    { q: 'Metode pembayaran apa saja yang tersedia?', a: 'Kami menerima pembayaran melalui transfer bank, e-wallet (GoPay, OVO, Dana), dan COD.' },
];

export default function HelpScreen() {
    const { replaceTo } = useAppNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => replaceTo('../(tabs)/settings')} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.topBarTitle}>Bantuan</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* Contact */}
                <View style={styles.contactSection}>
                    <Text style={styles.sectionTitle}>Hubungi Kami</Text>
                    <TouchableOpacity style={styles.contactRow} onPress={() => Linking.openURL('https://wa.me/6281234567890')}>
                        <Ionicons name="logo-whatsapp" size={22} color="#25D366" />
                        <Text style={styles.contactText}>WhatsApp</Text>
                        <Ionicons name="chevron-forward" size={20} color={theme.colors.disabled} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.contactRow, { borderBottomWidth: 0 }]} onPress={() => Linking.openURL('mailto:support@gokukuruyuk.com')}>
                        <Ionicons name="mail-outline" size={22} color={theme.colors.primary} />
                        <Text style={styles.contactText}>Email</Text>
                        <Ionicons name="chevron-forward" size={20} color={theme.colors.disabled} />
                    </TouchableOpacity>
                </View>

                {/* FAQ */}
                <View style={styles.faqSection}>
                    <Text style={styles.sectionTitle}>Pertanyaan Umum (FAQ)</Text>
                    {FAQ.map((item, index) => (
                        <View key={index} style={[styles.faqItem, index === FAQ.length - 1 && { borderBottomWidth: 0 }]}>
                            <Text style={styles.faqQuestion}>{item.q}</Text>
                            <Text style={styles.faqAnswer}>{item.a}</Text>
                        </View>
                    ))}
                </View>
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
    sectionTitle: { fontSize: theme.typography.fontSize.lg, fontWeight: theme.typography.fontWeight.bold, color: theme.colors.text, marginBottom: theme.spacing.sm },
    contactSection: { backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.md, padding: theme.spacing.md, marginBottom: theme.spacing.md },
    contactRow: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm, paddingVertical: theme.spacing.sm, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
    contactText: { flex: 1, fontSize: theme.typography.fontSize.md, color: theme.colors.text },
    faqSection: { backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.md, padding: theme.spacing.md },
    faqItem: { paddingVertical: theme.spacing.sm, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
    faqQuestion: { fontSize: theme.typography.fontSize.md, fontWeight: theme.typography.fontWeight.semibold, color: theme.colors.text },
    faqAnswer: { fontSize: theme.typography.fontSize.sm, color: theme.colors.textSecondary, marginTop: 4, lineHeight: 20 },
});