import { Ionicons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";

interface SearchBarProps {
    value: string;
    onChange: (text: string) => void;
    placeholder?: string; // Tanda '?' berarti opsional
}

export default function Search({ value, onChange, placeholder = "Mau Cari Apa...." }: SearchBarProps) {

    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#f0f0f0',
            borderRadius: 10,
            paddingHorizontal: 10,
            margin: 10,
            borderWidth: 1,
        }}>
            <Ionicons name="search" size={20} color="gray" style={{ marginRight: 5 }} />
            <TextInput
                style={{ flex: 1, height: 40 }}
                placeholder={placeholder}
                value={value}
                onChangeText={onChange}
                clearButtonMode="while-editing" // Hanya di iOS
            />
        </View>
    )
}