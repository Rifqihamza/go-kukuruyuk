export const theme = {
    colors: {
        primary: '#FF6B00',      // Oranye Kukuruyuk (Khas Ayam Crispy)
        secondary: '#FFC107',    // Kuning Emas (Aksen)
        background: '#F8F9FA',   // Background Utama
        backgroundSecondary: '#eaeaea',   // Background Utama
        surface: '#FFFFFF',      // Background Card
        text: '#1A1A1A',         // Teks Utama
        textLight: '#FFFFFF',    // Teks di atas warna gelap
        textSecondary: '#666666',
        error: '#DC3545',
        success: '#28A745',
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
    },
    borderRadius: {
        sm: 8,
        md: 15,
        lg: 20,
        full: 50,
    },
    typography: {
        fontSize: {
            xs: 12,
            sm: 14,
            md: 16,
            lg: 20,
            xl: 32,
        },
        fontWeight: {
            regular: '400',
            medium: '500',
            bold: '700',
        },
    },
};

export type Theme = typeof theme;