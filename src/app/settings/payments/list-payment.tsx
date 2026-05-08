import { LIST_CARD_PAYMENT } from "@/src/data/mockData";
import { useAppNavigation } from "@/src/hooks/useAppNavigation";
import { theme } from "@/src/theme";
import { ListCardPay } from "@/src/types";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ListPayment() {
    const { goBack, navigateTo } = useAppNavigation() // Ganti replaceTo dengan navigate

    const handleCardPress = (item: ListCardPay) => {
        // Navigasi ke form-payment dengan parameter
        navigateTo('/settings/payments/form-payment', {
            paymentId: item.id,
            paymentName: item.name,
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
                data={LIST_CARD_PAYMENT}
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
                        <Text style={style.listItemText}>{item.name}</Text>
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
        fontSize: theme.typography.fontSize.md,
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