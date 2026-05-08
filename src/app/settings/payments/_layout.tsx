import { Stack } from "expo-router";

export default function PaymentsLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="payment"
                options={{
                    title: "Metode Pembayaran",
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="list-payment"
                options={{
                    title: "Tambah Metode Pembayaran",
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="form-payment"
                options={{
                    title: "Form Pembayaran",
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="topup"
                options={{
                    title: "Top Up Saldo",
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="history-payment"
                options={{
                    title: "Riwayat Transaksi",
                    headerShown: false
                }}
            />
        </Stack>
    );
}