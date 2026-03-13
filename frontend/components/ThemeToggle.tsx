import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme, colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={{
        padding: 10,
        backgroundColor: colors.card,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <Text style={{ color: colors.text, fontSize: 14, fontWeight: '600' }}>
        {isDark ? '☀️ Light' : '🌙 Dark'}
      </Text>
    </TouchableOpacity>
  );
};
