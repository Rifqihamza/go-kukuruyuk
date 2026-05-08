import { Stack } from 'expo-router';

export default function SecurityLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="security-page"
                options={{
                    title: "Keamanan",
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="change-password"
                options={{
                    title: "Ubah Password",
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="biometric"
                options={{
                    title: "Biometric Authentication",
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="two-factor"
                options={{
                    title: "Autentikasi Dua Faktor",
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="personal-data"
                options={{
                    title: "Data Pribadi",
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="download-data"
                options={{
                    title: "Unduh Data",
                    headerShown: false
                }}
            />
        </Stack>
    );
}