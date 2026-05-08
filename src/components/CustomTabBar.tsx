import { theme } from '@/src/theme';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

type RouteName = 'index' | 'menu' | 'history' | 'settings';

type IoniconsName = keyof typeof Ionicons.glyphMap;

const TAB_ICONS: Record<RouteName, { active: IoniconsName; inactive: IoniconsName }> = {
    index: { active: 'home', inactive: 'home-outline' },
    menu: { active: 'restaurant', inactive: 'restaurant-outline' },
    history: { active: 'time', inactive: 'time-outline' },
    settings: { active: 'settings', inactive: 'settings-outline' },
};

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    return (
        <View style={styles.tabBarContainer}>
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;
                const { options } = descriptors[route.key];
                const routeName = route.name as RouteName;
                const icons = TAB_ICONS[routeName] || { active: 'home', inactive: 'home-outline' };
                const iconName = isFocused ? icons.active : icons.inactive;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tabItem}
                    >
                        <Ionicons
                            name={iconName}
                            size={24}
                            color={isFocused ? theme.colors.primary : theme.colors.disabled}
                        />
                        {isFocused && <View style={styles.activeIndicator} />}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    tabBarContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 80,
        flexDirection: 'row',
        backgroundColor: theme.colors.surface,
        paddingVertical: theme.spacing.sm,
        paddingBottom: theme.spacing.md,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 - 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: theme.spacing.xs,
    },
    activeIndicator: {
        width: 24,
        height: 3,
        backgroundColor: theme.colors.primary,
        borderRadius: 2,
        marginTop: 4,
    },
});