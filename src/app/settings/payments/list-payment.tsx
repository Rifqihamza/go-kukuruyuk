import { useAppNavigation } from "@/src/hooks/useAppNavigation";
import { theme } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface listCardPay {
    id: string;
    nameCard: string;
    type: 'bank' | 'ewallet';
}

export default function ListPayment() {
    const { goBack, replaceTo } = useAppNavigation() // Ganti replaceTo dengan navigate

    const listCardPayment: listCardPay[] = [
        { id: 'card-01', nameCard: 'Bank BCA', type: 'bank' },
        { id: 'card-02', nameCard: 'Bank BNI', type: 'bank' },
        { id: 'card-03', nameCard: 'Bank BRI', type: 'bank' },
        { id: 'card-04', nameCard: 'Bank Mandiri', type: 'bank' },
        { id: 'card-05', nameCard: 'Bank JAGO', type: 'bank' },
        { id: 'card-06', nameCard: 'Seabank', type: 'bank' },
        { id: 'card-07', nameCard: 'Bank BSI', type: 'bank' },
        { id: 'card-08', nameCard: 'Gopay', type: 'ewallet' },
        { id: 'card-09', nameCard: 'DANA', type: 'ewallet' },
        { id: 'card-10', nameCard: 'Shopeepay', type: 'ewallet' },
        { id: 'card-11', nameCard: 'OVO', type: 'ewallet' },
    ]

    const handleCardPress = (item: listCardPay) => {
        // Navigasi ke form-payment dengan parameter
        replaceTo('/settings/payments/form-payment', {
            paymentId: item.id,
            paymentName: item.nameCard,
            paymentType: item.type
        })
    }

    return (
        <SafeAreaView style={style.container}>
            <View style={style.backButton}>
                <TouchableOpacity onPress={() => goBack('./payment')}>
                    <Ionicons name="chevron-back" size={30} />
                </TouchableOpacity>
                <Text style={style.backButtonTitle}>Tambah Kartu / E-Wallet</Text>
            </View>

            <FlatList
                data={listCardPayment}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => handleCardPress(item)}
                        style={style.listItem}
                    >
                        <Ionicons
                            name={item.type === 'bank' ? "card" : "wallet"}
                            size={24}
                        />
                        <Text style={style.listItemText}>{item.nameCard}</Text>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 5,
        marginBottom: 20,
    },
    backButtonTitle: {
        fontSize: theme.typography.fontSize.lg,
        fontWeight: 'bold',
    },
    listItem: {
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    listItemText: {
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.text,
    },
})