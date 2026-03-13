import { Platform } from 'react-native';

/**
 * Unified TextInput styles for consistent sizing across all pages
 * Single source of truth for all input field styling
 * Includes web-specific fixes for React Native Web
 */

export const INPUT_STYLES = {
  // Standard single-line text input (email, password, username, title, etc.)
  singleLine: {
    height: 44,
    padding: 12,
    fontSize: 14,
    borderRadius: 8,
    borderWidth: 1,
    ...(Platform.OS === 'web' && {
      boxSizing: 'border-box' as any,
      WebkitBoxSizing: 'border-box' as any,
      outline: 'none',
      fontFamily: 'inherit',
    }),
  },

  // Multi-line text input (descriptions, task details)
  multiLine: {
    padding: 12,
    fontSize: 14,
    minHeight: 100,
    borderRadius: 8,
    borderWidth: 1,
    textAlignVertical: 'top',
    ...(Platform.OS === 'web' && {
      boxSizing: 'border-box' as any,
      WebkitBoxSizing: 'border-box' as any,
      outline: 'none',
      fontFamily: 'inherit',
    }),
  },
};

/**
 * Helper function to get complete input style with theme colors
 * @param baseStyle - The base style object (singleLine or multiLine)
 * @param colors - Theme colors object
 * @param additionalMargin - Optional margin bottom spacing
 * @returns Complete style object with colors applied
 */
export const getInputStyle = (
  baseStyle: typeof INPUT_STYLES.singleLine | typeof INPUT_STYLES.multiLine,
  colors: any,
  additionalMargin: number = 12
) => ({
  ...baseStyle,
  backgroundColor: colors.card,
  borderColor: colors.border,
  color: colors.text,
  marginBottom: additionalMargin,
});
