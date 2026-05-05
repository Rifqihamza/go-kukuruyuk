import { theme } from "@/src/theme";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HistoryPage() {
    return (
        <>
            <SafeAreaView>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>History Pesanan Kamu</Text>
                </View>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        padding: 15,
        borderBottomWidth: 1,

    },
    headerTitle: {
        fontSize: theme.typography.fontSize.md
    }
})