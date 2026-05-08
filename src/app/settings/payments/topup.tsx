import { PAYMENT_METHODS } from '@/src/data/mockData';
import { useAppNavigation } from '@/src/hooks/useAppNavigation';
import { theme } from '@/src/theme';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TopUpPage() {
    const { goBack } = useAppNavigation();

    const [amount, setAmount] = useState('');
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);



    const handleAmountChange = (text: string) => {
        const numericValue = text.replace(/[^0-9]/g, '');
        setAmount(numericValue);
    };

    const formatAmount = (value: string) => {
        if (!value) return '';
        return parseInt(value).toLocaleString('id-ID');
    };

    const handleConfirm = () => {
        if (!amount || parseInt(amount) <= 0) {
            Alert.alert('Error', 'Harap masukkan jumlah top up yang valid');
            return;
        }

        if (!selectedMethod) {
            Alert.alert('Error', 'Harap pilih metode pembayaran');
            return;
        }

        // Mock confirmation - in real app, process payment
        const selectedPaymentMethod = PAYMENT_METHODS.find(m => m.id === selectedMethod);
        Alert.alert(
            'Konfirmasi Top Up',
            `Top up sebesar Rp ${formatAmount(amount)} menggunakan ${selectedPaymentMethod?.type}?`,
            [
                { text: 'Batal', style: 'cancel' },
                {
                    text: 'Konfirmasi',
                    onPress: () => {
                        // Mock success
                        Alert.alert('Sukses', 'Top up berhasil!', [
                            {
                                text: 'OK',
                                onPress: () => goBack('./payment')
                            }
                        ]);
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => goBack('./payment')} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Top Up Saldo</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Amount Input */}
                <View style={styles.amountCard}>
                    <Text style={styles.amountLabel}>Jumlah Top Up</Text>
                    <View style={styles.amountInputContainer}>
                        <Text style={styles.currencyText}>Rp</Text>
                        <TextInput
                            style={styles.amountInput}
                            placeholder="0"
                            keyboardType="numeric"
                            value={formatAmount(amount)}
                            onChangeText={handleAmountChange}
                            maxLength={12}
                        />
                    </View>
                    <Text style={styles.amountHint}>Minimal top up Rp 10.000</Text>
                </View>

                {/* Payment Methods */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Pilih Metode Pembayaran</Text>
                    <View style={styles.sectionContent}>
                        {PAYMENT_METHODS.map((method) => (
                            <TouchableOpacity
                                key={method.id}
                                style={[
                                    styles.paymentMethod,
                                    selectedMethod === method.id && styles.selectedPaymentMethod
                                ]}
                                onPress={() => setSelectedMethod(method.id)}
                            >
                                <View style={styles.methodLeft}>
                                    <Ionicons name={method.icon as any} size={20} color={theme.colors.primary} />
                                    <View>
                                        <Text style={styles.methodType}>{method.type}</Text>
                                        <Text style={styles.methodNumber}>{method.number}</Text>
                                    </View>
                                </View>
                                <View style={styles.radioButton}>
                                    {selectedMethod === method.id && (
                                        <View style={styles.radioSelected} />
                                    )}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Confirm Button */}
                <TouchableOpacity
                    style={[
                        styles.confirmButton,
                        (!amount || !selectedMethod) && styles.confirmButtonDisabled
                    ]}
                    onPress={handleConfirm}
                    disabled={!amount || !selectedMethod}
                >
                    <Text style={styles.confirmButtonText}>Konfirmasi Top Up</Text>
                </TouchableOpacity>
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
    amountCard: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.md,
        marginBottom: theme.spacing.lg,
        alignItems: 'center',
    },
    amountLabel: {
        fontSize: theme.typography.fontSize.md,
        fontWeight: theme.typography.fontWeight.medium,
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },
    amountInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        outlineWidth: 0,
        borderColor: theme.colors.border,
        borderRadius: theme.borderRadius.md,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        marginBottom: theme.spacing.xs,
        width: '100%',

    },
    currencyText: {
        fontSize: theme.typography.fontSize.lg,
        color: theme.colors.text,
        marginRight: theme.spacing.sm,
    },
    amountInput: {
        flex: 1,
        fontSize: theme.typography.fontSize.xl,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.primary,
        textAlign: 'center'
    },
    amountHint: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
    },
    section: {
        marginBottom: theme.spacing.lg,
    },
    sectionTitle: {
        fontSize: theme.typography.fontSize.md,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
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
    selectedPaymentMethod: {
        backgroundColor: theme.colors.primary + '10',
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
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioSelected: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: theme.colors.primary,
    },
    confirmButton: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.md,
        alignItems: 'center',
    },
    confirmButtonDisabled: {
        backgroundColor: theme.colors.disabled,
    },
    confirmButtonText: {
        color: '#FFFFFF',
        fontSize: theme.typography.fontSize.md,
        fontWeight: theme.typography.fontWeight.bold,
    },
});