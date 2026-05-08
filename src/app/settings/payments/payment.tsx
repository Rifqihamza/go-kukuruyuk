import { useAppNavigation } from '@/src/hooks/useAppNavigation';
import { theme } from '@/src/theme';
import { PAYMENT_METHODS, RECENT_TRANSACTIONS, USER_BALANCE } from '@/src/data/mockData';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PaymentPage() {
    const { navigateTo, replaceTo } = useAppNavigation()

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => replaceTo('../../(tabs)/settings')} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Pembayaran</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Balance Card */}
                <View style={styles.balanceCard}>
                    <View style={styles.balanceHeader}>
                        <Ionicons name="wallet" size={24} color={theme.colors.background} />
                        <Text style={styles.balanceTitle}>Saldo Kamu</Text>
                    </View>
                    <Text style={styles.balanceAmount}>Rp {USER_BALANCE.toLocaleString('id-ID')}</Text>
                    <TouchableOpacity style={styles.topUpButton} onPress={() => navigateTo('./topup')}>
                        <Text style={styles.topUpButtonText}>Top Up</Text>
                    </TouchableOpacity>
                </View>

                {/* Payment Methods */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Metode Pembayaran</Text>
                    </View>
                    <View style={styles.sectionContent}>
                        {PAYMENT_METHODS.map((method) => (
                            <View key={method.id} style={styles.paymentMethod}>
                                <View style={styles.methodLeft}>
                                    <Ionicons name={method.icon as any} size={20} color={theme.colors.primary} />
                                    <View>
                                        <Text style={styles.methodType}>{method.type}</Text>
                                        <Text style={styles.methodNumber}>{method.number}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Recent Transactions */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Transaksi Terakhir</Text>
                        <TouchableOpacity onPress={() => navigateTo('./history-payment')}>
                            <Text style={styles.seeAllText}>Lihat Semua</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.sectionContent}>
                        {RECENT_TRANSACTIONS.map((transaction) => (
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
                                    <View>
                                        <Text style={styles.transactionDescription}>{transaction.description}</Text>
                                        <Text style={styles.transactionDate}>{transaction.date}</Text>
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

                {/* Quick Actions */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Aksi Cepat</Text>
                    <View style={styles.sectionContent}>
                        <TouchableOpacity
                            style={styles.quickAction}
                            onPress={() => navigateTo('./list-payment')}
                        >
                            <Ionicons name="card-outline" size={20} color={theme.colors.primary} />
                            <Text style={styles.quickActionText}>Tambah Kartu/E-wallet</Text>
                            <Ionicons name="chevron-forward" size={16} color={theme.colors.disabled} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.quickAction}
                            onPress={() => navigateTo('./history-payment')}
                        >
                            <Ionicons name="time-outline" size={20} color={theme.colors.primary} />
                            <Text style={styles.quickActionText}>Riwayat Transaksi</Text>
                            <Ionicons name="chevron-forward" size={16} color={theme.colors.disabled} />
                        </TouchableOpacity>
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
        padding: theme.spacing.md,
        paddingBottom: theme.spacing.xxl,
    },
    balanceCard: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        marginBottom: theme.spacing.lg,
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    balanceHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },
    balanceTitle: {
        color: '#FFFFFF',
        fontSize: theme.typography.fontSize.md,
        marginLeft: theme.spacing.sm,
    },
    balanceAmount: {
        color: '#FFFFFF',
        fontSize: theme.typography.fontSize.xxl,
        fontWeight: theme.typography.fontWeight.bold,
        marginBottom: theme.spacing.md,
    },
    topUpButton: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borderRadius.md,
        alignSelf: 'flex-start',
    },
    topUpButtonText: {
        color: theme.colors.primary,
        fontWeight: theme.typography.fontWeight.bold,
    },
    section: {
        marginBottom: theme.spacing.lg,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },
    sectionTitle: {
        fontSize: theme.typography.fontSize.md,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.text,
    },
    seeAllText: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.primary,
        fontWeight: theme.typography.fontWeight.medium,
    },
    sectionContent: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        overflow: 'hidden',
    },
    paymentMethod: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    methodLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
    },
    methodType: {
        fontSize: theme.typography.fontSize.md,
        fontWeight: theme.typography.fontWeight.medium,
        color: theme.colors.text,
    },
    methodNumber: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
    },
    methodAction: {
        padding: theme.spacing.xs,
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
    transactionDescription: {
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.text,
    },
    transactionDate: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
    },
    transactionAmount: {
        fontSize: theme.typography.fontSize.md,
        fontWeight: theme.typography.fontWeight.bold,
    },
    quickAction: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    quickActionText: {
        flex: 1,
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.text,
        marginLeft: theme.spacing.sm,
    },
});