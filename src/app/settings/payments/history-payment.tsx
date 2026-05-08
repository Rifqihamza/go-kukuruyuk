import { useAppNavigation } from '@/src/hooks/useAppNavigation';
import { theme } from '@/src/theme';
import { ALL_TRANSACTIONS } from '@/src/data/mockData';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HistoryPaymentPage() {
    const { goBack } = useAppNavigation();
    const [searchQuery, setSearchQuery] = useState('');



    // Filter transactions based on search query
    const filteredTransactions = ALL_TRANSACTIONS.filter(transaction =>
        transaction.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Group transactions by date
    const groupedTransactions = filteredTransactions.reduce((groups, transaction) => {
        const date = transaction.date;
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(transaction);
        return groups;
    }, {} as Record<string, typeof allTransactions>);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Hari ini';
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Kemarin';
        } else {
            return date.toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => goBack('./payment')} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Riwayat Transaksi</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                    <Ionicons name="search" size={20} color={theme.colors.textSecondary} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Cari transaksi..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {Object.entries(groupedTransactions).map(([date, transactions]) => (
                    <View key={date} style={styles.dateGroup}>
                        <Text style={styles.dateHeader}>{formatDate(date)}</Text>
                        <View style={styles.transactionList}>
                            {transactions.map((transaction) => (
                                <View key={transaction.id} style={styles.transaction}>
                                    <View style={styles.transactionLeft}>
                                        <View style={[styles.transactionIcon, {
                                            backgroundColor: transaction.type === 'credit' ? theme.colors.success + '20' : theme.colors.error + '20'
                                        }]}>
                                            <Ionicons
                                                name={transaction.type === 'credit' ? 'arrow-up' : 'arrow-down'}
                                                size={16}
                                                color={transaction.type === 'credit' ? theme.colors.success : theme.colors.error}
                                            />
                                        </View>
                                        <View style={styles.transactionDetails}>
                                            <Text style={styles.transactionDescription}>{transaction.description}</Text>
                                            <Text style={styles.transactionTime}>{transaction.time}</Text>
                                        </View>
                                    </View>
                                    <Text style={[styles.transactionAmount, {
                                        color: transaction.type === 'credit' ? theme.colors.success : theme.colors.error
                                    }]}>
                                        {transaction.amount}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
                ))}

                {filteredTransactions.length === 0 && (
                    <View style={styles.emptyState}>
                        <Ionicons name="document-text-outline" size={64} color={theme.colors.disabled} />
                        <Text style={styles.emptyStateText}>
                            {searchQuery ? 'Tidak ada transaksi ditemukan' : 'Belum ada transaksi'}
                        </Text>
                    </View>
                )}
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
    searchContainer: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        backgroundColor: theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
        borderRadius: theme.borderRadius.md,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
    },
    searchInput: {
        flex: 1,
        marginLeft: theme.spacing.sm,
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.text,
    },
    scrollContent: {
        padding: theme.spacing.md,
        paddingBottom: theme.spacing.xxl,
    },
    dateGroup: {
        marginBottom: theme.spacing.lg,
    },
    dateHeader: {
        fontSize: theme.typography.fontSize.md,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },
    transactionList: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        width: '100%'
    },
    transaction: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    transactionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
    },
    transactionIcon: {
        width: 40,
        height: 40,
        borderRadius: theme.borderRadius.full,
        alignItems: 'center',
        justifyContent: 'center',
    },
    transactionDetails: {
        width: 'auto'
    },
    transactionDescription: {
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.text,
        marginBottom: 2,
    },
    transactionTime: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
    },
    transactionAmount: {
        fontSize: theme.typography.fontSize.md,
        fontWeight: theme.typography.fontWeight.bold,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: theme.spacing.xxl,
    },
    emptyStateText: {
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.md,
        textAlign: 'center',
    },
});