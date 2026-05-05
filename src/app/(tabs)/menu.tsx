import Search from "@/src/components/Search";
import { MENU_ITEMS } from "@/src/data/mockData";
import { theme } from "@/src/theme";
import { useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MenuPage() {
    const [searchText, setSearchText] = useState('');

    const filteredMenu = MENU_ITEMS.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <SafeAreaView style={styles.container}>
            <Search
                placeholder="Cari Menu Apa?"
                value={searchText}
                onChange={(text) => setSearchText(text)}
            />

            <FlatList
                data={filteredMenu}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image
                            source={typeof item.image === 'string' ? { uri: item.image } : item.image}
                            alt={item.name}
                            style={styles.bannerImg}
                        />
                        <View style={styles.infoContainer}>
                            <Text style={styles.menuName}>{item.name}</Text>
                            <Text style={styles.menuPrice}>Rp {item.price.toLocaleString()}</Text>
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <Text style={styles.emptyText}>
                        Menu &quot;{searchText}&quot; tidak ditemukan.
                    </Text>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.backgroundSecondary, // Sesuaikan dengan tema Anda
    },
    listContent: {
        padding: 15,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: theme.colors.background,
        borderRadius: 15,
        padding: 10,
        marginBottom: 10,
        overflow: 'hidden', // Agar gambar mengikuti border radius card
    },
    bannerImg: {
        borderWidth: 1,
        width: 'auto', // Gambar memenuhi lebar card
        height: 100,    // Tinggi disesuaikan untuk tampilan vertikal
        aspectRatio: 1 / 1,
        borderRadius: 10,

    },
    infoContainer: {
        paddingHorizontal: 10,
    },
    menuName: {
        color: theme.colors.text,
        fontWeight: theme.typography.fontWeight.bold as any,
        fontSize: theme.typography.fontSize.lg,
        marginBottom: 4,
    },
    menuPrice: {
        fontWeight: theme.typography.fontWeight.medium as any,
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.text,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        color: 'gray',
    },
});
