import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
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
  const [errorMessage, setErrorMessage] = useState('');
  const [errorType, setErrorType] = useState<'user_not_found' | 'wrong_password' | 'general' | ''>('');

  const handleLogin = async () => {
    setErrorMessage('');
    setErrorType('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please fill in all fields');
      setErrorType('general');
      return;
    }

    setLoading(true);
    try {
      const response = await authService.login(email, password);
      await login(response.token, response.user);
      router.replace('/(app)/home');
    } catch (error: any) {
      const status = error.response?.status;
      const msg: string = error.response?.data?.error ?? '';

      if (status === 404 || msg.toLowerCase().includes('no account') || msg.toLowerCase().includes('not found')) {
        setErrorType('user_not_found');
        setErrorMessage('No account found with this email. Please sign up first.');
      } else if (status === 401 || msg.toLowerCase().includes('incorrect password') || msg.toLowerCase().includes('password')) {
        setErrorType('wrong_password');
        setErrorMessage('Incorrect password. Please try again.');
      } else if (status === 500) {
        setErrorType('general');
        setErrorMessage('Server error. Please try again later.');
      } else {
        setErrorType('general');
        setErrorMessage(msg || 'Login failed. Please try again.');
      }
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
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: colors.primary, marginBottom: 8, textAlign: 'center' }}>
            Task Manager
          </Text>
          <Text style={{ fontSize: 15, color: colors.text, opacity: 0.6, marginBottom: 28, textAlign: 'center' }}>
            Welcome back!
          </Text>

          {/* Inline error banner */}
          {errorMessage !== '' && (
            <View
              style={{
                backgroundColor: colors.error + '18',
                borderWidth: 1,
                borderColor: colors.error + '60',
                borderRadius: 8,
                padding: 12,
                marginBottom: 16,
              }}
            >
              <Text style={{ color: colors.error, fontSize: 14, fontWeight: '600', marginBottom: 2 }}>
                {errorType === 'user_not_found' && 'Account not found'}
                {errorType === 'wrong_password' && 'Wrong password'}
                {errorType === 'general' && 'Login failed'}
              </Text>
              <Text style={{ color: colors.error, fontSize: 13, opacity: 0.9 }}>{errorMessage}</Text>
              {errorType === 'user_not_found' && (
                <TouchableOpacity onPress={() => router.push('/(auth)/register')} style={{ marginTop: 8 }}>
                  <Text style={{ color: colors.primary, fontSize: 13, fontWeight: '700' }}>
                    Create an account →
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          <Text style={{ fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 6, opacity: 0.7 }}>
            Email
          </Text>
          <TextInput
            placeholder="you@example.com"
            placeholderTextColor={colors.text + '55'}
            value={email}
            onChangeText={v => { setEmail(v); setErrorMessage(''); setErrorType(''); }}
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
            onChangeText={v => { setPassword(v); setErrorMessage(''); setErrorType(''); }}
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
