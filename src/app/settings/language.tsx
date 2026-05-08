import { useAppNavigation } from '@/src/hooks/useAppNavigation';
import { theme } from '@/src/theme';
import { LANGUAGES } from '@/src/data/mockData';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LanguageScreen() {
    const { replaceTo } = useAppNavigation();
    const [selected, setSelected] = useState('id');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => replaceTo('../(tabs)/settings')} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.topBarTitle}>Bahasa</Text>
                <View style={{ width: 40 }} />
            </View>

            <View style={styles.content}>
                <View style={styles.sectionContent}>
                    {LANGUAGES.map((lang, index) => (
                        <TouchableOpacity
                            key={lang.id}
                            style={[styles.row, index === LANGUAGES.length - 1 && { borderBottomWidth: 0 }]}
                            onPress={() => setSelected(lang.id)}
                        >
                            <View style={styles.rowLeft}>
                                <Text style={styles.flag}>{lang.flag}</Text>
                                <View>
                                    <Text style={styles.rowLabel}>{lang.name}</Text>
                                    {lang.isDefault && <Text style={styles.defaultText}>Default</Text>}
                                </View>
                            </View>
                            {selected === lang.id && (
                                <Ionicons name="checkmark-circle" size={22} color={theme.colors.primary} />
                            )}
                        </TouchableOpacity>
                    ))}
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
    flag: { fontSize: 24 },
    rowLabel: { fontSize: theme.typography.fontSize.md, color: theme.colors.text },
    defaultText: { fontSize: theme.typography.fontSize.xs, color: theme.colors.textSecondary, marginTop: 1 },
});