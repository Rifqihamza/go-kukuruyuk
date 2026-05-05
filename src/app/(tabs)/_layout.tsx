import CustomTabBar from '@/src/components/CustomTabBar'; // Sesuaikan path-nya
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs
            tabBar={props => <CustomTabBar {...props} />}
            screenOptions={{ headerShown: false }}
        >
            <Tabs.Screen name="index" />   {/* Home */}
            <Tabs.Screen name="menu" />    {/* Menu */}
            <Tabs.Screen name="history" /> {/* History */}
            <Tabs.Screen name="settings" /> {/* Setting */}
        </Tabs>
    );
}