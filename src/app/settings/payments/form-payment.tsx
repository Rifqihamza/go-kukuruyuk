import { useAppNavigation } from "@/src/hooks/useAppNavigation";
import { theme } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useRoute } from '@react-navigation/native';
import { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type FormPaymentParams = {
    paymentId: string;
    paymentName: string;
    paymentType: 'bank' | 'ewallet';
};

export default function FormPayment() {
    const { goBack } = useAppNavigation();
    const route = useRoute<RouteProp<Record<string, FormPaymentParams>, string>>();
    const { paymentId, paymentName, paymentType } = route.params || {};

    // State untuk form
    const [formData, setFormData] = useState({
        // Field umum
        name: '',

        // Field untuk bank
        bankName: paymentName || '',
        accountNumber: '',
        accountHolderName: '',

        // Field untuk e-wallet
        walletNumber: '',
        walletProvider: paymentName || '',
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        // Validasi berdasarkan tipe
        if (paymentType === 'bank') {
            if (!formData.accountNumber || !formData.accountHolderName) {
                Alert.alert('Error', 'Harap isi nomor rekening dan nama pemilik rekening');
                return;
            }

            // Simpan data bank
            const bankData = {
                id: paymentId,
                type: 'bank',
                name: paymentName,
                accountNumber: formData.accountNumber,
                accountHolderName: formData.accountHolderName,
                addedDate: new Date().toISOString(),
            };

            console.log('Bank Data:', bankData);
            Alert.alert('Sukses', 'Metode pembayaran bank berhasil ditambahkan');

        } else {
            if (!formData.walletNumber) {
                Alert.alert('Error', 'Harap isi nomor e-wallet');
                return;
            }

            // Simpan data e-wallet
            const ewalletData = {
                id: paymentId,
                type: 'ewallet',
                name: paymentName,
                walletNumber: formData.walletNumber,
                addedDate: new Date().toISOString(),
            };

            console.log('E-Wallet Data:', ewalletData);
            Alert.alert('Sukses', 'Metode pembayaran e-wallet berhasil ditambahkan');
        }

        // Kembali ke halaman sebelumnya setelah sukses
        goBack('./payment');
    };

    // Jika tidak ada params, tampilkan error
    if (!paymentType) {
        return (
            <SafeAreaView style={style.container}>
                <View style={style.backButton}>
                    <TouchableOpacity onPress={() => goBack('./payment')}>
                        <Ionicons name="chevron-back" size={30} />
                    </TouchableOpacity>
                </View>
                <Text style={style.errorText}>Data tidak valid</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={style.container}>
            <View style={style.backButton}>
                <TouchableOpacity onPress={() => goBack('./list-payment.tsx')}>
                    <Ionicons name="chevron-back" size={30} />
                </TouchableOpacity>
                <Text style={style.backButtonTitle}>
                    {paymentType === 'bank' ? 'Tambah Rekening Bank' : 'Tambah E-Wallet'}
                </Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Informasi Provider */}
                <View style={style.infoCard}>
                    <Ionicons
                        name={paymentType === 'bank' ? "business" : "phone-portrait"}
                        size={40}
                        color={theme.colors.primary}
                    />
                    <Text style={style.providerName}>{paymentName}</Text>
                    <Text style={style.providerType}>
                        {paymentType === 'bank' ? 'Bank' : 'E-Wallet'}
                    </Text>
                </View>

                {/* Form Dinamis */}
                <View style={style.formContainer}>
                    {paymentType === 'bank' ? (
                        // Form untuk Bank
                        <>
                            <View style={style.inputGroup}>
                                <Text style={style.label}>Nama Bank</Text>
                                <TextInput
                                    style={style.input}
                                    value={formData.bankName}
                                    editable={false}
                                    placeholderTextColor={theme.colors.textLight}
                                />
                            </View>

                            <View style={style.inputGroup}>
                                <Text style={style.label}>Nomor Rekening</Text>
                                <TextInput
                                    style={style.input}
                                    placeholder="Masukkan nomor rekening"
                                    keyboardType="numeric"
                                    value={formData.accountNumber}
                                    onChangeText={(text) => handleInputChange('accountNumber', text)}
                                />
                            </View>

                            <View style={style.inputGroup}>
                                <Text style={style.label}>Nama Pemilik Rekening</Text>
                                <TextInput
                                    style={style.input}
                                    placeholder="Masukkan nama pemilik rekening"
                                    value={formData.accountHolderName}
                                    onChangeText={(text) => handleInputChange('accountHolderName', text)}
                                />
                            </View>
                        </>
                    ) : (
                        // Form untuk E-Wallet
                        <>
                            <View style={style.inputGroup}>
                                <Text style={style.label}>Provider E-Wallet</Text>
                                <TextInput
                                    style={style.input}
                                    value={formData.walletProvider}
                                    editable={false}
                                    placeholderTextColor={theme.colors.textLight}
                                />
                            </View>

                            <View style={style.inputGroup}>
                                <Text style={style.label}>Nomor E-Wallet</Text>
                                <TextInput
                                    style={style.input}
                                    placeholder="Masukkan nomor e-wallet"
                                    keyboardType="phone-pad"
                                    value={formData.walletNumber}
                                    onChangeText={(text) => handleInputChange('walletNumber', text)}
                                />
                            </View>

                            <View style={style.inputGroup}>
                                <Text style={style.label}>Nama Pengguna</Text>
                                <TextInput
                                    style={style.input}
                                    placeholder="Masukkan nama pengguna e-wallet"
                                    value={formData.name}
                                    onChangeText={(text) => handleInputChange('name', text)}
                                />
                            </View>
                        </>
                    )}
                </View>

                {/* Tombol Submit */}
                <TouchableOpacity style={style.submitButton} onPress={handleSubmit}>
                    <Text style={style.submitButtonText}>Tambah Metode Pembayaran</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 20,
    },
    backButtonTitle: {
        fontSize: theme.typography.fontSize.lg,
        fontWeight: 'bold',
    },
    infoCard: {
        alignItems: 'center',
        padding: theme.spacing.lg,
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        marginBottom: 20,
    },
    providerName: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
        color: theme.colors.text,
    },
    providerType: {
        fontSize: 14,
        color: theme.colors.textLight,
        marginTop: 5,
    },
    formContainer: {
        marginBottom: 30,
    },
    inputGroup: {
        marginBottom: theme.spacing.md,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8,
        color: theme.colors.text,
    },
    input: {
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    submitButton: {
        backgroundColor: theme.colors.primary,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'red',
        marginTop: 50,
    },
});