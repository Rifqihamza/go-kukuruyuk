import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
interface QuickAccessInterface {
    urlTo: string;
    name: string;
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
}

export default function QuickAccess({ urlTo, name, icon }: QuickAccessInterface) {
    const router = useRouter();

    return (
        <TouchableOpacity onPress={() => router.push(urlTo as any)} style={{ width: 60, height: 60, backgroundColor: '#FF6B00', alignItems: 'center', justifyContent: 'center', borderRadius: 100 }}>
            <MaterialCommunityIcons name={icon} size={30} color="white" style={{ transform: [{ translateY: 10 }] }} />
            <Text style={{ transform: [{ translateY: 30 }] }}>{name}</Text>
        </TouchableOpacity>
    )
}