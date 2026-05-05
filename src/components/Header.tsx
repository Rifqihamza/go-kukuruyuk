import Fontisto from '@expo/vector-icons/Fontisto';
import { StyleSheet, Text, View } from "react-native";
import { theme } from '../theme';
export default function Header() {
    return (
        <View style={styles.header}>
            <View style={styles.titleContiner}>
                <View style={styles.avatar}>
                    <Fontisto name="person" size={24} color="white" />
                </View>
                <View style={styles.title}>
                    <Text style={{ fontWeight: '400', fontSize: 14 }}>Selamat Datang</Text>
                    <Text style={{ fontWeight: '600', fontSize: 22 }}>Jhon Doe</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        backgroundColor: theme.colors.background,
    },
    avatar: {
        padding: 5,
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: '#FF6B00',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleContiner:
    {
        flexDirection: "row",
        gap: 10

    },
    title: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    }
})