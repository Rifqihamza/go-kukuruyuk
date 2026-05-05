import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";
import { theme } from "../theme";

interface SearchBarProps {
    value: string;
    onChange: (text: string) => void;
    placeholder?: string;
}

export default function Search({ value, onChange, placeholder = "Mau Cari Apa..." }: SearchBarProps) {
    return (
        <View style={styles.container}>
            <Ionicons name="search" size={20} color={theme.colors.textSecondary} style={styles.icon} />
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={theme.colors.disabled}
                value={value}
                onChangeText={onChange}
                clearButtonMode="while-editing"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        paddingHorizontal: theme.spacing.sm,
        margin: theme.spacing.sm,
        borderWidth: 1,
        borderColor: theme.colors.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    icon: {
        marginRight: theme.spacing.xs,
    },
    input: {
        flex: 1,
        height: 44,
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.text,
    },
});