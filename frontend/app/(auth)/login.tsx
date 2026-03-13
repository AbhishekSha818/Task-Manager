import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/api';

export default function LoginScreen() {
  const { colors } = useTheme();
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Memoize TextInput styles to prevent re-render shrinking
  const emailInputStyle = useMemo(
    () => ({
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      padding: 12,
      minHeight: 44,
      width: '100%' as const,
      marginBottom: 12,
      color: colors.text,
      fontSize: 14,
    }),
    [colors]
  );

  const passwordInputStyle = useMemo(
    () => ({
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      padding: 12,
      minHeight: 44,
      width: '100%' as const,
      marginBottom: 20,
      color: colors.text,
      fontSize: 14,
    }),
    [colors]
  );

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await authService.login(email, password);
      await login(response.token, response.user);
      router.replace('/(app)/home');
    } catch (error: any) {
      Alert.alert('Login Failed', error.response?.data?.error || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
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
          alignItems: Platform.OS === 'web' ? 'center' : 'stretch',
          backgroundColor: colors.background,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            width: Platform.OS === 'web' ? 400 : '100%',
            padding: 24,
            justifyContent: 'center',
            backgroundColor: colors.background,
            borderWidth: Platform.OS === 'web' ? 1 : 0,
            borderColor: colors.border,
            borderRadius: 12,
            marginHorizontal: Platform.OS === 'web' ? 20 : 0,
            ...(Platform.OS === 'web' && {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 12,
              elevation: 8,
            }),
          }}
        >
          <Text
            style={{
              fontSize: 32,
              fontWeight: 'bold',
              color: colors.primary,
              marginBottom: 10,
              textAlign: 'center',
            }}
          >
            Task Manager
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: colors.text,
              opacity: 0.7,
              marginBottom: 30,
              textAlign: 'center',
            }}
          >
            Welcome back!
          </Text>

          <TextInput
            placeholder="Email"
            placeholderTextColor={colors.text + '80'}
            value={email}
            onChangeText={setEmail}
            style={emailInputStyle}
            keyboardType="email-address"
            editable={!loading}
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor={colors.text + '80'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={passwordInputStyle}
            editable={!loading}
          />

          <TouchableOpacity
            onPress={handleLogin}
            disabled={loading}
            style={{
              backgroundColor: loading ? colors.primary + '80' : colors.primary,
              borderRadius: 8,
              padding: 14,
              marginBottom: 15,
            }}
          >
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 16,
                fontWeight: '600',
                textAlign: 'center',
              }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: colors.text, fontSize: 14 }}>Don't have an account? </Text>
            <TouchableOpacity
              disabled={loading}
              onPress={() => router.push('/(auth)/register')}
            >
              <Text
                style={{
                  color: colors.primary,
                  fontSize: 14,
                  fontWeight: '600',
                }}
              >
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
