export type ThemeColors = {
    primary: string;
    primaryLight: string;
    secondary: string;
    background: string;
    backgroundSecondary: string;
    surface: string;
    text: string;
    textLight: string;
    textSecondary: string;
    error: string;
    success: string;
    warning: string;
    border: string;
    disabled: string;
    overlay: string;
};

export type ThemeSpacing = {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
};

export type ThemeBorderRadius = {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    full: number;
};

type FontWeight = '300' | '400' | '500' | '600' | '700';

export type ThemeTypography = {
    fontSize: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
        xxl: number;
    };
    fontWeight: {
        light: FontWeight;
        regular: FontWeight;
        medium: FontWeight;
        semibold: FontWeight;
        bold: FontWeight;
    };
};

export type Theme = {
    colors: ThemeColors;
    spacing: ThemeSpacing;
    borderRadius: ThemeBorderRadius;
    typography: ThemeTypography;
};

export const theme: Theme = {
    colors: {
        primary: '#FF6B00',
        primaryLight: '#FF8C3F',
        secondary: '#FFC107',
        background: '#F8F9FA',
        backgroundSecondary: '#EAEAEA',
        surface: '#FFFFFF',
        text: '#1A1A1A',
        textLight: '#FFFFFF',
        textSecondary: '#666666',
        error: '#DC3545',
        success: '#28A745',
        warning: '#FFC107',
        border: '#E0E0E0',
        disabled: '#C0C0C0',
        overlay: 'rgba(0,0,0,0.5)',
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48,
    },
    borderRadius: {
        sm: 8,
        md: 12,
        lg: 16,
        xl: 20,
        full: 50,
    },
    typography: {
        fontSize: {
            xs: 12,
            sm: 14,
            md: 16,
            lg: 20,
            xl: 28,
            xxl: 32,
        },
        fontWeight: {
            light: '300',
            regular: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
        } as const,
    },
};