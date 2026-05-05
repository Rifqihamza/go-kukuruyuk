import Header from '@/src/components/Header';
import QuickAccess from '@/src/components/QuickAccess';
import { theme } from '@/src/theme'; // Pastikan path ini benar
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Header />

            <Image
                source={require('../../assets/images/banner.png')}
                alt="Banner"
                style={styles.bannerImg}
            />

            <ScrollView
                style={styles.mainContentOverlay}
                showsVerticalScrollIndicator={false}
            >
                {/* Estimasi Pengiriman */}
                <View style={styles.deliveryEstimationCard}>
                    <Text style={styles.textWhiteBold}>Estimasi Pengiriman</Text>
                    <Text style={styles.titleCard}>15 Menit</Text>
                </View>

                {/* Info Ringkasan */}
                <View style={styles.statsContainer}>
                    <View style={styles.activeOrderCard}>
                        <View style={styles.cardInnerPadding}>
                            <View style={styles.rowSpaceBetween}>
                                <Text style={styles.textWhiteBold}>Pesanan Kamu</Text>
                                <Text style={styles.textWhiteBold}>Total</Text>
                            </View>
                            <View>

                                <View style={styles.rowSpaceBetween}>
                                    <Text style={styles.titleSummary}>Ayam Crispy</Text>
                                    <Text style={styles.totalSummary}>1</Text>
                                </View>
                                <Text style={styles.textCard}>Ayam Crispy (Data) + Nasi</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.pointsCard}>
                        <View style={styles.cardInnerPadding}>
                            <Text style={styles.textWhiteBold}>Poin Kamu</Text>
                            <Text style={styles.titleCard}>120</Text>
                        </View>
                    </View>
                </View>

                {/* Quick Access Menu */}
                <View style={styles.quickAccessContainer}>
                    <QuickAccess name='Delivery' icon='truck-delivery' urlTo='/delivery' />
                    <QuickAccess name='Menu' icon='food' urlTo='/menu' />
                    <QuickAccess name='Promo' icon='tag-multiple' urlTo='/promo' />
                    <QuickAccess name='Activity' icon='history' urlTo='/activity' />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.backgroundSecondary
    },
    bannerImg: {
        width: '100%',
        height: 300,
        transform: [{ translateY: -20 }],
        zIndex: -1
    },

    // Overlay content
    mainContentOverlay: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.lg,
        borderTopRightRadius: theme.borderRadius.lg,
        borderTopLeftRadius: theme.borderRadius.lg,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },

    // Cards
    deliveryEstimationCard: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: theme.spacing.sm,
        marginTop: theme.spacing.md
    },
    activeOrderCard: {
        flex: 2,
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md
    },
    pointsCard: {
        flex: 1,
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md
    },

    // Utility
    cardInnerPadding: { gap: theme.spacing.xs },
    rowSpaceBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    quickAccessContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: theme.spacing.md
    },

    // Typography
    textWhiteBold: {
        color: theme.colors.textLight,
        fontWeight: theme.typography.fontWeight.bold as any
    },
    textCard: {
        color: theme.colors.textLight,
    },
    titleCard: {
        fontSize: theme.typography.fontSize.xl,
        fontWeight: theme.typography.fontWeight.bold as any,
        color: theme.colors.textLight
    },
    titleSummary: {
        fontSize: theme.typography.fontSize.lg,
        fontWeight: theme.typography.fontWeight.bold as any,
        color: theme.colors.textLight
    },
    totalSummary: {
        fontSize: theme.typography.fontSize.lg,
        fontWeight: theme.typography.fontWeight.bold as any,
        color: theme.colors.textLight
    },
});