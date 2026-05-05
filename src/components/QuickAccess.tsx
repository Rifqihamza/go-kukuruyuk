import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { theme } from "../theme";
import { QuickAccessItem } from "../types";

interface Props {
    item: QuickAccessItem;
}

export default function QuickAccess({ item }: Props) {
    const router = useRouter();

    return (
        <TouchableOpacity
            onPress={() => router.push(item.urlTo as any)}
            style={styles.container}
            activeOpacity={0.7}
        >
            <MaterialCommunityIcons
                name={item.icon as keyof typeof MaterialCommunityIcons.glyphMap}
                size={28}
                color={theme.colors.textLight}
            />
            <Text style={styles.label}>{item.name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 72,
        height: 72,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: theme.borderRadius.full,
        marginHorizontal: theme.spacing.sm,
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    label: {
        position: 'absolute' as const,
        bottom: -18,
        fontSize: theme.typography.fontSize.xs,
        fontWeight: theme.typography.fontWeight.medium,
        color: theme.colors.textSecondary,
    },
});