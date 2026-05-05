import { theme } from '@/src/theme';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header'; // Sesuaikan path jika perlu

export default function DeliveryScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <Header userName="Jhon Doe" greeting="Delivery" />

            <View style={styles.content}>
                <Text style={styles.title}>Halaman Delivery</Text>
                <Text style={styles.description}>
                    Ini adalah halaman untuk estimasi pengiriman dan status delivery.
                </Text>

                {/* Tombol Navigasi Kembali */}
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Text style={styles.backButtonText}>Kembali ke Home</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: theme.spacing.md },
    title: { fontSize: theme.typography.fontSize.xl, fontWeight: 'bold', color: theme.colors.text, marginBottom: theme.spacing.md },
    description: { fontSize: theme.typography.fontSize.md, color: theme.colors.textSecondary, textAlign: 'center', marginBottom: 20 },
    backButton: { backgroundColor: theme.colors.primary, padding: 12, borderRadius: 8 },
    backButtonText: { color: '#FFF', fontWeight: 'bold' }
});