import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { theme } from '../theme';

interface Props {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    style?: ViewStyle;
}

const Button = React.memo<Props>(({
    title,
    onPress,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    style,
}) => {
    const buttonStyles = [
        styles.base,
        styles[`variant_${variant}`],
        styles[`size_${size}`],
        disabled && styles.disabled,
        style,
    ];

    const textStyles = [
        styles.text,
        styles[`text_${variant}`],
        styles[`textSize_${size}`],
        disabled && styles.textDisabled,
    ];

    return (
        <TouchableOpacity
            style={buttonStyles}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
        >
            {loading ? (
                <ActivityIndicator
                    size="small"
                    color={variant === 'outline' ? theme.colors.primary : theme.colors.textLight}
                />
            ) : (
                <Text style={textStyles}>{title}</Text>
            )}
        </TouchableOpacity>
    );
});

Button.displayName = 'Button';

export default Button;

const styles = StyleSheet.create({
    base: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: theme.borderRadius.md,
    },
    variant_primary: {
        backgroundColor: theme.colors.primary,
    },
    variant_secondary: {
        backgroundColor: theme.colors.secondary,
    },
    variant_outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: theme.colors.primary,
    },
    size_sm: {
        paddingVertical: theme.spacing.xs,
        paddingHorizontal: theme.spacing.md,
    },
    size_md: {
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.lg,
    },
    size_lg: {
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.xl,
    },
    disabled: {
        opacity: 0.5,
    },
    text: {
        fontWeight: theme.typography.fontWeight.semibold,
    },
    text_primary: {
        color: theme.colors.textLight,
    },
    text_secondary: {
        color: theme.colors.text,
    },
    text_outline: {
        color: theme.colors.primary,
    },
    textSize_sm: {
        fontSize: theme.typography.fontSize.sm,
    },
    textSize_md: {
        fontSize: theme.typography.fontSize.md,
    },
    textSize_lg: {
        fontSize: theme.typography.fontSize.lg,
    },
    textDisabled: {
        color: theme.colors.disabled,
    },
});