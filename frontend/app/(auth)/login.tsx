import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/api';

export default function LoginScreen() {
  const { colors, themeLoaded } = useTheme();
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setLoading(true);
    console.log('[Login] Attempting login with email:', email);
    try {
      const response = await authService.login(email, password);
      console.log('[Login] Login successful, setting auth context');
      await login(response.token, response.user);
      router.replace('/(app)/home');
    } catch (error: any) {
      console.error('[Login] Login error:', {
        status: error.response?.status,
        data: error.response?.data,
      });

      // Parse error response and show context-aware message
      const status = error.response?.status;
      const errorData = error.response?.data;
      let alertTitle = 'Login Failed';
      let alertMessage = 'Invalid credentials';

      if (status === 404 || errorData?.error?.includes('not found')) {
        alertMessage = "This email isn't registered. Would you like to create an account?";
        alertTitle = 'User Not Found';
      } else if (status === 401 || errorData?.error?.includes('password')) {
        alertMessage = 'The password you entered is incorrect. Please try again.';
        alertTitle = 'Wrong Password';
      } else if (status === 500) {
        alertMessage = 'Server error. Please try again later.';
        alertTitle = 'Server Error';
      } else if (errorData?.error) {
        alertMessage = errorData.error;
      }

      Alert.alert(alertTitle, alertMessage, [
        { text: 'Dismiss', style: 'default' },
        alertTitle === 'User Not Found'
          ? {
              text: 'Sign Up',
              onPress: () => router.push('/(auth)/register'),
            }
          : null,
      ].filter(Boolean) as any);
    } finally {
      setLoading(false);
    }
  };

  if (!themeLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const inputStyle = {
    height: 48,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 0,
    fontSize: 15,
    color: colors.text,
    marginBottom: 14,
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.background,
          padding: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            width: '100%',
            maxWidth: 400,
            padding: 28,
            backgroundColor: colors.background,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 4,
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              color: colors.primary,
              marginBottom: 8,
              textAlign: 'center',
            }}
          >
            Task Manager
          </Text>

          <Text
            style={{
              fontSize: 15,
              color: colors.text,
              opacity: 0.6,
              marginBottom: 28,
              textAlign: 'center',
            }}
          >
            Welcome back!
          </Text>

          <Text style={{ fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 6, opacity: 0.7 }}>
            Email
          </Text>
          <TextInput
            placeholder="you@example.com"
            placeholderTextColor={colors.text + '55'}
            value={email}
            onChangeText={setEmail}
            style={inputStyle}
            keyboardType="default"
            autoCapitalize="none"
            editable={!loading}
          />

          <Text style={{ fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 6, opacity: 0.7 }}>
            Password
          </Text>
          <TextInput
            placeholder="••••••••"
            placeholderTextColor={colors.text + '55'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={{ ...inputStyle, marginBottom: 22 }}
            editable={!loading}
          />

          <TouchableOpacity
            onPress={handleLogin}
            disabled={loading}
            style={{
              backgroundColor: loading ? colors.primary + '88' : colors.primary,
              borderRadius: 8,
              height: 48,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700' }}>
              {loading ? 'Logging in...' : 'Login'}
            </Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: colors.text, fontSize: 14, opacity: 0.7 }}>Don't have an account? </Text>
            <TouchableOpacity disabled={loading} onPress={() => router.push('/(auth)/register')}>
              <Text style={{ color: colors.primary, fontSize: 14, fontWeight: '700' }}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
