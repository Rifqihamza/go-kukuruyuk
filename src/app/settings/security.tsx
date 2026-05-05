import { theme } from '@/src/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SecurityScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.topBarTitle}>Keamanan</Text>
                <View style={{ width: 40 }} />
            </View>

            <View style={styles.content}>
                <View style={styles.sectionContent}>
                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            <Ionicons name="lock-closed-outline" size={22} color={theme.colors.primary} />
                            <Text style={styles.rowLabel}>Ubah Password</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={theme.colors.disabled} />
                    </View>
                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            <Ionicons name="finger-print-outline" size={22} color={theme.colors.primary} />
                            <Text style={styles.rowLabel}>Biometric / Face ID</Text>
                        </View>
                        <Switch
                            value={false}
                            trackColor={{ false: theme.colors.disabled, true: theme.colors.primaryLight }}
                            thumbColor={'#f4f3f4'}
                        />
                    </View>
                    <View style={[styles.row, { borderBottomWidth: 0 }]}>
                        <View style={styles.rowLeft}>
                            <Ionicons name="shield-checkmark-outline" size={22} color={theme.colors.primary} />
                            <Text style={styles.rowLabel}>Autentikasi Dua Faktor</Text>
                        </View>
                        <Text style={styles.rowValue}>Nonaktif</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: theme.spacing.md, paddingVertical: theme.spacing.sm, backgroundColor: theme.colors.surface, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
    backButton: { width: 40, height: 40, borderRadius: theme.borderRadius.full, alignItems: 'center', justifyContent: 'center' },
    topBarTitle: { fontSize: theme.typography.fontSize.lg, fontWeight: theme.typography.fontWeight.semibold, color: theme.colors.text },
    content: { padding: theme.spacing.md },
    sectionContent: { backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.md, overflow: 'hidden' },
    row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: theme.spacing.sm, paddingHorizontal: theme.spacing.md, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
    rowLeft: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm },
    rowLabel: { fontSize: theme.typography.fontSize.md, color: theme.colors.text },
    rowValue: { fontSize: theme.typography.fontSize.sm, color: theme.colors.textSecondary },
});