import { theme } from '@/src/theme'; // Panggil theme kamu
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function CustomTabBar({ state, descriptors, navigation }: any) {
    return (
        <View style={styles.tabBarContainer}>
            {state.routes.map((route: any, index: any) => {
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({ type: 'tabPress', target: route.key });
                    if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
                };

                // Sesuaikan ikon berdasarkan nama route
                let iconName: any = 'home';
                if (route.name === 'index') iconName = 'home';
                else if (route.name === 'menu') iconName = 'restaurant';
                else if (route.name === 'history') iconName = 'time';
                else if (route.name === 'settings') iconName = 'settings';

                return (
                    <TouchableOpacity
                        key={index}
                        onPress={onPress}
                        style={styles.tabItem}
                    >
                        <Ionicons
                            name={isFocused ? iconName : `${iconName}-outline`}
                            size={24}
                            color={isFocused ? theme.colors.primary : '#A0A0A0'}
                        />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    tabBarContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF', // Warna background tab bar
        paddingVertical: 15,
        position: 'sticky',
        bottom: 0,
        // Shadow untuk efek mengambang
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});